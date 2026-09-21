# Projects and case studies

Projects live at `/work` (also `/projects`), and case studies at `/case-studies`. Both are accessible from the navigation and cross-links on the listing pages. The dashboard retains separate Projects and Case Studies tabs, with distinct editorial fields. Case studies link to projects by Firestore document ID, so changing a project slug does not break the relationship. A deleted or unpublished reference is omitted on public pages.

## Editorial workflow

1. Add a Project or Case Study in the dashboard. New entries default to Draft.
2. Add the title, category, description, cover image, services, technologies, and any optional fields. Titles generate editable slugs. For stories, add the overview, challenge, solution, and outcomes, plus supporting narrative and optional verified metrics.
3. Save an incomplete draft, or select Published and save once required fields are complete. Featured entries sort first; featured projects appear on the homepage. Homepage case studies prioritize featured entries.
4. Edit published content, unpublish it to a draft, or delete it. Deletion requires confirmation. Slugs are unique within each collection, with transactional reservations in `content_slugs` to protect concurrent edits.

Existing records without `status: "published"` now appear as drafts in the CMS. Review and publish them deliberately. No database migration or automatic publishing was performed. Public pages no longer fall back to fabricated sample projects or metrics. Legacy tags, galleries, metrics, and results are normalized for editing. Empty collections and connection errors have distinct public states.

Cloudinary uploads use the existing environment configuration. Direct image URLs and local public asset paths are also supported. Gallery URLs are separated by newlines, preserving commas in image transformation URLs. Metrics use one `value|label` pair per line in the editor. SEO metadata falls back to the entry title and description.

## Firebase deployment requirement

This repository does not contain the deployed Firestore rules or admin credentials. The existing dashboard authentication and Firebase configuration are reused. **Before production, merge `content-firestore.rules` into the existing rules and adapt its admin predicate to the site's established admin authorization.** The example uses the `admin` custom claim. Ensure that `content_slugs` allows the same administrators to transact; otherwise saving correctly reports a permission error.

Remove any overlapping rule that grants unrestricted reads to these collections: the frontend publication filter alone is not a security boundary. Public reads query `status == published`, allowing draft protection by the supplied rules without a composite index. Keep rules for other collections intact. This rules fragment is not a replacement for the complete application's rules and has not been deployed.

Check with the Firebase emulator or a staging project: anonymous users may query published content but cannot read a draft by ID or write; approved administrators can list drafts, create, edit, publish, unpublish, reserve slugs, and delete. Concurrent saves using one slug must allow only one owner. No live database writes were made during implementation.

## Verification

- `npm run build`
- `npm run lint`
- `node --experimental-strip-types --test tests/content-model.test.mjs`

Listing load-more displays six entries at a time; filtering searches the loaded published collection. For very large catalogs, replace this with indexed server-side search and cursor pagination.

Browser smoke checks are saved as `tests/content-browser.mjs` and `tests/content-admin-browser.mjs`. Run a local Vite server and headless Chrome with remote debugging on port 9223, then run each script with Node (`CONTENT_TEST_URL` defaults to `http://127.0.0.1:5174`). These tests intercept content reads and CMS database calls in Chrome using fixtures; they do not authenticate to or mutate production Firebase. They cover listing filters, load-more, relationships, responsive overflow, error/empty states, draft creation, slug generation, editing, publication, unpublication, deletion, and the separate case study fields. They do not replace the staging/emulator authorization checks above.

## Optional project client reviews

Project Add/Edit now includes a Client Review / Testimonial section. It stores `clientReview` on the existing project document, with enabled, clientName, clientRole, clientCompany, clientPhoto, integer rating (1–5), and testimonial. The existing Cloudinary ImageUpload handles the optional photo. No reviews are seeded; duplicating a project starts with a disabled, empty review.

Only the individual `/work/:slug` project page renders this review, before its CTA, when enabled and nonblank. Listings and case studies do not render it. Legacy projects remain valid. The shared normalizer supplies safe defaults and the save handler validates rating and photo URLs.

The optional-map validation in `docs/content-firestore.rules` must be merged into the deployed project rules using the site's existing administrator authorization predicate. This repository has a rules integration snippet, not a configured Firebase deployment. Client validation is active in the app; server enforcement requires deploying the merged rules.

Regression checks: `node --experimental-strip-types --test tests/client-review.test.mjs` and `node tests/client-review-browser.mjs`. Browser checks mock Firestore, verify create/update/render and legacy records, and check the project review and company links at 390/768/1440px. No test feedback is written to production.
