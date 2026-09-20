# Kazhutha Render v2.1.1 — HTML included

This corrected package includes the actual final `Kazhutha.html` at the project root.

- `Kazhutha.html` — final hosted game client (no ChatGPT sign-in references)
- `dist/index.html` — same built client used by the server
- `server.mjs` — multiplayer backend with CORS/reconnect/leave support
- `build.mjs` — copies the final HTML and PWA assets into `dist/`

Deploy this folder to Render as the web service project. `npm run build` copies `Kazhutha.html` into `dist/index.html`, and `npm start` launches the multiplayer server.
