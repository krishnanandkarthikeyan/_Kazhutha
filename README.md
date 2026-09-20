# Kazhutha — production HTML/PWA build

This package keeps the existing Kazhutha HTML/CSS/JavaScript game as the visual source of truth and adds a server-authoritative multiplayer layer for Render.

## What changed

- Multiplayer now uses `POST /api/game` on the same Render service instead of host-owned PeerJS rooms.
- The server owns room state, validates turns and card legality, runs AI turns, protects against stale/double actions, and restores seats with reconnect tokens.
- The Ace of Spades determines the opening player, but that player may choose **any card** from their hand.
- **Vettu is disabled for the entire first round.** Off-suit play in round 1 is allowed when a player is void, but it is not treated as Vettu. Normal Vettu logic starts in round 2.
- PWA manifest, service worker, standalone display mode, landscape preference, safe-area handling, touch protections, and mobile scaling rules were added.
- The desktop/table composition remains the visual reference; mobile uses the same interface rather than a separate redesign.

## Render deployment

Push this folder to the repository connected to `https://kazhutha-online.onrender.com/` and deploy using the included `render.yaml`.

Render should create a **Node web service** with:

- Build: `npm run build`
- Start: `npm start`
- Health check: `/`

No npm dependencies are required.

## Local test

```bash
npm run build
PORT=10000 npm start
```

Open `http://localhost:10000`.

## Important architecture note

Rooms are held in server memory. Brief client disconnects are supported because reconnect tokens restore the player's seat and hand, but a full Render process restart clears active rooms. Persistent cross-restart rooms would require an external store such as Redis/Postgres.
