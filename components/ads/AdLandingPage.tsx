import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import FaqAccordion from "@/components/ui/FaqAccordion";
import WhatsAppCta from "./WhatsAppCta";
import AdBookingForm from "./AdBookingForm";
import BookCta from "./BookCta";
import GoogleReviews, { ELFSIGHT_HERO } from "@/components/ui/GoogleReviews";
import GoogleReviewsSection from "@/components/ui/GoogleReviewsSection";
import type { BookableItem, PageFaq } from "@/lib/types";

const PHONE_DISPLAY = "074 394 5010";

interface AdLandingPageProps {
  eyebrow: string;
  heading: string;
  subheading: string;
  image: string;
  imageAlt: string;
  points: { title: string; body: string }[];
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
  bookingHeading: string;
}

export default function AdLandingPage({
  eyebrow,
  heading,
  subheading,
  image,
  imageAlt,
  points,
  steps,
  faqs,
  message,
  urgentMessage = "Hi! Are you running dives today or tomorrow? I'd like to join.",
  source,
  closingHeading,
  bookingFor,
  items,
  fixedItem,
  bookingHeading,
}: AdLandingPageProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70svh] bg-charcoal-sea flex items-center overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(38,70,83,0.95), rgba(38,70,83,0.55))" }}
          aria-hidden="true"
        />

        <div className="relative max-w-3xl mx-auto px-6 py-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-6 bg-tropic-coral" aria-hidden="true" />
            <span className="text-tropic-coral text-[11px] font-semibold tracking-[0.22em] uppercase">
              {eyebrow}
            </span>
          </div>

          <h1 className="text-warm-white font-display text-[clamp(2.25rem,6vw,3.75rem)] font-extrabold leading-tight mb-5">
            {heading}
          </h1>
          <p className="text-warm-white/70 text-lg leading-relaxed mb-9 max-w-xl">{subheading}</p>

          {/* Desktop keeps the button — there's no sticky bar up there, so this is the
              only CTA above the fold. On mobile the sticky bar already carries "Book your
              spot", so the hero spends that space on proof instead. */}
          <BookCta
            source={`${source}_hero`}
            className="hidden sm:inline-flex items-center justify-center gap-3 bg-tropic-coral text-white font-semibold px-8 py-4 rounded-full hover:bg-sunrise transition-colors text-base"
          >
            Book your spot
          </BookCta>

          <div className="sm:hidden min-h-[76px]">
            <GoogleReviews appId={ELFSIGHT_HERO} />
          </div>
        </div>
      </section>

      {/* Proof first: an ad visitor sees who vouches for us before the page asks for a
          phone number. */}
      <GoogleReviewsSection />

      {/* Booking */}
      <section className="bg-charcoal-sea/5 py-16 px-6">
        <div className="max-w-xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-6 bg-tropic-coral" aria-hidden="true" />
              <span className="text-tropic-coral text-[11px] font-semibold tracking-[0.22em] uppercase">
                Reserve your spot
              </span>
            </div>
            <h2 className="text-charcoal-sea font-display text-3xl font-extrabold leading-tight mb-3">
              {bookingHeading}
            </h2>
            <p className="text-charcoal-sea/70 leading-relaxed mb-8">
              Tell us what you&apos;re after and when you&apos;re around. We&apos;ll come back to you
              on WhatsApp within 24 hours to confirm.
            </p>
          </AnimatedSection>

          {/* The scroll target sits here, not on the section — "Book your spot" has to land
              on the price and the fields, not on the heading above them. scroll-mt-24 must
              stay in step with SCROLL_OFFSET in BookCta.tsx: same jump, two code paths.
              No AnimatedSection on this block — it slides as well as fades, and content
              moving into place exactly where you land is what made the jump confusing. */}
          <div id="book" className="scroll-mt-24">
            <AdBookingForm
              bookingFor={bookingFor}
              items={items}
              fixedItem={fixedItem}
              source={source}
              message={message}
            />

            {/* Anyone diving in the next 48 hours decides faster than the form's own 24-hour
                promise, so give them a chat route — but below the form, not above it. Above
                the fields it pulled people into WhatsApp at the exact moment they were about
                to book, and bookings are the only conversion we count now.
                ponytail: static strip, not date-aware. Add opening-hours logic only if it matters. */}
            <p className="border-l-4 border-tropic-coral bg-sunrise/12 rounded-r-xl px-4 py-3 mt-5 text-sm text-charcoal-sea leading-relaxed">
              <strong className="font-bold">Diving today or tomorrow?</strong>{" "}
              <WhatsAppCta
                message={urgentMessage}
                source={`${source}_urgent`}
                label="WhatsApp us"
                variant="inline"
              />{" "}
              — we reply in minutes.
            </p>
          </div>

          <div className="flex items-center gap-4 my-8" aria-hidden="true">
            <span className="h-px flex-1 bg-charcoal-sea/15" />
            <span className="text-charcoal-sea/40 text-xs uppercase tracking-[0.2em]">or</span>
            <span className="h-px flex-1 bg-charcoal-sea/15" />
          </div>

          <div className="text-center">
            <p className="text-charcoal-sea/70 leading-relaxed mb-5">
              Still deciding, or got a question first? Ask us anything — no booking needed.
            </p>
            <WhatsAppCta
              message={message}
              source={source}
              label="Any questions? Message us on WhatsApp"
            />
          </div>
        </div>
      </section>

      {/* Trust points */}
      <section className="bg-warm-white py-16 px-6">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-x-10 gap-y-9">
          {points.map((point) => (
            <AnimatedSection key={point.title}>
              <h2 className="text-charcoal-sea font-bold text-lg mb-2">{point.title}</h2>
              <p className="text-charcoal-sea/70 leading-relaxed">{point.body}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-charcoal-sea/5 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-6 bg-tropic-coral" aria-hidden="true" />
              <span className="text-tropic-coral text-[11px] font-semibold tracking-[0.22em] uppercase">
                How it works
              </span>
            </div>
          </AnimatedSection>

          <ol className="space-y-7">
            {steps.map((step, i) => (
              <AnimatedSection key={step.title} delay={i * 0.05}>
                <li className="flex gap-5">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-tropic-coral text-white font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-charcoal-sea font-bold text-lg mb-1">{step.title}</h3>
                    <p className="text-charcoal-sea/70 leading-relaxed">{step.body}</p>
                  </div>
                </li>
              </AnimatedSection>
            ))}
          </ol>

          <AnimatedSection className="mt-10">
            <p className="text-charcoal-sea/70 leading-relaxed bg-warm-white rounded-2xl p-6">
              The price covers your gear, tanks, the boat, and your instructor — there&apos;s no kit
              hire bolted on at the end. Groups of four or more and multi-day bookings usually come
              down a bit, so tell us how many of you there are and we&apos;ll give you the real
              number before you commit to anything.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <FaqAccordion faqs={faqs} />

      {/* Closing CTA */}
      <section className="bg-charcoal-sea py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-warm-white font-display text-3xl font-extrabold mb-4">
            {closingHeading}
          </h2>
          <p className="text-warm-white/60 leading-relaxed mb-9">
            On WhatsApp we usually reply within a few minutes while we&apos;re open. Ask us anything,
            even if you&apos;re still deciding.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookCta
              source={`${source}_closing`}
              className="inline-flex items-center justify-center gap-3 bg-tropic-coral text-white font-semibold px-8 py-4 rounded-full hover:bg-sunrise transition-colors text-base"
            >
              Book your spot
            </BookCta>
            <WhatsAppCta message={message} source={source} variant="outlineDark" />
          </div>

          {/* Reachable, just not a tracked CTA — the phone converts worst of the three. */}
          <p className="text-warm-white/40 text-sm mt-9 leading-relaxed">
            Diving Club · 74/9 Sandy Cove, Trincomalee 31000, Sri Lanka
            <br />
            Open every day, 7am to 6pm · {PHONE_DISPLAY}
          </p>
        </div>
      </section>

      {/* These routes are in SiteChrome's BARE_ROUTES, so there's no WhatsAppFab here —
          without this, mobile has no CTA between the hero and the bottom of the page.
          pb-24 on the closing section keeps the bar off the footer text. */}
      <div className="sm:hidden h-20" aria-hidden="true" />
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 flex gap-3 p-3 bg-warm-white border-t border-charcoal-sea/10 [padding-bottom:calc(0.75rem+env(safe-area-inset-bottom))]">
        {/* 2:1 in booking's favour — this bar is the main CTA on mobile, and booking is the
            only conversion we count. WhatsApp stays reachable, just clearly secondary. */}
        <BookCta
          source={`${source}_sticky`}
          className="flex-[2] inline-flex items-center justify-center gap-2 bg-tropic-coral text-white font-semibold px-4 py-3.5 rounded-full text-base"
        >
          Book your spot
        </BookCta>
        <WhatsAppCta
          message={message}
          source={`${source}_sticky`}
          label="WhatsApp"
          variant="outline"
          className="flex-1 !px-4 !py-3.5"
        />
      </div>
    </>
  );
}
