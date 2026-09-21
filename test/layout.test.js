import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const source=readFileSync(new URL('../src/layout.js',import.meta.url),'utf8');
test('dialog remains centered and within visible bounds through resizing, keyboard and content growth',()=>{
 const style=()=>({setProperty(k,v){this[k]=v}});
 const root={style:style()},app={style:style()},dialog={style:style(),offsetWidth:660,offsetHeight:680,isConnected:true};
 let pending;const vv={width:1440,height:900,offsetLeft:0,offsetTop:0,addEventListener(){}};
 const window={visualViewport:vv};
 const document={body:{append(){}},documentElement:root,createElement:()=>({style:{}}),querySelector:()=>app,querySelectorAll:()=>[dialog]};
 runInNewContext(source,{window,document,innerWidth:1440,innerHeight:900,getComputedStyle:()=>({}),cancelAnimationFrame(){},requestAnimationFrame(fn){pending=fn;return 1},addEventListener(){},MutationObserver:class{observe(){}},ResizeObserver:class{observe(){}unobserve(){}}});
 for(const [w,h,offsetLeft,offsetTop,dh] of [[1440,900,0,0,680],[844,390,0,0,680],[390,844,0,0,680],[844,180,0,210,900],[1024,768,40,25,1200]]){
   Object.assign(vv,{width:w,height:h,offsetLeft,offsetTop});dialog.offsetHeight=dh;
   window.__fitKazhuthaToScreen();pending();
   const s=Number(dialog.style['--dialog-scale']),x=parseFloat(dialog.style['--dialog-left']),y=parseFloat(dialog.style['--dialog-top']);
   assert(Number.isFinite(s)&&s>0&&s<=1);
   assert(Math.abs(x+660*s/2-(offsetLeft+w/2))<1e-8);
   assert(Math.abs(y+dh*s/2-(offsetTop+h/2))<1e-8);
   assert(x>=offsetLeft+11.99&&y>=offsetTop+11.99);
   assert(x+660*s<=offsetLeft+w-11.99&&y+dh*s<=offsetTop+h-11.99);
   assert.equal(dialog.style['--dialog-visible'],'visible');
   assert.equal(Number(app.style.zoom),Math.min(1,w/1180,h/760));
 }
});
test('non-JSON HTTP failures keep diagnostic status without invalidating a room session',async()=>{
 const window={},store=new Map();
 runInNewContext(readFileSync(new URL('../src/network.js',import.meta.url),'utf8'),{window,localStorage:{getItem:k=>store.get(k),setItem:(k,v)=>store.set(k,v)},crypto:globalThis.crypto,AbortController,fetch:async()=>({status:405,headers:new Headers(),ok:false}),setTimeout,clearTimeout,setInterval(){},addEventListener(){}});
 await assert.rejects(window.KazhuthaNetwork.request({op:'poll'}),e=>e.status===502&&e.httpStatus===405&&e.message.includes('HTTP 405'));
});
