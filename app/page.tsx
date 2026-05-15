import type { Metadata } from "next";
import { getCourses } from "@/lib/api/courses";
import { getExperiences } from "@/lib/api/experiences";
import { getDiveSites } from "@/lib/api/dive-sites";
import { getGalleryImages } from "@/lib/api/gallery";
import type { FAQPage, TouristAttraction, WithContext } from "schema-dts";
import { safeJsonLd } from "@/lib/jsonld";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedExperiencesSection from "@/components/home/FeaturedExperiencesSection";
import FeaturedCoursesSection from "@/components/home/FeaturedCoursesSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import DiveSitesSection from "@/components/home/DiveSitesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import GallerySection from "@/components/home/GallerySection";
import ContactCtaSection from "@/components/home/ContactCtaSection";

export const metadata: Metadata = {
  title: "Scuba Diving Trincomalee | PADI Courses & Dive Experiences | Diving Club",
  description:
    "Scuba diving in Trincomalee with a PADI-certified team. Open Water from $395, try diving from $65. Small groups, all equipment included.",
  alternates: { canonical: "https://divingclub.lk" },
  openGraph: {
    title: "Scuba Diving Trincomalee | PADI Courses & Dive Experiences | Diving Club",
    description:
      "Scuba diving in Trincomalee with a PADI-certified team. Open Water from $395, try diving from $65. Small groups, all equipment included.",
    url: "https://divingclub.lk",
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Coral reefs and crystal-clear water in Trincomalee, Sri Lanka",
      },
    ],
  },
};

const touristAttractionJsonLd: WithContext<TouristAttraction> = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  name: "Trincomalee Dive Sites: Coral Garden, Powder Blue Bay, Wreck of the Hermes",
  description:
    "World-class scuba diving sites in Trincomalee, Sri Lanka including coral reefs, drop-offs, and WWII wrecks.",
  touristType: ["Scuba Divers", "Snorkelers", "Marine Life Enthusiasts"],
  geo: {
    "@type": "GeoCoordinates",
    latitude: 8.5874,
    longitude: 81.2152,
  },
  isAccessibleForFree: false,
  availableLanguage: ["English"],
};

const faqJsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need experience to go scuba diving in Trincomalee?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No experience is needed for our Try Diving or Discover Scuba experiences. A PADI-certified instructor is with you throughout your first underwater dive.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a PADI Open Water course cost in Sri Lanka?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our PADI Open Water Diver course in Trincomalee costs $395 USD, including all equipment, pool sessions, four open-water dives, and your certification card.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best time to see blue whales in Trincomalee?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Blue whales are most reliably spotted from January to April when they migrate through the waters off Trincomalee's north coast.",
      },
    },
  ],
};

export default async function HomePage() {
  const [allCourses, allExperiences, allDiveSites, galleryImages] = await Promise.all([
    getCourses(),
    getExperiences(),
    getDiveSites(),
    getGalleryImages().catch(() => []),
  ]);

  const featuredCourses = allCourses.filter((c) => c.popular).slice(0, 3);
  const featuredExperiences = allExperiences.filter((e) =>
    ["try-diving", "fun-diving-2", "whale-watching"].includes(e.slug)
  );
  const featuredDiveSites = allDiveSites.filter((s) => s.popular).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(touristAttractionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(faqJsonLd) }}
      />
      <HeroSection />
      <StatsSection />
      <FeaturedExperiencesSection experiences={featuredExperiences} />
      <FeaturedCoursesSection courses={featuredCourses} />
      <WhyChooseUsSection />
      <DiveSitesSection sites={featuredDiveSites} />
      <TestimonialsSection />
      <GallerySection images={galleryImages} />
      <ContactCtaSection />
    </>
  );
}
