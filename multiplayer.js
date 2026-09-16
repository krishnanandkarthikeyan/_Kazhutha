/* Same Kazhutha room engine, with the connection carried by this Render service. */
(function (root) {
  'use strict';
  const fail = (message, status = 400) => Object.assign(new Error(message), { status });
  const randomHex = bytes => Array.from(crypto.getRandomValues(new Uint8Array(bytes)), b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  const validCode = code => typeof code === 'string' && /^KZH-[A-F0-9]{6}$/.test(code);
  const nameOf = name => String(name || 'Player').trim().slice(0, 24) || 'Player';

  // The Room class is copied verbatim from the previously working game client
  // by build.mjs, so gameplay stays with the host's original browser engine.
  class Room {
    constructor(engine, options, now = Date.now) {
      if (!Number.isInteger(options.count) || options.count < 2 || options.count > 6) throw fail('Choose 2 to 6 players.');
      this.engine = engine;
      this.now = now;
      this.code = options.code;
      this.rules = options.rules === 'trump' ? engine.trump : engine.classic;
      this.difficulty = ['Easy', 'Medium', 'Hard', 'Expert'].includes(options.difficulty) ? options.difficulty : 'Medium';
      this.seats = Array.from({ length: options.count }, (_, i) => ({ name: i ? 'Open seat' : nameOf(options.name), type: i ? 'open' : 'human' }));
      this.members = [{ token: randomHex(24), seat: 0, lastSeen: now() }];
      this.game = null;
      this.chat = [];
      this.nextStep = 0;
    }
    member(token) {
      const m = this.members.find(m => m.token === token);
      if (!m) throw fail('Your seat is no longer available. Join the room again.', 403);
      return m;
    }
    snapshot(member, includeToken = false) {
      return {
        code: this.code, seat: member.seat,
        ...(includeToken ? { token: member.token } : {}),
        lobby: { seats: this.seats.map(s => ({ ...s })) },
        chat: this.chat.map(m => ({ ...m })),
        game: this.game ? this.engine.view(this.game, member.seat) : null
      };
    }
    join(request) {
      let m = request.token && this.members.find(m => m.token === request.token);
      if (!m) {
        if (this.game) throw fail('This game has already started. Ask the host to create another room.');
        const seat = this.seats.findIndex(s => s.type === 'open');
        if (seat < 0) throw fail('This room is full.');
        m = { token: randomHex(24), seat, lastSeen: this.now() };
        this.members.push(m);
        this.seats[seat] = { name: nameOf(request.name), type: 'human' };
      }
      m.lastSeen = this.now();
      return this.snapshot(m, true);
    }
    handle(request) {
      if (!request || request.code !== this.code) throw fail('Room not found.', 404);
      if (request.op === 'join') return this.join(request);
      const m = this.member(request.token);
      m.lastSeen = this.now();
      switch (request.op) {
        case 'poll': break;
        case 'start':
        case 'rematch': {
          if (m.seat !== 0) throw fail('Only the host can start a round.', 403);
          if (this.game && this.game.status === 'playing') throw fail('Finish the current round first.', 409);
          this.seats = this.seats.map((s, i) => s.type === 'open' ? { name: 'AI ' + (i + 1), type: 'ai' } : s);
          const seed = crypto.getRandomValues(new Uint32Array(1))[0];
          this.game = this.engine.create(this.seats, this.rules, seed);
          // The original local engine embeds its shuffle seed in the game ID.
          // Online guests must not receive that ID, because it reveals the deal.
          this.game.id = randomHex(24);
          this.nextStep = this.now() + 1000;
          break;
        }
        case 'play':
          if (!this.game || this.game.id !== request.expectedGameId || this.game.moves !== request.expectedMoves) throw fail('The table changed. Check your hand and play again.', 409);
          this.game = this.engine.play(this.game, m.seat, request.card);
          this.nextStep = this.now() + (this.game.result ? 1600 : 900);
          break;
        case 'chat': {
          const text = typeof request.text === 'string' ? request.text.trim().slice(0, 180) : '';
          if (!text) throw fail('Enter a message.');
          if (m.lastChat && this.now() - m.lastChat < 700) throw fail('Please wait a moment before sending another message.');
          m.lastChat = this.now();
          this.chat.push({ id: randomHex(8), seat: m.seat, name: this.seats[m.seat].name, text, time: this.now() });
          this.chat = this.chat.slice(-60);
          break;
        }
        case 'replace': {
          if (m.seat !== 0) throw fail('Only the host can replace a disconnected player.', 403);
          const seat = request.seat;
          if (!Number.isInteger(seat) || seat <= 0 || seat >= this.seats.length) throw fail('Invalid seat.');
          const guest = this.members.find(p => p.seat === seat);
          if (guest && this.now() - guest.lastSeen < 30000) throw fail('This player is still connected. Wait 30 seconds after they disconnect.');
          this.members = this.members.filter(p => p.seat !== seat);
          this.seats[seat] = { name: this.seats[seat].name + ' (AI)', type: 'ai' };
          if (this.game) this.game.players[seat] = { ...this.game.players[seat], ...this.seats[seat] };
          break;
        }
        default: throw fail('Unknown room action.');
      }
      return this.snapshot(m);
    }
    tick() {
      if (!this.game || this.game.status !== 'playing' || this.now() < this.nextStep) return;
      if (this.game.result) this.game = this.engine.resolve(this.game);
      else if (this.game.players[this.game.currentPlayer].type === 'ai') {
        const choice = this.engine.ai(this.engine.view(this.game, this.game.currentPlayer), this.difficulty);
        this.game = this.engine.play(this.game, this.game.currentPlayer, choice.card.id);
      } else return;
      this.nextStep = this.now() + (this.game.result ? 1600 : 900);
    }
  }

  function createClient(engine, localRequest) {
    let socket = null, room = null, roomCode = '', timer = null, serial = 0;
    let connectionPromise = null;
    const pending = new Map();
    const clientTokens = new Map();
    const endpoint = () => `${location.protocol === 'https:' ? 'wss:' : 'ws:'}//${location.host}/ws`;
    let serviceCheck = null;

    async function ensureServer() {
      if (!serviceCheck) serviceCheck = (async () => {
        let response;
        try { response = await fetch('/health', { cache: 'no-store' }); }
        catch { throw fail('No multiplayer server is running at this website. Open the Render Web Service URL, not the old Static Site URL.'); }
        if (!response.ok || (await response.text()).trim() !== 'ok') {
          throw fail('No multiplayer server is running at this website. Open the Render Web Service URL, not the old Static Site URL.');
        }
      })();
      try { await serviceCheck; }
      catch (error) { serviceCheck = null; throw error; }
    }

    function clearPending(message) {
      for (const p of pending.values()) { clearTimeout(p.timer); p.reject(fail(message)); }
      pending.clear();
    }
    function leave() {
      clearInterval(timer); timer = null;
      clearPending('You left the room.');
      if (socket) socket.close();
      socket = room = null; roomCode = ''; connectionPromise = null;
      clientTokens.clear();
    }
    function onPacket(packet) {
      if (packet.type === 'response') {
        const p = pending.get(packet.id);
        if (!p) return;
        pending.delete(packet.id); clearTimeout(p.timer);
        if (packet.error) p.reject(fail(packet.error, packet.status));
        else p.resolve(packet.response);
      } else if (packet.type === 'request' && room) {
        const request = packet.request;
        const response = { type: 'response', id: packet.id, clientId: packet.clientId };
        try {
          if (!request || JSON.stringify(request).length > 2000) throw fail('Invalid request.');
          const token = clientTokens.get(packet.clientId);
          if (request.op === 'join') {
            if (token) throw fail('This connection already has a seat.', 403);
            if (request.token === room.members[0].token) throw fail('The host seat cannot be joined remotely.', 403);
          } else if (!token || token !== request.token) throw fail('Join this room first.', 403);
          response.response = room.handle(request);
          if (request.op === 'join') clientTokens.set(packet.clientId, response.response.token);
        } catch (error) {
          response.error = error.message;
          response.status = error.status || 400;
        }
        if (socket?.readyState === WebSocket.OPEN) socket.send(JSON.stringify(response));
      } else if (packet.type === 'client-left') clientTokens.delete(packet.clientId);
      else if (packet.type === 'host-left') {
        clearPending('The host disconnected. Ask them to keep the game page open.');
        if (socket) socket.close();
      }
    }
    function openSocket(type, code) {
      return new Promise((resolve, reject) => {
        const ws = new WebSocket(endpoint());
        socket = ws;
        const timeout = setTimeout(() => { ws.close(); reject(fail('Unable to reach the game server. Try again.')); }, 12000);
        let ready = false;
        ws.onopen = () => ws.send(JSON.stringify({ type, code }));
        ws.onmessage = event => {
          let packet;
          try { packet = JSON.parse(event.data); } catch { return; }
          if (!ready) {
            if (packet.type === 'ready') { ready = true; clearTimeout(timeout); resolve(ws); }
            else if (packet.type === 'error') { clearTimeout(timeout); ws.close(); reject(fail(packet.error, packet.status)); }
            return;
          }
          onPacket(packet);
        };
        ws.onerror = () => { if (!ready) { clearTimeout(timeout); reject(fail('Unable to reach the game server. Try again.')); } };
        ws.onclose = () => {
          clearTimeout(timeout);
          if (!ready) reject(fail('Connection closed. Try again.'));
          if (socket === ws) { socket = null; connectionPromise = null; clearPending('Disconnected from the room. Reconnecting…'); }
        };
      });
    }
    async function connectGuest(code, token) {
      if (socket?.readyState === WebSocket.OPEN && roomCode === code) return;
      if (connectionPromise) return connectionPromise;
      connectionPromise = (async () => {
        if (socket) socket.close();
        roomCode = code;
        await openSocket('join', code);
        if (token) await rpc({ op: 'join', code, token });
      })();
      try { await connectionPromise; } finally { connectionPromise = null; }
    }
    function rpc(request) {
      return new Promise((resolve, reject) => {
        if (socket?.readyState !== WebSocket.OPEN) return reject(fail('The room is disconnected.'));
        const id = String(++serial);
        const timer = setTimeout(() => { pending.delete(id); reject(fail('The host did not respond. Check your connection.')); }, 12000);
        pending.set(id, { resolve, reject, timer });
        socket.send(JSON.stringify({ type: 'request', id, request }));
      });
    }
    async function request(payload) {
      if (payload.op === 'stats' || payload.op === 'save') return localRequest(payload);
      if (payload.op === 'create') {
        leave();
        await ensureServer();
        const code = 'KZH-' + randomHex(3);
        room = new Room(engine, { ...payload, code }); roomCode = code;
        try { await openSocket('host', code); }
        catch (error) { leave(); throw error; }
        timer = setInterval(() => { if (room) try { room.tick(); } catch (error) { console.error('Room update failed:', error); } }, 200);
        return room.snapshot(room.members[0], true);
      }
      if (!validCode(payload.code)) throw fail('Enter a room code such as KZH-A1B2C3.');
      if (room && payload.code === room.code) return room.handle(payload);
      if (payload.op === 'join') {
        if (room) leave();
        await ensureServer();
        if (socket) { socket.close(); socket = null; connectionPromise = null; }
        await connectGuest(payload.code);
        return rpc(payload);
      }
      await connectGuest(payload.code, payload.token);
      return rpc(payload);
    }
    return { request, leave };
  }
  root.KazhuthaMultiplayer = { Room, createClient };
})(typeof window !== 'undefined' ? window : globalThis);
