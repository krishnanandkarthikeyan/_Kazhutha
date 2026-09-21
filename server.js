// Compatibility for existing Render services configured with node server.js.
// Both entry points use the same authoritative room backend.
import {startServer} from './server.mjs';
startServer();
