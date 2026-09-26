import FaqAccordion from "@/components/ui/FaqAccordion";
import GoogleReviewsSection from "@/components/ui/GoogleReviewsSection";
import WhatsAppCta from "./WhatsAppCta";
import AdBookingForm from "./AdBookingForm";
import BookCta from "./BookCta";
import StickyCta from "./StickyCta";
import PromoSection from "@/components/home/PromoSection";
import { getActivePromotions } from "@/lib/api/promotions";
import { isLive } from "@/lib/discount";
import ReefScene from "@/components/illustrations/ReefScene";
import Waterline from "@/components/illustrations/Waterline";
import { BranchCoral, BrainCoral, Bubbles, Diver, FanCoral, Fins, Fish, Mask, Seaweed, Tang, Turtle } from "@/components/illustrations/Sea";
import type { BookableItem, PageFaq } from "@/lib/types";
import { currencySymbol, money } from "@/lib/money";

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
const SECTION = "py-14 lg:py-24 px-5 sm:px-8";
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
    <h2 className="type-display text-section font-extrabold">{children}</h2>
  );
}

/** Coral-deep, not tropic-coral: a tick is a meaningful graphic, so it needs 3:1 on the ground
    it sits on, and the brand coral only manages 2.94 on warm-white. */
function Tick() {
  return (
    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-shallow-water" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
        <path d="M4 10.5l4 4 8-9" stroke="var(--color-surface-dark)" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** One row of the price breakdown. Figures sit right, in tabular numerals, so they line up. */
function PriceRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-4 border-b border-rule">
      <dt className="text-muted text-body">{label}</dt>
      <dd className="font-display text-sub font-extrabold tabular-nums text-right">{children}</dd>
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

export default async function AdLandingPage({
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
  const allPromotions = await getActivePromotions().catch(() => []);
  // Same as the home page: the list is cached for an hour, so re-check the book-by moment.
  // eslint-disable-next-line react-hooks/purity
  const serverNow = Date.now();
  const promotions = allPromotions.filter((p) => isLive(p, serverNow));
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
      <section className="zone-surface lane relative overflow-hidden px-5 sm:px-8 pt-10 pb-12 lg:pt-16 lg:pb-20">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14 lg:items-center">
          <div className="relative">
            {/* Phones get the diver alone — the full reef window would push the price down. */}
            <div className="lg:hidden absolute -right-2 -top-3 w-28 sm:w-40 pointer-events-none" aria-hidden="true">
              <div className="enter-swim">
                <div className="bob relative">
                  <Diver className="block w-full h-auto" />
                  <div className="absolute right-[4%] bottom-[55%] h-24 w-8 text-shallow-water">
                    <Bubbles count={5} />
                  </div>
                </div>
              </div>
            </div>

            <h1 className="type-display text-hero font-extrabold text-charcoal-sea max-w-[17ch] pr-24 sm:pr-36 lg:pr-0">
              {heading}
            </h1>

            {/* A measure in characters, not a container width. */}
            <p className="mt-6 text-lead text-muted max-w-[44ch]">{subheading}</p>

            {/* The page's one loud moment: the price, read like a dive-computer display. */}
            {summaryItem && (
              <div className="mt-8 flex items-stretch rounded-[14px] overflow-hidden border-2 border-charcoal-sea w-fit max-w-full">
                <span className="flex items-center bg-charcoal-sea px-5 py-3">
                  <span className="type-display text-figure font-extrabold text-tropic-coral tabular-nums">
                    {money(summaryItem.price, summaryItem.currency)}
                  </span>
                </span>
                <span className="flex items-center px-5 py-3 text-body font-semibold text-charcoal-sea">
                  {summaryItem.currency} per person · {summaryItem.duration}
                </span>
              </div>
            )}

            {/* Every inclusion, in full, above the fold. Two columns from sm. */}
            {includes.length > 0 && (
              <ul className="mt-8 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                {includes.map((line, i) => (
                  <li key={line} className="rise-in flex gap-3 text-body text-charcoal-sea" style={{ "--i": i } as React.CSSProperties}>
                    <Tick />
                    {line}
                  </li>
                ))}
              </ul>
            )}

            {/* One CTA; the sticky bar covers the rest. */}
            <div className="mt-9">
              <WhatsAppCta message={message} source={`${source}_hero`} label="WhatsApp us" />
            </div>
          </div>

          <ReefScene className="hidden lg:block aspect-[4/5]" />
        </div>
      </section>

      {/* The running deal on what this page sells, in the home page's offer style, before the
          proof and the form. Single-offer pages show only their item's discount; /padi shows its
          courses. Nothing renders when none is on a deal. Its sunrise runs straight on into the
          proof strip's, so there's no waterline between them. */}
      <PromoSection
        promotions={promotions}
        serverNow={serverNow}
        scope={(fixedItem ? [fixedItem] : items).map((item) => ({ type: bookingFor, slug: item.slug }))}
        ctaSource={source}
        joinBelow
      />

      {/* Proof strip. One big star with the count under it — the star is decorative and
          aria-hidden, so the claim never depends on a reader seeing the glyph. The words carry
          it. Muted ground because this band and the reviews are the two that are about other
          people rather than about the offer. */}
      <section className="zone-sunrise lane relative overflow-hidden px-5 sm:px-8 py-12 lg:py-16 text-center">
        <div className="absolute inset-x-0 bottom-3 h-12" aria-hidden="true">
          <Fish className="swim absolute left-0 top-0 w-9" style={{ "--swim-time": "24s", "--rest": "8%" } as React.CSSProperties} />
          <Tang className="swim absolute left-0 top-4 w-7" body="var(--color-warm-white)" style={{ "--swim-time": "29s", animationDelay: "-11s", "--rest": "88%" } as React.CSSProperties} />
        </div>
        {/* Google's own star: the Material star geometry in its review yellow. */}
        <div className="relative mx-auto flex w-fit gap-1" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} width="36" height="36" viewBox="0 0 24 24" className="pop-in" style={{ animationDelay: `${i * 80}ms` }}>
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                fill="#FBBC04"
                stroke="var(--color-surface-dark)"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </svg>
          ))}
        </div>

        <p className="relative type-display text-section font-extrabold mt-5 max-w-[22ch] mx-auto">
          {RATING_PROOF}
        </p>
        <p className="relative mt-4 text-body text-muted max-w-[40ch] mx-auto">{PADI_PROOF}</p>
      </section>

      {/* Booking. Sits immediately under the proof strip so it lands just below the fold on a
          phone, with the chat button above the fields — most visitors bounce off a multi-field
          form on a first visit, so the low-friction path leads. */}
      <section className={`zone-surface relative ${SECTION}`}>
        <Mask className="bob absolute right-[6%] top-10 hidden w-24 -rotate-12 md:block" />
        <div className="relative max-w-xl mx-auto">
          <SectionHeading>{bookingHeading}</SectionHeading>

          <p className="mt-5 text-body text-muted">
            Message us and tell us what you&apos;re after — we usually reply within a few minutes
            while we&apos;re open, and always within 24 hours.
          </p>

          <div className="mt-7">
            <WhatsAppCta message={message} source={source} label="Message us on WhatsApp" />
          </div>

          {/* Same-day and next-day divers decide faster than the prompt above accounts for, so
              they get their own line with a date-specific prefill.
              ponytail: static strip, not date-aware. Add opening-hours logic only if it matters. */}
          <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-[12px] bg-sunrise/30 px-4 py-3 text-meta text-charcoal-sea">
            <span className="live-dot mr-1" aria-hidden="true" />
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
            <span className="h-0.5 flex-1 bg-charcoal-sea/15" />
            <span className="text-charcoal-sea font-semibold text-meta">or book it yourself</span>
            <span className="h-0.5 flex-1 bg-charcoal-sea/15" />
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
              promotions={promotions}
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
        <section className={`zone-surface ${SECTION}`}>
          <div className={PROSE}>
            <SectionHeading>What you&apos;ll pay</SectionHeading>

            <dl className="mt-9 border-t-2 border-charcoal-sea">
              <PriceRow label="Per person">
                {money(summaryItem.price, summaryItem.currency)} {summaryItem.currency}
              </PriceRow>
              <PriceRow label="Duration">{summaryItem.duration}</PriceRow>
              {summaryItem.minAge ? (
                <PriceRow label="Minimum age">{summaryItem.minAge} years</PriceRow>
              ) : null}
              {saving !== null ? (
                <PriceRow label="Usual price">
                  <span className="line-through font-normal text-muted">
                    {currencySymbol(summaryItem.currency)}{summaryItem.originalPrice}
                  </span>
                  <span className="text-coral-deep ml-2.5">save {currencySymbol(summaryItem.currency)}{saving}</span>
                </PriceRow>
              ) : null}
            </dl>

            <p className="mt-9 text-body text-muted">
              There&apos;s no kit hire bolted on at the end. Groups of four or more and multi-day
              bookings usually come down a bit, so tell us how many of you there are and
              we&apos;ll give you the real number before you commit to anything.
            </p>
          </div>
        </section>
      )}

      {/* Objections. The three things people actually hesitate over, answered here rather than
          left folded into the FAQ at the bottom of the page. */}
      <Waterline from="surface" to="shallow" />
      <section className={`zone-shallow ${SECTION}`}>
        <div className={PROSE}>
          <SectionHeading>Before you ask</SectionHeading>

          <dl className="mt-10 grid gap-4">
            {objections.map((o, i) => (
              <div key={o.title} className="reveal grid grid-cols-[3.25rem_minmax(0,1fr)] gap-4 rounded-[14px] bg-warm-white/90 p-5 sm:p-6 text-charcoal-sea">
                <span className="flex h-12 items-center" aria-hidden="true">
                  {[<Mask key="m" className="w-12" />, <Turtle key="t" className="w-12" />, <Fins key="f" className="w-8" />][i % 3]}
                </span>
                <div>
                  <dt className="text-sub font-bold mb-2">{o.title}</dt>
                  <dd className="text-body text-charcoal-sea/80">{o.body}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* How it works. A real sequence, so the numbering carries information — but as numerals
          rather than coral discs. Coral is down to three jobs on this page now: the price, the
          ticks, and action. */}
      <section className={`zone-shallow relative overflow-hidden pt-4 lg:pt-8 pb-36 lg:pb-44 px-5 sm:px-8`}>
        <div className={`relative ${PROSE}`}>
          <SectionHeading>How it works</SectionHeading>

          <ol className="mt-10 relative">
            {/* the descent line joining the steps */}
            <span className="absolute left-[1.375rem] top-3 bottom-3 w-0.5 bg-surface-dark/25" aria-hidden="true" />
            {steps.map((step, i) => (
              <li key={step.title} className="reveal relative flex gap-5 sm:gap-7 pb-9 last:pb-0">
                {/* A real sequence, so the numeral carries information. */}
                <span
                  className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-dark font-display text-lg font-extrabold text-warm-white tabular-nums ring-4 ring-shallow-water"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div className="pt-1.5">
                  <h3 className="text-sub font-bold mb-2">{step.title}</h3>
                  <p className="text-body">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-28 overflow-hidden" aria-hidden="true">
          {[
            { el: <Seaweed className="w-8 lg:w-10" />, left: "4%", t: "5.4s" },
            { el: <BranchCoral className="w-16 lg:w-24" />, left: "14%", t: "6.8s" },
            { el: <BrainCoral className="w-20 lg:w-28" />, left: "32%", t: "0s" },
            { el: <FanCoral className="w-16 lg:w-24" />, left: "56%", t: "6s" },
            { el: <Seaweed className="w-7 lg:w-9" color="var(--color-sunrise)" />, left: "70%", t: "4.9s" },
            { el: <BranchCoral className="w-14 lg:w-20" color="var(--color-sunrise)" />, left: "82%", t: "6.3s" },
            { el: <Seaweed className="w-8 lg:w-10" />, left: "95%", t: "5.2s" },
          ].map((p, i) => (
            <div
              key={i}
              className={`absolute bottom-0 -translate-x-1/2 [&>svg]:block ${p.t !== "0s" ? "sway" : ""}`}
              style={{ left: p.left, "--sway-time": p.t, animationDelay: `-${i * 0.7}s` } as React.CSSProperties}
            >
              {p.el}
            </div>
          ))}
        </div>
      </section>

      {/* Reviews, now below the offer rather than above it. Four, not the full set: on an ad page
          the form is the point, and eight cards pushed it a screen further down. */}
      <GoogleReviewsSection limit={4} zone="deep" />

      {/* Answers open, no toggles — an ad visitor arrives with one question and won't hunt for
          it behind a row of closed accordions. */}
      <FaqAccordion faqs={faqs} defaultOpen zone="deep" />

      {/* Closing CTA. Extra bottom padding on mobile so the sticky bar never covers the address
          and opening hours. */}
      <section className="zone-abyss lane relative overflow-hidden px-5 sm:px-8 pt-16 pb-44 lg:pt-24 lg:pb-40">
        <div className="absolute inset-x-0 bottom-24 h-24 sm:bottom-10" aria-hidden="true">
          <div className="swim-right absolute left-0 top-0 w-40 lg:w-56" style={{ "--swim-time": "34s", "--rest": "62%" } as React.CSSProperties}>
            <Diver className="block w-full h-auto" suit="var(--color-shallow-water)" line="var(--color-surface-dark)" />
          </div>
        </div>
        <div className="absolute left-[10%] top-10 h-[70%] w-24 text-sunrise/50" aria-hidden="true">
          <Bubbles count={7} />
        </div>
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="type-display text-hero font-extrabold text-warm-white">
            {closingHeading}
          </h2>
          <p className="mt-5 text-lead text-muted">
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
              className="text-meta text-warm-white underline underline-offset-4 hover:text-warm-white transition-colors duration-200 inline-flex items-center min-h-[48px]"
            >
              Or fill in the booking form
            </BookCta>
          </p>

          {/* Reachable, just not a tracked CTA — the phone converts worst of the three. */}
          <p className="mt-10 pt-6 border-t border-rule text-meta text-muted">
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
