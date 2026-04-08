import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const POC_ROOT = path.resolve(__dirname, '..');
const CLIENT_LOCALES = path.resolve(POC_ROOT, '../dcx-client-app/public/locales');
const POC_LOCALES = path.join(POC_ROOT, 'public/locales');

const LANGUAGES = ['en', 'de'];
const FULL_COPY_NAMESPACES = [
  'common',
  'admin',
  'auth',
  'dashboard',
  'pageTitle',
  'reporting',
];

const HYBRID = [
  {
    ns: 'marketingStudio',
    allowlistPath: path.join(__dirname, 'hybrid-keys-marketingStudio.json'),
  },
  {
    ns: 'customerCare',
    allowlistPath: path.join(__dirname, 'hybrid-keys-customerCare.json'),
  },
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function pickFlatStrings(src, keys) {
  const out = {};
  const missing = [];
  for (const k of keys) {
    if (!Object.prototype.hasOwnProperty.call(src, k)) {
      missing.push(k);
      continue;
    }
    const v = src[k];
    if (typeof v === 'string') {
      out[k] = v;
    }
  }
  if (missing.length) {
    console.warn(`[sync-locales] Missing keys in source (${missing.slice(0, 5).join(', ')}${missing.length > 5 ? '…' : ''})`);
  }
  return out;
}

function copyFullNamespace(lang, ns) {
  const from = path.join(CLIENT_LOCALES, lang, `${ns}.json`);
  const to = path.join(POC_LOCALES, lang, `${ns}.json`);
  if (!fs.existsSync(from)) {
    console.error(`[sync-locales] Missing source: ${from}`);
    process.exitCode = 1;
    return;
  }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}

function writeHybridNamespace(lang, ns, allowlistPath) {
  const keys = readJson(allowlistPath);
  if (!Array.isArray(keys)) {
    throw new Error(`Allowlist must be a JSON array: ${allowlistPath}`);
  }
  const from = path.join(CLIENT_LOCALES, lang, `${ns}.json`);
  const to = path.join(POC_LOCALES, lang, `${ns}.json`);
  if (!fs.existsSync(from)) {
    console.error(`[sync-locales] Missing source: ${from}`);
    process.exitCode = 1;
    return;
  }
  const src = readJson(from);
  const subset = pickFlatStrings(src, keys);
  const ordered = {};
  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(subset, k)) {
      ordered[k] = subset[k];
    }
  }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.writeFileSync(to, `${JSON.stringify(ordered, null, 2)}\n`);
}

function main() {
  if (!fs.existsSync(CLIENT_LOCALES)) {
    console.error(
      `[sync-locales] Client locales not found: ${CLIENT_LOCALES}\nRun from DarwinCX repo with dcx-client-app as a sibling of darwin-i18n-lokalise-poc.`,
    );
    process.exit(1);
  }

  for (const lang of LANGUAGES) {
    for (const ns of FULL_COPY_NAMESPACES) {
      copyFullNamespace(lang, ns);
    }
    for (const { ns, allowlistPath } of HYBRID) {
      writeHybridNamespace(lang, ns, allowlistPath);
    }
  }

  console.info('[sync-locales] Done. Full copy:', FULL_COPY_NAMESPACES.join(', '));
  console.info('[sync-locales] Hybrid:', HYBRID.map((h) => h.ns).join(', '));
  console.info('[sync-locales] poc.json was not modified (POC-only).');
}

main();
