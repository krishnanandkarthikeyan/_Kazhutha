import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
const read=name=>readFile(new URL('./src/'+name,import.meta.url),'utf8');
let html=await read('template.html');
const engine=(await read('engine.js')).replace(/export \{[^}]+\};/g,'');
const ai=(await read('ai.js')).replace(/^import .+;$/m,'').replaceAll('export function','function');
const aliases='const {create,legal,play,resolve,view,classic,trump,deck,winner,random}={create:R2,legal:ah,play:Tb,resolve:I2,view:Eb,classic:Lc,trump:wb,deck:Lb,winner:Ex,random:Ab};';
const engineBundle='(()=>{'+engine+aliases+ai+';globalThis.KazhuthaEngine={create,legal,play,resolve,view,classic,trump,deck,winner,random,ai,infer};})();';
for(const [marker,content] of Object.entries({ENGINE:engineBundle,NETWORK:await read('network.js'),UI:await read('ui.js'),SCENE:await read('scene.js'),CSS:await read('layout.css'),LAYOUT:await read('layout.js')})){
 const key='/*__KAZHUTHA_'+marker+'__*/';if(!html.includes(key))throw Error('Missing '+key);html=html.replace(key,()=>content);
}
if(/ChatGPT|signin-with|sign in again/i.test(html))throw Error('Obsolete sign-in text remains');
await mkdir(new URL('./dist/icons/',import.meta.url),{recursive:true});
await writeFile(new URL('./dist/index.html',import.meta.url),html);
for(const file of ['sw.js','manifest.webmanifest'])await copyFile(new URL('./public/'+file,import.meta.url),new URL('./dist/'+file,import.meta.url));
for(const size of [192,512])await copyFile(new URL('./public/icons/kazhutha-'+size+'.png',import.meta.url),new URL('./dist/icons/kazhutha-'+size+'.png',import.meta.url));
console.log('Built Kazhutha 3.0: shared desktop and Android HTML');
