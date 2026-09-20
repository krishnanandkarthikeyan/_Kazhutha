import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';

const sourcePath = new URL('./Kazhutha.html', import.meta.url);
const outputDir = new URL('./dist/', import.meta.url);
const outputHtml = new URL('./dist/index.html', import.meta.url);
let html = await readFile(sourcePath, 'utf8');

function replaceRequired(search, replacement, description) {
  if (!html.includes(search)) throw new Error(`Build patch failed: ${description}`);
  html = html.replace(search, replacement);
}

replaceRequired('<title>Kazhutha · കഴുത — Downloaded edition</title>','<title>Kazhutha · കഴുത</title>','title');

// Opening rule: Ace of Spades decides who opens, but that player may choose ANY card.
replaceRequired(
  'if(t.opening&&t.rules.aceStart)return n.filter(a=>a.id==="S14");',
  'if(t.opening&&t.rules.aceStart)return n.some(a=>a.id==="S14")?n:[];',
  'Ace of Spades opening privilege'
);
replaceRequired(
  'lastEvent:{type:"start",text:"The Ace of Spades opens the table."}',
  'lastEvent:{type:"start",text:"The Ace of Spades holder opens the table and may play any card."}',
  'opening event text'
);

// First round: off-suit is allowed when void, but it is NOT a Vettu and cannot end/collect the trick.
replaceRequired(
  'let a=structuredClone(t),i=a.hands[e],r=i.splice(i.findIndex(o=>o.id===n),1)[0],s=!!a.leadSuit&&r.suit!==a.leadSuit;if(s&&(a.voids[e].includes(a.leadSuit)||a.voids[e].push(a.leadSuit),a.rules.firstTrump&&!a.trumpSuit&&(a.trumpSuit=r.suit),a.vettuCounts[e]++),',
  'let a=structuredClone(t),i=a.hands[e],r=i.splice(i.findIndex(o=>o.id===n),1)[0],s=!!a.leadSuit&&r.suit!==a.leadSuit,u=s&&a.round>1;if(s&&(a.voids[e].includes(a.leadSuit)||a.voids[e].push(a.leadSuit)),u&&(a.rules.firstTrump&&!a.trumpSuit&&(a.trumpSuit=r.suit),a.vettuCounts[e]++),',
  'first-round Vettu detection'
);
replaceRequired(
  'a.trick.push({player:e,card:r,cut:s}),a.history.push({player:e,card:r,cut:s,round:a.round}),a.moves++,a.playedCounts[e]++,a.lastEvent={type:s?"vettu":"play",player:e,text:s?`${a.players[e].name} plays Vettu!`:`${a.players[e].name} plays ${nh(r)}`},s&&a.rules.cutEnds||a.trick.length===a.activePlayers.length)',
  'a.trick.push({player:e,card:r,cut:u}),a.history.push({player:e,card:r,cut:u,round:a.round}),a.moves++,a.playedCounts[e]++,a.lastEvent={type:u?"vettu":"play",player:e,text:u?`${a.players[e].name} plays Vettu!`:`${a.players[e].name} plays ${nh(r)}`},u&&a.rules.cutEnds||a.trick.length===a.activePlayers.length)',
  'first-round Vettu resolution'
);

// Written English rules.
html = html.replace(
  '"The whole 52-card deck is dealt clockwise. A♠ leads the first trick."',
  '"The whole 52-card deck is dealt clockwise. The player holding A♠ opens the first trick and may choose any card from their hand."'
);
html = html.replace(
  '"Play any other suit. The trick immediately stops: the player with the highest card of the original suit collects the whole pile, including the cut card. They lead next."',
  '"Vettu is not allowed in the first round. From round 2 onward, if you cannot follow the led suit, you may play another suit; that off-suit play is Vettu and the normal collection rule applies."'
);

// Hosted app uses the authoritative /api/game backend already present in the bundle.
replaceRequired(
  'function Ub({standalone:t=!1}){let e=t?D2:O2,',
  'function Ub({standalone:t=!1}){let e=O2,',
  'hosted request handler'
);
replaceRequired(
  '(0,C.jsx)(Pb,{language:a}),(0,C.jsx)("a",{className:"download-html-button",href:"/downloads/Kazhutha.html",download:"Kazhutha.html",children:"Download HTML \\u2193"})',
  'null',
  'download-only menu items'
);
html = html.replace('Friends sign in with ChatGPT to use online rooms. The game is free of real-money betting.','The game is free of real-money betting.');
html = html.replace('Each friend opens the invite link on their own device, enters a name, and joins. Friends sign in with ChatGPT, then join using your room code.','Each friend opens the invite link on their own device, enters a name, and joins.');
html = html.replace('Anyone can open the game link. Sign in with ChatGPT to join this room; the invite does not include anyone’s private hand or session.','Anyone with the room code can open the game link and join an available seat; the invite does not include anyone’s private hand or reconnect token.');
replaceRequired(
  '}var k2=pe(Pt(),1);(0,F2.createRoot)(document.getElementById("root")).render((0,k2.jsx)(Ub,{standalone:!0}));})();',
  '}var k2=pe(Pt(),1);(0,F2.createRoot)(document.getElementById("root")).render((0,k2.jsx)(Ub,{standalone:!1}));})();',
  'hosted startup'
);

const appCss = `
/* Production app shell: preserve the desktop composition and scale it rather than redesigning it. */
html,body,#root{width:100%;height:100%;min-height:100%;margin:0;overflow:hidden;overscroll-behavior:none;background:#102d27;}
html{-webkit-text-size-adjust:100%;touch-action:manipulation;}
body{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;}
img,svg{ -webkit-user-drag:none; user-drag:none; }
button,.playing-card,[role="button"]{touch-action:manipulation;}
.game-app{width:100vw;height:100dvh;max-width:none!important;overflow:hidden!important;padding-left:env(safe-area-inset-left);padding-right:env(safe-area-inset-right);padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom);}
.room-connection{max-width:calc(100vw - 24px);}
.playing-card{min-width:42px;min-height:58px;}
@media (max-width:900px),(max-height:560px){
  .game-app{font-size:clamp(10px,1.45vw,14px);}
  .playing-screen{transform-origin:50% 50%;}
  .playing-card{min-width:36px;min-height:50px;}
  .game-dialog{max-height:calc(100dvh - 20px)!important;overflow:auto!important;}
  .room-connection{font-size:11px;}
}
@media (orientation:portrait) and (max-width:900px){
  .game-app:before{content:"Rotate your phone for the full table";position:fixed;z-index:99999;inset:0;display:grid;place-items:center;background:#102d27;color:#f2dfad;font:600 18px/1.35 system-ui;text-align:center;padding:32px;}
}
@media (prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}}
`;
replaceRequired('</style></head>',`${appCss}</style><link rel="manifest" href="/manifest.webmanifest"><link rel="apple-touch-icon" href="/icon.svg"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-capable" content="yes"><script>if('serviceWorker' in navigator){addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}))}</script></head>`,'PWA/app styles');

await mkdir(outputDir,{recursive:true});
await writeFile(outputHtml,html);
await Promise.all([
  copyFile(new URL('./manifest.webmanifest',import.meta.url),new URL('./dist/manifest.webmanifest',import.meta.url)),
  copyFile(new URL('./icon.svg',import.meta.url),new URL('./dist/icon.svg',import.meta.url)),
  copyFile(new URL('./sw.js',import.meta.url),new URL('./dist/sw.js',import.meta.url)),
]);
console.log('Kazhutha production build created in dist/');
