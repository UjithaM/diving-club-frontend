import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import FaqAccordion from "@/components/ui/FaqAccordion";
import WhatsAppCta from "./WhatsAppCta";
import type { PageFaq } from "@/lib/types";

const PHONE_DISPLAY = "074 394 5010";
const PHONE_HREF = "tel:+94743945010";

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
  /** GTM event label: "dive" | "padi". */
  source: string;
  closingHeading: string;
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
  source,
  closingHeading,
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

          <WhatsAppCta message={message} source={source} />

          <p className="text-warm-white/50 text-sm mt-5">
            No WhatsApp?{" "}
            <a href={PHONE_HREF} className="text-warm-white font-semibold hover:text-tropic-coral transition-colors">
              Call {PHONE_DISPLAY}
            </a>
          </p>
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
              Message us for today&apos;s rate and what&apos;s available this week. Prices shift a
              little with group size and the boat schedule, so we&apos;d rather tell you straight
              than post a number that turns out to be wrong.
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
            We usually reply within a few minutes during the day. Ask us anything, even if
            you&apos;re still deciding.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppCta message={message} source={source} />
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-3 border-2 border-warm-white/40 text-warm-white font-semibold px-8 py-4 rounded-full hover:bg-warm-white hover:text-charcoal-sea transition-colors text-base"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>

          <p className="text-warm-white/40 text-sm mt-9 leading-relaxed">
            Diving Club · 74/9 Sandy Cove, Trincomalee 31000, Sri Lanka
            <br />
            Open every day, 7am to 6pm
          </p>
        </div>
      </section>
    </>
  );
}
