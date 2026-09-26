import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getPackageBySlug, getPackages } from "@/lib/api/packages";
import FaqAccordion from "@/components/ui/FaqAccordion";
import GoogleReviewsSection from "@/components/ui/GoogleReviewsSection";
import DetailHero from "@/components/ui/DetailHero";
import TickDot from "@/components/ui/TickDot";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import CtaBand from "@/components/ui/CtaBand";
import Button from "@/components/ui/Button";
import RelatedGrid from "@/components/ui/RelatedGrid";
import type { BreadcrumbList, FAQPage, Product, TouristTrip, WithContext } from "schema-dts";
import { safeJsonLd } from "@/lib/jsonld";
import { money } from "@/lib/money";

const SITE = "https://divingclub.lk";
const BUSINESS = { "@id": SITE } as const;

export async function generateStaticParams() {
  const packages = await getPackages().catch(() => []);
  return packages.map((p) => ({ slug: p.slug }));
}

/** Trimmed at a word boundary so the snippet never ends mid-word. */
function snippet(text: string, max = 155) {
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  return `${flat.slice(0, flat.lastIndexOf(" ", max - 1))}…`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) return {};

  const title = pkg.metaTitle || `${pkg.name} Package in Trincomalee | Diving Club`;
  const description = pkg.metaDescription || snippet(pkg.description);
  const url = `${SITE}/packages/${pkg.slug}`;
  const image = pkg.image ?? "/images/og-home.jpg";
  const alt = `${pkg.name}: diving and activity package in Trincomalee, Sri Lanka`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) notFound();

  const url = `${SITE}/packages/${pkg.slug}`;
  const itemHref = (item: (typeof pkg.items)[number]) =>
    `/${item.type === "course" ? "courses" : "activities"}/${item.slug}`;
  // The form matches its picker by name, same as the activity pages.
  const bookHref = `/book?type=package&item=${encodeURIComponent(pkg.name)}`;

  const others = (await getPackages().catch(() => []))
    .filter((p) => p.slug !== pkg.slug)
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      name: p.name,
      description: p.tagline ?? p.description.slice(0, 120),
      badge: p.savings > 0 ? `Save ${money(p.savings, p.currency)}` : "Package",
      badgeTone: "coral" as const,
      href: `/packages/${p.slug}`,
    }));

  // Offer markup for the price shown on the page. No aggregateRating: Google ignores
  // self-served reviews (see the note in app/layout.tsx).
  const productJsonLd: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pkg.name,
    description: snippet(pkg.description, 300),
    url,
    image: pkg.image ?? `${SITE}/images/og-home.jpg`,
    brand: { "@type": "Brand", name: "Diving Club" },
    category: "Diving & water activity package",
    offers: {
      "@type": "Offer",
      url,
      price: pkg.price,
      priceCurrency: pkg.currency,
      availability: "https://schema.org/InStock",
      seller: BUSINESS,
    },
  };

  const tripJsonLd: WithContext<TouristTrip> = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.name,
    description: snippet(pkg.description, 300),
    url,
    touristType: ["Scuba divers", "Snorkelers", "Families", "First-time divers"],
    provider: BUSINESS,
    offers: { "@type": "Offer", price: pkg.price, priceCurrency: pkg.currency, url },
    itinerary: {
      "@type": "ItemList",
      numberOfItems: pkg.items.length,
      itemListElement: pkg.items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "TouristAttraction",
          name: item.quantity > 1 ? `${item.name} (×${item.quantity})` : item.name,
          url: `${SITE}${itemHref(item)}`,
        },
      })),
    },
  };

  const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Packages", item: `${SITE}/packages` },
      { "@type": "ListItem", position: 3, name: pkg.name, item: url },
    ],
  };

  const faqJsonLd: WithContext<FAQPage> | null = pkg.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: pkg.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  return (
    <>
      {[productJsonLd, tripJsonLd, breadcrumbJsonLd, faqJsonLd].map(
        (data, i) =>
          data && <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }} />
      )}

      <DetailHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Packages", href: "/packages" }, { label: pkg.name }]}
        badge={{ label: pkg.savings > 0 ? `Package deal · save ${money(pkg.savings, pkg.currency)}` : "Package deal", tone: "sunrise" }}
        title={<>{pkg.name} in Trincomalee</>}
        lead={pkg.tagline || undefined}
        chips={[
          `${pkg.items.length} experiences in one booking`,
          ...(pkg.duration ? [pkg.duration] : []),
          ...(pkg.minAge ? [`Age ${pkg.minAge}+`] : []),
        ]}
        price={{
          prefix: "Package price",
          amount: money(pkg.price, pkg.currency),
          currency: "",
          was: pkg.originalPrice ? money(pkg.originalPrice, pkg.currency) : undefined,
          note: "per person",
        }}
        image={{ src: pkg.image, alt: `${pkg.name} with Diving Club in Trincomalee, Sri Lanka` }}
      />

      {/* Body */}
      <section className="zone-surface py-12 lg:py-16 px-5 sm:px-8 border-t-2 border-charcoal-sea/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-[1.75rem] lg:text-[2.25rem] leading-[1.05] tracking-[-0.02em] font-extrabold mb-5 reveal">About the {pkg.name}</h2>
              {pkg.description.split(/\n\s*\n/).map((para, i) => (
                <p key={i} className="text-charcoal-sea/85 text-lead mb-4 max-w-[65ch]">
                  {para}
                </p>
              ))}
            </div>

            <div>
              <h2 className="text-[1.75rem] lg:text-[2.25rem] leading-[1.05] tracking-[-0.02em] font-extrabold mb-5 reveal">What&apos;s included in this package</h2>
              <ol className="divide-y-2 divide-dashed divide-charcoal-sea/10 overflow-hidden rounded-[18px] border-2 border-charcoal-sea bg-white">
                {pkg.items.map((item) => (
                  <li key={`${item.type}-${item.slug}`} className="flex items-center justify-between gap-4 px-5 py-4">
                    <div>
                      <Link href={itemHref(item)} className="text-charcoal-sea font-bold underline-offset-4 hover:underline">
                        {item.name}
                      </Link>
                      <span className="block text-charcoal-sea/80 text-xs mt-0.5">
                        {item.type === "course" ? "PADI course" : "Activity"}
                        {item.quantity > 1 && ` · ${item.quantity} included`}
                      </span>
                    </div>
                    <span className="text-charcoal-sea/80 text-sm whitespace-nowrap tabular">
                      {money(item.price * item.quantity, pkg.currency)} if booked alone
                    </span>
                  </li>
                ))}
                <li className="zone-deep flex items-center justify-between gap-4 px-5 py-4">
                  <span className="font-bold">Your package price</span>
                  <span className="text-right">
                    <span className="font-display font-extrabold text-readout text-tropic-coral tabular">{money(pkg.price, pkg.currency)}</span>
                    {pkg.savings > 0 && (
                      <span className="block text-sunrise text-xs font-semibold">
                        You save {money(pkg.savings, pkg.currency)} per person
                      </span>
                    )}
                  </span>
                </li>
              </ol>
            </div>

            {pkg.highlights.length > 0 && (
              <div>
                <h2 className="text-[1.75rem] lg:text-[2.25rem] leading-[1.05] tracking-[-0.02em] font-extrabold mb-5 reveal">Highlights</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {pkg.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <TickDot />
                      <span className="text-charcoal-sea/85 leading-relaxed pt-0.5">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {pkg.requirements && (
              <div className="rounded-[18px] p-6 sm:p-7 bg-sunrise/30 border-2 border-sunrise reveal">
                <h2 className="text-sub font-extrabold mb-2">Who can join</h2>
                <p className="text-charcoal-sea/85 leading-relaxed">{pkg.requirements}</p>
              </div>
            )}
          </div>

          <aside className="lg:col-span-1" aria-label="Book this package">
            <div className="lg:sticky lg:top-24 zone-deep rounded-[18px] p-6 sm:p-7 shadow-[0_24px_50px_-30px_rgba(15,30,37,0.7)]">
              <p className="text-label uppercase font-semibold text-sunrise mb-2">Package price</p>
              <p className="font-display text-figure font-extrabold leading-none tabular text-tropic-coral">
                {money(pkg.price, pkg.currency)}
                {pkg.originalPrice && (
                  <span className="text-muted font-sans text-lg font-normal line-through ml-2">
                    {money(pkg.originalPrice, pkg.currency)}
                  </span>
                )}
              </p>
              <p className="text-muted text-xs mt-1 mb-6">per person · pick your date when you book</p>

              <ul className="mb-7 text-sm">
                {pkg.items.map((item) => (
                  <li key={`${item.type}-${item.slug}`} className="flex justify-between gap-3 border-t border-dashed border-rule py-2.5">
                    <span className="text-muted">{item.name}</span>
                    {item.quantity > 1 && <span className="font-semibold tabular">×{item.quantity}</span>}
                  </li>
                ))}
              </ul>

              <Link
                href={bookHref}
                className="flex w-full min-h-13 items-center justify-center rounded-[12px] bg-action text-action-ink font-bold hover:bg-action-hover transition-colors mb-3 px-4 text-center"
              >
                Book the {pkg.name}
              </Link>
              <a
                href={`https://wa.me/94743945010?text=${encodeURIComponent(`Hi! I'm interested in the ${pkg.name} package.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full min-h-12 items-center justify-center gap-2 rounded-[12px] bg-whatsapp text-surface-dark font-bold text-sm hover:bg-whatsapp-hover transition-colors px-4 text-center"
              >
                <WhatsAppIcon size={18} />
                Ask about this package on WhatsApp
              </a>
              <p className="text-center text-xs text-muted mt-4 leading-relaxed">
                All equipment included · Small groups · Expert guides
              </p>
            </div>
          </aside>
        </div>
      </section>

      {pkg.faqs.length > 0 && <FaqAccordion zone="shallow" faqs={pkg.faqs} heading={`Questions about the ${pkg.name}`} />}

      <GoogleReviewsSection zone="deep" />

      <RelatedGrid items={others} heading="More packages in Trincomalee" />

      <CtaBand
        title="Ready for your Trincomalee trip?"
        body={
          <p>
            Reserve your spot online and we&apos;ll confirm within 24 hours. Prefer to book activities one by one? Browse{" "}
            <Link href="/activities" className="font-semibold text-warm-white underline underline-offset-4 hover:no-underline">all our water activities</Link>.
          </p>
        }
      >
        <Button href={bookHref} size="lg">Book the {pkg.name}</Button>
      </CtaBand>
    </>
  );
}
