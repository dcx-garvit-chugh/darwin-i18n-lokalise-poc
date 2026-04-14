# Darwin i18n + Lokalise POC

Minimal **Vite + React** app that mirrors **`dcx-client-app`** i18n choices:

- **`i18next`** + **`react-i18next`**
- **`i18next-http-backend`** loading JSON from **`/locales/{{lng}}/{{ns}}.json`**
- **`i18next-browser-languagedetector`** (`localStorage` key `i18nextLng`, same as prod)
- Namespaces match the production client **plus `poc`** (Phrase Lab chrome only; not shipped in `dcx-client-app`): `poc`, `common`, `admin`, `auth`, `customerCare`, `dashboard`, `marketingStudio`, `pageTitle`, `reporting`
- **Hybrid locale sync**: `npm run sync:locales` copies full JSON from `../dcx-client-app/public/locales/` for most namespaces and writes **reduced** `marketingStudio` / `customerCare` files from allowlists under `scripts/`

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
| `public/locales/languages.json` | Generated list of locale codes (folders that contain `common.json`) — commit after adding a language |

Each **JSON file** under a language folder is one **i18next namespace** (filename = namespace, e.g. `marketingStudio.json`).

**Files per language** (mirror this set in Lokalise *multiple files per language*):

- `admin.json`
- `auth.json`
- `common.json`
- `customerCare.json` (subset in repo; full file lives in `dcx-client-app`; re-run sync to refresh)
- `dashboard.json`
- `marketingStudio.json` (subset; same as above)
- `pageTitle.json`
- `poc.json` (**POC-only** — not copied from `dcx-client-app`; edit here or in Lokalise if you include it in the project)
- `reporting.json`

The Vite app serves these at `/locales/en/...` and `/locales/de/...`. **Only this tree should appear in GitHub PRs from Lokalise** — not `en/` or `de/` at the repository root.

### Refreshing copy from Darwin (`dcx-client-app`)

From this repo root (`darwin-i18n-lokalise-poc`), with **`dcx-client-app`** as a sibling directory:

```bash
npm run sync:locales
```

Then run **`npm run dev`** or **`npm run build`** once so `languages.json` updates if you add new locale folders later.

Allowlists for large namespaces:

- `scripts/hybrid-keys-marketingStudio.json`
- `scripts/hybrid-keys-customerCare.json`

---

## GitHub Actions (official Lokalise push / pull)

This repo includes workflows using Lokalise’s marketplace actions ([docs](https://developers.lokalise.com/docs/github-actions)) so you can test the same **Push → Lokalise (Automations / Workflows) → Pull PR** loop Eric walked through—without relying on the Lokalise **GitHub app** alone.

| Workflow | File | What it does |
|----------|------|----------------|
| **Push English locales to Lokalise** | `.github/workflows/lokalise-push.yml` | Uploads changed files under `public/locales/en/**/*.json` to your Lokalise project (`lokalise-push-action@v5.2.0`). |
| **Pull translations from Lokalise** | `.github/workflows/lokalise-pull.yml` | Downloads target languages and opens a PR updating `public/locales/` (`lokalise-pull-action@v5.2.0`). |

### One-time GitHub setup

1. **Repository secret:** `LOKALISE_API_TOKEN` — [API token](https://docs.lokalise.com/en/articles/1929556-api-and-sdk-tokens) with upload + download permissions for the project.
2. **Repository variable:** `LOKALISE_PROJECT_ID` — Project ID from Lokalise **Project settings → General**.
3. **Actions settings:** **Settings → Actions → General → Workflow permissions** → *Read and write*, and allow **Actions to create pull requests** (required for the pull action to open PRs).

### Lokalise project alignment

- **Filenames** in Lokalise should match this tree, e.g. `public/locales/%LANG_ISO%/common.json` (see [Filenames](https://docs.lokalise.com/en/articles/2281317-filenames)) so push/pull compare the same paths.
- **Pull** uses `skip_include_tags: true` so downloads are **not** limited to keys tagged with the current branch name (recommended for this POC). If you switch to a **hub branch + tag** workflow, set `skip_include_tags: false` and tag keys in Lokalise accordingly.

### Automations & workflows (in the Lokalise UI)

GitHub Actions only move files; **Automations** (instant MT/AI on English changes) and **Workflows** (scheduled TM → Pro AI → human review) are configured **inside Lokalise** (Eric’s demo: **More → Automations**, **Workflows**). After a successful **Push** from GitHub, wait for those jobs to finish (or for the upload to complete if Automations block completion), then run **Pull translations from Lokalise** manually or on a schedule (uncomment `schedule` in `lokalise-pull.yml` if desired).

### Quota / trial

Pushes and file processing consume **processed words** on your Lokalise plan. For tests, change **one small** `public/locales/en/*.json` file or use a **dummy file with few keys**; avoid chaining unnecessary full-repo uploads.

### Chaining Push → Pull automatically

You can add a separate workflow with `on.workflow_run` targeting `Push English locales to Lokalise` if you want Pull to start right after Push; if **Automations** need time, add a **wait** step or run Pull on a **cron** instead. See [workflow_run](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#workflow_run).

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

This app expects **the JSON files listed above** for each locale (same set for `en` and `de`).

- Open the **Files** widget and confirm keys are assigned to filenames that export with matching basenames (see [Filenames](https://docs.lokalise.com/en/articles/2281317-filenames)).
- Keys must be on the **Web** platform so JSON export includes them.
- You may omit **`poc.json`** from Lokalise if you prefer to maintain Phrase Lab strings only in Git; if you add it, translators can localize POC chrome there too.

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
   `public/locales/en/common.json`, `public/locales/en/admin.json`, … and the same namespaces under `public/locales/de/`.  
   If you only see `en/common.json` at the repo root, the prefix is wrong — fix step 5 before triggering GitHub.
7. Under **App triggers**, enable **GitHub**, then **Build only** (or build + download) to open the PR.

After merge, `git pull` is enough; **`npm run dev`** will show new copy with no manual copying.

### Dynamic languages (selector + i18n)

The app does **not** hardcode locale codes.

1. **`public/locales/<language>/common.json`** must exist for each locale (same as today). Lokalise exports `public/locales/fr/common.json`, `marketingStudio.json`, etc.
2. On **`npm run dev`** and **`npm run build`**, Vite regenerates **`public/locales/languages.json`** from those folders (see `vite.config.js`). That file lists every locale the UI offers.
3. The language switcher uses **`Intl.DisplayNames`** so labels (e.g. “French”, “français”) update without adding keys for each language.
4. **Commit** updated `languages.json` when you add a language so GitHub reflects the same list without an extra local run (or run `npm run build` once after merging the Lokalise PR).

If `languages.json` is missing, i18n falls back to `en` and `de`.

### If Lokalise still opens PRs with `en/` or `de/` at the **repo root**

That almost always means the **Download → directory prefix** is blank or wrong, or **One file per language** is collapsing everything next to the repo root. Use **Preview** on the Download page until every path starts with `public/locales/`.

This repo also **ignores** `/en/` and `/de/` at root in `.gitignore` and runs a **GitHub Action** on pull requests that fails if those paths appear in the diff—so a bad export is obvious instead of silently merging.

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

Demo routes (**Home**, **Dashboard**, **Marketing Studio**, **Customer Care**, **Reporting**, **Admin**) use `react-router-dom` and pull copy from the namespaces above. **`marketingStudio`** and **`customerCare`** in this repo are **curated subsets** unless you replace them with full exports from Lokalise or widen the allowlists and re-run `npm run sync:locales`.

## License

Private / internal POC — not published.
