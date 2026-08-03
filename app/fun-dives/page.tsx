import type { Metadata } from "next";
import AdLandingPage from "@/components/ads/AdLandingPage";
import { getCourseBySlug } from "@/lib/api/courses";

/**
 * Requires a `fun-dives` product ($40) to exist in the API — see CourseSeeder.
 * Without it `fixedItem` is undefined and AdBookingForm falls back to an empty
 * dropdown, so the "Fun Dives" ad group stays PAUSED until the product is live.
 */
const COURSE_SLUG = "fun-dives";

/** " from $40", or "" if the API is down — never a hardcoded price. */
const fromPrice = (course?: { price: number }) => (course ? ` from $${course.price}` : "");

export async function generateMetadata(): Promise<Metadata> {
  const course = await getCourseBySlug(COURSE_SLUG);
  return {
    // No "| Diving Club" — the root layout's title.template already appends it.
    title: `Fun Dives in Trincomalee${fromPrice(course)}`,
    description: `Guided fun dives in Trincomalee${fromPrice(course)} for certified divers. Reefs, coral gardens and WWII wrecks, small groups, all gear included. Book in a minute.`,
    robots: { index: false, follow: false },
  };
}

export default async function FunDivesPage() {
  // One item, already chosen for the visitor. Returns undefined if the API is down.
  // Same call as generateMetadata — Next's Data Cache dedupes it to one request.
  const course = await getCourseBySlug(COURSE_SLUG);

  return (
    <AdLandingPage
      source="fun-dives"
      message="Hi! I'm already certified — can I book a fun dive?"
      urgentMessage="Hi! I'm certified and in Trincomalee now — are you running dives today or tomorrow?"
      bookingFor="course"
      items={[]}
      fixedItem={course}
      bookingHeading="Book your dives"
      eyebrow="PADI centre · Trincomalee · since 2010"
      // Certified divers already know what scuba is — this page sells the sites and the
      // boat, not the sport. /dive handles first-timers.
      heading={`Fun dives in Trincomalee${fromPrice(course)}`}
      subheading="Twelve sites around the bay — coral gardens, Swami Rock, and the WWII wrecks. Bring your card, we'll handle the rest. Turtles on nearly every dive."
      image="/assets/scuba-diver-exploring-shipwreck-trincomalee.webp"
      imageAlt="Certified scuba diver exploring a WWII shipwreck in Trincomalee, Sri Lanka"
      points={[
        {
          title: "Twelve sites, matched to you",
          body: "Shallow coral gardens at 8 metres through to the SS British Sergeant at 18 to 24. We pick the site for your level and what the sea is doing that morning, not what's on a poster.",
        },
        {
          title: "The wrecks are the real draw",
          body: "Trincomalee bay holds genuine WWII history. Irarakandy sits at 6 to 10 metres and suits any certified diver. The British Sergeant at 18 to 24 is the one people come back for.",
        },
        {
          title: "Four divers to one guide, maximum",
          body: "You're diving with someone who knows every reef in the bay, not following a crowd of twenty and hoping the guide notices when you're low on air.",
        },
        {
          title: "Gear is included",
          body: "BCD, regulator, wetsuit, fins, mask, tanks and weights. Bring your certification card and a swimsuit. If you've got your own kit, bring that instead — no problem either way.",
        },
      ]}
      steps={[
        {
          title: "Fill in the form above",
          body: "Tell us your certification level, roughly how many dives you've logged, and when you're in Trincomalee. Takes about a minute. WhatsApp works too if you'd rather ask first.",
        },
        {
          title: "We suggest the sites",
          body: "We'll come back with what's diveable that week, which sites suit your level, what the visibility is doing, and the cost for the number of dives you want.",
        },
        {
          title: "Show up at Sandy Cove",
          body: "A short tuk-tuk from Uppuveli or Nilaveli. Bring your card, we do the check-in and briefing, and you're on the boat.",
        },
      ]}
      faqs={[
        {
          question: "What certification do I need?",
          answer:
            "PADI Open Water or any equivalent from SSI, NAUI, CMAS, BSAC and so on. Bring the card or have it on the app. Open Water gets you to 18 metres, Advanced opens up the deeper wrecks and the outer walls.",
        },
        {
          question: "I haven't dived in a few years. Is that a problem?",
          answer:
            "Not at all, it's common. Tell us when you book and we'll start you somewhere shallow and easy, and run through the basics on the boat before you get in. If you'd rather do a proper refresher first, we can do that too.",
        },
        {
          question: "Can I dive the HMS Hermes?",
          answer:
            "Not on a recreational fun dive. She lies at 45 to 53 metres, which is technical diving territory and beyond recreational limits. The SS British Sergeant at 18 to 24 metres and Irarakandy at 6 to 10 are both properly good wrecks and open to certified divers.",
        },
        {
          question: "When is the diving season?",
          answer:
            "May to October on this coast. Outside those months the northeast monsoon makes the sea too rough and visibility drops right off, so we don't run dive trips. June to September tends to give the calmest water and the best visibility.",
        },
      ]}
      closingHeading="Ready to get back in the water?"
    />
  );
}
