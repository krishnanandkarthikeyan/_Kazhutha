import { copyFile, mkdir } from 'node:fs/promises';

const outputDir = new URL('./dist/', import.meta.url);
await mkdir(outputDir, { recursive: true });

await Promise.all([
  copyFile(new URL('./Kazhutha.html', import.meta.url), new URL('./dist/index.html', import.meta.url)),
  copyFile(new URL('./manifest.webmanifest', import.meta.url), new URL('./dist/manifest.webmanifest', import.meta.url)),
  copyFile(new URL('./icon.svg', import.meta.url), new URL('./dist/icon.svg', import.meta.url)),
  copyFile(new URL('./sw.js', import.meta.url), new URL('./dist/sw.js', import.meta.url)),
]);

console.log('Kazhutha production build copied to dist/');
