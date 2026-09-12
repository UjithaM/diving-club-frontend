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
 * Every section below the hero gets the same vertical rhythm and the same prose measure.
 *
 * These were five different max-widths and two different paddings picked per section with no
 * rule behind them. One value each, named once, is what makes the page read as set rather than
 * assembled — and the widths that legitimately differ (the hero, the form, the centred closing
 * block) now differ on purpose.
 */
const SECTION = "py-16 lg:py-24 px-6";
const PROSE = "max-w-3xl mx-auto";

/**
 * A plain heading, carried by size and weight.
 *
 * There used to be a coral rule above every one of these — which was the all-caps letterspaced
 * eyebrow problem in a new costume, five identical dashes down one page. The grounds and the type
 * scale separate the sections now, so the decoration had nothing left to do.
 */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="type-display text-section font-extrabold text-charcoal-sea">{children}</h2>
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
      className="flex-shrink-0 mt-[5px]"
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

/** One row of the price breakdown. Figures sit right, in tabular numerals, so they line up. */
function PriceRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-3.5 border-b border-border-subtle">
      <dt className="text-charcoal-sea/75 text-body">{label}</dt>
      <dd className="text-charcoal-sea text-sub font-bold tabular-nums text-right">{children}</dd>
    </div>
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
  const saving =
    summaryItem?.originalPrice && summaryItem.originalPrice > summaryItem.price
      ? summaryItem.originalPrice - summaryItem.price
      : null;

  return (
    <>
      {/*
        Hero. No photograph and no decoration: as a boxed block above the copy the picture read as
        a snapshot dropped into the page, as a full-bleed background it needed a scrim heavy enough
        that it stopped being worth its own LCP cost, and the animated underwater motif that
        briefly replaced it was propping up a hero that had nothing to say. The type carries it.
      */}
      <section className="bg-warm-white border-b border-border-subtle px-6 pt-12 pb-12 lg:pt-24 lg:pb-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="type-display text-hero font-extrabold text-charcoal-sea max-w-[17ch]">
            {heading}
          </h1>

          {/* A measure in characters, not a container width — this is the line length the
              paragraph wants, regardless of how wide the hero happens to be. */}
          <p className="mt-7 text-lead text-charcoal-sea/75 max-w-[44ch]">{subheading}</p>

          {/* The page's one loud moment: the price, as display type between two hairlines. It used
              to live only inside the form, so an ad visitor had to scroll past eight review cards
              and start booking to find out the cost. Everything else on the page stays quiet. */}
          {summaryItem && (
            <div className="mt-8 lg:mt-11 border-y border-border-medium py-6 lg:py-7 flex items-baseline flex-wrap gap-x-6 gap-y-2">
              <span className="type-display text-figure font-extrabold text-coral-deep tabular-nums">
                ${summaryItem.price}
              </span>
              <span className="text-body text-charcoal-sea/75">
                {summaryItem.currency} per person · {summaryItem.duration}
              </span>
            </div>
          )}

          {/* Every inclusion, in full, above the fold — not a teaser with the rest hidden behind a
              scroll. Two columns from sm, which brings the CTA up about three lines. */}
          {includes.length > 0 && (
            <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {includes.map((line) => (
                <li key={line} className="flex gap-3 text-body text-charcoal-sea">
                  <Tick />
                  {line}
                </li>
              ))}
            </ul>
          )}

          {/* One CTA, not two. The hero used to carry WhatsApp and "Book your spot" side by
              side; the form is a screen closer now, and the sticky bar covers the rest. */}
          <div className="mt-10">
            <WhatsAppCta message={message} source={`${source}_hero`} label="WhatsApp us" />
          </div>
        </div>
      </section>

      {/* Proof strip. One big star with the count under it — the star is decorative and
          aria-hidden, so the claim never depends on a reader seeing the glyph. The words carry
          it. Muted ground because this band and the reviews are the two that are about other
          people rather than about the offer. */}
      <section className="bg-surface-muted border-b border-border-medium px-6 py-12 lg:py-16 text-center">
        {/* Google's own star: the Material star geometry in #FBBC04, solid, no outline. The
            outlined sunrise-on-coral version read as a sticker — this is the mark people
            already associate with a review score. */}
        <svg width="64" height="64" viewBox="0 0 24 24" className="mx-auto" aria-hidden="true">
          <path
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            fill="#FBBC04"
          />
        </svg>

        <p className="type-display text-section font-extrabold text-charcoal-sea mt-5 max-w-[22ch] mx-auto">
          {RATING_PROOF}
        </p>
        <p className="mt-4 text-body text-charcoal-sea/75 max-w-[40ch] mx-auto">{PADI_PROOF}</p>
      </section>

      {/* Booking. Sits immediately under the proof strip so it lands just below the fold on a
          phone, with the chat button above the fields — most visitors bounce off a multi-field
          form on a first visit, so the low-friction path leads. */}
      <section className={`bg-warm-white ${SECTION}`}>
        <div className="max-w-xl mx-auto">
          <SectionHeading>{bookingHeading}</SectionHeading>

          <p className="mt-5 text-body text-charcoal-sea/75">
            Message us and tell us what you&apos;re after — we usually reply within a few minutes
            while we&apos;re open, and always within 24 hours.
          </p>

          <div className="mt-7">
            <WhatsAppCta message={message} source={source} label="Message us on WhatsApp" />
          </div>

          {/* Same-day and next-day divers decide faster than the prompt above accounts for, so
              they get their own line with a date-specific prefill.
              ponytail: static strip, not date-aware. Add opening-hours logic only if it matters. */}
          <p className="mt-7 border-l-[3px] border-tropic-coral pl-4 py-1 text-meta text-charcoal-sea">
            <strong className="font-bold">Diving today or tomorrow?</strong>{" "}
            <WhatsAppCta
              message={urgentMessage}
              source={`${source}_urgent`}
              label="WhatsApp us"
              variant="inline"
            />{" "}
            — we reply in minutes.
          </p>

          <div className="flex items-center gap-4 my-10" aria-hidden="true">
            <span className="h-px flex-1 bg-border-medium" />
            <span className="text-charcoal-sea/75 text-meta">or book it yourself</span>
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

      {/*
        What you'll pay. A breakdown, not a second billboard.

        This section used to reprint the whole inclusions list the hero already shows, so the page
        said the same thing twice either side of the booking decision. What a visitor who has
        scrolled this far actually wants is the arithmetic: the figures, the age limit, and whether
        anything gets added at the end. The display-size price stays in the hero, once.
      */}
      {summaryItem && (
        <section className={`bg-warm-white ${SECTION}`}>
          <div className={PROSE}>
            <SectionHeading>What you&apos;ll pay</SectionHeading>

            <dl className="mt-9 border-t border-border-medium">
              <PriceRow label="Per person">
                ${summaryItem.price} {summaryItem.currency}
              </PriceRow>
              <PriceRow label="Duration">{summaryItem.duration}</PriceRow>
              {summaryItem.minAge ? (
                <PriceRow label="Minimum age">{summaryItem.minAge} years</PriceRow>
              ) : null}
              {saving !== null ? (
                <PriceRow label="Usual price">
                  <span className="line-through font-normal text-charcoal-sea/75">
                    ${summaryItem.originalPrice}
                  </span>
                  <span className="text-coral-deep ml-2.5">save ${saving}</span>
                </PriceRow>
              ) : null}
            </dl>

            <p className="mt-9 text-body text-charcoal-sea/75">
              There&apos;s no kit hire bolted on at the end. Groups of four or more and multi-day
              bookings usually come down a bit, so tell us how many of you there are and
              we&apos;ll give you the real number before you commit to anything.
            </p>
          </div>
        </section>
      )}

      {/* Objections. The three things people actually hesitate over, answered here rather than
          left folded into the FAQ at the bottom of the page. */}
      <section className={`bg-warm-white border-t border-border-subtle ${SECTION}`}>
        <div className={PROSE}>
          <SectionHeading>Before you ask</SectionHeading>

          <dl className="mt-10 space-y-9">
            {objections.map((o) => (
              <div key={o.title}>
                <dt className="text-sub font-bold text-charcoal-sea mb-2">{o.title}</dt>
                <dd className="text-body text-charcoal-sea/75">{o.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* How it works. A real sequence, so the numbering carries information — but as numerals
          rather than coral discs. Coral is down to three jobs on this page now: the price, the
          ticks, and action. */}
      <section className={`bg-warm-white border-t border-border-subtle ${SECTION}`}>
        <div className={PROSE}>
          <SectionHeading>How it works</SectionHeading>

          <ol className="mt-10 space-y-9">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-5 sm:gap-7">
                {/* coral-deep at 4.88:1, not a ghosted tint — a numeral a sighted reader has to
                    read is not decoration, whatever the <ol> already tells a screen reader. */}
                <span
                  className="type-display text-[2.5rem] leading-[0.9] font-extrabold text-coral-deep tabular-nums w-10 shrink-0"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div className="pt-0.5">
                  <h3 className="text-sub font-bold text-charcoal-sea mb-2">{step.title}</h3>
                  <p className="text-body text-charcoal-sea/75">{step.body}</p>
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
      <section className="bg-charcoal-sea px-6 py-16 pb-32 lg:py-24 sm:pb-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="type-display text-section font-extrabold text-warm-white">
            {closingHeading}
          </h2>
          <p className="mt-5 text-body text-warm-white/75">
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
              className="text-meta text-warm-white/80 underline underline-offset-4 hover:text-warm-white transition-colors duration-200 inline-flex items-center min-h-[48px]"
            >
              Or fill in the booking form
            </BookCta>
          </p>

          {/* Reachable, just not a tracked CTA — the phone converts worst of the three. */}
          <p className="mt-10 text-meta text-warm-white/75">
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
