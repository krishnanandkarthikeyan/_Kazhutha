# Kazhutha 3.0.1

This is the updated Node backend and the existing game's HTML renderer. The original room graphics, cards and icon are retained. All clients use https://kazhutha-online.onrender.com/api/game.

## Run

Use Node 22 or later:

```
npm install
npm run build
npm test
npm run test:ui
npm start
```

The server listens on PORT (3000 by default). `/api/health` reports protocol 3 and version 3.0.1. The deployable HTML is `dist/index.html`; `Kazhutha.html` is an identical downloadable copy.

## Update the existing Render service

Upload/commit this package's contents to the repository linked to the existing `kazhutha-online.onrender.com` service. Use a **Node Web Service**, build command `npm run build`, start command `npm start`, and health check `/api/health`. Keep the existing hostname. This package has not been deployed from this session.

The app points to the public Render URL even when its HTML is opened locally. Merely opening the new HTML does not update the live game rules on the old backend. Deploy the backend and use the new HTML/APK together.

Run one server instance. Active rooms are saved atomically to DATA_DIR (default `./data`). On a Render service with ephemeral storage, a redeploy or instance replacement can erase rooms. To retain rooms across these events, use an existing persistent disk and set DATA_DIR to its mount path, such as `/var/data/kazhutha`. A persistent disk may require a paid Render plan; this package does not provision one. Multiple replicas would require a shared transactional store and are not supported by this version.

## Behavior

- The server owns the deal, turn, trick result, AI actions and game completion. Snapshots contain only the requesting player's hand plus public knowledge.
- A random private token restores the same seat on temporary disconnection. Browser reloads resume the saved session. Rooms expire after 24 hours without requests. A disconnected player retains their seat; the host may replace them after 30 seconds.
- Exit removes the member and invalidates their token. In the lobby their seat opens. During a game, a clearly labelled AI takes over the cards so the remaining game stays valid. If the host leaves, host controls transfer to the next member.
- If Exit occurs while offline, the client records a pending leave and retries when it can connect. The server cannot learn about an offline exit immediately; it receives the leave when this app reconnects. If the app never reconnects, the host can replace the disconnected seat or the room eventually expires.
- Request IDs prevent repeated create/join/start/play/leave operations. A move must match the game ID and move count. Human names must be entered explicitly.
- The Ace of Spades holder opens with any card. There is no Vettu in round 1, in either ruleset. A void player discards any card and the trick continues. Vettu begins in round 2.
- Hard/Expert AI tracks public history, collected cards, void suits and counts, samples possible hands, considers observed rank tendencies, and evaluates two tricks. Samples are hypothetical, never the actual private deal. Easy uses mostly random legal choices; Medium uses immediate position and recent observations. This is a heuristic AI, not a proven optimal player.
- Results are stored locally per device, without an account. Existing non-betting finish-order rules are preserved.

## Editing and tests

Readable source is in `src/`: `engine.js`, `ai.js`, `rooms.js`, `network.js`, `ui.js`, `scene.js`, `layout.js`, and `layout.css`. `template.html` retains the supplied vendor/React/Three.js bundle and embedded assets. `build.mjs` assembles one HTML. Copy the rebuilt `dist/index.html` to the Android `app/src/main/assets/index.html` before compiling Android.

`test/engine.test.js` tests rules, state conservation, fair AI, idempotency, reconnects, exit and persistence. `test/frontend.cjs` exercises two isolated DOM clients through the actual HTTP endpoint, including name validation, room flow, reload, disconnection and exit. It substitutes canvas/audio APIs and is **not a rendered-browser or physical-device test**.

See `VALIDATION.md` for checks performed and remaining limitations.
