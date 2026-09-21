/* All online actions go to the same Render endpoint from HTML and Android. */
(()=>{
 const BASE='https://kazhutha-online.onrender.com';
 const inflight=new Map(), remembered=new Map();
 const get=(k)=>{try{return JSON.parse(localStorage.getItem(k)||'null')}catch{return null}};
 const set=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}};
 const uuid=()=>crypto.randomUUID?crypto.randomUUID():Array.from(crypto.getRandomValues(new Uint8Array(24)),x=>x.toString(16).padStart(2,'0')).join('');
 async function send(payload){
   const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),45000);
   try{
     const response=await fetch(BASE+'/api/game',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'omit',cache:'no-store',signal:controller.signal,body:JSON.stringify(payload)});
     if(!response.headers.get('content-type')?.includes('application/json'))throw Object.assign(Error('The online room service is unavailable (HTTP '+response.status+'). Please try again later.'),{status:502,httpStatus:response.status});
     const out=await response.json();if(!response.ok)throw Object.assign(Error(out.error||'Unable to connect to the game server.'),{status:response.status});return out;
   }catch(e){if(e.status)throw e;throw Object.assign(Error(e.name==='AbortError'?'The game server took too long to respond. Tap Retry.':'Unable to reach the game server. Check your internet connection, then tap Retry.'),{status:0});}
   finally{clearTimeout(timer);}
 }
 function request(payload){
   const key=JSON.stringify(payload);
   if(inflight.has(key))return inflight.get(key);
   let id=remembered.get(key);
   if(payload.op!=='poll'&&!id){
     const saved=get('kazhutha-pending-action');id=saved?.key===key?saved.id:uuid();remembered.set(key,id);set('kazhutha-pending-action',{key,id});
   }
   const p=send({...payload,...(id?{requestId:id}:{})}).then(out=>{
     remembered.delete(key);if(get('kazhutha-pending-action')?.key===key)set('kazhutha-pending-action',null);
     return out;
   }).catch(e=>{if(e.status>=400&&e.status<500){remembered.delete(key);if(get('kazhutha-pending-action')?.key===key)set('kazhutha-pending-action',null);}throw e;}).finally(()=>inflight.delete(key));
   inflight.set(key,p);return p;
 }
 async function flushLeaves(){
   for(const pending of get('kazhutha-pending-leaves')||[])try{
     await send(pending);
     set('kazhutha-pending-leaves',(get('kazhutha-pending-leaves')||[]).filter(p=>p.requestId!==pending.requestId));
   }catch(e){if([403,404].includes(e.status))set('kazhutha-pending-leaves',(get('kazhutha-pending-leaves')||[]).filter(p=>p.requestId!==pending.requestId));}
 }
 function leave(session){
   if(!session)return Promise.resolve();
   const pending={op:'leave',code:session.code,token:session.token,requestId:uuid()};
   set('kazhutha-pending-leaves',[...(get('kazhutha-pending-leaves')||[]).filter(x=>x.token!==session.token),pending]);
   return flushLeaves();
 }
 window.KazhuthaNetwork={request,leave,base:BASE};
 addEventListener('online',flushLeaves);setTimeout(flushLeaves,0);setInterval(flushLeaves,15000);
})();
