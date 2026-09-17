import type { Metadata } from "next";
import { getDiveSites } from "@/lib/api/dive-sites";
import DiveSiteGrid from "@/components/dive-sites/DiveSiteGrid";
import type { ItemList, WithContext } from "schema-dts";
import { safeJsonLd } from "@/lib/jsonld";

import PageHero from "@/components/ui/PageHero";
import Waterline from "@/components/illustrations/Waterline";
import CtaBand, { BandLink, WhatsAppButton } from "@/components/ui/CtaBand";
export const metadata: Metadata = {
  title: "Dive Sites in Trincomalee, Sri Lanka",
  description:
    "Explore 12 world-class dive sites in Trincomalee: from Swami Rock's Hindu statues and hawksbill turtles to the HMS Hermes aircraft carrier wreck. Reefs, walls, and WWII wrecks.",
  alternates: { canonical: "https://divingclub.lk/dive-sites" },
  openGraph: {
    title: "Dive Sites in Trincomalee: Reefs, Wrecks & Marine Life",
    description:
      "12 dive sites around Trincomalee Bay: Swami Rock, Pigeon Island, HMS Hermes wreck, SS British Sergeant, Coral Garden, and more. All levels, May–October season.",
    url: "https://divingclub.lk/dive-sites",
  },
};

export default async function DiveSitesPage() {
  const sites = await getDiveSites();

  const itemListJsonLd: WithContext<ItemList> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dive Sites in Trincomalee, Sri Lanka | Diving Club",
    numberOfItems: sites.length,
    itemListElement: sites.map((site, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "TouristAttraction",
        name: site.name,
        description: site.description.slice(0, 160).trimEnd() + "…",
        url: `https://divingclub.lk/dive-sites/${site.slug}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Trincomalee",
          addressCountry: "LK",
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
        crumbs={[{ label: "Home", href: "/" }, { label: "Dive Sites" }]}
        notes="Trincomalee · East Coast Sri Lanka"
        title={<>Dive Sites in Trincomalee</>}
        lead={<>WWII wrecks. Coral gardens. Reef walls with Hindu deity statues at depth. Blacktip sharks at a national park. Trincomalee has genuinely extraordinary diving. Here&apos;s what&apos;s waiting.</>}
        stats={[
          { value: "12", label: "Dive Sites" },
          { value: "5–53 m", label: "Depth Range" },
          { value: "May–Oct", label: "Best Season" },
          { value: "10–25 m", label: "Avg. Visibility" },
        ]}
      />
      <Waterline from="surface" to="shallow" />

      {/* Grid */}
      <DiveSiteGrid sites={sites} />

      <CtaBand
        notes="Not sure where to start?"
        title={<>We&apos;ll pick the right site for you</>}
        body={<p>Tell us your certification level and what kind of diving you&apos;re after (wrecks, coral, big fish, photography) and we&apos;ll build the day around it.</p>}
      >
        <WhatsAppButton>0743 945 010</WhatsAppButton>
        <BandLink href="/courses">Browse PADI courses →</BandLink>
      </CtaBand>
    </>
  );
}
