# Publish DoseCheck

## GitHub Pages
The workflow is already at `.github/workflows/deploy.yml`; no manual move is needed. Push this project to a public GitHub repository on `main`. In Settings → Pages, select GitHub Actions. The workflow runs unit tests, the production build, and the Chromium browser checks before publishing. This route needs no Node backend.

## Vercel
Import the public repository. `vercel.json` selects Vite, `npm run build`, and `dist`. No backend or API key is needed. Avoid adding environment variables with medicine data.

## Check the deployed app
Install the declared test dependency and browser binaries once:

```
npm ci
npm run setup:browsers
```

Then point the test suite at the exact live URL (preserve its repository sub-path if using GitHub Pages):

```
DOSECHECK_BASE_URL=https://your-live-url/ npm run test:e2e:all
```

The tests use synthetic data, export screenshots into `artifacts/screenshots/`, and do not submit a hackathon entry. WebKit tests exercise Safari's engine but do not replace a real phone check.

## Generate the demonstration video

```
npm run build
npm run demo
```

Output: `artifacts/demo/DoseCheck-demo.webm`. This is a captioned recording of the actual app, about 90 seconds plus processing time, using the fictional example and synthetic OCR image. Review it before uploading. It does not claim real-patient or real-packaging testing. For a deployed recording, set `DOSECHECK_BASE_URL` first.

## Local verification
`npm run verify:release` runs the unit tests, production build, and both browser suites. Browser failures return a nonzero exit code. Missing browsers, blocked downloads, and blocked local port binding are reported as failures, not passing checks.
