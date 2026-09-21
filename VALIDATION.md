# Validation — Kazhutha 3.0.0

## Passed

- JavaScript syntax checks and HTML assembly.
- Six engine/server test groups: Ace holder free choice; first-round Vettu suppression in Classic and Trump modes; required names; redacted views; legal AI moves through complete games; 52-card conservation; valid known-card/void deductions; idempotent create/join/start/play; reconnect; intentional exit and host transfer; state serialization; void inference after collecting a pile.
- Isolated frontend DOM integration against the new HTTP server: two clients, blank-name rejection, create, join, game start, individual hand controls, Exit confirmation, server leave and host transfer. Tests also cover reload resume and temporary disconnection.
- HTTP contract checks against the updated local server: blank name returns 400; create/join/start produces a shared 26/26 deal; leaving transfers host controls.
- Live Render API check with two disposable test players: create, join, start, matching game IDs/card counts, correct names and same-seat token polling. Test players were sent leave requests afterward.
- Android Java/resource compilation; APK signature verification (v2/v3); version code 30 / version name 3.0.0; API 24 minimum / target 35; original icons; landscape manifest; APK HTML matches downloadable HTML exactly.

## Not yet verified / not performed

- The new backend has **not been deployed** to Render. The live API did not expose the new protocol's revision field during the check; a successful live connection does not prove that the new server rules are deployed.
- Rendered visual QA of the edited files is incomplete: local Chrome was blocked by environment socket restrictions, and the cloud browser rejected local-file navigation under its URL policy. No attempt was made to bypass either restriction.
- Phone dialog centering, touch target sizes, 3D hand appearance, safe areas, audio and animation need a rendered browser/physical Android check. No physical-device or emulator APK run was available.
- Multiplayer was checked using independent API/DOM clients, not multiple physical devices or independent rendered-browser sessions.
- The APK is development-key signed. Signing was verified, not installation on a device or Play Store readiness.

## Deployment smoke check

After deploying, check `/api/health` for version 3.0.0 / protocol 3. Use two devices with the new HTML/APK to create and join a room, confirm names and separate hands, start, play a full game, temporarily disconnect one device, reconnect, then use Exit. Confirm first-round off-suit cards do not collect the pile and the Ace holder can open a non-Ace card. Inspect phone dialogs in landscape and with the keyboard open.
