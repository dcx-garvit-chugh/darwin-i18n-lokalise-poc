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

## End-to-end: Lokalise + GitHub

1. Create a **Lokalise** project (or use an existing QA project).
2. Add **GitHub** integration in Lokalise and authorize this **private** repository.
3. Configure a **file upload/download** template that matches this repo, for example:
   - **Repository path** (download / upload): `public/locales/%LANG_ISO%/%FILE_NAME%.json`
   - Map **locale** `en` → `en`, `de` → `de` (adjust if you use `de_DE` etc.).
   - One **bundle per namespace**: `common.json`, `marketingStudio.json`, …  
     (or one Lokalise “file” per namespace; match `%FILE_NAME%` to the namespace.)
4. **Pull** source copy from `en` into Lokalise, translate, **push** `de` (and others) back to the branch you choose (e.g. `main` or `lokalise-translations`).
5. Merge the PR / branch in GitHub; redeploy or run locally — the app loads the updated JSON automatically.

Exact Lokalise UI labels vary; use their docs for [GitHub integration](https://docs.lokalise.com/) and file path placeholders.

Optional: **Lokalise CLI** (`lokalise2` ) in CI for pull/push if you prefer pipelines over the hosted sync.

## Parity with `dcx-client-app`

To stay in lockstep with production:

- Keep the same **relative paths** under `public/locales/{lng}/{ns}.json`.
- Keep **namespace names** and **key paths** compatible when copying JSON from the real app into this POC (or the other way around after Lokalise export).

This POC intentionally ships a **small** key set; grow it by copying namespaces from `dcx-client-app/public/locales/` as needed.

## License

Private / internal POC — not published.
