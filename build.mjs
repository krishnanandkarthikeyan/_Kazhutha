import { readFile, writeFile } from "node:fs/promises";

const sourcePath = new URL("./Kazhutha.html", import.meta.url);
const outputHtml = new URL("./index.html", import.meta.url);

let html = await readFile(sourcePath, "utf8");
const multiplayerCode = await readFile(new URL("./multiplayer.js", import.meta.url), "utf8");
if (/<\/script/i.test(multiplayerCode)) throw new Error("Multiplayer source contains an unsafe closing script tag.");
const onlineURL = (process.env.KAZHUTHA_ONLINE_URL || "").trim().replace(/\/$/, "");
if (onlineURL && !/^https:\/\/[^/]+$/i.test(onlineURL)) {
  throw new Error("KAZHUTHA_ONLINE_URL must be an HTTPS origin without a path.");
}

function replaceRequired(search, replacement, description) {
  if (!html.includes(search)) {
    throw new Error(`Could not prepare the hosted build: ${description} was not found.`);
  }
  html = html.replace(search, replacement);
}

function replaceAllRequired(search, replacement, expected, description) {
  const occurrences = html.split(search).length - 1;
  if (occurrences !== expected) throw new Error(`Could not prepare the hosted build: expected ${expected} ${description}, found ${occurrences}.`);
  html = html.split(search).join(replacement);
}

// Seats belong to browser tabs. Shared localStorage made an invite opened in a
// second tab reuse the host token and attempt to claim the host seat remotely.
replaceAllRequired('xl.get("kazhutha-room")', 'KazhuthaRoomStorage.get()', 2, 'saved-room reads');
replaceAllRequired('xl.set("kazhutha-room",JSON.stringify(He))', 'KazhuthaRoomStorage.set(JSON.stringify(He))', 1, 'saved-room writes');
replaceRequired(
  'Me?.code===Ge.trim().toUpperCase()?{token:Me.token}:{}',
  'Me?.code===Ge.trim().toUpperCase()&&Me.seat>0?{token:Me.token}:{}',
  'guest-only seat restoration',
);

replaceRequired(
  "<title>Kazhutha · കഴുത — Downloaded edition</title>",
  "<title>Kazhutha · കഴുത</title>",
  "the downloadable page title",
);

replaceRequired(
  "</style></head>",
  `</style><script>globalThis.__KAZHUTHA_ONLINE_URL__=${JSON.stringify(onlineURL)};</script><script>${multiplayerCode}</script></head>`,
  "the closing page styles",
);

replaceRequired(
  "function Ub({standalone:t=!1}){let e=t?D2:O2,",
  "function Ub({standalone:t=!1}){let e=KazhuthaRoomClient.request,",
  "the downloaded-only request handler",
);

replaceRequired(
  '(0,C.jsx)(Pb,{language:a}),(0,C.jsx)("a",{className:"download-html-button",href:"/downloads/Kazhutha.html",download:"Kazhutha.html",children:"Download HTML \\u2193"})',
  "null",
  "the Install app and Download HTML menu options",
);

replaceRequired(
  "Friends sign in with ChatGPT to use online rooms. The game is free of real-money betting.",
  "The game is free of real-money betting.",
  "the sign-in note in the install information",
);

replaceRequired(
  "Each friend opens the invite link on their own device, enters a name, and joins. Friends sign in with ChatGPT, then join using your room code.",
  "Each friend opens the invite link on their own device, enters a name, and joins.",
  "the ChatGPT sign-in sentence in the room lobby",
);

replaceRequired(
  "Install the app before joining so your room seat stays on the same device. Online rooms require ChatGPT sign-in. Rooms expire after 24 hours of inactivity.",
  "Open this website on each player's device. The host must keep their page open while friends play.",
  "the outdated online room instructions",
);

replaceRequired(
  '}var k2=pe(Pt(),1);(0,F2.createRoot)(document.getElementById("root")).render((0,k2.jsx)(Ub,{standalone:!0}));})();',
  '}var KazhuthaRoomStorage={get:()=>{try{return sessionStorage.getItem("kazhutha-room")}catch{return null}},set:value=>{try{sessionStorage.setItem("kazhutha-room",value)}catch{}}};var KazhuthaRoomClient=window.KazhuthaMultiplayer.createClient({create:R2,play:Tb,resolve:I2,view:Eb,legal:ah,classic:Lc,trump:wb,ai:Rx},D2);var k2=pe(Pt(),1);(0,F2.createRoot)(document.getElementById("root")).render((0,k2.jsx)(Ub,{standalone:!1}));})();',
  "the standalone application startup",
);

await writeFile(outputHtml, html);

console.log("Kazhutha hosted build created as index.html");
