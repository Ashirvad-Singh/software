UI/UX review

Step diffs: 01-marquee.patch, 02-spacing.patch, 03-contrast.patch, 04-hero.patch. These record the implementation checkpoints; final-review.patch includes subsequent verification fixes.

Routes audited: /; /services; /services/:slug; /technologies; /technologies/:slug; /work; /work/:slug; /case-studies; /case-studies/:slug; /about; /process (About alias); /contact; /team; /gallery; /careers; /careers/:id; /blog; /blog/:slug; /privacy; /terms; /dashboard; * (404).

File changes grouped by affected pages

- All public pages including 404: src/components/site/Footer.tsx (bounded, accessible animated chat pills), CTASection.tsx (spacing), Navbar.tsx (menu label contrast). Dashboard intentionally has no public footer/CTA/navbar.
- All pages: src/index.css (darker light-theme muted text, marquee animation in the utilities layer so reduced-motion overrides work).
- Shared page banners: src/components/site/SubBanner.tsx (responsive top clearance for Services, Technologies, About/Process, Contact, Team, Gallery, Blog, Case Studies).
- Home: src/pages/HomePage.tsx; src/components/site/HeroModern.tsx, HeroScene.tsx (new), WhatSetsUsApart.tsx, Testimonials.tsx, FaqSection.tsx, HomeCaseStudiesAndBlog.tsx; src/components/v1/skiper17.tsx. Shorter hero, reusable isometric placeholder/deferred scene, tighter sections and card scroll travel, stronger testimonial/card contrast.
- Home and Services: src/components/site/HomeServicesSection.tsx.
- About and Process: src/components/site/AboutSection.tsx, CoreValuesSection.tsx, ProcessTimeline.tsx.
- Team: src/components/site/TeamShowcaseScroll.tsx.
- Work: src/pages/WorkPage.tsx, ProjectDetailPage.tsx; src/components/site/Portfolio.tsx (legacy reusable section standardized).
- Case studies: src/pages/CaseStudiesPage.tsx, CaseStudyDetailPage.tsx.
- Services: src/pages/ServicesPage.tsx, ServiceDetailPage.tsx.
- Technologies: src/pages/TechnologiesPage.tsx, TechnologyDetailPage.tsx.
- Careers: src/pages/CareersPage.tsx, JobDetailPage.tsx.
- Contact: src/pages/ContactPage.tsx.
- Blog: src/pages/BlogPage.tsx, BlogPostPage.tsx.
- Legal: src/pages/PrivacyPolicyPage.tsx, TermsOfServicePage.tsx.
- Dashboard: src/pages/DashboardPage.tsx (light-surface labels/icons; login retains its dark-surface text).
- Reusable CTA: src/components/site/UpgradeBrandCta.tsx (section scale).
- Dependency/build integration: package.json, package-lock.json, vite.config.ts (Spline dependency and lazy chunk isolation).
- Review artifacts: this document, checkpoint patches, final-review.patch, browser-results.json, verification.md, and selected screenshots.

Spacing decisions

Major content sections use py-10 md:py-16 (40/64px). Compact filter bars, nested article sections, and navbar clearance retain their purpose-specific spacing. There was no pt-[187px] pattern; excessive scale-based padding included Team md:pb-48, Services md:py-28, Careers py-24, and Process pb-28 md:pb-32. Home's full-viewport hero and case-study scroll travel were tightened. No shared Section component existed, so existing shared section components and page wrappers were edited directly.

Content requiring owner review (copy was not invented or replaced)

- Testimonials.tsx has static sample endorsements with generated/avatar-service portraits, including “This is the testimonial we feature everywhere” and component-kit copy. Confirm real quotes, names, roles, and permission to publish them. Existing logic can mix static endorsements into a short live result set.
- CTASection.tsx contains an unnamed endorsement attributed only to “Tech Entrepreneur.”
- Footer.tsx has a 555 phone number, “123 Tech Lane” address, and social links pointing to #.
- HomeCaseStudiesAndBlog.tsx contains sample case studies and fallback posts (including future October 2026 dates). Verify claims and publication dates before publishing.

Spline handoff

HeroScene.tsx follows the repository's TypeScript convention. Supply the scene URL from Spline's React export through VITE_SPLINE_SCENE_URL or the scene prop. Example environment configuration:

    VITE_SPLINE_SCENE_URL=https://prod.spline.design/YOUR_EXPORT/scene.splinecode

Restart Vite after setting the environment value. With no URL, no scene/runtime is mounted and the lightweight CSS isometric workspace remains visible on desktop. Mobile hides the scene; reduced motion keeps the static illustration. IntersectionObserver plus an 800ms delay defers scene loading. Suspense and a local error boundary retain the placeholder during loading or scene failures. The wrapper cannot intercept CTA pointer events.

Official integration reference: https://github.com/splinetool/react-spline

The actual exported scene was not provided, so its appearance, external asset URLs, runtime behavior, and scene-specific performance remain unverified. Spline emits build warnings about runtime-resolved WASM/Draco URLs; these need checking with the supplied scene. No production deployment or external data writes were performed.
