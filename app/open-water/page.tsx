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
    description: `Get your PADI Open Water certification in Trincomalee${fromPrice(course)} — two days, small classes, 28°C water and turtles on the training dives. Book in a minute.`,
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
      summaryItem={course}
      // Matches the ad headline and the "padi open water / open water course" keywords
      // word for word — this page exists for exactly those searches. The price moved out of
      // the heading and into its own hero line.
      heading="PADI Open Water course in Trincomalee"
      subheading="Two days to the most recognised diving certification in the world. Learn in 28°C water on reefs with turtles and WWII wrecks, then dive anywhere on earth to 18 metres, for life."
      // The swim requirement is the single biggest thing that stops an Open Water booking, so
      // it leads. All three were FAQs before, sitting at the bottom of the page.
      objections={[
        {
          title: "Do I need to be able to swim?",
          body: "Yes, for the full Open Water course. PADI requires a 200 metre swim with no time limit, any stroke you like, plus a 10 minute float or tread. It isn't a fitness test, but you do need to be comfortable in water. If you're unsure, do a try dive with us first and see how it feels.",
        },
        {
          title: "How old do you have to be?",
          body: "Ten for Junior Open Water, with some depth limits until you turn twelve, then fifteen for the full certification. Parents are welcome on the boat.",
        },
        {
          title: "What do I need to bring?",
          body: "A swimsuit and a towel — that's genuinely it. All your scuba equipment for the whole course is included, along with the confined water training, four open-water dives, the PADI eLearning or manual, boat transfers, refreshments and your certification card.",
        },
      ]}
      steps={[
        {
          title: "Fill in the form above",
          body: "Tell us roughly when you're in Trincomalee and how many of you there are. Takes about a minute. You can WhatsApp us instead if you'd rather ask a question first.",
        },
        {
          title: "We book your dates and send the theory",
          body: "We'll confirm your start date, how many days to keep free, and what's included. Your PADI eLearning goes out so you can start before you land — getting the classroom part done at home means more of your two days is spent in the water.",
        },
        {
          title: "Turn up at Sandy Cove",
          body: "A short tuk-tuk from Uppuveli or Nilaveli. We handle the gear, the boat, and the paperwork. Bring a swimsuit and a towel.",
        },
      ]}
      // Swim requirement, age and what-to-bring moved up into `objections`; the price
      // breakdown now has its own section. What's left is the detail people ask second.
      faqs={[
        {
          question: "How long does the Open Water course take?",
          answer:
            "Two days here in Trincomalee, and we can stretch it over three if you'd rather go slower. Doing the PADI eLearning theory before you arrive frees up more water time once you're here. If you're really short on days, the PADI Scuba Diver course is a genuine option and it upgrades to full Open Water later.",
        },
        {
          question: "How small are the classes?",
          answer:
            "Small enough that nobody gets left behind on a skill they find hard, and that there's time to repeat it until it feels easy. Nobody is rushed through the mask-clearing.",
        },
        {
          question: "Where do the training dives happen?",
          answer:
            "You could do your four training dives in a swimming pool somewhere. Or you could do them on a reef with hawksbill turtles, sea fans, and a Hindu temple on the cliff above you. We do the confined-water skills in a shallow bay, then the four open-water dives out on the reef.",
        },
        {
          question: "Is the certification valid everywhere, and does it expire?",
          answer:
            "PADI is the most widely recognised diving certification in the world and the card doesn't expire. Egypt, Thailand, Mexico, the Maldives — anywhere with a dive centre will take it. If you've been out of the water a few years they'll suggest a refresher, which is completely normal.",
        },
      ]}
      closingHeading="Ready to get certified?"
    />
  );
}
