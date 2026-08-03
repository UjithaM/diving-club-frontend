import type { Metadata } from "next";
import AdLandingPage from "@/components/ads/AdLandingPage";
import { getCourseBySlug } from "@/lib/api/courses";

/**
 * Open Water gets its own page because it is the course people actually enquire about
 * and the highest-value thing the ads sell. /padi keeps the whole course list.
 */
const COURSE_SLUG = "open-water-diver";

/** " from $350", or "" if the API is down — never a hardcoded price. */
const fromPrice = (course?: { price: number }) => (course ? ` from $${course.price}` : "");

export async function generateMetadata(): Promise<Metadata> {
  const course = await getCourseBySlug(COURSE_SLUG);
  return {
    // No "| Diving Club" — the root layout's title.template already appends it.
    title: `PADI Open Water Course in Trincomalee${fromPrice(course)}`,
    description: `Get your PADI Open Water certification in Trincomalee${fromPrice(course)} — three days, small classes, 28°C water and turtles on the training dives. Book in a minute.`,
    robots: { index: false, follow: false },
  };
}

export default async function OpenWaterPage() {
  // One course, already chosen for the visitor. Returns undefined if the API is down.
  // Same call as generateMetadata — Next's Data Cache dedupes it to one request.
  const course = await getCourseBySlug(COURSE_SLUG);

  return (
    <AdLandingPage
      source="open-water"
      message="Hi! Can you tell me about the PADI Open Water course?"
      urgentMessage="Hi! I'd like to start the PADI Open Water course this week — what dates are free?"
      bookingFor="course"
      items={[]}
      fixedItem={course}
      bookingHeading="Start your Open Water course"
      eyebrow="PADI centre · Trincomalee · since 2010"
      // Matches the ad headline and the "padi open water / open water course" keywords
      // word for word — this page exists for exactly those searches.
      heading={`PADI Open Water course in Trincomalee${fromPrice(course)}`}
      subheading="Three days to the most recognised diving certification in the world. Learn in 28°C water on reefs with turtles and WWII wrecks, then dive anywhere on earth to 18 metres, for life."
      image="/assets/J-rockshan-with-open-water-students.webp"
      imageAlt="PADI instructor Rockshan briefing Open Water students in Trincomalee, Sri Lanka"
      points={[
        {
          title: "Three days, start to certified",
          body: "Theory, confined-water skills in a shallow bay, then four open-water dives. You finish holding a PADI Open Water card that never expires and works at every dive centre in the world.",
        },
        {
          title: "Classes stay small",
          body: "Enough attention that nobody gets left behind on a skill they find hard, and enough time to repeat it until it feels easy. Nobody is rushed through the mask-clearing.",
        },
        {
          title: "Start the theory before you arrive",
          body: "We send you the PADI eLearning ahead of time. Getting the classroom part done at home means more of your three days is spent in the water instead of in front of a screen.",
        },
        {
          title: "Somewhere worth learning",
          body: "You could do your four training dives in a swimming pool somewhere. Or you could do them on a reef with hawksbill turtles, sea fans, and a Hindu temple on the cliff above you.",
        },
      ]}
      steps={[
        {
          title: "Fill in the form above",
          body: "Tell us roughly when you're in Trincomalee and how many of you there are. Takes about a minute. You can WhatsApp us instead if you'd rather ask a question first.",
        },
        {
          title: "We book your dates and send the theory",
          body: "We'll confirm your start date, how many days to keep free, and what's included. Your PADI eLearning goes out so you can start before you land.",
        },
        {
          title: "Turn up at Sandy Cove",
          body: "A short tuk-tuk from Uppuveli or Nilaveli. We handle the gear, the boat, and the paperwork. Bring a swimsuit and a towel.",
        },
      ]}
      faqs={[
        {
          question: "How long does the Open Water course take?",
          answer:
            "Three days here in Trincomalee, and we can stretch it over four if you'd rather go slower. Doing the PADI eLearning theory before you arrive frees up more water time once you're here. If you're really short on days, the two-day PADI Scuba Diver course is a genuine option and it upgrades to full Open Water later.",
        },
        {
          question: "Do I need to be able to swim?",
          answer:
            "Yes, for the full Open Water course. PADI requires a 200 metre swim with no time limit, any stroke you like, plus a 10 minute float or tread. It isn't a fitness test, but you do need to be comfortable in water. If you're unsure, do a try dive with us first and see how it feels.",
        },
        {
          question: "How old do you have to be?",
          answer:
            "Ten for Junior Open Water, with some depth limits until you turn twelve, then fifteen for the full certification. Parents are welcome on the boat.",
        },
        {
          question: "Is the certification valid everywhere, and does it expire?",
          answer:
            "PADI is the most widely recognised diving certification in the world and the card doesn't expire. Egypt, Thailand, Mexico, the Maldives — anywhere with a dive centre will take it. If you've been out of the water a few years they'll suggest a refresher, which is completely normal.",
        },
        {
          question: "What's included in the price?",
          answer:
            "All your scuba equipment for the whole course, confined water training and four open-water dives, PADI eLearning or the manual, boat transfers, refreshments, and your certification card. Bring a swimsuit and a towel — that's genuinely it.",
        },
      ]}
      closingHeading="Ready to get certified?"
    />
  );
}
