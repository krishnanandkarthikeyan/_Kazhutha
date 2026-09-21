# Kazhutha 3.0.1 repair validation

## Changes

- Restored the original supplied CSS exactly, including its responsive rules. Removed the 3.0.0 setup grid redesign and changed main-screen scaling back to the original CSS zoom implementation.
- Dialogs render in the viewport independently of the scaled game. Their measured width/height determine pixel coordinates and a uniform scale. Individual CSS translation/scale and animations are reset to avoid conflicting transforms. Resize, content changes, font loading and the keyboard trigger recalculation. Missing safe-area values default to zero.
- Invalid or expired saved room sessions return to room setup instead of reconnecting indefinitely. Temporary network errors retain the session.
- Non-JSON server errors show their HTTP status; connection failures and timeouts have distinct messages.

## Passed in this repair

- Exact comparison: original base CSS preserved byte-for-byte.
- Eight Node tests: six engine/server groups plus centering across five viewport/content combinations and HTTP 405 error handling.
- Two isolated frontend DOM clients against the bundled HTTP backend: required names, create/join/start, separate hands, reload resume, offline recovery, exit, host transfer and expired-session recovery. No unexpected JavaScript errors. Canvas/audio APIs are mocked; this does not validate rendered graphics.
- Android compilation and v2/v3 signature verification; version code 31 / version 3.0.1. Bundled HTML equals downloadable HTML.

## Still unverified or blocked

- Render deployment has not been performed; account/repository deployment access is unavailable. Opening the HTML or installing the APK does not update the server.
- A live room-creation probe received HTTP 405. A follow-up request was prevented by automatic approval review because the session reached a usage limit. The exact cause of the live rejection is not confirmed.
- No rendered-browser, emulator or physical-phone visual verification of this repair. Local browser launch and cloud local-file navigation were previously blocked. Centering tests validate calculations, not browser layout or touch readability.

## Deploy and check

Deploy the package contents to the existing Render Node Web Service using build command `npm run build` and start command `npm start`. The health URL `/api/health` should return JSON with version `3.0.1` and protocol `3`, not an HTML page. If it is configured as a static site, the POST room API cannot run there.

On two devices, create and join a room, check names and separate hands, play a turn, temporarily disconnect/reconnect, and exit. Inspect Play with friends, Settings and Rules on a landscape phone, including with the keyboard open. See README.md for persistence and single-instance requirements.
