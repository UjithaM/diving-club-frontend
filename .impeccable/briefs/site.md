# Surface brief: divingclub.lk (whole public site)

Scope: every public route in `app/`. Home, listings, detail and ad pages are **Persuade**. Guides, blog, FAQ and legal pages are **Read**. Booking is **Operate**.
Product truth lives in `PRODUCT.md`. This file holds only the direction for the redesign.

## Constraints (owner, 2026-09-16)
- Keep the five brand colours from `CLAUDE.md`.
- Change no content: copy, headings, metadata and JSON-LD stay as they are.
- SEO and page speed must be as good as before or better.
- Ad pages (`/dive`, `/padi`, `/open-water`, `/fun-dives`) get a restyle only. Section order, keyword h1s, booking-form placement and CTAs stay unchanged.
- Lenis is removed.
- Delivery is phased: system, shell and home first, then the owner reviews, then the remaining pages.

## Direction contract

THESIS: Scrolling the site is a dive that starts at the surface and goes down. It rejects the stock dive-resort page (full-bleed photo hero, three equal cards, white space).

OWN-WORLD: The zones run sunrise → warm-white → shallow-water teal → charcoal-sea → surface-dark, and never go back up.
- Tropic coral is reserved for actions and the gauge marker.
- A hairline depth gauge with ticks from 0 to 18 m sits in the left margin.
- Facts are dive-computer readouts: tabular Bricolage numerals over tracked Geist labels, in cells ruled with 2 px lines.
- Photo plates have square shoulders.
- No gradients, glass or soft shadows.

STORY: A first-timer sees the offer and a clear action at 0 m. Their doubts are answered in the shallows. Proof (dive sites, reviews, the centre's own photos) sits in the deep. The page closes at 18 m with "Ready to Dive?" and the coral Book button.

FIRST VIEWPORT (home): Warm-white (owner change on 2026-09-16: the sunrise hero was "not suitable"; sunrise now appears only as an accent).
- A log line ("00 m … Trincomalee · Sri Lanka") runs over a 2 px rule.
- The h1 "Dive / into / Trincomalee" is display size in columns 1–7, with "Dive" in teal and a coral waterline under "Trincomalee".
- An illustrated diver swims in on load and treads water beside "Dive into", with bubbles rising.
- Below it sit the lead paragraph, the coral "Explore Courses" button and the ghost "Book a Dive →" link.
- The real sunrise boat photo fills columns 8–12 and bleeds off the right edge, with the "15+ Years" plate overlapping its bottom-left corner.
- The four-cell readout strip sits on the fold.
- On phones the photo moves below the actions.

FORM: A dive log and dive computer (instrument world), first on the ordered list. No seed key: the Impeccable launcher was declined this session, so `concept-seed` never ran. The direction was chosen by the owner from four presented options.

SEA LIFE (owner request, 2026-09-16): hand-drawn dive-slate SVGs in `components/illustrations/Sea.tsx` (clownfish, tang, turtle, diver, mask, fins, branch, fan and brain coral, seaweed).
- Fish cross the hero and swim as a school through the shallows.
- A turtle glides through the deep.
- A reef sways on the shallow floor.
- A diver crosses the closing CTA.
- A waterline drifts between surface and shallows.
- The illustrations are the "Why" icons.
- Reviews are a native horizontal scroll strip with previous/next buttons (`components/ui/ScrollButtons.tsx`), aligned to the page grid. The owner asked for manual scrolling on 2026-09-17, which replaced the marquee.
- PADI courses are certification cards: level colour band, ID-style photo, duration and price readouts. They get 14px corners and a soft offset shadow because they depict a physical card; this is a deliberate exception to the square plate. On desktop they fan ±1° like a dealt hand.
- Dive sites are a depth profile. Each site's API depth range is drawn to one shared 0–30 m scale with a head-down diver at its maximum depth, beside a text list that carries the same facts for assistive tech.
- Phones use swipe rails for activities and dive sites.

SIGNATURE INTERACTION: The gauge marker (a small diver, head down) descends as you scroll, and on phones a coral line under the header fills. Both use CSS `animation-timeline: scroll(root)` with no JS. Content rises in with `animation-timeline: view()` from an already-legible start. All of this is static under reduced motion or when the feature isn't supported.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Rasters and provenance
- `public/images/og-home.jpg` was rendered by Playwright from an HTML composition: `public/assets/sunrise-trincomalee-beach-sri-lanka.webp` (owner's photo), `public/logo.webp`, Bricolage Grotesque and Geist, with the text taken from the existing home title. It gives a real target to the 11 metadata references that pointed at a missing file.
- Everything in `public/assets/` is the owner's own photography (see PRODUCT.md).

## Open items
- Group size: owner set it to 2 divers per guide (2026-09-17). Home, About and the course FAQ now say so; the admin FAQ ("maximum of five divers per guide") still needs editing in the admin.
- Nav: owner removed FAQ and Trincomalee Guide from the header (both still linked from the footer). Home stats strip is hidden below `sm`.
- The API has no images for the featured dive sites or the jet ski. The jet ski falls back to the owner's jet-ski photo; dive sites render as typographic log entries.

## Phase 2 (2026-09-17)
- **Ad pages** (`components/ads/*`): restyle only.
  - Zones run surface hero (reef scene on desktop, diver on phones) → sunrise proof band with swimming fish → surface booking → surface price breakdown → waterline → shallow objections (illustrated cards) → shallow "How it works" (numbered descent line and reef floor) → deep reviews and FAQ → abyss close (diver and bubbles).
  - The WhatsApp CTAs pulse three times after load. The sticky bar is solid, and the footer is padded under it.
- **Booking** (`/book`, `components/booking/*`):
  - The form is three numbered panels. The booking-type chooser is an illustrated segmented control.
  - Slot chips have a loading skeleton. The seat map is drawn as a boat hull.
  - The estimate is a receipt panel. The payment step is lazy-loaded (`next/dynamic`) and restyled as step 4.
  - The success and confirmation screens have an animated check with bubbles.
- **Inner pages** use `components/ui/PageHero.tsx`, `CtaBand.tsx`, `DetailHero.tsx` and `DetailPanel.tsx`.
  - Listing grids share `FilterBar`.
  - Guides get a sticky contents list at a 68ch measure.
  - FAQ accordions are native `<details>`, with no JS.
  - The detail sidebars are server components.
- **Content deltas** (all deliberate):
  - Emoji and glyph icons are dropped (⏱ 🐋 ✓ ✕).
  - The gallery and home gallery show the owner's photos when the admin gallery is empty.
  - FAQ category slugs show as words.
  - Gallery social links point at the real profiles.
  - The "Questions" eyebrow is removed from the FAQ accordion.
  - The decorative depth numbers are aria-hidden.
