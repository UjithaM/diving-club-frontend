import type { Metadata } from "next";
import { getExperiences } from "@/lib/api/experiences";
import ActivitiesGrid from "@/components/activities/ActivitiesGrid";
import type { ItemList, WithContext } from "schema-dts";
import { safeJsonLd } from "@/lib/jsonld";

import PageHero from "@/components/ui/PageHero";
import Waterline from "@/components/illustrations/Waterline";
import CtaBand, { BandLink, WhatsAppButton } from "@/components/ui/CtaBand";
export const metadata: Metadata = {
  title: "Water Activities in Trincomalee: Try Diving, Fun Diving, Snorkeling & Whale Watching",
  description:
    "Five ocean activities in Trincomalee, Sri Lanka. No experience needed for most. Try diving from $65, snorkeling from $35, whale watching from $55. All equipment included, small groups.",
  alternates: { canonical: "https://divingclub.lk/activities" },
  openGraph: {
    title: "Water Activities in Trincomalee, Sri Lanka | Diving Club",
    description:
      "Try diving, fun diving, snorkeling, and whale watching in Trincomalee. No experience needed for most activities. Small groups, all gear included.",
    url: "https://divingclub.lk/activities",
  },
};

export default async function ActivitiesPage() {
  const experiences = await getExperiences();

  const itemListJsonLd: WithContext<ItemList> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Water Activities | Diving Club Trincomalee",
    numberOfItems: experiences.length,
    itemListElement: experiences.map((exp, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "TouristAttraction",
        name: exp.name,
        description: exp.description,
        url: `https://divingclub.lk/activities/${exp.slug}`,
        offers: {
          "@type": "Offer",
          price: exp.price,
          priceCurrency: exp.currency,
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(itemListJsonLd) }}
      />

      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Activities" }]}
        notes="No experience needed · Trincomalee"
        title={<>Water Activities in Trincomalee</>}
        lead={<>Whether you&apos;ve never seen a tank before or you&apos;re logging your hundredth dive, there&apos;s something in Trincomalee&apos;s waters waiting for you.</>}
        stats={[
          { value: "5", label: "Activities" },
          { value: "From $35", label: "Starting price" },
          { value: "All ages", label: "From age 4+" },
          { value: "Small groups", label: "Personal attention" },
        ]}
      />
      <Waterline from="surface" to="shallow" />

      {/* Grid */}
      <ActivitiesGrid experiences={experiences} />

      <CtaBand
        notes="Need guidance?"
        title={<>Not sure which activity to pick?</>}
        body={<p>Give us a call and we&apos;ll match you to the right experience, whether it&apos;s your first time in the ocean or you&apos;re chasing blue whales.</p>}
      >
        <WhatsAppButton>0743 945 010</WhatsAppButton>
        <BandLink href="/contact">Send a message →</BandLink>
      </CtaBand>
    </>
  );
}
