# Render deployment repair — 3.0.2

The repository at commit 7a2ebc1 contains both an old WebSocket server.js and the new HTTP room backend server.mjs. The old server rejects non-GET requests with HTTP 405 and only supports /health; the new configuration uses /api/health. Existing Render dashboard settings may still select the older entry point or health path. The actual failed deploy log was not available, so the precise deployment failure remains unconfirmed.

This repair replaces server.js with a compatibility entry point that starts server.mjs, and makes both /health and /api/health return the same health response. No game UI, APK, rules or naming changes are included in this backend-only repair.

## Apply

1. Extract this ZIP and upload its contents into the repository root, replacing existing files (especially server.js and server.mjs). Do not upload the ZIP itself or nest everything inside another folder.
2. In the existing Render service settings use Node Web Service; repository root as Root Directory (blank); Build Command npm run build; Start Command npm start; Health Check Path /api/health; NODE_VERSION 22.
3. Deploy the latest commit. A root render.yaml does not establish what settings an independently configured dashboard service currently uses.
4. /api/health should return JSON with version 3.0.2 and protocol 3. Check room creation and joining from two devices.

The existing APK/HTML 3.0.1 can use this backend. Both node server.js and node server.mjs now start the same room API, and the old /health path remains compatible.

## Validation

The uploaded repository build passed locally. Both repaired startup commands passed subprocess integration tests covering both health paths, room creation and a second player joining the same room. This repair has not been pushed to GitHub or deployed to Render. If deployment still fails, supply the first error and following 20 lines from the failed Render deploy log, plus current build/start/health settings.
