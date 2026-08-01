import type { Metadata } from "next";
import AdLandingPage from "@/components/ads/AdLandingPage";
import { getCourseBySlug } from "@/lib/api/courses";

const COURSE_SLUG = "discover-scuba-diving";

/** " from $40", or "" if the API is down — never a hardcoded price. */
const fromPrice = (course?: { price: number }) => (course ? ` from $${course.price}` : "");

export async function generateMetadata(): Promise<Metadata> {
  const course = await getCourseBySlug(COURSE_SLUG);
  return {
    // No "| Diving Club" — the root layout's title.template already appends it.
    title: `Try Scuba Diving in Trincomalee${fromPrice(course)}`,
    description: `Try scuba diving in Trincomalee${fromPrice(course)} — no experience needed and all gear included. One day on the reef with a PADI instructor. Book in a minute.`,
    robots: { index: false, follow: false },
  };
}

export default async function DivePage() {
  // One course, already chosen for the visitor. Returns undefined if the API is down.
  // Same call as generateMetadata — Next's Data Cache dedupes it to one request.
  const course = await getCourseBySlug(COURSE_SLUG);

  return (
    <AdLandingPage
      source="dive"
      message="Hi! Can I book a dive?"
      urgentMessage="Hi! Are you running dives today or tomorrow? I'd like to join."
      bookingFor="course"
      items={[]}
      fixedItem={course}
      bookingHeading="Your first dive, all in"
      eyebrow="PADI centre · Trincomalee · since 2010"
      heading={`Go diving in Trincomalee${fromPrice(course)}`}
      subheading="Turtles on nearly every dive, WWII wrecks in the bay, and water warm enough that nobody wants a wetsuit. Never dived before? That's most of the people who message us."
      image="/assets/couple-scuba-diving-trincomalee.webp"
      imageAlt="Two divers swimming over a coral reef in Trincomalee, Sri Lanka"
      points={[
        {
          title: "You don't need any experience",
          body: "Our try dive takes about three hours. Half of it is us teaching you to breathe underwater in shallow water, then you're on the reef at around 10 metres with an instructor right beside you the whole time.",
        },
        {
          title: "Small groups, always",
          body: "Four divers to one guide, maximum. On a try dive it's just you and the instructor. You're not going to lose anyone in a crowd of twenty down there.",
        },
        {
          title: "Gear is included",
          body: "Mask, fins, wetsuit, BCD, regulator, tanks, weights. Bring a swimsuit and a towel. That's genuinely it.",
        },
        {
          title: "We know these reefs",
          body: "We've been diving this bay since 2010 and we run 12 sites around it. We'll pick the one that suits your level and the conditions that morning, not the one on a poster.",
        },
      ]}
      steps={[
        {
          title: "Fill in the form above",
          body: "Takes about a minute — just tell us when you're in Trincomalee and how many of you there are. Prefer to type it out? WhatsApp us instead.",
        },
        {
          title: "We confirm a time",
          body: "We'll tell you what's running that day, what the sea looks like, and what it costs. Usually within a few minutes.",
        },
        {
          title: "Show up at Sandy Cove",
          body: "We're a short tuk-tuk from Uppuveli and Nilaveli. Come in a swimsuit, we do the paperwork and the briefing, and you're on the boat.",
        },
      ]}
      faqs={[
        {
          question: "I can't really swim. Can I still try diving?",
          answer:
            "Yes. For a try dive you don't need to be a strong swimmer, just comfortable enough not to panic when your face is in the water. Your instructor holds onto you for the whole dive if you want. Tell us on WhatsApp and we'll plan around it. The full PADI Open Water course does have a swim requirement, but the try dive doesn't.",
        },
        {
          question: "I've never dived before. Is that a problem?",
          answer:
            "Not at all. Most people who message us have never breathed off a tank in their life. The try dive exists exactly for that. You'll get about an hour of instruction in shallow water first, and you don't go anywhere until you're ready.",
        },
        {
          question: "What should I bring?",
          answer:
            "A swimsuit, a towel, and sunscreen. We provide all the diving gear. Leave your valuables at the hotel, and skip breakfast if you're prone to seasickness, or eat something light.",
        },
        {
          question: "When is the diving season?",
          answer:
            "May to October on this coast. Outside those months the northeast monsoon makes the sea too rough and visibility drops right off, so we don't run dive trips. June to September tends to give the calmest water and the best visibility.",
        },
      ]}
      closingHeading="Ready to get in the water?"
    />
  );
}
