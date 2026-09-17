import type { Metadata } from "next";
import { getCourses } from "@/lib/api/courses";
import CourseGrid from "@/components/courses/CourseGrid";
import type { ItemList, WithContext } from "schema-dts";
import { safeJsonLd } from "@/lib/jsonld";
import PageHero from "@/components/ui/PageHero";
import CtaBand, { BandLink, WhatsAppButton } from "@/components/ui/CtaBand";
import Waterline from "@/components/illustrations/Waterline";

export const metadata: Metadata = {
  title: "PADI Courses Trincomalee, Sri Lanka | Diving Club",
  description:
    "Nine PADI-certified scuba courses in Trincomalee, Sri Lanka. From Discover Scuba to Divemaster. All levels welcome. Small groups, all equipment included. From $75.",
  alternates: { canonical: "https://divingclub.lk/courses" },
  openGraph: {
    title: "PADI Courses Trincomalee, Sri Lanka | Diving Club",
    description:
      "Nine PADI courses: Discover Scuba, Open Water, Advanced, Rescue Diver, Divemaster and more. Small groups, local guides, all gear included.",
    url: "https://divingclub.lk/courses",
  },
};

export default async function CoursesPage() {
  const courses = await getCourses();

  const itemListJsonLd: WithContext<ItemList> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "PADI Scuba Diving Courses | Diving Club Trincomalee",
    numberOfItems: courses.length,
    itemListElement: courses.map((course, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: course.name,
        description: course.description,
        url: `https://divingclub.lk/courses/${course.slug}`,
        provider: {
          "@type": "Organization",
          name: "Diving Club",
          url: "https://divingclub.lk",
        },
        offers: {
          "@type": "Offer",
          price: course.price,
          priceCurrency: course.currency,
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
        crumbs={[{ label: "Home", href: "/" }, { label: "Courses" }]}
        notes="PADI Certified · Trincomalee"
        title="PADI Courses in Trincomalee"
        lead={
          <>
            From your very first breath underwater to your Divemaster certification. All of it here, in
            Trincomalee&apos;s warm, crystal-clear water.
          </>
        }
        stats={[
          { value: "9", label: "PADI Courses" },
          { value: "All levels", label: "Beginner to Pro" },
          { value: "From $75", label: "Starting price" },
          { value: "186", label: "Countries cert. valid" },
        ]}
      />
      <Waterline from="surface" to="shallow" />

      {/* Filter + grid */}
      <CourseGrid courses={courses} />

      {/* Bottom CTA */}
      <CtaBand
        notes="Need guidance?"
        title="Not sure which course to start with?"
        body={
          <p>
            Drop us a call and we&apos;ll figure out the right fit, whether you&apos;ve never seen a tank before
            or you&apos;re working towards your Divemaster.
          </p>
        }
      >
        <WhatsAppButton>0743 945 010</WhatsAppButton>
        <BandLink href="/contact">Send a message →</BandLink>
      </CtaBand>
    </>
  );
}
