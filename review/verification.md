Verification

- Automated Chrome route pass: 22 route patterns at 390px and 1440px (44 checks). Explicit h1 render waits, page scrolling, full-page screenshots, JavaScript page errors, console errors, document overflow, and footer presence captured. All 44 passed these checks; raw results are in browser-results.json. Full-page captures are in /tmp/adat-browser/page-*.png; selected inspected screenshots are retained in review/screenshots.
- Hero CTA clicks reached /contact at 390px, 768px, and 1440px. Desktop and tablet illustration fits alongside copy; mobile hides it.
- Marquee: reduced-motion computed animation is none; focused link pauses animation. The ticker uses two equal groups with gap/padding included in each group, so -50% translation joins exactly.
- Visually inspected hero, footer, What Sets Us Apart, and testimonial screenshots. Testimonial text is no longer clamped to four small lines and borders remain visible against the background.
- Production Chrome smoke check: homepage rendered without page errors and made zero Spline/runtime-chunk requests with no scene URL configured.
- npm run build: succeeds. Vite default dynamic chunking keeps Spline out of HTML modulepreload; build still warns about large chunks and Spline runtime-resolved WASM/Draco assets.
- Populated /work/global-fintech-platform also rendered at 390px with no horizontal overflow.
- npm run lint: succeeds with 12 existing warnings in unchanged files. git diff --check: passes.

Limits

- Two checks caught transient Vite dependency-rebuild/reload failures. Home and Blog were rerun after the server settled; the saved results contain the passing reruns.
- Browser tooling initially failed to install because of dependency resolution; installing it separately in /tmp resolved that. Early interrupted checks were replaced by the completed final pass. Verification was consolidated after the staged diffs rather than a completed browser pass after each individual stage.
- Dynamic routes were sampled with existing/fallback records; the job detail check exercised its missing/inactive state. Every live CMS slug and the authenticated dashboard were not exhaustively exercised. No credentials or live job ID were provided.
- No real Spline export was supplied. The placeholder is verified; scene rendering, external runtime assets, failure behavior with the real scene, and scene-specific loading performance still require that export.
- No Lighthouse/LCP benchmark or baseline screenshot comparison was run. Visual checks are not a guarantee against every regression.
