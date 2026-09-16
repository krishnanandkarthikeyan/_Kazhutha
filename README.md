# Kazhutha on Render

This package builds the original Kazhutha game page for Render. Its private rooms use a connection on the same Render service. The game still runs in the host's browser.

## Deploy

1. Put every file in this folder in the root of a GitHub repository. Delete the old `dist` folder from the repository if it is still there.
2. In Render, choose **New > Blueprint**.
3. Connect the repository. Render detects `render.yaml` and creates the **Web Service** called `kazhutha-online`. Confirm that the Render service type says **Web Service**, with `npm run build` as the build command and `npm start` as the start command.
4. After the deploy finishes, open the generated `onrender.com` URL.

If you previously deployed `kazhutha-game.onrender.com` as a Static Site, it will
continue to show the game but cannot run private rooms. Pushing new files to
that Static Site does not change its service type. Use the new Web Service URL
for both the host and every guest. Open `/health` on that URL: it must say `ok`.

No environment variables or external multiplayer service are required.

## Test locally

Run:

```bash
npm run build
npm start
```

Then open <http://localhost:3000>.

The built `index.html`, `multiplayer.js`, and `server.js` are all at the project root. Keep `render.yaml`, `package.json`, `build.mjs`, and `Kazhutha.html` there too.

## Multiplayer notes

- The host creates a private room and shares the `KZH-XXXXXX` code or invite link.
- The host's browser owns the live game, so the host must keep the game page open.
- Players need internet access. The room connection is served at the same address as the website.
- A deployment or service restart closes current rooms. Create a new room afterward.
- AI, local multiplayer, practice, and browser-saved statistics continue to work.
