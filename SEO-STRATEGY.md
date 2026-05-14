# SEO Strategy — Diving Club Trincomalee (divingclub.lk)

## Strategic Overview

The site has an exceptionally strong technical foundation — all pages export typed `Metadata`, every page has JSON-LD structured data, a dynamic `sitemap.ts` and `robots.ts` exist, semantic HTML with breadcrumbs and internal linking is in place, and 12 blog posts are now live. The gap is in **content authority**, **off-page trust signals**, and **social proof**.

**Core thesis**: Ranking #1 in Trincomalee diving is achievable within 6 months for long-tail terms. Beating International Diving School for head terms requires 12 months of consistent content and citation building. The fastest wins are in HMS Hermes wreck queries, AI-search citations, and blue whale watching content — none of which competitors are investing in.

---

## Keyword Architecture

### Tier 1 — Primary Commercial (Revenue-Direct)

| Keyword | Est. Monthly Volume | Target Page |
|---------|-------------------|-------------|
| scuba diving trincomalee | 1,200 | `/scuba-diving-in-trincomalee` |
| PADI courses trincomalee | 480 | `/courses` |
| open water diver course trincomalee | 320 | `/courses/open-water-diver` |
| dive sites trincomalee | 390 | `/dive-sites` |
| try diving trincomalee | 210 | `/activities/try-diving` |
| whale watching trincomalee | 810 | `/activities/whale-watching` |

### Tier 2 — Destination Keywords

| Keyword | Target Page | Current Gap |
|---------|-------------|-------------|
| hms hermes wreck dive | `/dive-sites/hms-hermes-wreck` + `/blog/hms-hermes-wreck-complete-guide` | Blog live — needs backlinks |
| pigeon island diving | `/dive-sites/pigeon-island` + `/blog/pigeon-island-snorkeling-diving-guide` | Blog live |
| blue whale watching sri lanka | `/blog/blue-whale-watching-trincomalee-guide` | Blog live |
| best time to dive trincomalee | `/blog/best-time-to-dive-trincomalee` | Blog live |
| snorkeling trincomalee | `/activities/snorkeling` | Exists, needs depth |

### Tier 3 — Long-Tail (Fastest-Ranking)

- "is scuba diving scary for beginners" → `/blog/is-scuba-diving-scary-beginners-guide`
- "hms hermes wreck depth" → `/dive-sites/hms-hermes-wreck`
- "best wreck dives sri lanka" → `/blog/best-dive-sites-sri-lanka-complete-guide`
- "PADI open water cost sri lanka" → `/courses/open-water-diver` + `/blog/padi-open-water-course-what-to-expect`
- "divemaster course sri lanka" → `/blog/divemaster-career-guide-sri-lanka`
- "trincomalee travel guide" → `/blog/trincomalee-travel-guide-diving-holiday`

---

## Schema Implementation (Completed)

### Root Layout (`app/layout.tsx`)
- `@type: ["LocalBusiness", "EducationalOrganization"]` ✅
- `sameAs`: Facebook, Instagram, PADI directory ✅
- `areaServed`: Trincomalee, Nilaveli, Uppuveli ✅
- `knowsAbout`: Scuba Diving, PADI Certification, Wreck Diving ✅
- `telephone`: +94743945010 (international format) ✅

### Course Pages
- `CourseInstance` with schedule dates ✅
- `educationalCredentialAwarded` ✅
- `EducationalOrganization` provider type ✅

### Dive Site Pages
- `["TouristAttraction", "SportsActivityLocation"]` dual type ✅
- `additionalProperty` for depth, difficulty, season, visibility ✅

### Activity Pages
- `["TouristAttraction", "SportsEvent"]` for whale watching / try diving ✅
- `eventSchedule` and `location` on seasonal activities ✅

### Blog Posts
- `Article` with `datePublished`, `dateModified`, `author` ✅
- `FAQPage` on all 12 posts ✅
- `BreadcrumbList` via nav element ✅

### Still to Add (Phase 2)
- `AggregateRating` — requires 20+ real reviews collected first
- `Review` JSON-LD on top 5 course pages — requires real reviews
- `speakable` on homepage, `/scuba-diving-in-trincomalee`, best-time blog post

---

## GEO / AI Search Strategy

None of the five competitors are optimizing for AI citations. This is the fastest differentiation path.

**Factual density rule**: Every page that should be AI-cited contains specific numbers (depths, dates, temperatures, costs). "HMS Hermes lies at 27–52m, sunk April 9 1942" gets cited. "Amazing dive site" does not. All 12 blog posts were written to this standard.

**Featured snippet formatting**: All informational content uses 40–60 word direct-answer paragraphs beginning with the question rephrased. This is the exact format Google extracts for AI Overviews.

**Wikipedia**: The HMS Hermes Wikipedia article exists. Add a "Diving" section with verifiable naval history sources. The dive guide becomes a supplementary reference. This is the single highest-leverage AI citation action.

**Speakable schema**: Add to homepage, `/scuba-diving-in-trincomalee`, and `best-time-to-dive-trincomalee` post.

**robots.txt confirms** GPTBot, ClaudeBot, PerplexityBot are allowed (verified in existing `robots.ts`).

---

## Off-Page Priority Queue

### Week 1 (Do First)
1. **Google Business Profile** — verify "Diving Club" at 74/9 Sandy Cove, 31000 Trincomalee. Without this, the local 3-pack is closed. Set primary category: Scuba Instructor.
2. **PADI directory** — listing exists at padi.com/dive-center/sri-lanka/diving-club/ — verify it links to divingclub.lk with matching NAP.
3. **TripAdvisor** — claim/create listing. Start review collection immediately.

### Week 2–4
4. **Review collection** — print QR code cards linking directly to TripAdvisor review form. Target: 30 reviews in 90 days.
5. **NAP audit** — canonical NAP: "Diving Club | 74/9, Sandy Cove, Trincomalee, 31000, Sri Lanka | +94743945010"

### Months 2–6
6. **Citation building**: sltda.gov.lk, viator.com, getyourguide.com, Lonely Planet, WikiVoyage
7. **Link building**: Pitch HMS Hermes guide to naval history blogs, WW2 sites, wreck diving forums
8. **Hotel partnerships**: Fort Frederick Hotel, Club Oceanic, Chaaya Blu — diving package + reciprocal link

---

## KPI Targets

| Metric | Baseline | 3-Month | 6-Month | 12-Month |
|--------|----------|---------|---------|----------|
| Organic clicks (GSC) | ~0 | 300–500/mo | 1,500–2,500/mo | 5,000–8,000/mo |
| Keywords top 10 | ~0 | 25–40 | 80–120 | 200+ |
| "scuba diving trincomalee" rank | Unranked | Top 20 | Top 5 | #1–3 |
| "hms hermes wreck dive" rank | Unranked | Top 5 | #1–2 | #1 |
| TripAdvisor reviews | 0 | 30+ | 60+ | 100+ |
| GBP views | 0 | 500/mo | 2,000+/mo | 4,000+/mo |
| Domain Authority (Ahrefs DR) | ~5 | 10–12 | 20–25 | 30–35 |
| External backlinks | ~0 | 10–15 | 40–60 | 100+ |
| Blog posts live | 12 | 14–16 | 18–20 | 24+ |
| Featured snippets | 0 | 3–5 | 10+ | 15+ |
| AI citations | 0 | Occasional | Regular | Consistent |
