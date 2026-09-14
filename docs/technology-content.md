# Editing technology detail pages

Open **Dashboard → Tech Stack → Edit Category** (or Add Category). Under each technology, expand **Edit technology detail page**.

Edit the page slug, hero title/highlight/badge/subtitle, overview, benefit cards and icons, technical features, use cases, numbered delivery steps, FAQs, consultation CTA, and SEO metadata. Add or remove repeatable rows; empty lists hide their public section. Save using **Update Category / Save Category**. Changes are published with the category, using the existing `tech_stack` Firestore permissions.

Technology data stays in the category's `technologies` array. Each technology can now store an optional `slug` and a serializable `page` object. Existing categories do not need migration. Existing supported technologies start with editable default content; newly added technologies start with their own title and empty sections. Editing a field materializes the default page into the category form; saving persists it.

The technology listing and navigation respect the saved slug. Existing compact URLs such as `/technologies/reactjs` remain supported. Unknown technology paths display a not-found state instead of unrelated React content. Avoid changing an established slug unless existing inbound links are updated.

No live data was changed during implementation. Model regression tests: `node --experimental-strip-types --test tests/technology-content.test.mjs`.

The isolated browser regression check (`node tests/technology-browser.mjs`) uses a local Vite server, headless Chrome, and an in-memory Firestore mock. It verifies that a technology page edit saves and renders publicly, starter sections remain intact, mobile width does not overflow, and unknown slugs show a not-found state. It does not write to the live backend.
