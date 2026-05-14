import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Diving Club Trincomalee",
  description:
    "Get in touch with Diving Club Trincomalee. Call, WhatsApp, or send a message to book a dive, ask about courses, or plan your visit to Sri Lanka's best dive destination.",
  alternates: { canonical: "https://divingclub.lk/contact" },
  openGraph: {
    title: "Contact Diving Club Trincomalee",
    description:
      "Call, WhatsApp, or message us to book a dive or ask any question. We're open 7 days a week in Trincomalee, Sri Lanka.",
    url: "https://divingclub.lk/contact",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Diving Club Trincomalee",
  url: "https://divingclub.lk/contact",
  mainEntity: {
    "@type": "LocalBusiness",
    name: "Diving Club",
    telephone: "0743945010",
    email: "info@divingclub.lk",
    address: {
      "@type": "PostalAddress",
      streetAddress: "74/9, Sandy Cove",
      postalCode: "31000",
      addressLocality: "Trincomalee",
      addressCountry: "LK",
    },
    openingHours: "Mo-Su 07:30-18:00",
  },
};

export default function ContactPage() {
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
            <span className="text-warm-white/60">Contact</span>
          </nav>

          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-6 bg-tropic-coral" />
            <span className="text-tropic-coral text-[11px] font-semibold tracking-[0.22em] uppercase">
              Open 7 days · Trincomalee
            </span>
          </div>

          <h1 className="text-warm-white font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-tight mb-5">
            Get in Touch
          </h1>
          <p className="text-warm-white/55 text-base leading-relaxed max-w-xl">
            Got a question? Want to book? Just give us a call or drop a message. We&apos;re always happy to help.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-warm-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left: contact info */}
          <div className="lg:col-span-2 space-y-8">

            {/* Call / WhatsApp */}
            <div>
              <h2 className="text-charcoal-sea text-xl font-bold mb-5">Talk to us</h2>

              <div className="space-y-4">
                <a
                  href="https://wa.me/94743945010"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-charcoal-sea/8 hover:border-green-400/40 hover:shadow-md transition-all group"
                >
                  <span className="w-11 h-11 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-charcoal-sea/45 uppercase tracking-widest mb-0.5">WhatsApp us</p>
                    <p className="text-charcoal-sea font-black text-2xl">0743 945 010</p>
                  </div>
                </a>

                <a
                  href="mailto:info@divingclub.lk"
                  className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-charcoal-sea/8 hover:border-shallow-water/40 hover:shadow-md transition-all group"
                >
                  <span className="w-11 h-11 rounded-full bg-shallow-water/10 flex items-center justify-center flex-shrink-0 group-hover:bg-shallow-water/20 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2A9D8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-charcoal-sea/45 uppercase tracking-widest mb-0.5">Email us</p>
                    <p className="text-charcoal-sea font-semibold text-base">info@divingclub.lk</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-charcoal-sea text-xl font-bold mb-5">Find us</h2>
              <div className="bg-white rounded-2xl p-5 border border-charcoal-sea/8 space-y-4">
                <div className="flex items-start gap-4">
                  <span className="w-11 h-11 rounded-full bg-tropic-coral/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E76F51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <address className="not-italic text-charcoal-sea/70 text-sm leading-relaxed">
                    <p className="text-charcoal-sea font-semibold mb-1">Diving Club</p>
                    74/9, Sandy Cove<br />
                    31000, Trincomalee<br />
                    Sri Lanka
                  </address>
                </div>

                <div className="flex items-center gap-4">
                  <span className="w-11 h-11 rounded-full bg-sunrise/10 flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F4A261" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </span>
                  <div className="text-sm">
                    <p className="text-charcoal-sea font-semibold">Opening hours</p>
                    <p className="text-charcoal-sea/60">Every day, 07:30 – 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Book CTA */}
            <div className="bg-charcoal-sea rounded-2xl p-6">
              <p className="text-warm-white/60 text-xs uppercase tracking-widest mb-2">Ready to dive?</p>
              <p className="text-warm-white font-bold text-lg mb-4">Use our booking form to reserve your spot.</p>
              <Link
                href="/book"
                className="block text-center text-white font-bold py-3 rounded-full text-sm transition-opacity hover:opacity-90"
                style={{ background: "#E76F51" }}
              >
                Book a Dive →
              </Link>
            </div>
          </div>

          {/* Right: general enquiry form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-charcoal-sea/8 overflow-hidden">
              <div
                className="h-1 w-full"
                style={{ background: "#E76F51" }}
                aria-hidden="true"
              />
              <div className="p-8">
                <h2 className="text-charcoal-sea text-2xl font-bold mb-2">Send a message</h2>
                <p className="text-charcoal-sea/55 text-sm mb-7 leading-relaxed">
                  Got a question about courses, conditions, what to pack, or anything else? Fill this in and we&apos;ll get back to you fast.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
