# DoseCheck: Devpost draft

## Tagline
Three doctors, one medicine bag. See what overlaps before it's swallowed twice.

## Inspiration
In Bangladesh, one medicine is sold under many brand names. Paracetamol alone is Napa, Ace and Reset, from three manufacturers. An older parent might see an orthopaedic doctor, a medicine specialist and a dentist in the same month. Each prescription makes sense on its own, but nobody sees all of them together. Combination brands make this harder: *Naprosyn Plus* contains esomeprazole, the same ingredient as *Sergel*, and the brand name doesn't tell you that.

_(If true for you, add one sentence about your own family here. A real story is the strongest part of the submission.)_

## What it does
DoseCheck lets a family build one list of everything a person is taking, tagged by which prescription it came from, and then compares:
1. **Same ingredient** across products, including ingredients hidden inside combination brands.
2. **Same drug family, different ingredients**: two NSAID painkillers, or two acid reducers, using the WHO ATC classification.

Results appear as a brand → ingredient map, with amber for the same ingredient and violet for the same family. Each finding gives a plain question to ask a pharmacist and links to its source. A printable summary and spoken results are available in **English and Bangla**. People can also photograph a medicine box: the printed name is read on the device and then confirmed by the user.

## How we built it
React + Vite, running entirely in the browser. A rule-based matching module (`shared/products.js`) compares active ingredients (normalised across salt forms) and WHO ATC family prefixes. The same module powers an optional Node/Express/SQLite API. Tesseract.js reads printed box text in WebAssembly, with the model self-hosted, so photos never leave the phone. The catalogue has 25 exact products from 7 manufacturers, each linked to a manufacturer page or MedEx and checked on 24 Oct 2026. There are 25 unit and API tests plus 7 browser end-to-end checks, and the app deploys as a free static site.

## Challenges
- **Identity is everything.** Ace, Ace Plus, Ace XR and Ace suppository are four different products. Every item needs explicit confirmation of strength and form.
- **Salt forms.** Naproxen sodium and naproxen must match, so ingredients are stored as active moieties.
- **Not crying wolf.** An overlap can be intentional, or one prescription can replace another. The app never says "dangerous" or "safe". It turns each finding into a question for a pharmacist.
- **Privacy.** We moved everything, OCR included, into the browser so no health data is uploaded.

## Accomplishments
- Finds a hidden ingredient inside a combination brand.
- Flags same-family duplicates that simple name matching misses.
- Works in Bangla, works offline after first load, and needs no account.

## What we learned
Product identity, evidence and honest uncertainty are what make a health result trustworthy. A small catalogue that is verified line by line beats a large one nobody checked.

## What's next
Pharmacist review of the catalogue, coverage of the most-prescribed Bangladeshi brands, Bangla box-text reading, testing with families and pharmacies, and a QR code that lets a pharmacist open the summary.

## Built with
React, Vite, JavaScript, Tesseract.js (WebAssembly), Web Speech API, BarcodeDetector API, Node.js, Express, SQLite, Playwright, GitHub Actions.

## Scope and AI disclosure
Ingredient and drug-family comparison only. It does not check doses, interactions, allergies or handwritten prescriptions, and it is not clinically validated. AI assistance: OpenAI Codex (initial build) and Claude (drug-family logic, catalogue expansion, browser-only mode, ingredient map, docs). _(Add your own contributions here in your words: what you designed, tested, decided, and the real boxes you photographed.)_
