# Diving Club — Site Plan & Competitor Research

> **Business:** Diving Club · 74/9, Sandy Cove, 31000, Trincomalee, Sri Lanka · Tel: 0743945010
> **Category:** PADI-certified diving center

---

## 1. Competitor Research — Divinguru.com

### 1.1 Navigation Structure

| Top-Level Item | Sub-items |
|---|---|
| Centres | Unawatuna, Nilaveli, Trincomalee |
| About | Company info, Team, Gallery, Blog, FAQ |
| Scuba Diving | Try diving, Fun diving, Refresher, Coaching, Adventure dives, Dive sites |
| PADI Courses | All course levels (beginner → professional) |
| Activities | Snorkeling, Whale/dolphin watching |
| Rates & Offers | Pricing page, promotions |
| Resort | Accommodation, Restaurant |
| Contact Us | Contact form, phone, WhatsApp |

**Total pages indexed:** ~75 (pages, blog posts, testimonials, tags, categories)

---

### 1.2 Service Pages

| Page | Key Details |
|---|---|
| Discover Scuba Diving | Entry-level, no certification needed, half-day, single/two-dive options |
| Fun Diving | Certified divers, packages of 2 / 4 / 6 dives |
| Refresher Dives | For divers inactive 6+ months |
| Private Coaching | 1-on-1 instruction |
| Adventure Dives | Specialized / themed dives |
| Dive Sites | 16 South Coast sites + 22 East Coast sites with depth info |
| Snorkeling Tours | Surface snorkeling, no cert needed |
| Whale & Dolphin Watching | Seasonal marine mammal tours |

---

### 1.3 PADI Course Catalogue

**Beginner (3 courses)**
- Discover Scuba Diving
- Scuba Diver (accelerated)
- Open Water Diver (full certification)

**Advanced (6 courses)**
- Adventure Diver
- Advanced Open Water Diver
- Emergency First Response (EFR)
- Rescue Diver
- Divemaster
- Instructor Development Course (IDC)

**Professional (3 courses)**
- EFR Instructor
- Assistant Instructor
- IDC progression

**Specialty Courses (12)**
- Deep Diving
- Wreck Diving
- Night Diving
- Boat Diving
- Drift Diving
- Underwater Photography
- Underwater Navigation
- Underwater Naturalist
- Peak Performance Buoyancy
- AWARE Coral Reef Conservation
- AWARE Dive Against Debris
- Nitrox Diving

**Freediving Track (separate)**
- Basic Freediver · Freediver · Advanced Freediver

---

### 1.4 Booking & Conversion Flow

```
Homepage
  └── Browse Services / Courses
        └── View Detail Page (duration, price, requirements, included)
              └── "Book Now" CTA
                    └── Contact/Booking Form
                          └── Medical Questionnaire (if applicable)
                                └── Payment on arrival (card + cash)
```

**Contact methods available:** Web form, Phone (location-specific), Email, WhatsApp (8am–7pm)
**Response commitment:** 48-hour maximum
**Advance notice required:** 1 day minimum for group organization

---

### 1.5 Trust Signals & Credibility

| Signal | Detail |
|---|---|
| Experience | Founded 1999 (25+ years) |
| Accreditation | PADI 5-Star IDC Center |
| Locations | 3 established centers across Sri Lanka |
| Group size | Max 5 divers per guided dive |
| Equipment | Rental included in packages |
| Nitrox | Complimentary for qualified divers |
| Staff | Multilingual |
| Transport | Complimentary pickup/drop |
| Safety | Medical questionnaire process highlighted |
| Environment | AWARE specialty courses (conservation) |
| Social proof | Testimonials, YouTube, Instagram, Facebook |

---

### 1.6 Content Architecture Patterns

- **Hub pages** per service category → individual detail pages
- **Blog** organized by category (Beginner Courses, Specialty, Scuba, Snorkeling, Whale Watching, Travel, Location-specific)
- **FAQ** covers: company, diving seasons, equipment, payments, cancellations, accommodations, e-learning
- **Dive site explorer** — dedicated page listing all locations by coast with depth ranges
- **Seasonal info** — South Coast Oct–Apr, East Coast Mar–Oct; ensures year-round availability
- **eLearning** — PADI theory can be completed online before arriving
- **Promotional campaigns** — seasonal percentage-off offers with end dates
- **Progressive skill path** — clear visual beginner → advanced → professional progression

---

## 2. Our Site Structure

### 2.1 Pages & Routes

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Brand intro, featured courses/experiences, trust signals, CTA |
| `/courses` | PADI Courses | Filterable listing of all courses (API-driven) |
| `/courses/[slug]` | Course Detail | Full info + inline booking form |
| `/experiences` | Experiences | Filterable listing (API-driven) |
| `/experiences/[slug]` | Experience Detail | Full info + inline booking form |
| `/about` | About Us | Story, team, credentials, Trincomalee destination info |
| `/contact` | Contact Us | Contact form, address, phone, map |

**SEO routes (auto-generated):**
- `/sitemap.xml` — via `app/sitemap.ts`
- `/robots.txt` — via `app/robots.ts`

---

### 2.2 Home Page Sections

1. **Hero** — Full-viewport image, h1 headline, subtitle, two CTAs (Explore Courses / Book a Dive)
2. **Featured Experiences** — 3 popular experience cards
3. **PADI Courses** — 3 popular course cards
4. **Why Choose Us** — 4 trust-signal tiles (PADI certified, small groups, equipment included, local guides)
5. **Trincomalee Dive Sites** — 2–3 named sites with depth teaser
6. **Testimonials** — 3 diver quotes
7. **Contact CTA** — banner with phone number and "Get in Touch" button

---

### 2.3 Courses Page Sections

1. **Page Hero** — "PADI Courses in Trincomalee"
2. **Level Filter Tabs** — All / Beginner / Advanced / Specialty / Professional
3. **Course Grid** — Cards loaded from API, filterable client-side

### 2.4 Course Detail Page Sections

1. Course image hero + name + level badge
2. Quick facts bar: Duration · Price · Min Age · Max Depth
3. Description paragraphs
4. What You'll Learn (list)
5. What's Included (list)
6. Prerequisites / Requirements
7. **Inline Booking Form**

---

### 2.5 Experiences Page Sections

1. **Page Hero** — "Dive Experiences in Trincomalee"
2. **Type Filter Tabs** — All / Fun Diving / Try Diving / Snorkeling / Whale Watching
3. **Experience Grid** — Cards loaded from API

### 2.6 Experience Detail Page Sections

1. Experience image hero + name + type badge
2. Quick facts bar: Duration · Price · Dives Included · Min Age
3. Description
4. What's Included
5. Requirements
6. **Inline Booking Form**

---

### 2.7 About Us Sections

1. Hero — "About Our Diving Club"
2. Our Story — how and why we started in Trincomalee
3. Why Trincomalee — destination highlights (Pigeon Island, Swami Rock, WWII wrecks)
4. PADI Credentials — certification badge, safety commitment
5. Meet the Team — 3 team member cards
6. Photo Gallery — 6 dive images

### 2.8 Contact Sections

1. Hero — "Get in Touch"
2. Contact Details — address, phone (WhatsApp link), email, operating hours
3. Contact Form — Name, Email, Subject dropdown, Message
4. Map placeholder — linked to Google Maps

---

## 3. Data Schemas (Dummy → API)

### 3.1 Course

```typescript
interface Course {
  slug: string;              // URL-safe identifier, e.g. "open-water-diver"
  name: string;              // Display name
  level: 'beginner' | 'advanced' | 'specialty' | 'professional';
  duration: string;          // Human-readable, e.g. "3–4 days"
  price: number;             // USD
  currency: string;          // "USD"
  description: string;       // 2–3 sentence summary
  whatYouLearn: string[];    // Bullet points
  includes: string[];        // What's included in price
  requirements: string;      // Prerequisite text
  minAge: number;
  maxDepth: string;          // e.g. "18 m" or "30 m"
  image: string;             // Path: /images/courses/<slug>.jpg
  popular: boolean;          // Featured on home page
}
```

### 3.2 Experience

```typescript
interface Experience {
  slug: string;
  name: string;
  type: 'fun-diving' | 'try-diving' | 'snorkeling' | 'whale-watching';
  duration: string;
  price: number;
  currency: string;
  description: string;
  includes: string[];
  requirements: string;
  minAge: number;
  image: string;
  popular: boolean;
  divesIncluded?: number;    // Only for diving experiences
}
```

### 3.3 API Contract (future-ready)

```typescript
// lib/api/courses.ts
getCourses(): Promise<Course[]>
getCourseBySlug(slug: string): Promise<Course | undefined>

// lib/api/experiences.ts
getExperiences(): Promise<Experience[]>
getExperienceBySlug(slug: string): Promise<Experience | undefined>
```

Currently backed by static dummy data in `lib/data/`. When a real API is available, only the internals of these functions need to change — all page components call the same functions.

---

## 4. Dummy Data — Courses

| Slug | Name | Level | Duration | Price (USD) |
|---|---|---|---|---|
| `discover-scuba-diving` | Discover Scuba Diving | beginner | Half day | $75 |
| `scuba-diver` | Scuba Diver | beginner | 2 days | $250 |
| `open-water-diver` | Open Water Diver | beginner | 4 days | $395 |
| `advanced-open-water` | Advanced Open Water Diver | advanced | 2–3 days | $295 |
| `rescue-diver` | Rescue Diver | advanced | 3–4 days | $395 |
| `emergency-first-response` | Emergency First Response | advanced | 1 day | $150 |
| `deep-diving` | Deep Diving Specialty | specialty | 2 days | $195 |
| `underwater-photography` | Underwater Photography | specialty | 2 days | $225 |
| `divemaster` | Divemaster | professional | 4–8 weeks | $995 |

---

## 5. Dummy Data — Experiences

| Slug | Name | Type | Duration | Price (USD) | Dives |
|---|---|---|---|---|---|
| `try-diving` | Try Diving | try-diving | 3 hours | $65 | 1 |
| `fun-diving-2` | Fun Diving — 2 Dives | fun-diving | Half day | $90 | 2 |
| `fun-diving-4` | Fun Diving — 4 Dives | fun-diving | Full day | $170 | 4 |
| `snorkeling-tour` | Snorkeling Tour | snorkeling | 2 hours | $35 | — |
| `whale-watching` | Whale & Dolphin Watching | whale-watching | 3–4 hours | $55 | — |

---

## 6. Brand Colors

| Token | Hex | Tailwind Utility | Usage |
|---|---|---|---|
| Warm White | `#FFF8F0` | `bg-warm-white` | Primary background |
| Sunrise | `#F4A261` | `bg-sunrise` | Warm accent, icons |
| Tropic Coral | `#E76F51` | `bg-tropic-coral` | Hero sections, CTAs |
| Charcoal Sea | `#264653` | `bg-charcoal-sea` | Navy / primary text |
| Shallow Water | `#2A9D8F` | `bg-shallow-water` | Teal / secondary accent |

Defined in `app/globals.css` `@theme` block. Available as standard Tailwind utilities (`text-charcoal-sea`, `border-shallow-water`, etc.).

---

## 7. SEO Checklist (per page)

- [ ] `export const metadata: Metadata` with title (50–60 chars), description (150–160 chars)
- [ ] Canonical URL in metadata
- [ ] Open Graph image + Twitter card
- [ ] JSON-LD structured data (`<script type="application/ld+json">`)
- [ ] One `<h1>` per page, logical heading hierarchy
- [ ] `alt` text on all images
- [ ] `next/image` for all images with `width`/`height` or `fill`
- [ ] `priority` prop on above-the-fold images
- [ ] Descriptive anchor text (no "click here")
- [ ] Internal links with keyword-rich text

---

## 8. Booking Flow (Inline Form)

Booking is handled directly on each course and experience detail page:

```
Course/Experience Detail Page
  └── [Book This Course / Book This Experience] section
        └── Inline form (no page navigation):
              ├── Full Name *
              ├── Email *
              ├── Phone (WhatsApp preferred)
              ├── Preferred Date
              ├── Number of People
              ├── Special Requests / Notes
              └── [Send Booking Request]
                    └── POST /api/booking → stub (200 OK)
                          → shows confirmation message inline
```

The `/api/booking` route is a stub that will be connected to email/CRM later.

---

## 9. Component Architecture

```
components/
  layout/
    Header.tsx          Responsive nav, mobile hamburger
    Footer.tsx          Address, phone, links, copyright
  ui/
    CourseCard.tsx      Image, name, level badge, duration, price, link
    ExperienceCard.tsx  Image, name, type badge, duration, price, link
    BookingForm.tsx     Inline booking form ('use client')
    SectionHero.tsx     Reusable hero: bg image, overlay, h1, subtitle, optional CTA
```
