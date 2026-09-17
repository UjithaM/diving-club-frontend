---
name: Diving Club
description: A PADI dive centre in Trincomalee, Sri Lanka. Every page is a dive that starts at the surface and goes down.
colors:
  warm-white: "#FFF8F0"
  sunrise: "#F4A261"
  tropic-coral: "#E76F51"
  charcoal-sea: "#264653"
  shallow-water: "#2A9D8F"
  coral-deep: "#C43F24"
  surface-dark: "#0f1e25"
  surface-muted: "#f7f3ee"
  border-subtle: "rgba(38, 70, 83, 0.08)"
  border-medium: "rgba(38, 70, 83, 0.15)"
  action: "#E76F51"
  action-hover: "#D4603F"
  action-ink: "#0f1e25"
  whatsapp: "#25D366"
  whatsapp-deep: "#0F7A40"
  whatsapp-hover: "#1FC05B"
  field-white: "#FFFFFF"
typography:
  display:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 10vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.035em"
    fontVariation: "opsz auto"
  hero:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 8.5vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  section:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.025em"
  figure:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 9vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.035em"
    fontFeature: "tnum"
  readout:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontFeature: "tnum"
  sub:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  lead:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.6vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "ss01"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    fontFeature: "ss01"
  meta:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.14em"
rounded:
  plate: "2px"
  tag: "3px"
  button-inset: "6px"
  photo-inset: "8px"
  field: "10px"
  panel-button: "12px"
  card: "14px"
  panel: "18px"
  pill: "999px"
spacing:
  gutter-phone: "20px"
  gutter: "32px"
  section-phone: "48px"
  section-tablet: "64px"
  section-desktop: "112px"
  container: "72rem"
  margin-column: "10rem"
  rail-gap: "16px"
components:
  button-action:
    backgroundColor: "{colors.action}"
    textColor: "{colors.action-ink}"
    rounded: "{rounded.plate}"
    padding: "0 20px"
    height: "44px"
  button-action-hover:
    backgroundColor: "{colors.action-hover}"
    textColor: "{colors.action-ink}"
  button-action-lg:
    backgroundColor: "{colors.action}"
    textColor: "{colors.action-ink}"
    rounded: "{rounded.plate}"
    padding: "0 28px"
    height: "52px"
  button-ink:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.plate}"
    padding: "0 20px"
    height: "44px"
  button-ink-hover:
    backgroundColor: "{colors.charcoal-sea}"
  button-line:
    textColor: "{colors.charcoal-sea}"
    rounded: "{rounded.plate}"
    padding: "0 20px"
    height: "44px"
  button-ghost:
    textColor: "{colors.charcoal-sea}"
    padding: "0"
    height: "44px"
  button-whatsapp:
    backgroundColor: "{colors.whatsapp}"
    textColor: "{colors.surface-dark}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "52px"
  button-whatsapp-hover:
    backgroundColor: "{colors.whatsapp-hover}"
  input-field:
    backgroundColor: "{colors.field-white}"
    textColor: "{colors.charcoal-sea}"
    typography: "{typography.meta}"
    rounded: "{rounded.field}"
    padding: "12px 16px"
    height: "52px"
  chip-filter:
    backgroundColor: "{colors.warm-white}"
    textColor: "{colors.charcoal-sea}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "44px"
  chip-filter-active:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.warm-white}"
  card-certification:
    backgroundColor: "{colors.warm-white}"
    textColor: "{colors.charcoal-sea}"
    rounded: "{rounded.card}"
  panel-detail:
    backgroundColor: "{colors.charcoal-sea}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.panel}"
    padding: "28px"
  panel-form:
    backgroundColor: "{colors.field-white}"
    textColor: "{colors.charcoal-sea}"
    rounded: "{rounded.panel}"
    padding: "32px"
  readout-cell:
    textColor: "{colors.charcoal-sea}"
    typography: "{typography.readout}"
    padding: "16px 16px 16px 20px"
  nav-link:
    textColor: "{colors.charcoal-sea}"
    padding: "8px 0"
---

# Design System: Diving Club

<!-- Provenance: a new visual world, "The Descent", built code-led on 2026-09-16/17 and recorded from the shipped code. The concept-seed roll never ran because the Impeccable launcher was declined this session, so there is no seed key. The owner chose this direction from four presented options. Known gap: this DESIGN.md did not exist before the build; it describes what shipped, not a plan the build followed. -->

## Overview

**Creative North Star: "The Descent"**

Every page is a dive. It opens at the surface on warm white and goes down through depth zones (surface, sunrise accent fields, shallow-water teal, charcoal sea, the near-black abyss) and never comes back up. The world is an instrument world: a dive log and a dive computer. Facts are readouts, sections are stops logged in metres, and a hairline depth gauge with ticks from 0 to 18 m sits in the left margin on wide screens. The marker on the gauge is a small head-down diver that descends as you scroll.

The flat instrument surface is kept alive by drawn sea life. Hand-drawn dive-slate SVGs (clownfish, tang, turtle, diver, mask, fins, coral, seaweed, bubbles) swim, bob and sway through every zone in one 2px charcoal-sea line with flat brand fills. The owner pinned three things: the five brand colours, a warm-white home hero (sunrise was rejected for the hero and is an accent only), and drawn animated sea life. Photography is the centre's own, set in square-shouldered plates.

The system rejects the stock dive-resort page: a full-bleed photo hero, three equal cards and empty white space. Density is editorial. Big, tight Bricolage display type sits against ruled readout grids.

**Key Characteristics:**
- Depth zones run in one direction only: surface, then shallow, then deep, then abyss.
- Tropic coral means "act". It is used only for actions and the gauge.
- Facts are dive-computer readouts: tabular Bricolage numerals over tracked Geist labels, in cells ruled by 2px lines.
- Photo plates have 2px shoulders. Objects the owner treats as physical (certification cards, form and booking panels) get soft corners and a soft offset shadow.
- Motion is CSS-only and uses scroll-driven timelines. Everything rests, still and legible, under reduced motion.

## Colors

Five brand colours, a deepened coral for text and a near-black abyss. Each colour has one job per zone.

### Primary
- **Tropic Coral** (`tropic-coral` / `action`): the one "do this" colour. It fills the primary button, colours the gauge marker and the mobile scroll-progress line, and marks the abyss log rule. Its button text is always dark ink (`action-ink`), because white on coral fails contrast.
- **Deep Coral** (`coral-deep`): coral deepened until it passes AA as text on warm white (4.88:1). Use it for error borders and coral text on light grounds.

### Secondary
- **Shallow-Water Teal** (`shallow-water`): the ground of the shallow zone, the "Dive" in the home h1, the list tick disc and the keyboard focus ring. On teal, text is always `surface-dark`.

### Tertiary
- **Sunrise** (`sunrise`): an accent field (proof bands, level bands, chips), text selection, the scrollbar thumb on the review strip, and the stand-in for coral as text on dark grounds (4.89:1). Owner decision: sunrise is never the home hero.

### Neutral
- **Warm White** (`warm-white`): the surface zone and the page ground. It is also the ink on the deep and abyss zones.
- **Charcoal Sea** (`charcoal-sea`): the primary text colour on light grounds, the deep zone ground, the illustration line and the plate backfill.
- **Surface Dark** (`surface-dark`): the abyss zone, ink on teal and sunrise, the ink button and the active filter chip.
- **Surface Muted** (`surface-muted`), **Border Subtle** and **Border Medium**: quiet light fills and hairlines.
- **Field White** (`field-white`): the ground for inputs and form panels only.
- **WhatsApp Green** (`whatsapp`, `whatsapp-deep`, `whatsapp-hover`): WhatsApp's own brand fill, used only on WhatsApp CTAs and the live dot. `whatsapp-deep` is the AA-safe text and fill.

Secondary text and rules are set per zone: `--zone-muted` and `--zone-rule` (surface: charcoal /80 and /16; sunrise: dark /82 and /22; shallow: full ink and dark /25; deep: warm white /74 and /16; abyss: warm white /70 and /12).

### Measured contrast (from `app/globals.css`)
- Charcoal Sea on Warm White: 9.57:1. Keep secondary text at /80 or above.
- Surface Dark on Shallow Water: 5.13:1. **Charcoal Sea on teal is 3.03:1 and fails. Never use it.**
- Surface Dark on Sunrise: 8.26:1. Charcoal Sea on Sunrise: 4.89:1.
- Warm White on Charcoal Sea: 9.57:1. Keep secondary text at /72 or above (5.84:1).
- Surface Dark on Tropic Coral: 5.51:1. White on Tropic Coral fails, which is why buttons use dark text.
- Tropic Coral as text on Charcoal Sea: 3.26:1, so large type only. Use Sunrise instead (4.89:1).
- Deep Coral on Warm White: 4.88:1.

### Named Rules
**The Coral Means Act Rule.** Tropic coral is reserved for actions and the depth gauge. If an element is coral and you can't press it, and it isn't the gauge, it is wrong.

**The One-Way Descent Rule.** Zones run surface, then shallow, then deep, then abyss, and never step back up. Sunrise is an accent field placed between them, not a stage of the dive.

**The Teal Takes Dark Ink Rule.** On shallow-water teal, all text is `surface-dark` at full strength. There is no dimmed secondary text on teal.

## Typography

**Display Font:** Bricolage Grotesque (with ui-sans-serif, system-ui). The `opsz` axis is automatic (`font-optical-sizing: auto`). Ad pages pin `opsz` at 96.
**Body Font:** Geist (with ui-sans-serif, system-ui), stylistic set `ss01`.

**Character:** Bricolage is loud, tight and optically sized: display type at 96px, text type at 20px. Geist is the quiet instrument voice for body copy and the tracked uppercase labels under the readouts.

### Hierarchy
- **Display** (800, clamp 48–96px, 0.9, −0.035em): the home h1 only ("Dive / into / Trincomalee").
- **Hero** (800, clamp 40–72px, 0.95, −0.03em): inner-page h1s, max 16ch.
- **Section** (800, clamp 32–52px, 1, −0.025em): section h2s. The abyss CTA band steps up to 60px on desktop.
- **Figure** (800, clamp 44–60px, 1, tabular): the price, and nothing else.
- **Readout** (700, clamp 28–40px, 1, tabular): dive-computer numerals for depth, time, group size and price in readout cells.
- **Sub** (700–800, 20px, 1.25): card titles, depth-stop numbers ("09 m") and the cells on certification cards.
- **Lead** (400, 17–19px, 1.6): intro paragraphs, 44–52ch.
- **Body** (400, 16px, 1.65): running copy. Guides use a 68ch measure.
- **Meta** (400, 14px, 1.55): card descriptions and secondary facts.
- **Label** (600, 12px, 0.14em, uppercase): instrument labels under readouts, depth-log labels and level bands.

### Named Rules
**The Readout Rule.** A number that matters is set in Bricolage with tabular numerals, sits over its Geist label (the value on top, the label underneath) and lives in a cell ruled by a 2px top line and hairline dividers.

**The Figure Is the Price Rule.** The `figure` size is used only for the price.

## Layout

The layout is a single 72rem (`max-w-6xl`) container with 20px gutters on phones and 32px from `sm` up. Sections pad 48px on phones, 64px from `sm` and 112px from `lg`. On desktop, a section with a depth stop becomes a two-column grid: a 10rem margin column holds the stop (a 2px rule, then "09 m" over the log label), with 40px between it and the content. On phones the stop collapses into a single inline line above the content.

The home hero puts the h1 in columns 1–7 and a photo in columns 8–12 that bleeds off the right edge. On phones the photo moves below the actions. Detail pages pair the content with a sticky side panel (`top: 6rem`). The closing CTA band is a 7/5 split.

Breakpoints are the Tailwind defaults: `sm` 640, `md` 768, `lg` 1024, `xl` 1280. The depth gauge appears only from 1280px. Below `md`, activities and dive sites are horizontal swipe rails (cards at min(82%, 20rem), 16px gap, snap to start) that turn into grids from `md`. Reviews use a native horizontal scroll strip whose first card lines up with the page grid, with previous/next buttons. Filter chips scroll sideways on phones instead of wrapping. Form fields are 16px on phones so iOS doesn't zoom, and every touch target is at least 44px.

## Elevation & Depth

Depth is carried by the zones, not by shadows. Surfaces are flat, rules are 2px lines, and nothing uses gradients or glass. The gauge floats over content with `mix-blend-mode: difference`, so one white scale reads on every zone. Its coral marker sits in its own unblended layer.

There is one deliberate exception, chosen by the owner and flagged by the finish reviewer as a departure from the direction contract: objects that depict something physical get a soft, low, dark offset shadow. These are certification cards, booking and form panels, and the detail side panel.

### Shadow Vocabulary
- **Card rest** (`box-shadow: 0 22px 40px -26px rgba(15,30,37,0.7)`): certification cards at rest.
- **Card lift** (`box-shadow: 0 30px 50px -26px rgba(15,30,37,0.75)`): certification card hover, together with an 8px lift.
- **Panel** (`box-shadow: 0 24px 50px -30px rgba(15,30,37,0.55)`, or 0.7 on the deep panel): booking forms, ad booking forms and the detail side panel.
- **Panel quiet** (`box-shadow: 0 18px 40px -30px rgba(15,30,37,0.5)`): payment-step panels.
- **Focus halo** (`box-shadow: 0 0 0 4px` teal at 22%, or coral at 22% on error): input focus.

### Named Rules
**The Plates Never Float Rule.** Photo plates never cast a shadow. Only the physical-object exceptions (cards and panels) do.

## Shapes

The system has two corner languages, and each belongs to a kind of object.

- **Plates and controls (2px):** photographs, buttons and the focus outline have square shoulders (`rounded.plate`). The gallery is a grid with 2px gaps.
- **Physical objects (14–18px):** certification cards are 14px, form, booking, payment and detail panels are 18px, and buttons inside panels are 12px. Inside a certification card the photo is 8px and the CTA strip is 6px. The owner prefers these. The finish reviewer flagged them as departing from the square-plate contract, and they are kept as a named exception.
- **Fields (10px):** inputs have a 2px stroke.
- **Pills (full):** filter chips, note chips, meta chips, the WhatsApp CTA, the tick disc and bubbles.

Rules are drawn lines: a 2px `border-current` above readouts and depth stops, a 2px charcoal line under the header, and dashed hairlines between rows in the detail panel.

## Components

### Buttons
Square-shouldered and solid. They say one thing each.
- **Shape:** 2px corners. Heights are 44px (`md`, 20px side padding, 14px type) or 52px (`lg`, 28px, 16px), and the weight is semibold.
- **Action:** a coral fill with dark ink that darkens to `action-hover` on hover over 200ms. It is the only coral button.
- **Ink:** a `surface-dark` fill with warm-white text that lifts to charcoal on hover. Use it on sunrise fields, where coral would sit next to its own neighbour.
- **Line:** a 2px border in the zone's own ink, filled with the zone rule tint on hover.
- **Ghost:** text plus a square-capped arrow in the zone's ink, underlined on hover (offset 4px).
- **WhatsApp:** a green pill, 52px, with dark text and the WhatsApp mark. On ad pages it pulses a ring three times after load and then rests.
- **Focus:** a 2px teal outline with a 3px offset. It turns dark on teal and sunrise zones and warm white on dark zones.

### Chips
- **Filter chip:** a 44px pill with a 2px border and a bold 14px label plus a count badge. At rest it is warm white with a transparent border that turns dark on hover. When active it is `surface-dark` with warm-white text. It scales to 95% when pressed.
- **Note chip:** tracked uppercase label pills that alternate sunrise and teal under the page hero lead.
- **Meta chip:** a charcoal/8 pill with 12px semibold tabular text.

### Cards / Containers
- **Certification card (courses):** a 14px corner, a warm-white body and a card-rest shadow. A 44px level band runs across the top (beginner sunrise, advanced coral, specialty teal, professional charcoal) with the level's drawing. Below it are an 8px inset photo, a sub-size title, a two-line meta description, a two-cell duration/price readout between 2px charcoal rules, and a dark 6px CTA strip that turns coral on card hover. The whole card is the link. It lifts 8px on hover, and on desktop the cards fan ±1°.
- **Detail panel:** a sticky, deep-zone panel with an 18px corner and 24–28px padding. It holds the price in `figure` coral, the facts as dashed-rule rows, a coral 12px book button and a 12px outlined "Ask a question" button.
- **Form panels:** white with an 18px corner and a panel shadow. The ad booking form carries a 4px coral top border. Booking is three numbered panels, a receipt-style estimate and a restyled payment step 4.

### Inputs / Fields
- **Style:** white fill, a 2px charcoal/25 stroke, 10px corners, a 52px minimum height, 16px side padding and 14px text (16px on phones). Labels are semibold 14px, 8px above the field. Hints are 12px charcoal/80.
- **Hover / Focus:** hover darkens the stroke to /45. On focus the stroke turns teal with a 4px teal halo at 22%.
- **Error:** a `coral-deep` stroke, a 4% coral tint and a coral halo, never colour alone. When submit is blocked, the offending field flashes twice.
- **Select:** a native select with the chevron redrawn in charcoal.

### Navigation
- **Header:** a sticky surface zone with a 2px charcoal bottom rule, 64px tall. The wordmark is Bricolage extrabold. Links are 13px semibold charcoal/80 that go full charcoal on hover, and the coral action button closes the row. Dropdowns open as deep-zone panels with a 2px coral top rule. On phones the menu is an accordion with a hairline between sections, and a 2px coral progress line under the header fills as you scroll.
- **Breadcrumb:** 12px charcoal/80 text with slash separators. The current page is semibold.

### Readout strip (signature)
A `<dl>` grid (two columns on phones, 2–4 from `sm`) under a 2px top rule. Cells have hairline dividers, and each shows its value in Bricolage bold tabular with the tracked label beneath. It sits on the fold of the home hero and under inner-page heroes.

### Depth gauge and depth stops (signature)
A fixed 1px scale in the left margin (from 1280px), with ticks at 0–18 m labelled in 10px tabular. The head-down diver marker descends on `animation-timeline: scroll(root)`. There is no JavaScript. Without scroll timelines or under reduced motion the scale is static. Each section's stop reads "NN m" over its log label in the margin column. The closing band logs 18 m in sunrise on a coral rule.

### Sea life (signature)
Dive-slate SVGs in one 2px charcoal line with round joins and flat brand fills. They are always decorative (`aria-hidden`). Fish cross the heroes and school through the shallows, a turtle glides through the deep, a reef sways on the shallow floor, a waterline drifts between surface and shallows, and a diver crosses the closing band with bubbles rising. Motion uses only transform and opacity: `swim` 26–39s linear, `bob` 4.5s, `sway` 5s, and `bubble-rise` 6s on `ease-surface` (`cubic-bezier(0.16, 1, 0.3, 1)`). Under reduced motion, swimmers rest at their `--rest` spot. The drawings also serve as the "Why" icons and as stand-ins for missing course photos.

### Dive-site depth profile (signature)
Each site's API depth range is drawn to one shared 0–30 m scale, with a head-down diver at its maximum depth, beside a text list that carries the same facts.

## Do's and Don'ts

### Do:
- **Do** start every page at the surface and step down through the zones. Close inner pages with the abyss CTA band at 18 m.
- **Do** use Tropic Coral for the primary action and the gauge, always with dark text (5.51:1).
- **Do** put `surface-dark` text on teal (5.13:1) and use Sunrise, not coral, for small accent text on dark grounds (4.89:1).
- **Do** keep secondary text at or above /80 on warm white and /72 on charcoal sea, using the zone's `text-muted`.
- **Do** set facts as readouts: Bricolage tabular value over a 12px tracked Geist label, in cells ruled by 2px lines.
- **Do** frame photographs as 2px plates backed with charcoal sea, with a 1.035 scale on hover over 900ms.
- **Do** keep the soft 14–18px corners and offset shadows for certification cards, form and booking panels, and the detail panel, where the owner chose them.
- **Do** run motion on CSS only (scroll and view timelines, transform and opacity), starting from an already-legible state, and remove every loop under reduced motion.
- **Do** keep form fields at 52px, touch targets at 44px or more, and field text at 16px on phones.

### Don't:
- **Don't** put charcoal-sea text on shallow-water teal. It measures 3.03:1 and fails.
- **Don't** put white text on tropic coral, or use coral for small text on charcoal sea (3.26:1).
- **Don't** use coral on anything that isn't an action or the gauge.
- **Don't** use a sunrise-ground home hero. The owner rejected it, and sunrise is an accent only.
- **Don't** step a page back up the zones (for example, abyss followed by surface).
- **Don't** use gradients or glass (backdrop blur).
- **Don't** put a shadow on photo plates, buttons or flat sections.
- **Don't** build the stock resort page: a full-bleed photo hero, three equal cards and white space.
- **Don't** use emoji or glyph icons. Use the drawn sea life or inline SVG.
