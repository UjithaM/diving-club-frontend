import type { Metadata } from "next";
import Link from "next/link";
import BookingWizard from "@/components/booking/BookingWizard";

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

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; item?: string }>;
}) {
  const { type, item } = await searchParams;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-charcoal-sea py-14 lg:py-20 px-6">
        <div className="max-w-2xl mx-auto">
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

          <h1 className="text-warm-white font-display text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-tight mb-4">
            Book a Dive
          </h1>
          <p className="text-warm-white/55 text-base leading-relaxed">
            Fill in the form and we&apos;ll confirm your booking within 24 hours. No payment needed — just pick a date.
          </p>
        </div>
      </section>

      {/* Wizard */}
      <section className="bg-warm-white min-h-[60vh] py-4">
        <BookingWizard
          initialType={type}
          initialItem={item ? decodeURIComponent(item) : undefined}
        />
      </section>

      {/* Bottom help strip */}
      <section className="bg-charcoal-sea/5 border-t border-charcoal-sea/8 py-10 px-6">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-charcoal-sea/55 text-sm mb-3">Not sure what to book?</p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <Link href="/courses" className="text-shallow-water font-semibold hover:underline">
              Browse courses
            </Link>
            <span className="text-charcoal-sea/20">·</span>
            <Link href="/activities" className="text-shallow-water font-semibold hover:underline">
              Browse activities
            </Link>
            <span className="text-charcoal-sea/20">·</span>
            <a href="tel:0743945010" className="text-shallow-water font-semibold hover:underline">
              Call us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
