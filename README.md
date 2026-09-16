# Kazhutha on Render

This package builds a self-contained `index.html` from the original Kazhutha game and serves it with a Node multiplayer server. The page contains the room client, so no separate JavaScript asset is needed in a website embed. The game still runs in the host's browser, and the server relays messages between players.

## Deploy

1. Put every file in this package at the root of a GitHub repository.
2. In Render, choose **New > Blueprint**.
3. Connect the repository. Render reads `render.yaml` and creates the **Web Service** called `kazhutha-online`. Confirm that the service type says **Web Service**, with `npm run build` as the build command and `npm start` as the start command. There is no Publish Directory setting on a Web Service.
4. After the deploy finishes, open the generated `onrender.com` URL.

If you previously deployed `kazhutha-game.onrender.com` as a Static Site, it will
continue to show the game but cannot run private rooms. Pushing new files to
that Static Site does not change its service type. Use the new Web Service URL
for both the host and every guest. Open `/health` on that URL: it must say `ok`.

No environment variables or external multiplayer service are required when players open the new Web Service URL. The bundled `index.html` uses its own website's server by default.

## Embed or host the page elsewhere (optional)

To serve the game page from a different site while using the new Web Service for multiplayer, build that site's page with `KAZHUTHA_ONLINE_URL=https://YOUR-WEB-SERVICE.onrender.com npm run build` and publish the resulting root `index.html`. Set `KAZHUTHA_ALLOWED_ORIGINS` on the Web Service to the page's exact origin, such as `https://kazhutha-game.onrender.com`, and redeploy it. For multiple sites, separate exact origins with commas. Both settings are needed: the page uses the configured server for `/health` and WebSocket `/ws`, and the server permits that page's origin. Use the configured server's `/health` address to verify it says `ok`.

This optional setup still requires the Node Web Service. A Static Site alone cannot run private rooms. If you use the Web Service URL directly, leave both settings unset.

## Test locally

Run:

```bash
npm run build
npm start
```

Then open <http://localhost:3000>.

The built `index.html`, `multiplayer.js` source, and `server.js` are all at the project root. Keep `render.yaml`, `package.json`, `build.mjs`, and `Kazhutha.html` there too.

## Multiplayer notes

- The host creates a private room and shares the `KZH-XXXXXX` code or invite link.
- The host's browser owns the live game, so the host must keep the game page open.
- Each tab keeps its own room seat; opening an invite link in another tab creates a guest seat instead of reusing the host seat. After deploying an update, refresh open game tabs and create a new room.
- Players need internet access. By default, the room connection is served at the same address as the website.
- A deployment or service restart closes current rooms. Create a new room afterward.
- AI, local multiplayer, practice, and browser-saved statistics continue to work.
