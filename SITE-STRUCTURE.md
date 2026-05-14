# Site Structure — URL Hierarchy & Keyword Assignments

## URL Architecture

```
divingclub.lk/
├── /                                          ← Home
├── /about                                     ← About
├── /about/padi-certification                  ← PADI Credentials (to create)
├── /contact                                   ← Contact
├── /faq                                       ← FAQ
├── /gallery                                   ← Gallery
├── /book                                      ← Booking
│
├── /scuba-diving-in-trincomalee               ← Trincomalee Pillar
├── /scuba-diving-in-sri-lanka                 ← Sri Lanka Pillar
│
├── /courses                                   ← Courses Index
│   ├── /courses/discover-scuba-diving
│   ├── /courses/scuba-diver
│   ├── /courses/open-water-diver
│   ├── /courses/advanced-open-water-diver
│   ├── /courses/rescue-diver
│   ├── /courses/emergency-first-response
│   ├── /courses/deep-diving
│   ├── /courses/underwater-photography
│   ├── /courses/wreck-diving
│   ├── /courses/night-diving
│   ├── /courses/enriched-air-nitrox
│   ├── /courses/peak-performance-buoyancy
│   ├── /courses/underwater-navigator
│   ├── /courses/coral-reef-conservation
│   └── /courses/divemaster
│
├── /dive-sites                                ← Dive Sites Index
│   ├── /dive-sites/hms-hermes-wreck           ← Flagship site
│   ├── /dive-sites/pigeon-island
│   ├── /dive-sites/swami-rock
│   ├── /dive-sites/coral-garden
│   ├── /dive-sites/crow-island
│   ├── /dive-sites/white-rock
│   ├── /dive-sites/north-reef
│   ├── /dive-sites/knife-rock
│   ├── /dive-sites/irarakandy
│   ├── /dive-sites/klathipa-deep
│   ├── /dive-sites/navy-museum
│   └── /dive-sites/ss-british-sergeant-wreck
│
├── /activities                                ← Activities Index
│   ├── /activities/try-diving
│   ├── /activities/fun-diving-2-dives
│   ├── /activities/fun-diving-4-dives
│   ├── /activities/snorkeling
│   ├── /activities/whale-watching
│   ├── /activities/jet-ski
│   ├── /activities/coastal-boat-tour
│   └── /activities/sunset-boat-tour
│
└── /blog                                      ← Blog Index
    ├── /blog/hms-hermes-wreck-complete-guide
    ├── /blog/best-time-to-dive-trincomalee
    ├── /blog/is-scuba-diving-scary-beginners-guide
    ├── /blog/blue-whale-watching-trincomalee-guide
    ├── /blog/pigeon-island-snorkeling-diving-guide
    ├── /blog/padi-open-water-course-what-to-expect
    ├── /blog/best-dive-sites-sri-lanka-complete-guide
    ├── /blog/hms-hermes-history-world-war-2
    ├── /blog/underwater-photography-trincomalee-guide
    ├── /blog/diving-trincomalee-vs-hikkaduwa
    ├── /blog/divemaster-career-guide-sri-lanka
    └── /blog/trincomalee-travel-guide-diving-holiday
```

---

## Keyword-to-Page Mapping

| Page | Primary Keyword | Secondary Keyword | Intent |
|------|----------------|-------------------|--------|
| `/` | diving club trincomalee | PADI certified diving trincomalee | Navigational / Local |
| `/scuba-diving-in-trincomalee` | scuba diving trincomalee | diving trincomalee sri lanka | Informational / Commercial |
| `/scuba-diving-in-sri-lanka` | scuba diving sri lanka | best diving destinations sri lanka | Informational |
| `/courses` | PADI courses trincomalee | scuba diving courses trincomalee | Commercial |
| `/courses/open-water-diver` | open water diver course trincomalee | PADI open water cost sri lanka | Transactional |
| `/courses/advanced-open-water-diver` | advanced open water trincomalee | PADI advanced course sri lanka | Transactional |
| `/courses/divemaster` | divemaster course sri lanka | become divemaster trincomalee | Transactional |
| `/dive-sites` | dive sites trincomalee | best dive sites trincomalee | Informational |
| `/dive-sites/hms-hermes-wreck` | hms hermes wreck trincomalee | aircraft carrier wreck sri lanka | Informational |
| `/dive-sites/pigeon-island` | pigeon island diving trincomalee | pigeon island snorkeling | Informational |
| `/activities/try-diving` | try diving trincomalee | discover scuba diving trincomalee | Transactional |
| `/activities/whale-watching` | whale watching trincomalee | blue whale watching sri lanka | Commercial |
| `/activities/snorkeling` | snorkeling trincomalee | snorkeling pigeon island | Commercial |
| `/blog/hms-hermes-wreck-complete-guide` | hms hermes wreck dive guide | how to dive hms hermes | Informational |
| `/blog/best-time-to-dive-trincomalee` | best time to dive trincomalee | trincomalee diving season | Informational |
| `/blog/is-scuba-diving-scary-beginners-guide` | is scuba diving scary for beginners | first time scuba diving | Informational |
| `/blog/blue-whale-watching-trincomalee-guide` | blue whale watching trincomalee | blue whales sri lanka | Informational |
| `/blog/best-dive-sites-sri-lanka-complete-guide` | best dive sites sri lanka | diving in sri lanka | Informational |
| `/blog/divemaster-career-guide-sri-lanka` | divemaster course sri lanka | how to become divemaster | Informational |

---

## Internal Linking Map

### Hub Pages (receive most internal links)

| Hub | Linked From |
|-----|-------------|
| `/dive-sites/hms-hermes-wreck` | Home, dive sites index, blog posts 1, 2, 7, 8, 9, 10, /scuba-diving-in-trincomalee |
| `/activities/try-diving` | Home, activities index, blog posts 3, 5, 6 |
| `/courses/open-water-diver` | Home, courses index, blog posts 3, 6, 11 |
| `/activities/whale-watching` | Home, activities index, blog posts 2, 4, 12 |
| `/blog/hms-hermes-wreck-complete-guide` | All dive site pages, /scuba-diving-in-trincomalee, blog posts 7, 8, 9, 10 |

### Blog → Commercial Page Link Rules

Every blog post must link to at least two of these pages:

- `/activities/try-diving` (beginner-angle posts)
- `/activities/fun-diving-2-dives` or `/activities/fun-diving-4-dives` (dive site posts)
- `/activities/whale-watching` (marine life / seasonal posts)
- `/courses/open-water-diver` (beginner posts)
- `/courses/advanced-open-water-diver` (advanced / wreck posts)
- `/dive-sites/hms-hermes-wreck` (any Trincomalee post)
- `/book` (all posts, in CTA section)

### Dive Site → Course Cross-Links (existing via `relatedCourses`)

- HMS Hermes → Advanced Open Water, Wreck Diving, Deep Diving, Nitrox
- Pigeon Island → Open Water, Advanced Open Water
- Coral Garden → Discover Scuba, Open Water
- All sites → Try Diving activity

---

## Sitemap Priority Matrix

| Priority | Pages |
|----------|-------|
| 1.0 | Home `/` |
| 0.95 | `/scuba-diving-in-trincomalee` |
| 0.9 | `/courses`, `/activities`, `/dive-sites`, `/scuba-diving-in-sri-lanka` |
| 0.85 | All course detail pages, all dive site detail pages |
| 0.8 | `/about`, `/book`, activity detail pages |
| 0.75 | All blog posts |
| 0.7 | `/faq`, `/blog` index |
| 0.6 | `/gallery`, `/contact` |

---

## Schema Coverage by Page Type

| Page Type | Schema Types | Status |
|-----------|-------------|--------|
| Root layout | LocalBusiness + EducationalOrganization + sameAs | ✅ Complete |
| Home | TouristAttraction + FAQPage | ✅ Existing |
| Course detail | Course + CourseInstance + EducationalCredentialAwarded + FAQPage | ✅ Enhanced |
| Dive site detail | TouristAttraction + SportsActivityLocation + additionalProperty + FAQPage | ✅ Enhanced |
| Activity detail | TouristAttraction + SportsEvent (seasonal) + FAQPage | ✅ Enhanced |
| Blog post | Article + FAQPage | ✅ New |
| Blog index | Blog | ✅ Existing |
| FAQ page | FAQPage | ✅ Existing |
| About page | Person + AboutPage + LocalBusiness | ✅ Existing |
| Contact page | ContactPage + LocalBusiness | ✅ Existing |
| AggregateRating | To add after 20+ real reviews | ⏳ Pending reviews |
| Speakable | Homepage + /scuba-diving-in-trincomalee + best-time blog | ⏳ Phase 2 |
| Review JSON-LD | Top 5 course pages | ⏳ Phase 3 |
