# Kazhutha on Render

This package builds the original Kazhutha game page for Render. Its private rooms use a connection on the same Render service. The game still runs in the host's browser.

## Deploy

1. Put every file in this folder in the root of a GitHub repository.
2. In Render, choose **New > Blueprint**.
3. Connect the repository. Render detects `render.yaml` and creates the web service.
4. After the deploy finishes, open the generated `onrender.com` URL.

If you previously deployed the static version, this Blueprint creates a separate
web service called `kazhutha-online`. Share its new URL for online rooms.

No environment variables or external multiplayer service are required.

## Test locally

Run:

```bash
npm run build
npm start
```

Then open <http://localhost:8000>.

## Multiplayer notes

- The host creates a private room and shares the `KZH-XXXXXX` code or invite link.
- The host's browser owns the live game, so the host must keep the game page open.
- Players need internet access. The room connection is served at the same address as the website.
- A deployment or service restart closes current rooms. Create a new room afterward.
- AI, local multiplayer, practice, and browser-saved statistics continue to work.
