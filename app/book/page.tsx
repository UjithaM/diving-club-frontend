import type { Metadata } from "next";
import Link from "next/link";
import BookingForm from "@/components/ui/BookingForm";

export const metadata: Metadata = {
  title: "Book a Dive — Diving Club Trincomalee",
  description:
    "Book a PADI course or water activity with Diving Club Trincomalee. Reserve your spot online — no payment needed now. We confirm within 24 hours.",
  alternates: { canonical: "https://divingclub.lk/book" },
  openGraph: {
    title: "Book a Dive — Diving Club Trincomalee",
    description:
      "Reserve your PADI course, fun dive, snorkeling tour, or whale watching trip in Trincomalee. Quick online booking form — we confirm within 24 hours.",
    url: "https://divingclub.lk/book",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ReservationPage",
  name: "Book a Dive — Diving Club Trincomalee",
  url: "https://divingclub.lk/book",
  provider: {
    "@type": "LocalBusiness",
    name: "Diving Club",
    url: "https://divingclub.lk",
  },
};

export default function BookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-charcoal-sea py-16 lg:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-warm-white/35 text-xs mb-8">
            <Link href="/" className="hover:text-warm-white/60 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-warm-white/60">Book a Dive</span>
          </nav>

          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-6 bg-tropic-coral" />
            <span className="text-tropic-coral text-[11px] font-semibold tracking-[0.22em] uppercase">
              Reserve your spot · No payment now
            </span>
          </div>

          <h1 className="text-warm-white font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-tight mb-5">
            Book a Dive
          </h1>
          <p className="text-warm-white/55 text-base leading-relaxed max-w-xl">
            Fill in the form and we&apos;ll confirm your booking within 24 hours. No payment needed upfront — just pick a date and we&apos;ll sort the rest.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="bg-warm-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left: form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-charcoal-sea/8 overflow-hidden">
              <div className="h-1 w-full bg-tropic-coral" aria-hidden="true" />
              <div className="p-8">
                <h2 className="text-charcoal-sea text-2xl font-bold mb-2">Your booking details</h2>
                <p className="text-charcoal-sea/55 text-sm mb-7 leading-relaxed">
                  Select a course or activity, tell us when you&apos;re coming, and we&apos;ll do the rest.
                </p>
                <BookingForm showItemSelect={true} />
              </div>
            </div>
          </div>

          {/* Right: info panel */}
          <div className="lg:col-span-2 space-y-6">

            {/* How it works */}
            <div className="bg-white rounded-2xl border border-charcoal-sea/8 p-6">
              <h3 className="text-charcoal-sea font-bold text-lg mb-5">How it works</h3>
              <ol className="relative">
                {[
                  {
                    step: "1",
                    title: "Fill in the form",
                    body: "Choose your course or activity, add your dates and contact details.",
                    color: "bg-tropic-coral",
                  },
                  {
                    step: "2",
                    title: "We confirm within 24 h",
                    body: "We'll call or WhatsApp you to lock in the date and answer any questions.",
                    color: "bg-sunrise",
                  },
                  {
                    step: "3",
                    title: "Show up and dive",
                    body: "We handle everything — gear, boat, guides. You just bring yourself.",
                    color: "bg-tropic-coral",
                  },
                ].map(({ step, title, body, color }, i, arr) => (
                  <li key={step} className="flex gap-4 relative pb-5 last:pb-0">
                    {/* Connecting vertical line */}
                    {i < arr.length - 1 && (
                      <div className="absolute left-4 top-9 bottom-0 w-px bg-charcoal-sea/10" aria-hidden="true" />
                    )}
                    <span className={`w-8 h-8 rounded-full ${color} text-white text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5 relative z-10`}>
                      {step}
                    </span>
                    <div>
                      <p className="text-charcoal-sea font-semibold text-sm">{title}</p>
                      <p className="text-charcoal-sea/55 text-sm leading-relaxed">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* What's included */}
            <div className="bg-white rounded-2xl border border-charcoal-sea/8 p-6">
              <h3 className="text-charcoal-sea font-bold text-lg mb-4">Always included</h3>
              <ul className="space-y-2.5">
                {[
                  "All scuba equipment (BCD, regulator, wetsuit, fins, mask)",
                  "Experienced PADI-certified guides",
                  "Boat transfers to and from dive sites",
                  "Small groups — never more than 8 per guide",
                  "Post-dive refreshments",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-charcoal-sea/70">
                    <span className="text-tropic-coral mt-0.5 font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct contact */}
            <div className="bg-charcoal-sea rounded-2xl p-6">
              <p className="text-warm-white/60 text-xs uppercase tracking-widest mb-2">Prefer to call?</p>
              <p className="text-warm-white font-bold text-lg mb-1">0743 945 010</p>
              <p className="text-warm-white/55 text-sm mb-4">We&apos;re available every day, 07:30 – 18:00 Sri Lanka time.</p>
              <a
                href="https://wa.me/94743945010"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-5 py-2.5 rounded-full text-sm hover:opacity-90 transition-opacity"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp us
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-charcoal-sea py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-px bg-tropic-coral mx-auto mb-8" />
          <h2 className="text-warm-white font-display text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-tight mb-4">Not sure what to book?</h2>
          <p className="text-warm-white/50 text-base leading-relaxed max-w-lg mx-auto mb-10">
            Browse our courses and activities first, or just give us a call — we&apos;ll help you pick the right experience for your level and time in Trincomalee.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/courses"
              className="inline-block bg-tropic-coral text-white font-bold px-7 py-3 rounded-full hover:bg-[#d4603f] transition-colors text-sm"
            >
              View Courses
            </Link>
            <Link
              href="/activities"
              className="inline-flex items-center gap-2 text-warm-white/50 font-semibold text-sm hover:text-warm-white transition-colors"
            >
              View Activities →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
