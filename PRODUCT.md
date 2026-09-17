# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** tourists who are already in or near Trincomalee, usually diving for the first time, browsing on a phone, often arriving from a Google Ads search. They want to know whether they can do this, what it costs and whether there's a spot today or tomorrow, then message the centre on WhatsApp. Visitors from India convert best of any market.

**Secondary:** certified divers looking for fun dives or the next PADI course, and people planning a Sri Lanka trip from abroad months ahead. The planners (Europe especially) rarely convert today because the main call to action is WhatsApp, and that suits someone who is nearby now, not someone five months out.

Out of scope for this file: the Laravel admin (`diving-club-backend`) and the internal Google Ads tooling.

## Product Purpose

divingclub.lk is the website of Diving Club, a PADI dive centre at 74/9 Sandy Cove, Trincomalee 31000, Sri Lanka (tel 0743945010). It sells PADI courses from Discover Scuba up through Open Water, Advanced, specialties and professional levels, plus guided fun dives, snorkelling and other activities. It turns search traffic (organic SEO and paid Google Ads) into bookings.

Success is a booking lead. There are two tracked conversions: a WhatsApp chat started, and a booking form submitted (with payment via PayPal in the full booking flow).

## Positioning

- **Beginner-friendly.** Try dives are built for people who have never dived and aren't strong swimmers. Teaching starts in shallow water, and the instructor can hold on to the diver for the whole dive.
- **Small groups.** At most two students per instructor.
- **Straight pricing.** Prices, durations and inclusions come straight from the booking system and are shown up front, with all gear included. Nothing is hardcoded and there are no surprise extras.

## Operating Context

- **Season:** Trincomalee/Nilaveli diving runs May–October, and the centre closes around mid-November for the northeast monsoon. Sri Lanka's tourist peak (Dec–Mar) falls mostly outside the dive season. Out-of-season visitors are planners, not people who can dive now.
- **Ad landing pages:** `/dive` (Discover Scuba), `/open-water` and `/padi` use `components/ads/AdLandingPage`. They are `noindex`, their headings match the ad keywords word for word, and they carry a sticky CTA, a WhatsApp CTA with prefilled messages (including an "urgent: today/tomorrow" variant), an inline booking form, and answers to the most common objections.
- **Main site:** an SEO-led structure with pillar pages (`/scuba-diving-in-trincomalee`, `/scuba-diving-in-sri-lanka`), course, activity, package and dive-site detail pages, a blog, FAQ, gallery, and a full booking flow (`/book`: slot picker, seat map, payment, confirmation).
- **Competitors:** International Diving School (Nilaveli, PADI 5-Star, TripAdvisor #1) and the Divinguru centres. See `COMPETITOR-ANALYSIS.md` and `SITE_PLAN.md`.

## Capabilities and Constraints

- Next.js 16 App Router, React 19, Tailwind v4 (tokens in `app/globals.css` `@theme`), pnpm. Content comes from the Laravel API at `admin.divingclub.lk/api/*`.
- **The API owns price, duration and inclusions.** Pages must never hardcode them. If the API is down, the price is left out rather than guessed. If an ad page shows a wrong value, fix the record in the admin, not in page copy.
- SEO comes first on indexable pages: typed metadata, JSON-LD, one `h1`, `next/image`, and good Core Web Vitals (see `CLAUDE.md`).
- Ad pages must keep the keyword match between the ad and the heading. For example, "Scuba diving in Trincomalee" matches the ad headline and the top keyword exactly.
- **Open decision:** there is no conversion path yet that suits people planning from abroad (WhatsApp is the main CTA).

## Brand Commitments

- Name: **Diving Club**. Logo: `public/logo.webp`.
- Voice: warm and conversational, like a friendly local dive guide talking to a first-time visitor. Address the real fears head-on (can't swim, never dived, what to bring). No AI-sounding phrasing ("delve", "leverage", "ensure").
- `CLAUDE.md` defines an existing brand palette. It is visual guidance and belongs in DESIGN.md, not here.

## Evidence on Hand

- **Photos:** the 11 photos in `public/assets/` are real Diving Club photos, e.g. `J-rockshan-with-open-water-students.webp`.
- **Reviews:** real Google and TripAdvisor reviews exist and can be quoted or linked. None are stored in the repo, so use actual review text and actual ratings only and never paraphrase them into new quotes.
- **PADI:** the centre has a verified PADI dive centre listing. No star rating was confirmed, so don't claim a specific PADI tier.
- **Unconfirmed:** "since 2010" appears in the current copy but was not confirmed during init. Don't add new uses of it until the owner verifies it.
- **Don't fabricate:** no invented testimonials, dive or student counts, awards, safety records, or rankings.

## Product Principles

1. **Answer the first-timer's fear before asking for the booking.** The visitor's doubt, not their interest, is the bottleneck.
2. **The fastest route to a human wins.** WhatsApp is one tap away on every paid page, and the booking form is the fallback, not a replacement.
3. **Truth comes from the system.** Price, duration and inclusions render from the API. If the data is wrong, fix the data.
4. **Match the search.** A paid visitor should see the words they typed, straight away.
5. **Mobile first, because that's where the visitor is.** Most of them are on a phone, on holiday, possibly on a slow connection.
