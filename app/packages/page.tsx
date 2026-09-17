import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPackages } from "@/lib/api/packages";
import type { BreadcrumbList, ItemList, WithContext } from "schema-dts";
import { safeJsonLd } from "@/lib/jsonld";
import PageHero from "@/components/ui/PageHero";
import Waterline from "@/components/illustrations/Waterline";
import { BranchCoral, BrainCoral, Seaweed, Turtle } from "@/components/illustrations/Sea";
import type { TravelPackage } from "@/lib/types";

const URL = "https://divingclub.lk/packages";
const title = "Diving & Activity Packages in Trincomalee | Diving Club";
const description =
  "Bundle diving, snorkeling and whale watching in Trincomalee and pay less than booking each one. Fixed-price packages with gear, guides and boat trips included.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: URL },
  openGraph: {
    title,
    description,
    url: URL,
    type: "website",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Diving and activity packages in Trincomalee, Sri Lanka" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/images/og-home.jpg"] },
};

const inlineLink = "font-semibold underline underline-offset-4 hover:no-underline";

function money(amount: number, currency: string) {
  return `${currency === "USD" ? "$" : `${currency} `}${Number.isInteger(amount) ? amount : amount.toFixed(2)}`;
}

function PackageCard({ pkg }: { pkg: TravelPackage }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[14px] bg-warm-white text-charcoal-sea shadow-[0_22px_40px_-26px_rgba(15,30,37,0.55)] transition-[translate] duration-300 ease-(--ease-surface) hover:-translate-y-1.5">
      <div className="plate aspect-[16/10] rounded-none">
        {pkg.image && (
          <Image
            src={pkg.image}
            alt={`${pkg.name}: diving and activity package in Trincomalee`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        )}
        {pkg.savings > 0 && (
          <span className="pop-in absolute top-0 left-0 bg-sunrise text-surface-dark text-label uppercase font-semibold px-3 py-2">
            Save {money(pkg.savings, pkg.currency)}
          </span>
        )}
      </div>
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <h2 className="text-sub font-extrabold mb-1">
          <Link href={`/packages/${pkg.slug}`} className="hover:underline underline-offset-4">
            {pkg.name}
          </Link>
        </h2>
        {pkg.tagline && <p className="text-muted text-meta mb-4">{pkg.tagline}</p>}
        <ul className="text-sm space-y-1.5 mb-6">
          {pkg.items.map((item) => (
            <li key={`${item.type}-${item.slug}`} className="flex gap-2 before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-shallow-water before:content-['']">
              {item.quantity > 1 ? `${item.quantity} × ` : ""}
              {item.name}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-end justify-between gap-4 border-t-2 border-charcoal-sea pt-4">
          <p>
            {pkg.originalPrice && (
              <span className="block text-muted text-sm line-through tabular">{money(pkg.originalPrice, pkg.currency)}</span>
            )}
            <span className="font-display text-readout font-extrabold tabular">{money(pkg.price, pkg.currency)}</span>
            <span className="text-muted text-xs ml-1">per person</span>
          </p>
          <Link
            href={`/packages/${pkg.slug}`}
            className="shrink-0 inline-flex items-center min-h-11 bg-surface-dark text-warm-white text-sm font-bold px-4 rounded-[10px] hover:bg-action hover:text-action-ink transition-colors"
            aria-label={`See what's in the ${pkg.name}`}
          >
            See the package
          </Link>
        </div>
      </div>
    </article>
  );
}

export default async function PackagesPage() {
  const packages = await getPackages().catch(() => []);

  const itemListJsonLd: WithContext<ItemList> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Diving & Activity Packages | Diving Club Trincomalee",
    numberOfItems: packages.length,
    itemListElement: packages.map((pkg, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${URL}/${pkg.slug}`,
      name: pkg.name,
    })),
  };

  const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://divingclub.lk" },
      { "@type": "ListItem", position: 2, name: "Packages", item: URL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }} />

      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Packages" }]}
        notes="Book together · Pay less"
        title={<>Diving &amp; Activity Packages in Trincomalee</>}
        lead={
          <>
            Most of our guests want more than one day on the water: a morning on the reef, an afternoon with the
            whales, maybe their first breath underwater. These packages put the favourite combinations together
            at a lower price than booking each one on its own.
          </>
        }
        art="turtle"
      />
      <Waterline from="surface" to="shallow" />

      <section className="zone-shallow py-12 lg:py-16 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          {packages.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {packages.map((pkg, i) => (
                <li key={pkg.slug} className="rise-in" style={{ "--i": i % 6 } as React.CSSProperties}>
                  <PackageCard pkg={pkg} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="relative mx-auto max-w-xl overflow-hidden rounded-[18px] bg-warm-white px-6 pt-10 pb-28 text-center text-charcoal-sea">
              <p className="text-lead">
                New packages are on the way. In the meantime, browse our{" "}
                <Link href="/activities" className={inlineLink}>water activities</Link> or{" "}
                <Link href="/courses" className={inlineLink}>PADI courses</Link>.
              </p>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-6" aria-hidden="true">
                <Seaweed className="sway w-7" />
                <BrainCoral className="w-24" />
                <Turtle className="bob mb-6 w-24" />
                <BranchCoral className="sway w-14" />
              </div>
            </div>
          )}

          <p className="text-sm text-center mt-12 max-w-xl mx-auto">
            Want a different mix? Book any of our{" "}
            <Link href="/activities" className={inlineLink}>Trincomalee activities</Link>{" "}
            separately, or{" "}
            <a href="https://wa.me/94743945010" target="_blank" rel="noopener noreferrer" className={inlineLink}>
              message us on WhatsApp
            </a>{" "}
            and we&apos;ll put together a custom package.
          </p>
        </div>
      </section>
    </>
  );
}
