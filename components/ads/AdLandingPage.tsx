import FaqAccordion from "@/components/ui/FaqAccordion";
import GoogleReviewsSection from "@/components/ui/GoogleReviewsSection";
import WhatsAppCta from "./WhatsAppCta";
import AdBookingForm from "./AdBookingForm";
import BookCta from "./BookCta";
import StickyCta from "./StickyCta";
import type { BookableItem, PageFaq } from "@/lib/types";

const PHONE_DISPLAY = "074 394 5010";

/**
 * Owner-reported from the Google listing, September 2026.
 *
 * Deliberately NOT marked up as `aggregateRating` — see the note in app/layout.tsx. Google
 * rules the markup ineligible when the business controls the reviews, and this is a figure we
 * were told rather than one computed from the reviews rendered further down the page. It shows
 * as plain text, which is honest and needs no schema. Refresh it from the listing, not from
 * memory, and update the date in this comment when you do.
 */
const RATING_PROOF = "Nearly 200 five-star reviews on Google";
/** "Top rated" is the owner's claim about the Trincomalee listings, not a computed figure. */
const PADI_PROOF = "Top rated dive centre in Trincomalee · PADI centre since 2010";

/**
 * A coral rule over a plain heading, replacing the all-caps letterspaced eyebrow that used to
 * sit on every section. #E76F51 measures 2.94:1 on warm-white, so it earns its keep as a
 * graphic mark here rather than as the label text it used to tint.
 */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span className="block h-1 w-10 bg-tropic-coral rounded-full" aria-hidden="true" />
      <h2 className="mt-5 font-display text-[clamp(1.75rem,4.5vw,2.5rem)] font-extrabold leading-tight tracking-tight text-charcoal-sea">
        {children}
      </h2>
    </>
  );
}

/**
 * Bubbles, positioned by hand rather than randomly so the server and client agree.
 *
 * Scattered across the hero instead of clustered at the bottom: the animation lifts each one
 * from wherever it sits, so with `prefers-reduced-motion: reduce` the set still reads as an
 * even underwater texture rather than a pile in one corner.
 */
const BUBBLES = [
  // Kept clear of the 0–8% column where the inclusion ticks sit — a bubble ringing a tick
  // reads as a radio button rather than as water.
  { left: "2%", top: "92%", size: 22, dur: "13s", delay: "0s", drift: "16px", rise: "600px", peak: 0.75 },
  { left: "12%", top: "33%", size: 12, dur: "10s", delay: "2.4s", drift: "-12px", rise: "500px", peak: 0.8 },
  { left: "21%", top: "80%", size: 17, dur: "15s", delay: "1.1s", drift: "20px", rise: "660px", peak: 0.7 },
  { left: "30%", top: "20%", size: 9, dur: "12s", delay: "5.4s", drift: "13px", rise: "470px", peak: 0.85 },
  { left: "37%", top: "50%", size: 10, dur: "9s", delay: "3.6s", drift: "-10px", rise: "460px", peak: 0.85 },
  { left: "51%", top: "72%", size: 26, dur: "17s", delay: "0.6s", drift: "14px", rise: "640px", peak: 0.6 },
  { left: "63%", top: "25%", size: 14, dur: "11s", delay: "4.2s", drift: "-16px", rise: "520px", peak: 0.75 },
  { left: "71%", top: "86%", size: 11, dur: "14s", delay: "6.2s", drift: "18px", rise: "600px", peak: 0.8 },
  { left: "79%", top: "57%", size: 19, dur: "14s", delay: "1.8s", drift: "18px", rise: "580px", peak: 0.7 },
  { left: "89%", top: "38%", size: 13, dur: "10s", delay: "3s", drift: "-11px", rise: "480px", peak: 0.8 },
  { left: "95%", top: "75%", size: 16, dur: "16s", delay: "5s", drift: "12px", rise: "620px", peak: 0.72 },
] as const;

/**
 * The hero's one piece of life: a water surface, three light shafts and slow-rising bubbles.
 *
 * Inline SVG and CSS rather than an image — a few hundred bytes, no network request, nothing
 * for the LCP to wait on, which is the whole reason the photograph came out. Everything here is
 * decorative, so the wrapper is aria-hidden and takes no pointer events; motion lives in the
 * hero only, and every other section stays still.
 */
function UnderwaterMotif() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg
        className="absolute inset-x-0 top-0 w-full h-56"
        viewBox="0 0 1200 224"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="dc-shaft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2A9D8F" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#2A9D8F" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Light coming down through the surface. */}
        <path d="M170 0 L245 0 L395 224 L290 224 Z" fill="url(#dc-shaft)" />
        <path d="M515 0 L560 0 L655 224 L590 224 Z" fill="url(#dc-shaft)" />
        <path d="M890 0 L975 0 L1085 224 L955 224 Z" fill="url(#dc-shaft)" />

        {/* The surface itself, seen from below — four lines at falling weight so it reads as
            moving water rather than one drawn rule. */}
        <path
          d="M0 18 C 150 4, 300 32, 450 18 S 750 4, 900 18 S 1100 30, 1200 13"
          stroke="#2A9D8F"
          strokeOpacity="0.75"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M0 40 C 160 28, 320 54, 480 40 S 780 26, 940 40 S 1120 48, 1200 35"
          stroke="#2A9D8F"
          strokeOpacity="0.5"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M0 64 C 180 52, 340 78, 520 64 S 820 50, 980 64 S 1130 70, 1200 58"
          stroke="#2A9D8F"
          strokeOpacity="0.3"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M0 90 C 200 80, 360 102, 540 90 S 850 78, 1010 90 S 1150 94, 1200 84"
          stroke="#2A9D8F"
          strokeOpacity="0.16"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      {BUBBLES.map((b) => (
        <span
          key={b.left + b.top}
          className="dc-bubble absolute rounded-full border-2 border-shallow-water/70 bg-shallow-water/20"
          style={
            {
              left: b.left,
              top: b.top,
              width: b.size,
              height: b.size,
              opacity: b.peak,
              "--dur": b.dur,
              "--delay": b.delay,
              "--drift": b.drift,
              "--rise": b.rise,
              "--peak": b.peak,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

/** Coral-deep, not tropic-coral: a tick is a meaningful graphic, so it needs 3:1 on the ground
    it sits on, and the brand coral only manages 2.94 on warm-white. */
function Tick() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0 mt-[3px]"
    >
      <path
        d="M4 10.5l4 4 8-9"
        stroke="#C43F24"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface AdLandingPageProps {
  heading: string;
  subheading: string;
  /** The three objections that stop people booking, answered before the FAQ. */
  objections: { title: string; body: string }[];
  steps: { title: string; body: string }[];
  faqs: PageFaq[];
  /** WhatsApp prefill text, un-encoded. */
  message: string;
  /** WhatsApp prefill for the same-day strip above the form. */
  urgentMessage?: string;
  /** GTM event label: "dive" | "padi". */
  source: string;
  closingHeading: string;
  /** Booking form: what the dropdown is offering. */
  bookingFor: "course" | "activity";
  /** Booking form: dropdown options, fetched by the page. Empty when fixedItem is set. */
  items: BookableItem[];
  /** Booking form: locks the page to one item — no dropdown. */
  fixedItem?: BookableItem;
  /**
   * The item whose price and inclusions drive the hero and the What's-included section.
   *
   * Equals `fixedItem` on the three single-offer pages. /padi has no fixedItem — it renders a
   * course dropdown — so it passes the headline course explicitly, which is already the course
   * its advertised price comes from. Undefined only when the API is down, in which case both
   * the price line and the includes section drop out rather than render a zero.
   */
  summaryItem?: BookableItem;
  bookingHeading: string;
}

export default function AdLandingPage({
  heading,
  subheading,
  objections,
  steps,
  faqs,
  message,
  urgentMessage = "Hi! Are you running dives today or tomorrow? I'd like to join.",
  source,
  closingHeading,
  bookingFor,
  items,
  fixedItem,
  summaryItem,
  bookingHeading,
}: AdLandingPageProps) {
  const includes = summaryItem?.includes ?? [];

  return (
    <>
      {/*
        Hero. No photograph — as a boxed block above the copy it read as a snapshot dropped into
        the page, and as a full-bleed background it needed a scrim heavy enough that the picture
        stopped being worth its own LCP cost. The headline carries the page instead, and dropping
        it puts the price, the proof strip and the form within a screen of the top on a phone.
      */}
      <section className="relative isolate overflow-hidden bg-warm-white border-b border-border-subtle">
        <UnderwaterMotif />

        <div className="relative max-w-4xl mx-auto px-6 pt-12 pb-14 lg:pt-20 lg:pb-16">
          <h1 className="font-display text-[clamp(2.35rem,8vw,4rem)] font-extrabold leading-[1.03] tracking-tight text-charcoal-sea max-w-3xl">
            {heading}
          </h1>

          <p className="mt-6 text-charcoal-sea/75 text-lg leading-relaxed max-w-xl">
            {subheading}
          </p>

          {/* The price, out in the open. It used to live only inside the form — an ad visitor had
              to scroll past eight review cards and start booking to find out the cost. */}
          {summaryItem && (
            <p className="mt-9 flex items-baseline flex-wrap gap-x-3 gap-y-1">
              <span className="font-display text-[3.25rem] font-extrabold leading-none text-coral-deep">
                ${summaryItem.price}
              </span>
              <span className="text-charcoal-sea/75">
                {summaryItem.currency} per person · {summaryItem.duration}
              </span>
            </p>
          )}

          {/* Every inclusion, in full, above the fold — not a teaser with the rest hidden
              behind a scroll. */}
          {includes.length > 0 && (
            <ul className="mt-7 space-y-2.5">
              {includes.map((line) => (
                <li key={line} className="flex gap-3 text-charcoal-sea leading-relaxed">
                  <Tick />
                  {line}
                </li>
              ))}
            </ul>
          )}

          {/* One CTA, not two. The hero used to carry WhatsApp and "Book your spot" side by
              side; the form is a screen closer now, and the sticky bar covers the rest. */}
          <div className="mt-9">
            <WhatsAppCta message={message} source={`${source}_hero`} label="WhatsApp us" />
          </div>
        </div>
      </section>

      {/* Proof strip. One big star with the count under it — the star is decorative and
          aria-hidden, so the claim never depends on a reader seeing a #F4A261 glyph that
          measures 1.96:1 against this ground. The words carry it. */}
      <section className="bg-surface-muted border-y border-border-medium">
        <div className="max-w-2xl mx-auto px-6 py-10 text-center">
          {/* Google's own star: the Material star geometry in #FBBC04, solid, no outline. The
              outlined sunrise-on-coral version read as a sticker — this is the mark people
              already associate with a review score. */}
          <svg width="64" height="64" viewBox="0 0 24 24" className="mx-auto" aria-hidden="true">
            <path
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              fill="#FBBC04"
            />
          </svg>

          <p className="mt-4 text-charcoal-sea font-bold text-xl leading-snug">{RATING_PROOF}</p>
          <p className="mt-2 text-charcoal-sea/75">{PADI_PROOF}</p>
        </div>
      </section>

      {/* Booking. Sits immediately under the proof strip so it lands just below the fold on a
          phone, with the chat button above the fields — most visitors bounce off a multi-field
          form on a first visit, so the low-friction path leads. */}
      <section className="bg-warm-white py-14 px-6">
        <div className="max-w-xl mx-auto">
          <SectionHeading>{bookingHeading}</SectionHeading>

          <p className="mt-4 text-charcoal-sea/75 leading-relaxed">
            Message us and tell us what you&apos;re after — we usually reply within a few minutes
            while we&apos;re open, and always within 24 hours.
          </p>

          <div className="mt-7">
            <WhatsAppCta message={message} source={source} label="Message us on WhatsApp" />
          </div>

          {/* Same-day and next-day divers decide faster than the prompt above accounts for, so
              they get their own line with a date-specific prefill.
              ponytail: static strip, not date-aware. Add opening-hours logic only if it matters. */}
          <p className="mt-6 border-l-[3px] border-tropic-coral pl-4 py-1 text-sm text-charcoal-sea leading-relaxed">
            <strong className="font-bold">Diving today or tomorrow?</strong>{" "}
            <WhatsAppCta
              message={urgentMessage}
              source={`${source}_urgent`}
              label="WhatsApp us"
              variant="inline"
            />{" "}
            — we reply in minutes.
          </p>

          <div className="flex items-center gap-4 my-9" aria-hidden="true">
            <span className="h-px flex-1 bg-border-medium" />
            <span className="text-charcoal-sea/75 text-xs">or book it yourself</span>
            <span className="h-px flex-1 bg-border-medium" />
          </div>

          {/* The scroll target sits here, not on the section — "Book your spot" has to land on
              the fields, not on the heading above them. BookCta computes the landing position
              itself, so there's no constant here to keep in step with it; scroll-mt only covers
              a cold load on the #book hash, where no JS has run. */}
          <div id="book" className="scroll-mt-20">
            <AdBookingForm
              bookingFor={bookingFor}
              items={items}
              fixedItem={fixedItem}
              source={source}
              message={message}
            />
          </div>
        </div>
      </section>

      {/* What's included. Straight from the API, in full, out of the collapsed <details> it used
          to hide in inside the form. */}
      {summaryItem && includes.length > 0 && (
        <section className="bg-warm-white py-16 px-6 border-t border-border-subtle">
          <div className="max-w-3xl mx-auto">
            <SectionHeading>What&apos;s included in the price</SectionHeading>

            <div className="mt-8 pb-7 border-b border-border-medium flex items-baseline flex-wrap gap-x-4 gap-y-2">
              <span className="font-display text-[3.25rem] font-extrabold leading-none text-coral-deep">
                ${summaryItem.price}
              </span>
              <span className="text-charcoal-sea/75">
                {summaryItem.currency} per person · {summaryItem.duration}
                {summaryItem.minAge ? ` · Ages ${summaryItem.minAge}+` : ""}
              </span>
              {summaryItem.originalPrice && summaryItem.originalPrice > summaryItem.price ? (
                <span className="text-charcoal-sea/75">
                  <span className="line-through">${summaryItem.originalPrice}</span>{" "}
                  <span className="font-bold text-coral-deep">
                    save ${summaryItem.originalPrice - summaryItem.price}
                  </span>
                </span>
              ) : null}
            </div>

            <ul className="mt-8 space-y-3.5">
              {includes.map((line) => (
                <li key={line} className="flex gap-3.5 text-charcoal-sea leading-relaxed">
                  <Tick />
                  {line}
                </li>
              ))}
            </ul>

            <p className="mt-9 text-charcoal-sea/75 leading-relaxed">
              There&apos;s no kit hire bolted on at the end. Groups of four or more and multi-day
              bookings usually come down a bit, so tell us how many of you there are and
              we&apos;ll give you the real number before you commit to anything.
            </p>
          </div>
        </section>
      )}

      {/* Objections. The three things people actually hesitate over, answered here rather than
          left folded into the FAQ at the bottom of the page. */}
      <section className="bg-surface-muted py-16 px-6 border-y border-border-subtle">
        <div className="max-w-3xl mx-auto">
          <SectionHeading>Before you ask</SectionHeading>

          <dl className="mt-9 space-y-8">
            {objections.map((o) => (
              <div key={o.title}>
                <dt className="text-charcoal-sea font-bold text-lg leading-snug mb-2">
                  {o.title}
                </dt>
                <dd className="text-charcoal-sea/75 leading-relaxed">{o.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-warm-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeading>How it works</SectionHeading>

          <ol className="mt-9 space-y-8">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                {/* 19px bold white on tropic-coral: at that size the 3.09:1 fill clears WCAG's
                    large-text threshold, which a 14px numeral would not have. */}
                <span className="flex-shrink-0 w-11 h-11 rounded-full bg-tropic-coral text-white font-bold text-[19px] flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-charcoal-sea font-bold text-lg mb-1.5">{step.title}</h3>
                  <p className="text-charcoal-sea/75 leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Reviews, now below the offer rather than above it. Four, not the full set: on an ad page
          the form is the point, and eight cards pushed it a screen further down. */}
      <GoogleReviewsSection limit={4} plainHeading />

      {/* Answers open, no toggles — an ad visitor arrives with one question and won't hunt for
          it behind a row of closed accordions. */}
      <FaqAccordion faqs={faqs} defaultOpen />

      {/* Closing CTA. Extra bottom padding on mobile so the sticky bar never covers the address
          and opening hours. */}
      <section className="bg-charcoal-sea py-16 pb-32 sm:pb-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-warm-white font-display text-[clamp(1.875rem,5vw,2.75rem)] font-extrabold leading-tight tracking-tight">
            {closingHeading}
          </h2>
          <p className="mt-4 text-warm-white/75 leading-relaxed">
            On WhatsApp we usually reply within a few minutes while we&apos;re open. Ask us
            anything, even if you&apos;re still deciding.
          </p>

          {/* The biggest button on the page, and the only one in this block — booking drops to a
              text link so there's no competing weight beside it. */}
          <div className="mt-10">
            <WhatsAppCta
              message={message}
              source={`${source}_closing`}
              variant="pillLarge"
              label="Message us on WhatsApp"
            />
          </div>

          <p className="mt-6">
            <BookCta
              source={`${source}_closing`}
              className="text-warm-white/80 underline underline-offset-4 hover:text-warm-white transition-colors duration-200 inline-flex items-center min-h-[48px]"
            >
              Or fill in the booking form
            </BookCta>
          </p>

          {/* Reachable, just not a tracked CTA — the phone converts worst of the three. */}
          <p className="text-warm-white/65 text-sm mt-10 leading-relaxed">
            Diving Club · 74/9 Sandy Cove, Trincomalee 31000, Sri Lanka
            <br />
            Open every day, 7am to 6pm · {PHONE_DISPLAY}
          </p>
        </div>
      </section>

      <StickyCta message={message} source={source} />
    </>
  );
}
