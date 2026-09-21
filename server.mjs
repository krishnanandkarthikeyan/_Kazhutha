import http from 'node:http';
import {readFileSync,writeFileSync,renameSync,mkdirSync,existsSync} from 'node:fs';
import {join,resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {RoomService,fail} from './src/rooms.js';
export function createApp({dataDir=null}={}){
  const service=new RoomService(),root=join(dirname(fileURLToPath(import.meta.url)),'dist');
  const stateFile=dataDir?join(dataDir,'rooms.json'):null;
  if(stateFile){mkdirSync(dataDir,{recursive:true});if(existsSync(stateFile))service.restore(readFileSync(stateFile,'utf8'));}
  let lastSave=0;
  const save=()=>{if(stateFile){writeFileSync(stateFile+'.tmp',service.serialize(),{mode:0o600});renameSync(stateFile+'.tmp',stateFile);lastSave=Date.now();}};
  const rates=new Map();
  const server=http.createServer(async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');res.setHeader('Access-Control-Allow-Headers','Content-Type');res.setHeader('Access-Control-Allow-Methods','GET,HEAD,POST,OPTIONS');
    res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');
    const json=(status,body)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(body));};
    if(req.method==='OPTIONS'){res.writeHead(204);res.end();return;}
    const path=new URL(req.url,'http://localhost').pathname;
    if(path==='/api/health'){json(200,{ok:true,version:'3.0.1',protocol:3});return;}
    if(path==='/api/game'){
      if(req.method!=='POST'){json(405,{error:'Use POST.'});return;}
      try{
        let body='';for await(const part of req){body+=part;if(Buffer.byteLength(body)>8192)throw fail('Request too large.',413);}
        let r;try{r=JSON.parse(body)}catch{throw fail('Invalid JSON.')}
        // Per seat for play/poll; per address for unauthenticated allocation.
        const key=r.token||req.socket.remoteAddress, now=Date.now();
        let rate=rates.get(key);if(!rate||now-rate.at>60000){rate={at:now,n:0};rates.set(key,rate);}
        if(++rate.n>180)throw fail('Too many requests. Please wait.',429);
        const out=service.request(r);
        if(r.op!=='poll'||now-lastSave>10000)save();json(200,out);
      }catch(e){json(e.status||400,{error:e.message});}return;
    }
    if(path.startsWith('/api/')){json(404,{error:'API endpoint not found.'});return;}
    if(!['GET','HEAD'].includes(req.method)){json(405,{error:'Method not allowed.'});return;}
    const files={'/':'index.html','/index.html':'index.html','/Kazhutha.html':'index.html','/sw.js':'sw.js','/manifest.webmanifest':'manifest.webmanifest','/icons/kazhutha-192.png':'icons/kazhutha-192.png','/icons/kazhutha-512.png':'icons/kazhutha-512.png'};
    const file=files[path];if(!file){json(404,{error:'Not found.'});return;}
    try{const data=readFileSync(join(root,file)),type=file.endsWith('.html')?'text/html':file.endsWith('.js')?'text/javascript':file.endsWith('.png')?'image/png':'application/manifest+json';res.writeHead(200,{'Content-Type':type,'Cache-Control':'no-cache'});res.end(req.method==='HEAD'?undefined:data);}catch{json(503,{error:'Run npm run build before starting the server.'});}
  });
  const timer=setInterval(()=>{try{if(service.tick())save();for(const [key,v] of rates)if(Date.now()-v.at>60000)rates.delete(key);}catch(e){console.error('Room tick failed:',e.message)}},200);timer.unref();
  server.on('close',()=>{clearInterval(timer);save();});return {server,service};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const {server}=createApp({dataDir:process.env.DATA_DIR||'./data'});server.listen(Number(process.env.PORT)||3000,'0.0.0.0',()=>console.log('Kazhutha 3.0 listening'));
  for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(()=>process.exit(0)));
}
