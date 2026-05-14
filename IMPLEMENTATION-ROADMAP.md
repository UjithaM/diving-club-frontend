# Implementation Roadmap — 12-Month SEO Plan

## Phase 1 — Foundation (Weeks 1–4)

### Code Tasks (COMPLETED)
- [x] `app/layout.tsx` — `LocalBusiness` + `EducationalOrganization` dual type, `sameAs`, `areaServed`, `knowsAbout`, international phone format
- [x] `app/courses/[slug]/page.tsx` — `CourseInstance`, `educationalCredentialAwarded`, `EducationalOrganization` provider
- [x] `app/dive-sites/[slug]/page.tsx` — `SportsActivityLocation` dual type, `additionalProperty` for depth/visibility/difficulty
- [x] `app/activities/[slug]/page.tsx` — `SportsEvent` type + `eventSchedule` for whale watching / try diving
- [x] `lib/types.ts` — `BlogPost` and `BlogPostFaq` interfaces
- [x] `lib/data/blog-posts.ts` — 12 fully-written posts with body, FAQs, internal links
- [x] `app/blog/[slug]/page.tsx` — complete blog detail page with `Article` + `FAQPage` schema
- [x] `app/blog/page.tsx` — real posts index replacing "coming soon" placeholder
- [x] `app/sitemap.ts` — blog posts added to sitemap with `lastModified` from `updatedAt`

### Off-Site Tasks (Owner: Business)

**Week 1 (Do immediately — these unlock everything else)**

- [ ] **Claim and verify Google Business Profile** for "Diving Club" at 74/9 Sandy Cove, 31000 Trincomalee
  - Primary category: Scuba Instructor
  - Additional categories: Diving Center, Water Sports Instructor, Boat Tour Agency
  - Business description (750 chars): lead with "Trincomalee's PADI-certified diving center on Sandy Cove..."
  - Add 25 photos immediately: dive boats, instructors with equipment, underwater shots, HMS Hermes if available
  - Enable WhatsApp messaging
  - Set seasonal hours: Mo–Su 07:30–18:00 (May–October)

- [ ] **Verify PADI directory listing** at padi.com/dive-center/sri-lanka/diving-club/
  - Confirm link points to https://divingclub.lk
  - Confirm NAP matches: "Diving Club | 74/9, Sandy Cove, Trincomalee, 31000 | +94 74 394 5010"

- [ ] **Set up Google Search Console**
  - Verify domain https://divingclub.lk
  - Submit sitemap: https://divingclub.lk/sitemap.xml
  - Also submit to Bing Webmaster Tools

**Week 2**

- [ ] **Claim/create TripAdvisor listing**
  - Category: Outdoor Activities > Diving & Snorkeling
  - Add full NAP, website, description

- [ ] **Pre-populate GBP Q&A** with 10 questions:
  1. "Do you offer PADI courses?" — Yes, we offer the full range from Discover Scuba to Divemaster. Our most popular is the PADI Open Water Diver course ($395).
  2. "What is the minimum age to scuba dive?" — Minimum age for try diving and junior courses is 10. Standard PADI Open Water certification requires age 15.
  3. "Can complete beginners scuba dive?" — Yes. Our Discover Scuba Diving experience is designed for people with no experience — we handle everything, you just bring your curiosity.
  4. "What months is the diving season?" — May to October. The northeast monsoon retreats in May, leaving calm water and 15–30m visibility through to October.
  5. "How deep is the HMS Hermes wreck?" — HMS Hermes lies at 27–52 metres. The main flight deck is at 35 metres. Advanced Open Water certification is required.
  6. "What dive sites are near Trincomalee?" — 15 dive sites including HMS Hermes aircraft carrier wreck, Pigeon Island National Park, Swami Rock, Coral Garden, and more.
  7. "Do you offer whale watching trips?" — Yes. Blue whale watching trips run March to June. Sightings rates exceed 90% in April.
  8. "What's included in dive packages?" — All equipment, briefing, boat transfer, and guide. PADI courses include certification fees and learning materials.
  9. "Is snorkeling available for non-divers?" — Yes. Snorkeling tours to Pigeon Island are available for all ages and swimming abilities.
  10. "Where are you located?" — Sandy Cove, Trincomalee (74/9, Sandy Cove, 31000). 5 minutes from Trincomalee town centre.

**Week 3**

- [ ] **Start review collection** — print QR code cards linking directly to TripAdvisor review form URL. Give one to every customer after every session. Target: 30 reviews in 90 days.

- [ ] **NAP consistency audit** — verify all instances of the business name, address, and phone match exactly on: footer, contact page, JSON-LD, GBP, PADI directory, TripAdvisor, social profiles.
  - Canonical: "Diving Club | 74/9, Sandy Cove, Trincomalee, 31000, Sri Lanka | +94743945010"

**Week 4**

- [ ] Submit try diving and whale watching activities to **Viator** (viator.com/create-listing)
- [ ] Submit to **GetYourGuide** (supplier.getyourguide.com)
- [ ] Submit to **Lonely Planet Trincomalee activities** directory
- [ ] Weekly GBP post (first post: "Trincomalee diving season is open — here's what's waiting underwater")

---

## Phase 2 — Content Authority (Weeks 5–12)

### Code Tasks

- [ ] Add `speakable` schema to `app/page.tsx` (homepage)
- [ ] Add `speakable` schema to `app/scuba-diving-in-trincomalee/page.tsx`
- [ ] Deepen `/activities/whale-watching` page content to 800+ words with factual data
- [ ] Deepen `/dive-sites/hms-hermes-wreck` page to 1,500+ words (dive planning focus)
- [ ] Create `/about/padi-certification/page.tsx` — dedicated PADI affiliation page
- [ ] Add `AggregateRating` to `app/layout.tsx` LocalBusiness schema (after 20+ real reviews)
- [ ] Audit all 15 course detail pages and 15 dive site detail pages — expand any under 400 words to 600+

### Off-Site Tasks

**Weeks 5–6**

- [ ] Begin Wikipedia HMS Hermes article editing — add a "Diving" section with verifiable naval historical sources (Imperial War Museum, Naval History and Heritage Command). The dive guide becomes a supplementary external reference.
- [ ] Apply to **Booking.com Experiences** (booking.com/experiences/partner)
- [ ] Pitch HMS Hermes guide to 5 naval history / wreck diving sites:
  - Email template: "We've just published what we believe is the most comprehensive dive guide to HMS Hermes online. Given your coverage of [WW2 naval history / wreck diving], your readers might find it valuable..."
  - Target sites: naval history forums, WW2 aviation sites, dive magazine websites

**Weeks 7–8**

- [ ] Submit sitemap to **Bing Webmaster Tools** (bing.com/webmasters)
- [ ] **SLTDA registration** — submit to Sri Lanka Tourism Development Authority licensed operator list (sltda.gov.lk)

**Weeks 9–10**

- [ ] Begin hotel partnership outreach — email Fort Frederick Hotel, Club Oceanic, Chaaya Blu proposing a "diving package" with reciprocal website link
- [ ] **GBP post cadence** — post every 7 days during season: dive conditions report, marine life sightings, student certifications, course availability. Include address + phone in each post.

**Weeks 11–12**

- [ ] Audit all 12 blog posts for internal link density — every post should have 3+ links to commercial pages
- [ ] Submit to **WikiVoyage Trincomalee** page — add factual mention of HMS Hermes with dive guide link

---

## Phase 3 — Authority Compounding (Months 4–6)

### Code Tasks

- [ ] Add `Review` JSON-LD items to top 5 course pages (use real reviews with permission)
- [ ] Replace gallery "coming soon" with real photos (minimum 20) with descriptive filenames and alt text
- [ ] Add monthly "Dive Conditions Report" blog post (300 words, month-by-month visibility/temp/notable sightings)
- [ ] Set up GA4 conversion tracking: course enquiry form submissions, phone number clicks, booking button clicks, WhatsApp initiations

### Off-Site Tasks

- [ ] Run systematic backlink outreach: 10 Sri Lanka travel bloggers, 5 wildlife/nature sites (whale watching angle), 5 naval history sites (HMS Hermes angle)
- [ ] Deepen `/scuba-diving-in-sri-lanka` to 3,000+ words to compete for the broader national keyword
- [ ] Submit Diving Club entity to **Wikidata** as a diving-related business
- [ ] Evaluate and submit to **srilanka.travel** activities directory

---

## Phase 4 — Market Leadership (Months 7–12)

### Code Tasks

- [ ] Add multilingual versions: `/de/` and `/fr/` homepage + try diving page (captures European dive tourists — Epic Ocean Adventures already does this)
- [ ] Create `/events/` section for seasonal announcements (season opening, whale watching season, special courses)
- [ ] Build "Trincomalee Diving Conditions Archive" page — historical visibility/temperature data by month (perpetual reference link target)

### Off-Site Tasks

- [ ] **YouTube channel** — film HMS Hermes dive video. Virtually no competition for "hms hermes dive" on YouTube. Also: Pigeon Island turtles, whale watching, student certification moments.
- [ ] Pitch at least one Sri Lanka print/online travel publication for a Trincomalee diving feature editorial
- [ ] If Google Ads budget available: run ads for "scuba diving trincomalee" and "PADI courses trincomalee" alongside organic to double-occupy results page
- [ ] Evaluate **PADI 5-Star** application — the 5-Star designation is one of three things all dominant competitors share. Changes competitive positioning significantly.
- [ ] Full 12-month content audit: identify blog posts ranking positions 5–20, expand to push into top 5

---

## Weekly GBP Post Schedule (May–October)

| Week | Topic |
|------|-------|
| Season opening | "Trincomalee diving season 2025 is open — here's what's waiting for you underwater" |
| +1 week | Dive site spotlight: HMS Hermes — current visibility + conditions |
| +2 weeks | Marine life sighting: [most recent notable encounter] |
| +3 weeks | New student certification photo (with permission) |
| Repeat monthly | Dive conditions report with visibility, temperature, notable sightings |

---

## Review Collection Script (Give to all instructors)

After every completed session, hand the customer a card:

> "Thanks for diving with us today — we'd love a review if you have 2 minutes. Just scan this QR code."
> [QR code linking directly to TripAdvisor review form]

Do not ask in the water. Ask at the point of departure, when the experience is freshest. The QR code must go directly to the review form, not to the TripAdvisor listing page.
