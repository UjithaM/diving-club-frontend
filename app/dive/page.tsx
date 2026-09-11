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
    description: `Try scuba diving in Trincomalee${fromPrice(course)} — no experience needed and all gear included. Two hours on the reef with a PADI instructor. Book in a minute.`,
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
      summaryItem={course}
      // "Scuba" earns its place: search terms containing it convert ~4.5x better than
      // those without, and this matches the ad headline and the QS-8 keyword
      // "scuba diving in trincomalee" word for word. The price is no longer appended here —
      // it gets its own line in the hero, and the keyword match is unaffected.
      heading="Scuba diving in Trincomalee"
      // "water warm enough that nobody wants a wetsuit" went with the wrecks: we hand every try
      // diver a wetsuit, so the old line argued against the kit we provide.
      subheading="Turtles on nearly every dive, in water that stays warm and clear right through the season. Never dived before? That's most of the people who message us."
      // The three things that actually stop a first-timer booking, promoted out of the FAQ so
      // they're answered before anyone has to go looking.
      objections={[
        {
          title: "I can't really swim. Can I still try diving?",
          body: "Yes. For a try dive you don't need to be a strong swimmer, just comfortable enough not to panic when your face is in the water. Your instructor holds onto you for the whole dive if you want. Tell us on WhatsApp and we'll plan around it. The full PADI Open Water course does have a swim requirement, but the try dive doesn't.",
        },
        {
          title: "I've never dived before. Is that a problem?",
          body: "Not at all. Most people who message us have never breathed off a tank in their life. The try dive exists exactly for that. We teach you in shallow water first, and you don't go anywhere until you're ready. Two students to one instructor at most, and they're right beside you the whole time.",
        },
        {
          title: "What should I bring?",
          body: "Come in whatever you're comfortable in — you don't need a swimsuit, we give you a wetsuit to change into. Bring a towel and some sunscreen. All the diving gear is ours: mask, fins, wetsuit, BCD, regulator, tanks, weights. Leave your valuables at the hotel, and eat something light rather than a big breakfast if you're prone to seasickness.",
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
          body: "We're a short tuk-tuk from Uppuveli and Nilaveli. Come as you are — we hand you a wetsuit, do the paperwork and the briefing, and you're on the boat.",
        },
      ]}
      // The swim / never-dived / what-to-bring questions moved up into `objections`. What's
      // left here is the detail people ask second, carried over from the old trust points so
      // none of that copy is lost.
      faqs={[
        {
          question: "How long does the try dive take?",
          answer:
            "An hour and a half to two hours from start to finish. Part of that is us teaching you to breathe underwater in shallow water, then you're on the reef with an instructor right beside you the whole time.",
        },
        {
          question: "How big are the groups?",
          answer:
            "Two students to one instructor, maximum. You're not going to get lost in a crowd of twenty down there, and nobody has to wait their turn for attention.",
        },
        {
          question: "Which dive site will we go to?",
          answer:
            "We've been diving this bay since 2010 and we run 12 sites around it. We'll pick the one that suits your level and the conditions that morning, not the one on a poster.",
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
