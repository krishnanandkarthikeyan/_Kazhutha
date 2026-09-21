import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createServer} from 'node:net';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
const cwd=fileURLToPath(new URL('..',import.meta.url));
for(const entry of ['server.js','server.mjs'])test(entry+' serves both health paths and the same room API',{timeout:15000},async()=>{
 const reservation=createServer();await new Promise(r=>reservation.listen(0,'127.0.0.1',r));
 const port=reservation.address().port;await new Promise(r=>reservation.close(r));
 const data=await mkdtemp(join(tmpdir(),'kazhutha-start-'));
 const child=spawn(process.execPath,[entry],{cwd,env:{...process.env,PORT:String(port),DATA_DIR:data},stdio:['ignore','pipe','pipe']});
 let errors='';child.stderr.on('data',d=>errors+=d);
 try{
  await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Startup timed out: '+errors)),7000);child.stdout.on('data',d=>{if(d.toString().includes('listening')){clearTimeout(timer);resolve();}});child.once('error',reject);child.once('exit',code=>{clearTimeout(timer);reject(Error('Exited '+code+': '+errors));});});
  const base='http://127.0.0.1:'+port;
  for(const path of ['/health','/api/health']){const r=await fetch(base+path);assert.equal(r.status,200);assert.equal((await r.json()).version,'3.0.2');}
  const request=async body=>{const r=await fetch(base+'/api/game',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});assert.equal(r.status,200);return r.json();};
  const host=await request({op:'create',name:'Host',count:2,requestId:'startup-host'});
  const guest=await request({op:'join',name:'Guest',code:host.code,requestId:'startup-guest'});
  assert.equal(guest.code,host.code);assert.notEqual(guest.seat,host.seat);
 }finally{child.kill('SIGTERM');await new Promise(r=>{if(child.exitCode!==null)return r();child.once('exit',r);});await rm(data,{recursive:true,force:true});}
});
