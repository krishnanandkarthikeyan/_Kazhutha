(()=>{
 let frame=0;
 const safe=document.createElement('div');
 safe.style.cssText='position:fixed;visibility:hidden;pointer-events:none;padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);';
 document.body.append(safe);
 const observed=new Set();
 const resize=typeof ResizeObserver==='function'?new ResizeObserver(fit):null;
 function fit(){cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{
   const vv=window.visualViewport,cs=getComputedStyle(safe),inset=n=>Number.parseFloat(cs[n])||0;
   const w=Math.max(1,(vv?.width||innerWidth)-inset('paddingLeft')-inset('paddingRight'));
   const h=Math.max(1,(vv?.height||innerHeight)-inset('paddingTop')-inset('paddingBottom'));
   const left=(vv?.offsetLeft||0)+inset('paddingLeft'),top=(vv?.offsetTop||0)+inset('paddingTop');
   const scale=Math.min(1,w/1180,h/760),app=document.querySelector('.game-app');
   if(app)for(const [key,value] of Object.entries({zoom:String(scale),width:w/scale+'px',height:h/scale+'px','min-width':w/scale+'px','min-height':h/scale+'px','max-width':'none','max-height':'none',margin:'0'}))app.style.setProperty(key,value,'important');
   const root=document.documentElement.style;
   root.setProperty('--kazhutha-screen-scale',String(scale));root.setProperty('--kazhutha-logical-width',w/scale+'px');root.setProperty('--kazhutha-logical-height',h/scale+'px');
   for(const d of observed)if(!d.isConnected){resize?.unobserve(d);observed.delete(d);}
   document.querySelectorAll('.game-dialog').forEach(d=>{
     if(!observed.has(d)){observed.add(d);resize?.observe(d);}
     const dw=d.offsetWidth,dh=d.offsetHeight;if(!dw||!dh)return;
     const ds=Math.min(1,Math.max(1,w-24)/dw,Math.max(1,h-24)/dh);
     d.style.setProperty('--dialog-left',left+(w-dw*ds)/2+'px');
     d.style.setProperty('--dialog-top',top+(h-dh*ds)/2+'px');
     d.style.setProperty('--dialog-scale',String(ds));d.style.setProperty('--dialog-visible','visible');
   });
 });}
 new MutationObserver(fit).observe(document.body,{childList:true,subtree:true,characterData:true});
 addEventListener('resize',fit);addEventListener('orientationchange',fit);
 window.visualViewport?.addEventListener('resize',fit);window.visualViewport?.addEventListener('scroll',fit);
 document.fonts?.ready.then(fit);fit();window.__fitKazhuthaToScreen=fit;
})();
