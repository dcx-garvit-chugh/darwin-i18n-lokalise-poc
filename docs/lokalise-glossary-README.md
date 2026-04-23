# Lokalise Glossary — Darwin CX

Draft glossary for the Darwin client app, derived from real English strings in `dcx-client-app/public/locales/en/*.json` and current German translation quality issues.

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

## How to use this file

### Option A — Import CSV into Lokalise (recommended)
1. Open the Darwin CX project in Lokalise
2. Go to **Project Settings → Glossary** (or click the Glossary icon in the sidebar)
3. Click **Import → Upload CSV**
4. Map the columns (term, description, caseSensitive, translatable, forbidden, translation[de])
5. Save & apply

### Option B — Manual entry
Open the CSV in a spreadsheet, review each row with Mark / Adam, tweak translations, and enter manually into Lokalise.

## CSV columns explained

| Column | Purpose |
|---|---|
| `term` | The source (English) term — case matters if `caseSensitive: true` |
| `description` | Context shown to AI + human translators |
| `caseSensitive` | `true` for product names (Darwin, FlyPay) |
| `translatable` | `false` = "do not translate" (brand names, product names, known English-only words) |
| `forbidden` | Reserve for later — lets you mark words that should **never** appear in a translation |
| `translation[de]` | Approved German translation |
| `notes` | Internal notes (domain, why this term matters) |

## Review checklist before import

- [ ] Walk through with **Mark** — confirm brand/product names
- [ ] Walk through with **Adam** — validate his specific concerns (he originally flagged "issue" and similar)
- [ ] Confirm German translations with a native speaker / reviewer
- [ ] Decide: is "Bundle" kept in English, or translated as "Paket"? (draft keeps English)
- [ ] Decide: is "Fulfillment" kept in English, or translated as "Auftragserfüllung"? (draft uses Auftragserfüllung)
- [ ] Anything missing from current Localize.js glossary? Export from there and cross-check
- [ ] Add any team-specific jargon (e.g., CPO, SSG, DPF, DCA) — currently not included

## What happens after import

Once the glossary is live in Lokalise:

1. **Automations** (instant Google/DeepL translations) — will reference the glossary
2. **Workflows** (ProAI + human review) — will reference the glossary and show matches in the editor
3. **Existing translations** — you can run **"Apply glossary"** as a bulk action in Lokalise to fix already-translated keys where they mistranslate a glossary term

## Next steps after this file is imported

1. Set up the **human review Workflow** (see main README and Eric's recommendations in `Lokalise + Darwin CX | Technical Discussion` transcript)
2. Run a test push so the Automation + Workflow reference the glossary
3. Verify the fixes for "issue", "retention", "renewal" etc. land correctly
