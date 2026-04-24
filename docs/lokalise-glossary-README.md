# Lokalise Glossary — Darwin CX

Glossary for the Darwin client app, derived from real English strings in `dcx-client-app/public/locales/en/*.json` and current German translation quality issues.

File to import: `lokalise-glossary.csv`

## Why we need this

Scanning the current EN ↔ DE translations in the client app surfaced several **real mistranslation patterns** that a glossary will fix:

| English | Current German (AI) | Problem | Glossary fix |
|---|---|---|---|
| Issue *(magazine edition)* | "Problem" / "Thema" / "Emission" | Translated as generic "problem/topic" instead of magazine edition | → **Ausgabe** |
| Retention *(marketing)* | "Aufbewahrung" / "Zurückbehaltung" | Translated as literal "storage/holding" instead of customer retention | → **Kundenbindung** |
| Renewal | Mixed: "Erneuerung" vs "Verlängerung" | Inconsistent across the app | → **Verlängerung** (standardized) |
| Renewal Period | "Verlängerungsprämieter" | Nonsense word — AI invented a compound | → **Verlängerungszeitraum** |
| Premium *(tier)* | "Prämie" | Wrong — "Prämie" means bonus money, not Premium tier | → **Premium** (do not translate) |
| Darwin customer experience | "Darwin Kundenerlebnis" | Brand name was literally translated | → **Darwin CX** / **Darwin Customer Experience** (do not translate) |
| Publisher / paid to publisher | Mixed: "Herausgeber" vs "Verlag" | Individual publisher vs publishing house | → **Verlag** (standardized) |
| Bundle | Mixed: "Bundle" vs "Paket" | Inconsistent | → **Bundle** (do not translate) |
| Gift *(subscription gift)* | Mixed: "Geschenk" vs "Schenkung" | Gift vs donation — different concepts | → **Geschenk** |

## How to import into Lokalise

1. Open the Darwin CX project in Lokalise
2. Go to the **Glossary** page in the left menu
3. Click **More → Upload CSV**
4. Select `lokalise-glossary.csv`
5. Save

Lokalise does not let you map columns during upload — the file must already match their exact format (see below).

## Lokalise CSV format requirements

Reverse-engineered from a CSV exported from our actual Lokalise project (see `glossary_sample.csv`) plus [Lokalise's glossary docs](https://docs.lokalise.com/en/articles/1400629-glossary):

- **Separator**: semicolons (`;`) — **not** commas
- **Encoding**: UTF-8
- **Header row**: required, **all lowercase**
- **Exact header**:
  ```
  term;description;casesensitive;translatable;forbidden;tags;en;en_description;de;de_description;hi;hi_description
  ```
- **Column order and meaning**:
  1. `term` — the source term (English is our base language)
  2. `description` — general description, quoted with `"..."`
  3. `casesensitive` — `yes` or `no`
  4. `translatable` — `yes` or `no`
  5. `forbidden` — `yes` or `no`
  6. `tags` — comma-separated, or empty
  7. `en` / `en_description` — leave empty (English IS the source, already in `term`)
  8. `de` / `de_description` — German translation (empty for non-translatable terms)
  9. `hi` / `hi_description` — Hindi translation, empty (not a target yet)

**Critical**: The Lokalise project must have `en`, `de`, and `hi` as configured languages for the column names to be recognized. If languages are added/removed from the project, update this CSV accordingly.

**Do not leave a language column blank if that language already has translations in the project** — blank values overwrite (delete) existing entries per Lokalise docs.

### Validating before upload

Lokalise provides an open-source tool called **Lokalise Glossary Guard** you can run locally to catch problems before uploading:

```bash
lokalise-glossary-guard validate -f docs/lokalise-glossary.csv -l en -l de
```

## Important caveats (read these before demoing)

### 1. Automations do NOT use the glossary

Lokalise docs are explicit:
> Machine translation engines do not take the glossary into account. However, AI translations will use your glossary entries when applicable.

This means:
- **Automations** (Google / DeepL) — instant fill at push time — **ignore the glossary**
- **Workflows using ProAI** — **do** use the glossary
- **Human reviewers in Workflows** — see glossary matches in the editor as suggestions

This actually reinforces Eric's recommendation: **Automations = instant dev visibility, Workflow = quality pass** — the quality pass is exactly where the glossary kicks in.

### 2. Glossary is not applied retroactively

> The glossary is meant for reference, and there's no option to automatically apply it to translations.

For already-translated keys, you have two options:
- **Find & Replace** in the Lokalise editor to fix existing mistranslations in bulk
- **Re-translate** specific keys by reopening the Workflow — ProAI will use the glossary on that pass

### 3. Shared glossary

The glossary lives on a single project by default. If Darwin CX ends up with multiple Lokalise projects (e.g., separate Shop App), use **Project Settings → Glossary options → The glossary is shared** to reuse it across projects.

## Review checklist before import

- [x] Confirmed with Mark — "Bundle", "Marketing Studio", "Automation Studio" stay in English
- [x] Confirmed with Mark — "Fulfillment" translates to "Auftragserfüllung"
- [x] Confirmed — Localize.js has no exportable glossary to merge in
- [ ] Walk through with **Adam** to validate his specific concerns (e.g., "issue", industry-specific terms)
- [ ] Confirm final German translations with a native speaker / reviewer
- [ ] Add more module/team jargon if anything user-facing surfaces later

## What happens after import

1. Next **Automation** runs → translations still instant via Google/DeepL (no glossary influence)
2. Next **Workflow** run with ProAI → glossary matches applied; reviewer sees them inline
3. Existing mistranslations ("Problem" instead of "Ausgabe", etc.) → fix via **Find & Replace** or re-trigger ProAI on those keys

## Next steps after glossary is live

1. Move to **Topic 2: Human Review Workflow** (Eric's recommendations from the technical discussion)
2. Configure the Workflow in Lokalise (ProAI + human reviewer, weekly)
3. Update `.github/workflows/lokalise-pull.yml` to only pull **verified** translations on a cron, decoupled from push
4. End-to-end test: push a string → instant Google MT visible → trigger Workflow → reviewer approves → weekly pull creates PR with approved content
