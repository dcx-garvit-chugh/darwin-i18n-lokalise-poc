import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Writes public/locales/languages.json from locale folders that ship common.json.
 * Any new language Lokalise exports under public/locales/<lng>/ is picked up on dev/build.
 */
function syncLanguagesManifest() {
  const localesDir = path.resolve(__dirname, 'public/locales');
  if (!fs.existsSync(localesDir)) return;

  const locales = fs
    .readdirSync(localesDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((name) =>
      fs.existsSync(path.join(localesDir, name, 'common.json')),
    )
    .sort();

  const outPath = path.join(localesDir, 'languages.json');
  const payload = `${JSON.stringify({ locales }, null, 2)}\n`;
  let prev = '';
  try {
    prev = fs.readFileSync(outPath, 'utf8');
  } catch {
    /* first run */
  }
  if (prev !== payload) {
    fs.writeFileSync(outPath, payload);
    console.info(`[languages-manifest] ${locales.join(', ')}`);
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'languages-manifest',
      buildStart() {
        syncLanguagesManifest();
      },
      configureServer() {
        syncLanguagesManifest();
      },
    },
  ],
});
