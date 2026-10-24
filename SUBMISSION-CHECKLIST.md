# Submission checklist (deadline: Tue 27 Oct, 9:00 AM Bangladesh time = Oct 26, 10:00 PM CDT)

- [ ] Push to a **public** GitHub repo (branch `main`).
- [ ] Deploy: easiest is Vercel (import repo; build `npm run build`, output `dist`). Or GitHub Pages: the workflow is already in `.github/workflows/`; push, then Settings → Pages → Source: GitHub Actions. Open the live link on your phone.
- [ ] On the live link, in **Safari (Mac + iPhone)** and Chrome on Android: run the Ammu example, add two unknowns (must say "Cannot assess"), and read one box photo.
- [ ] Test "Read a box photo" with 3–5 **real** medicine boxes in the catalogue. Note which worked. Mention honestly in Devpost.
- [ ] Ideally have one pharmacist or pharmacy student review the 25 records and the wording. If they do, say so; if not, keep "no pharmacist review".
- [ ] Record the 2-minute video (DEMO-SCRIPT.md), upload, and test the link logged out.
- [ ] Take 3 screenshots: hero, Ammu result map, Bangla result.
- [ ] Paste SUBMISSION.md into Devpost and fill the two _(…)_ notes in your own words.
- [ ] Add the live link and video link to README.
- [ ] Be ready to explain the code: `shared/products.js` (matching) and `src/main.jsx` (UI).
- [ ] Submit by **Monday night**, not Tuesday morning.

## Automated preparation commands
After `npm ci`, run `npm run setup:browsers` once. Then:
- `npm run verify:release`: unit tests, production build, Chromium and WebKit checks.
- `npm run demo`: generates a captioned walkthrough at `artifacts/demo/DoseCheck-demo.webm`.
- Browser checks generate screenshots in `artifacts/screenshots/`.
- `DOSECHECK_BASE_URL=https://your-live-url/ npm run test:e2e:all`: checks the actual deployment.

The browser checks ran in Chromium and WebKit (screenshots exist for every screenshot-bearing check), and the captioned recording has been generated (see VERIFICATION.md). Re-run `npm run test:e2e:all` to see the full pass count before claiming it. Review generated assets before publishing. Phone and real-box checks remain separate; do not claim they were automated or already passed.
