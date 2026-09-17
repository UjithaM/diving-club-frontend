# Graph Report - diving-club-frontend  (2026-09-17)

## Corpus Check
- 152 files · ~171,722 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 836 nodes · 1795 edges · 47 communities (42 shown, 4 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 19 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ce2d6731`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- getCourseBySlug
- Header.tsx
- package.json
- CountrySelect.tsx
- fieldStyles.ts
- Storing ad attribution on bookings — backend guide
- Diving Club — Site Plan & Competitor Research
- Button.tsx
- BookingFields.tsx
- api/courses.ts
- Schema Implementation (Completed)
- compilerOptions
- AdLandingPage.tsx
- Post Details
- safeJsonLd
- ActivitiesGrid.tsx
- Components
- Top 5 Competitors
- about/page.tsx
- BookingForm
- Implementation Roadmap — 12-Month SEO Plan
- courses/[slug]/page.tsx
- dive-sites/[slug]/page.tsx
- GoogleReviewsSection.tsx
- BookingForm.tsx
- types.ts
- app/page.tsx
- AdBookingForm.tsx
- DetailPanel.tsx
- getCourses
- Product
- SlotPicker.tsx
- Site Structure — URL Hierarchy & Keyword Assignments
- activities/[slug]/page.tsx
- layout.tsx
- getExperienceBySlug
- CLAUDE.md
- packages/[slug]/page.tsx
- discount.ts
- DiveSiteGrid.tsx
- Surface brief: divingclub.lk (whole public site)
- POST
- README.md
- AGENTS.md
- eslint.config.mjs
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `safeJsonLd()` - 39 edges
2. `next` - 31 edges
3. `BookingForm()` - 26 edges
4. `schema-dts` - 21 edges
5. `Diver()` - 17 edges
6. `getCourses()` - 16 edges
7. `react` - 16 edges
8. `compilerOptions` - 16 edges
9. `PageHero()` - 15 edges
10. `getCourseBySlug()` - 15 edges

## Surprising Connections (you probably didn't know these)
- `AboutPage()` --calls--> `safeJsonLd()`  [EXTRACTED]
  app/about/page.tsx → lib/jsonld.ts
- `generateStaticParams()` --calls--> `getExperiences()`  [EXTRACTED]
  app/activities/[slug]/page.tsx → lib/api/experiences.ts
- `generateMetadata()` --calls--> `getExperienceBySlug()`  [EXTRACTED]
  app/activities/[slug]/page.tsx → lib/api/experiences.ts
- `ActivityDetailPage()` --calls--> `getExperienceBySlug()`  [EXTRACTED]
  app/activities/[slug]/page.tsx → lib/api/experiences.ts
- `ActivityDetailPage()` --calls--> `safeJsonLd()`  [EXTRACTED]
  app/activities/[slug]/page.tsx → lib/jsonld.ts

## Import Cycles
- None detected.

## Communities (47 total, 4 thin omitted)

### Community 0 - "getCourseBySlug"
Cohesion: 0.27
Nodes (9): GET(), generateMetadata(), DivePage(), fromPrice(), generateMetadata(), fromPrice(), generateMetadata(), OpenWaterPage() (+1 more)

### Community 1 - "Header.tsx"
Cohesion: 0.16
Nodes (8): DesktopDropdown(), DropdownProps, Header(), onScroll(), update(), HeaderProps, NavItem, buttonClass()

### Community 2 - "package.json"
Cohesion: 0.06
Nodes (34): dependencies, next, @paypal/react-paypal-js, react, react-dom, react-hook-form, react-phone-number-input, devDependencies (+26 more)

### Community 3 - "CountrySelect.tsx"
Cohesion: 0.12
Nodes (23): CountrySelect(), close(), onKeyDown(), onPointerDown(), select(), CountrySelectProps, dialCode(), Flag() (+15 more)

### Community 4 - "fieldStyles.ts"
Cohesion: 0.18
Nodes (10): seatLabels(), SeatMap(), SeatMapProps, ContactForm(), handleSubmit(), errorInputClass, hintClass, inputClass (+2 more)

### Community 5 - "Storing ad attribution on bookings — backend guide"
Cohesion: 0.07
Nodes (26): a. Migration, b. `app/Models/Booking.php`, c. `app/Http/Controllers/Api/BookingController.php` — `store()`, d. Admin — surface it, Storing ad attribution on bookings — backend guide, Verify, What this sets up next, Google Ads conversion tracking — setup guide (+18 more)

### Community 6 - "Diving Club — Site Plan & Competitor Research"
Cohesion: 0.07
Nodes (27): 1.1 Navigation Structure, 1.2 Service Pages, 1.3 PADI Course Catalogue, 1.4 Booking & Conversion Flow, 1.5 Trust Signals & Credibility, 1.6 Content Architecture Patterns, 1. Competitor Research — Divinguru.com, 2.1 Pages & Routes (+19 more)

### Community 7 - "Button.tsx"
Cohesion: 0.14
Nodes (16): FeaturedExperiencesSection(), Cell, GallerySection(), Arrow(), sizes, Variant, variants, ExperienceCard() (+8 more)

### Community 8 - "BookingFields.tsx"
Cohesion: 0.19
Nodes (19): POST(), NOTE: `date` is optional here, but the Laravel backend still has it `required`,…, BookingFields(), BookingFieldsProps, rule(), BookingFormValues, phoneFieldError(), BookingPayload (+11 more)

### Community 9 - "api/courses.ts"
Cohesion: 0.28
Nodes (7): apiItem(), apiList(), isItem(), LEVELS, getActivePromotions(), Promotion, TravelPackage

### Community 10 - "Schema Implementation (Completed)"
Cohesion: 0.10
Nodes (19): Activity Pages, Blog Posts, Course Pages, Dive Site Pages, GEO / AI Search Strategy, Keyword Architecture, KPI Targets, Months 2–6 (+11 more)

### Community 11 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 12 - "AdLandingPage.tsx"
Cohesion: 0.16
Nodes (16): items, WhyChooseUsSection(), ReefScene(), style(), BrainCoral(), BranchCoral(), Bubbles(), FanCoral() (+8 more)

### Community 13 - "Post Details"
Cohesion: 0.11
Nodes (17): Content Calendar — Diving Club Blog (divingclub.lk/blog), Content Rules (Apply to All Posts), Post 10 — Trincomalee vs Hikkaduwa, Post 11 — Divemaster Career Guide, Post 12 — Trincomalee Travel Guide, Post 1 — HMS Hermes Wreck Complete Guide, Post 2 — Best Time to Dive Trincomalee, Post 3 — Is Scuba Diving Scary (+9 more)

### Community 14 - "safeJsonLd"
Cohesion: 0.06
Nodes (60): ActivitiesPage(), metadata, blogIndexJsonLd, BlogIndexPage(), categoryLabels, categoryTones, metadata, BlogPostPage() (+52 more)

### Community 15 - "ActivitiesGrid.tsx"
Cohesion: 0.14
Nodes (12): ActivitiesGrid(), ActivityType, defaultTypeMeta, filterLabels, typeMeta, types, CourseGrid(), filterLabels (+4 more)

### Community 16 - "Components"
Cohesion: 0.06
Nodes (30): Buttons, Cards / Containers, Chips, Colors, Components, Depth gauge and depth stops (signature), Design System: Diving Club, Dive-site depth profile (signature) (+22 more)

### Community 17 - "Top 5 Competitors"
Cohesion: 0.12
Nodes (16): 1. International Diving School Trincomalee, 2. Poseidon Diving Sri Lanka, 3. Epic Ocean Adventures, 4. Pearl Divers Sri Lanka, 5. Divinguru, Backlink Comparison (Estimated), Competitive Gap Analysis, Competitor Analysis — Diving Club Trincomalee (+8 more)

### Community 18 - "about/page.tsx"
Cohesion: 0.16
Nodes (11): AboutPage(), aboutPageJsonLd, metadata, personJsonLd, stats, values, stats, StatsSection() (+3 more)

### Community 19 - "BookingForm"
Cohesion: 0.22
Nodes (15): apiType(), BookingForm(), choiceFor(), lineMaxQuantity(), lineQuantity(), onPick(), onValid(), optionFor() (+7 more)

### Community 20 - "Implementation Roadmap — 12-Month SEO Plan"
Cohesion: 0.12
Nodes (15): Code Tasks, Code Tasks, Code Tasks, Code Tasks (COMPLETED), Implementation Roadmap — 12-Month SEO Plan, Off-Site Tasks, Off-Site Tasks, Off-Site Tasks (+7 more)

### Community 21 - "courses/[slug]/page.tsx"
Cohesion: 0.21
Nodes (10): courseDescriptions, courseH1s, courseTitles, levelMeta, FaqAccordion(), FaqAccordionProps, Zone, TickDot() (+2 more)

### Community 22 - "dive-sites/[slug]/page.tsx"
Cohesion: 0.17
Nodes (13): GET(), GET(), defaultDifficultyMeta, difficultyMeta, diveSiteDescriptions, DiveSiteDetailPage(), diveSiteH1s, diveSiteTitles (+5 more)

### Community 23 - "GoogleReviewsSection.tsx"
Cohesion: 0.18
Nodes (6): avatarTones, GoogleReviewsSection(), Review, reviews, ScrollButtons(), DepthStop()

### Community 24 - "BookingForm.tsx"
Cohesion: 0.13
Nodes (15): Req(), BookingFormProps, BookingLine, BookingType, DiscountBanner(), ItemOption, NO_SLOT, SuccessSummary (+7 more)

### Community 25 - "types.ts"
Cohesion: 0.06
Nodes (32): metadata, AdBookingFormProps, AdLandingPageProps, BookingConfirmationClient(), Props, PaymentStep, option(), PaymentStep() (+24 more)

### Community 26 - "app/page.tsx"
Cohesion: 0.18
Nodes (12): faqJsonLd, metadata, touristAttractionJsonLd, ContactCtaSection(), DiveSitesSection(), FeaturedCoursesSection(), tilt, HeroSection() (+4 more)

### Community 27 - "AdBookingForm.tsx"
Cohesion: 0.25
Nodes (8): AdBookingForm(), onValid(), trackBookingBlocked(), fresh, getAttribution(), fieldErrorsFromApi(), useFormAbandon(), revealField()

### Community 28 - "DetailPanel.tsx"
Cohesion: 0.24
Nodes (7): ActivityDetailClient(), ActivityDetailClientProps, CourseDetailClient(), CourseDetailClientProps, DiveSiteDetailClient(), DiveSiteDetailClientProps, DetailPanel()

### Community 29 - "getCourses"
Cohesion: 0.21
Nodes (11): GET(), generateStaticParams(), CourseDetailPage(), generateStaticParams(), fromPrice(), generateMetadata(), PadiPage(), sitemap() (+3 more)

### Community 30 - "Product"
Cohesion: 0.18
Nodes (10): Brand Commitments, Capabilities and Constraints, Evidence on Hand, Operating Context, Platform, Positioning, Product, Product Principles (+2 more)

### Community 31 - "SlotPicker.tsx"
Cohesion: 0.24
Nodes (8): FieldError(), SlotPicker(), SlotPickerProps, errorId(), getSlots(), Slot, SlotChoice, react

### Community 32 - "Site Structure — URL Hierarchy & Keyword Assignments"
Cohesion: 0.20
Nodes (9): Blog → Commercial Page Link Rules, Dive Site → Course Cross-Links (existing via `relatedCourses`), Hub Pages (receive most internal links), Internal Linking Map, Keyword-to-Page Mapping, Schema Coverage by Page Type, Site Structure — URL Hierarchy & Keyword Assignments, Sitemap Priority Matrix (+1 more)

### Community 33 - "activities/[slug]/page.tsx"
Cohesion: 0.15
Nodes (15): activityDescriptions, ActivityDetailPage(), activityH1s, activityTitles, defaultTypeMeta, generateStaticParams(), typeMeta, GET() (+7 more)

### Community 34 - "layout.tsx"
Cohesion: 0.07
Nodes (33): BookPage(), jsonLd, bricolage, geist, localBusinessJsonLd, metadata, RootLayout(), toNav() (+25 more)

### Community 35 - "getExperienceBySlug"
Cohesion: 0.33
Nodes (7): generateMetadata(), GET(), fromPrice(), FunDivesPage(), generateMetadata(), AdLandingPage(), getExperienceBySlug()

### Community 36 - "CLAUDE.md"
Cohesion: 0.22
Nodes (7): Architecture, Business Identity, Commands, Content Rules, Design System — Brand Colors, SEO — Primary Concern, Stack

### Community 37 - "packages/[slug]/page.tsx"
Cohesion: 0.42
Nodes (8): BUSINESS, generateMetadata(), generateStaticParams(), money(), PackageDetailPage(), snippet(), getPackageBySlug(), getPackages()

### Community 38 - "discount.ts"
Cohesion: 0.61
Nodes (6): cartSubtotal(), depositRuleLabel(), headcount(), previewDiscount(), round2(), subtotal()

### Community 46 - "DiveSiteGrid.tsx"
Cohesion: 0.21
Nodes (9): chip, difficulties, Difficulty, DiveSiteGrid(), filterLabels, MiniGauge(), DepthProfile(), parseDepth() (+1 more)

### Community 49 - "Surface brief: divingclub.lk (whole public site)"
Cohesion: 0.29
Nodes (6): Constraints (owner, 2026-09-16), Direction contract, Open items, Phase 2 (2026-09-17), Rasters and provenance, Surface brief: divingclub.lk (whole public site)

### Community 52 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

## Knowledge Gaps
- **325 isolated node(s):** `metadata`, `personJsonLd`, `aboutPageJsonLd`, `stats`, `values` (+320 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 378 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `safeJsonLd` to `getCourseBySlug`, `activities/[slug]/page.tsx`, `layout.tsx`, `getExperienceBySlug`, `package.json`, `packages/[slug]/page.tsx`, `api/courses.ts`, `about/page.tsx`, `courses/[slug]/page.tsx`, `dive-sites/[slug]/page.tsx`, `types.ts`, `app/page.tsx`, `getCourses`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Why does `react` connect `SlotPicker.tsx` to `Header.tsx`, `layout.tsx`, `CountrySelect.tsx`, `fieldStyles.ts`, `package.json`, `DiveSiteGrid.tsx`, `ActivitiesGrid.tsx`, `GoogleReviewsSection.tsx`, `BookingForm.tsx`, `types.ts`, `AdBookingForm.tsx`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Why does `safeJsonLd()` connect `safeJsonLd` to `activities/[slug]/page.tsx`, `layout.tsx`, `packages/[slug]/page.tsx`, `about/page.tsx`, `courses/[slug]/page.tsx`, `dive-sites/[slug]/page.tsx`, `app/page.tsx`, `getCourses`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **What connects `metadata`, `personJsonLd`, `aboutPageJsonLd` to the rest of the system?**
  _325 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._
- **Should `CountrySelect.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1206896551724138 - nodes in this community are weakly interconnected._
- **Should `Storing ad attribution on bookings — backend guide` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._