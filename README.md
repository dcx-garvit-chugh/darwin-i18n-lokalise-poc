# Darwin i18n + Lokalise POC

Minimal **Vite + React** app that mirrors **`dcx-client-app`** i18n choices:

- **`i18next`** + **`react-i18next`**
- **`i18next-http-backend`** loading JSON from **`/locales/{{lng}}/{{ns}}.json`**
- **`i18next-browser-languagedetector`** (`localStorage` key `i18nextLng`, same as prod)
- Namespaces aligned with the main app (`common`, `marketingStudio`; add more anytime)

Use this repo to exercise **GitHub ↔ Lokalise ↔ runtime** without touching the production client bundle.

Target account (same pattern as [flypay-poc](https://github.com/dcx-garvit-chugh/flypay-poc)): [**github.com/dcx-garvit-chugh**](https://github.com/dcx-garvit-chugh).

## First-time push to GitHub (two minutes)

The local clone in this workspace **already has** `origin` set to:

`https://github.com/dcx-garvit-chugh/darwin-i18n-lokalise-poc.git`

An automated push from this environment failed only because **that repository does not exist on GitHub yet** (same as creating `flypay-poc` the first time).

1. While logged in as **dcx-garvit-chugh**, open:  
   **[Create repository — name pre-filled](https://github.com/new?name=darwin-i18n-lokalise-poc)**  
2. Set **Visibility** to **Private**.  
3. Leave **Add a README** / **.gitignore** / **license** unchecked (this project already has commits).  
4. Click **Create repository**.  
5. On your Mac, run:

```bash
cd /path/to/darwin-i18n-lokalise-poc
./scripts/first-push.sh
```

Or only the push:

```bash
git push -u origin main
```

After that, the repo will be at **https://github.com/dcx-garvit-chugh/darwin-i18n-lokalise-poc**.

Optional: install [GitHub CLI](https://cli.github.com/), run `gh auth login`, then from this directory:  
`gh repo create darwin-i18n-lokalise-poc --private --source=. --remote=origin --push`

## Local run

```bash
npm install
npm run dev
```

Open the language switcher (English / Deutsch) and confirm strings come from `public/locales/`.

```bash
npm run build && npm run preview
```

## Repo layout (what Lokalise should sync)

| Path | Role |
|------|------|
| `public/locales/en/*.json` | English sources |
| `public/locales/de/*.json` | German targets |

Each file is one **i18next namespace** (filename = namespace, e.g. `marketingStudio.json`).

The Vite app serves these at `/locales/en/...` and `/locales/de/...`. **Only this tree should appear in GitHub PRs from Lokalise** — not `en/` or `de/` at the repository root.

---

## Lokalise dashboard: fully automated PRs into `public/locales/`

There is no “magic path” in the repo: GitHub PRs use whatever you configure on Lokalise’s **[Download](https://docs.lokalise.com/en/articles/3150682-downloading-translation-files)** page (file structure + directory prefix) and the **[GitHub](https://docs.lokalise.com/en/articles/1684090-github)** app trigger. Follow this once per project (save settings; Lokalise remembers them for the next export).

### 1) GitHub app — **Pull** (import into Lokalise)

Per [GitHub integration](https://docs.lokalise.com/en/articles/1684090-github): you normally pull **base-language** files only.

- Pick **only** files under **`public/locales/en/`**, e.g.  
  `public/locales/en/common.json`  
  `public/locales/en/marketingStudio.json`
- For each file, set the language dropdown to **English** (`en`).

Do **not** point the import at stray `en/` or `de/` folders at repo root (those should not exist on `main`).

### 2) Project languages

- **English** = base (source).
- **German** (`de`) = translation target (add in project **Languages** if missing).

### 3) Filenames inside Lokalise (namespaces)

This app expects **two JSON files per locale**: `common.json` and `marketingStudio.json`.

- Open the **Files** widget and confirm keys are assigned to filenames that will export as those two names (see [Filenames](https://docs.lokalise.com/en/articles/2281317-filenames)).
- Keys must be on the **Web** platform so JSON export includes them.

### 4) **Download** page — this fixes where the GitHub PR writes files

1. **Download** in the main menu.
2. **File format**: **JSON** (Web).
3. **Languages**: include **English** and **German** (or every locale you ship).
4. **File structure**: choose **Multiple files per language** so each namespace stays a separate file (not one giant JSON per locale). Same idea as Lokalise’s CLI `--original-filenames=true` ([Filenames](https://docs.lokalise.com/en/articles/2281317-filenames)).
5. **Directory prefix** (sometimes labeled alongside file structure): set exactly:

   ```text
   public/locales/%LANG_ISO%
   ```

   That matches the “directory prefix + `%LANG_ISO%`” pattern described for multi-file exports (see Example 3 in [Filenames](https://docs.lokalise.com/en/articles/2281317-filenames)).

6. Use **Preview**: you should see paths like  
   `public/locales/en/common.json`, `public/locales/en/marketingStudio.json`,  
   `public/locales/de/common.json`, `public/locales/de/marketingStudio.json`.  
   If you only see `en/common.json` at the repo root, the prefix is wrong — fix step 5 before triggering GitHub.
7. Under **App triggers**, enable **GitHub**, then **Build only** (or build + download) to open the PR.

After merge, `git pull` is enough; **`npm run dev`** will show new copy with no manual copying.

### 5) Optional: auto-import when devs push English

Configure a GitHub **webhook** to Lokalise **auto-pull** URL (described under “Auto-pull” in the [GitHub](https://docs.lokalise.com/en/articles/1684090-github) article) so updates to `public/locales/en/` flow into Lokalise without a manual “Pull now”.

---

## End-to-end checklist (for demos)

1. Dev changes **`public/locales/en/*.json`** → push to GitHub → (optional) webhook → Lokalise pulls.
2. Translator works in Lokalise → **Download** with settings above → **GitHub** trigger → PR.
3. Merge PR → **`git pull`** → run app → German updates appear automatically.

## Parity with `dcx-client-app`

To stay in lockstep with production:

- Keep the same **relative paths** under `public/locales/{lng}/{ns}.json`.
- Keep **namespace names** and **key paths** compatible when copying JSON from the real app into this POC (or the other way around after Lokalise export).

This POC intentionally ships a **small** key set; grow it by copying namespaces from `dcx-client-app/public/locales/` as needed.

## License

Private / internal POC — not published.
