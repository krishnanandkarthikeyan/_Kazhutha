import http from 'node:http';
import { createHash, randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const port = Number(process.env.PORT || 3000);
const allowedOrigins = new Set((process.env.KAZHUTHA_ALLOWED_ORIGINS || '')
  .split(',').map(value => value.trim()).filter(Boolean));
const files = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/multiplayer.js', ['multiplayer.js', 'text/javascript; charset=utf-8']],
]);
const assets = new Map(await Promise.all([...new Set([...files.values()].map(x => x[0]))].map(async name =>
  [name, await readFile(new URL(`./${name}`, import.meta.url))]
)));
const rooms = new Map();
const codePattern = /^KZH-[A-F0-9]{6}$/;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (req.method !== 'GET') { res.writeHead(405); res.end(); return; }
  if (url.pathname === '/health') {
    const headers = { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' };
    if (allowedOrigins.has(req.headers.origin)) {
      headers['Access-Control-Allow-Origin'] = req.headers.origin;
      headers['Vary'] = 'Origin';
    }
    res.writeHead(200, headers);
    res.end('ok');
    return;
  }
  const file = files.get(url.pathname);
  if (!file) { res.writeHead(404); res.end('Not found'); return; }
  res.writeHead(200, {
    'Content-Type': file[1],
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  });
  res.end(assets.get(file[0]));
});

function frame(opcode, data = Buffer.alloc(0)) {
  const body = Buffer.isBuffer(data) ? data : Buffer.from(data);
  const header = body.length < 126 ? Buffer.from([0x80 | opcode, body.length])
    : Buffer.from([0x80 | opcode, 126, body.length >> 8, body.length & 255]);
  return Buffer.concat([header, body]);
}

function send(peer, message) {
  if (!peer.socket.destroyed) peer.socket.write(frame(1, JSON.stringify(message)));
}

function detach(peer) {
  if (peer.detached) return;
  peer.detached = true;
  const room = rooms.get(peer.code);
  if (!room) return;
  if (room.host === peer) {
    rooms.delete(peer.code);
    for (const guest of room.guests.values()) {
      send(guest, { type: 'host-left' });
      guest.socket.end(frame(8));
    }
  } else if (room.guests.delete(peer.id)) {
    send(room.host, { type: 'client-left', clientId: peer.id });
  }
}

function receive(peer, packet) {
  if (!packet || typeof packet !== 'object') return;
  if (!peer.code) {
    if (!codePattern.test(packet.code)) {
      send(peer, { type: 'error', error: 'Invalid room code.', status: 400 });
      peer.socket.end(frame(8));
      return;
    }
    if (packet.type === 'host') {
      if (rooms.has(packet.code)) {
        send(peer, { type: 'error', error: 'Room code already in use. Create another room.', status: 409 });
        peer.socket.end(frame(8));
        return;
      }
      peer.code = packet.code;
      peer.role = 'host';
      rooms.set(peer.code, { host: peer, guests: new Map() });
    } else if (packet.type === 'join') {
      const room = rooms.get(packet.code);
      if (!room) {
        send(peer, { type: 'error', error: 'Room not found. Check the code and ask the host to keep the game open.', status: 404 });
        peer.socket.end(frame(8));
        return;
      }
      peer.code = packet.code;
      peer.role = 'guest';
      room.guests.set(peer.id, peer);
    } else {
      send(peer, { type: 'error', error: 'Choose a room first.', status: 400 });
      peer.socket.end(frame(8));
      return;
    }
    send(peer, { type: 'ready' });
    return;
  }
  const room = rooms.get(peer.code);
  if (!room) return;
  if (peer.role === 'guest' && packet.type === 'request') {
    if (typeof packet.id !== 'string' || packet.id.length > 80 || !packet.request ||
      packet.request.code !== peer.code || JSON.stringify(packet.request).length > 2000) return;
    send(room.host, { type: 'request', id: packet.id, clientId: peer.id, request: packet.request });
  } else if (peer.role === 'host' && packet.type === 'response') {
    if (typeof packet.clientId !== 'string' || typeof packet.id !== 'string') return;
    const guest = room.guests.get(packet.clientId);
    if (guest) send(guest, {
      type: 'response', id: packet.id, response: packet.response,
      error: packet.error, status: packet.status,
    });
  }
}

server.on('upgrade', (req, socket, head) => {
  const path = new URL(req.url, 'http://localhost').pathname;
  const key = req.headers['sec-websocket-key'];
  if (path !== '/ws' || req.headers.upgrade?.toLowerCase() !== 'websocket' ||
      req.headers['sec-websocket-version'] !== '13' || typeof key !== 'string' ||
      !/^[A-Za-z0-9+/]{22}==$/.test(key)) {
    socket.write('HTTP/1.1 400 Bad Request\r\nConnection: close\r\n\r\n');
    socket.destroy();
    return;
  }
  // Only pages on this site can open rooms through the browser.
  const origin = req.headers.origin;
  let sameOrigin = true;
  try { sameOrigin = !origin || new URL(origin).host === req.headers.host; }
  catch { sameOrigin = false; }
  if (!sameOrigin && !allowedOrigins.has(origin)) {
    socket.write('HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n');
    socket.destroy();
    return;
  }
  const accept = createHash('sha1').update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');
  socket.write(`HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ${accept}\r\n\r\n`);
  const peer = { id: randomUUID(), socket, code: null, role: null, detached: false, buffer: Buffer.alloc(0), count: 0, windowStart: Date.now() };
  socket.setTimeout(0);
  peer.lastPong = Date.now();
  const keepalive = setInterval(() => {
    if (Date.now() - peer.lastPong > 90000) socket.destroy();
    else if (!socket.destroyed) socket.write(frame(9));
  }, 30000);
  socket.on('data', chunk => {
    peer.buffer = Buffer.concat([peer.buffer, chunk]);
    if (peer.buffer.length > 65536) { socket.destroy(); return; }
    while (peer.buffer.length >= 2) {
      const a = peer.buffer[0], b = peer.buffer[1];
      const opcode = a & 15;
      if (!(a & 0x80) || !(b & 0x80)) { socket.destroy(); return; }
      let size = b & 127, offset = 2;
      if (size === 127) { socket.destroy(); return; }
      if (size === 126) {
        if (peer.buffer.length < 4) return;
        size = peer.buffer.readUInt16BE(2); offset = 4;
      }
      if (size > 32768) { socket.destroy(); return; }
      if (peer.buffer.length < offset + 4 + size) return;
      const mask = peer.buffer.subarray(offset, offset + 4);
      const body = Buffer.from(peer.buffer.subarray(offset + 4, offset + 4 + size));
      peer.buffer = peer.buffer.subarray(offset + 4 + size);
      for (let i = 0; i < body.length; i++) body[i] ^= mask[i & 3];
      if (opcode === 8) { socket.end(frame(8)); return; }
      if (opcode === 9) { socket.write(frame(10, body)); continue; }
      if (opcode === 10) { peer.lastPong = Date.now(); continue; }
      if (opcode !== 1) { socket.destroy(); return; }
      if (Date.now() - peer.windowStart >= 1000) { peer.windowStart = Date.now(); peer.count = 0; }
      if (++peer.count > 30) { socket.destroy(); return; }
      try { receive(peer, JSON.parse(body.toString('utf8'))); }
      catch { socket.destroy(); return; }
    }
  });
  socket.on('close', () => { clearInterval(keepalive); detach(peer); });
  socket.on('error', () => { clearInterval(keepalive); detach(peer); });
  if (head.length) socket.emit('data', head);
});

server.listen(port, '0.0.0.0', () => console.log(`Kazhutha listening on ${port}`));
