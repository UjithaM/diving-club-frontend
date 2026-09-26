import type { Metadata } from "next";
import Link from "next/link";
import BookingForm from "@/components/booking/BookingForm";
import { getDiscountLink } from "@/lib/api/discount-links";
import { getActivePromotions } from "@/lib/api/promotions";
import type { WebPage, WithContext } from "schema-dts";
import { safeJsonLd } from "@/lib/jsonld";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { Bubbles, Diver, Fish, Tang } from "@/components/illustrations/Sea";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; item?: string; discount?: string }>;
}): Promise<Metadata> {
  const { type, item, discount } = await searchParams;

  return {
    title: "Book a Dive | Diving Club",
    description:
      "Book a PADI course or water activity in Trincomalee with Diving Club. Reserve your spot online and pay securely via PayPal or bank transfer.",
    alternates: { canonical: "https://divingclub.lk/book" },
    // The course/activity/dive-site CTAs link here with ?type=&item= prefilled. Those are
    // pure duplicates of /book, so say so explicitly instead of leaning on the canonical
    // alone. follow:true keeps the internal links passing equity.
    // ?discount= is a one-time personal link — it must never be indexed.
    ...((type || item || discount) && { robots: { index: false, follow: true } }),
    openGraph: {
      title: "Book a Dive | Diving Club, Trincomalee",
      description:
        "Reserve your PADI course, fun dive, snorkeling tour, or whale watching trip in Trincomalee. Quick online booking form, we confirm within 24 hours.",
      url: "https://divingclub.lk/book",
    },
  };
}

const jsonLd: WithContext<WebPage> = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Book a Dive | Diving Club Trincomalee",
  url: "https://divingclub.lk/book",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; item?: string; discount?: string }>;
}) {
  const { type, item, discount } = await searchParams;

  // Resolved server-side so the wizard renders with the discount already known — no
  // loading flicker, and no chance of showing full price for a beat before correcting it.
  const [discountLink, promotions] = await Promise.all([
    discount ? getDiscountLink(discount) : null,
    // Optional: the form still books at full price if this can't load.
    getActivePromotions().catch(() => []),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      {/* Hero */}
      <section className="zone-surface lane relative overflow-hidden px-5 sm:px-8 pt-8 pb-10 lg:pt-12 lg:pb-14">
        <div className="absolute inset-x-0 bottom-4 h-12" aria-hidden="true">
          <Fish className="swim absolute left-0 top-0 w-9" style={{ "--swim-time": "30s", "--rest": "70%" } as React.CSSProperties} />
          <Tang className="swim absolute left-0 top-4 w-7" style={{ "--swim-time": "37s", animationDelay: "-14s", "--rest": "84%" } as React.CSSProperties} />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <nav className="flex items-center gap-2 text-charcoal-sea/80 text-xs mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-charcoal-sea underline-offset-4 hover:underline transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-charcoal-sea font-semibold">Book a Dive</span>
          </nav>

          <div className="absolute right-0 top-6 w-32 sm:w-48 pointer-events-none" aria-hidden="true">
            <div className="enter-swim">
              <div className="bob relative">
                <Diver className="block w-full h-auto" />
                <div className="absolute right-[4%] bottom-[55%] h-28 w-8 text-shallow-water">
                  <Bubbles count={5} />
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-hero font-extrabold mb-4 pr-28 sm:pr-40">
            Book a Dive
          </h1>
          <p className="text-lead text-muted max-w-[46ch]">
            Fill in the form, choose your payment method, and lock in your spot. We confirm within 24 hours.
          </p>
          {/* Trust notes, set where they reassure — beside the form, not above the heading. */}
          <p className="mt-6 flex flex-wrap gap-2 text-label uppercase font-semibold">
            <span className="rounded-full bg-sunrise px-3 py-1.5 text-surface-dark">Reserve your spot</span>
            <span className="sr-only"> · </span>
            <span className="rounded-full bg-shallow-water px-3 py-1.5 text-surface-dark">Secure online payment</span>
          </p>
        </div>
      </section>

      {/* Booking form */}
      <section className="bg-surface-muted min-h-[60vh] border-y-2 border-charcoal-sea/10">
        {/* searchParams arrives already decoded — decoding again threw URIError on any item containing '%' */}
        <BookingForm
          initialType={type}
          initialItem={item}
          discountCode={discount}
          discountLink={discountLink}
          promotions={promotions}
        />
      </section>

      {/* Bottom help strip */}
      <section className="zone-deep py-12 px-5 sm:px-8">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-sub font-extrabold mb-5">Not sure what to book?</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <Link href="/courses" className="inline-flex items-center min-h-11 px-5 rounded-full border-2 border-warm-white/40 font-semibold hover:bg-warm-white/10 transition-colors">
              Browse courses
            </Link>
            <span className="sr-only">·</span>
            <Link href="/activities" className="inline-flex items-center min-h-11 px-5 rounded-full border-2 border-warm-white/40 font-semibold hover:bg-warm-white/10 transition-colors">
              Browse activities
            </Link>
            <span className="sr-only">·</span>
            <a href="https://wa.me/94743945010" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 min-h-11 px-5 rounded-full bg-whatsapp text-surface-dark font-bold hover:bg-whatsapp-hover transition-colors">
              <WhatsAppIcon size={18} />
              WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
