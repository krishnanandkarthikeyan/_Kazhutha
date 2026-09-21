(()=>{
 let frame=0;
 const safe=document.createElement('div');safe.style.cssText='position:fixed;visibility:hidden;padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);';document.body.append(safe);
 function fit(){cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{
   const vv=visualViewport,cs=getComputedStyle(safe),left=parseFloat(cs.paddingLeft)||0,top=parseFloat(cs.paddingTop)||0;
   const w=Math.max(1,(vv?.width||innerWidth)-left-(parseFloat(cs.paddingRight)||0)),h=Math.max(1,(vv?.height||innerHeight)-top-(parseFloat(cs.paddingBottom)||0));
   const scale=Math.min(1,w/1180,h/760),app=document.querySelector('.game-app');
   document.documentElement.style.setProperty('--logical-width',w/scale+'px');document.documentElement.style.setProperty('--logical-height',h/scale+'px');
   if(app){Object.assign(app.style,{zoom:'1',width:w/scale+'px',height:h/scale+'px',minWidth:'0',minHeight:'0',left:left+'px',top:top+'px',transform:`scale(${scale})`});}
   document.querySelectorAll('.game-dialog').forEach(d=>{
     const targetW=d.dataset.kind==='setup'?690:590;
     const scaleW=Math.min(1,(w-24)/targetW);
     d.style.setProperty('--content-height',Math.max(100,(h-32)/scaleW-150)+'px');
     d.style.setProperty('--dialog-scale','1');
     const sh=d.offsetHeight;
     const ds=Math.min(scaleW,(h-24)/sh);
     d.style.setProperty('--dialog-scale',String(ds));
     d.style.setProperty('--dialog-x',(left+(vv?.offsetLeft||0)+w/2)+'px');
     d.style.setProperty('--dialog-y',(top+(vv?.offsetTop||0)+h/2)+'px');
   });
 });}
 new MutationObserver(fit).observe(document.body,{childList:true,subtree:true});
 addEventListener('resize',fit);visualViewport?.addEventListener('resize',fit);visualViewport?.addEventListener('scroll',fit);addEventListener('orientationchange',fit);
 document.addEventListener('dragstart',e=>{if(e.target.tagName==='IMG')e.preventDefault();});
 fit();window.__fitKazhuthaToScreen=fit;
})();
