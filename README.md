# DoseCheck
**Different names. Shared ingredients.** A source-backed checker that shows when medicines from different doctors contain the same active ingredient, or two ingredients from the same drug family, for Bangladeshi brand names, in English and Bangla.

**Live demo:** _add your GitHub Pages link here_ · **Demo video:** _add link_

## Why
In Bangladesh one medicine is sold under many brand names (paracetamol alone: Napa, Ace, Reset…). Older patients often see several doctors, and nobody sees every prescription together. A combination brand can also hide a second ingredient: *Naprosyn Plus* contains esomeprazole, the same ingredient as *Sergel*. DoseCheck makes those overlaps visible and gives the family a summary to show a pharmacist.

## What it does
- **Search** 25 exact products from 7 manufacturers by brand, ingredient, manufacturer or barcode.
- **Confirm** the exact name, strength and form, and tag where it came from (Prescription 1/2/3, or bought without prescription).
- **Compare**:
  - *Same ingredient*: an exact active-ingredient match across products, including ingredients hidden inside combination brands.
  - *Same drug family*: different ingredients from one WHO ATC group (proton pump inhibitors, NSAIDs, antihistamines). This is a classification link shown as a question for the pharmacist, not a warning that the combination is wrong.
- **See it**: a brand → ingredient map, with amber lines for the same ingredient and violet lines for the same family.
- **Read a box photo**: printed English text is read on the device with Tesseract (WebAssembly), then the user confirms the suggested match.
- **Take it to a pharmacist**: printable and downloadable summary with every source link, plus spoken results in Bangla or English.
- **Unknown products** stay visibly unresolved: with fewer than two known products the result is "Cannot assess", and with unresolved items left it is "Comparison incomplete". "No overlap found" never means "safe".

## Privacy
The web app runs entirely in the browser. The catalogue, the matching and the photo reader all run on the device, so no medicine list or photo is uploaded. The reader's model and WebAssembly files are served from the same site. No account is needed and nothing is stored.

## Run locally
Node.js 22.13+.
```
npm ci
npm run build      # copies OCR assets, builds static site into dist/
npm run preview    # static app at http://localhost:4173
npm test           # 25 unit/API tests
```
Browser checks now use the declared, pinned Playwright dependency:
```
npm ci
npm run setup:browsers      # installs Chromium and WebKit once
npm run verify:release     # unit tests, build, both browser suites
npm run demo               # captioned recording of the actual app
```
Screenshots are written to `artifacts/screenshots/` and the recording to `artifacts/demo/DoseCheck-demo.webm`. To test a deployed build, set `DOSECHECK_BASE_URL` to its full URL before running `npm run test:e2e:all`. See `deploy/README.md` for publishing and recording instructions.

Optional API server (same matching code, SQLite catalogue): `npm start`, which serves `dist/` and `/api/*`.

## Deploy (free)
Any static host works because the build uses relative paths.
- **Vercel or Netlify (easiest):** import the GitHub repo. Build command `npm run build`, output directory `dist`. No other settings are needed.
- **GitHub Pages:** the workflow is already at `.github/workflows/deploy.yml` (unit tests, build, Chromium browser checks, publish). Push to `main`, then set repo Settings → Pages → Source to **GitHub Actions**.
- **Docker (optional API server):** `docker build -t dosecheck . && docker run -p 4173:4173 dosecheck`.

## Data and evidence
`shared/products.js` holds each record with its source link and check date (24 Oct 2026): SQUARE and Incepta manufacturer pages, or MedEx, Bangladesh's public drug index. Ingredients are stored as the active moiety (naproxen sodium → naproxen) so salt forms match. Drug families come from the WHO ATC index (A02BC, M01A, R06A). This is a demonstration catalogue, not a complete database. No independent pharmacist review has occurred.

## Limits
No dose calculation, interaction checking, allergy checking, handwritten-prescription reading or clinical validation. Family flags are prompts for a question, not warnings that a combination is wrong. Do not change medicines based on this tool.

## Architecture
React 19 + Vite (static) · `shared/products.js` (catalogue + rule-based matching, used by browser and API) · Tesseract.js 6 (WASM, self-hosted) · optional Node 22 / Express / `node:sqlite` API · Node test runner.

## Credits
AI assistance: OpenAI Codex (initial build and tests) and Claude by Anthropic (drug-family matching, catalogue expansion, browser-only mode, ingredient map, docs). Product facts: linked SQUARE, Incepta and MedEx pages. Drug classes: WHO Collaborating Centre ATC/DDD index. OCR: Tesseract.js and tesseract.js-core (Apache-2.0), English model from tessdata_fast (Apache-2.0, see `public/models`). React, Vite, Express (MIT). Fonts: DM Sans, Manrope (Google Fonts, OFL).
