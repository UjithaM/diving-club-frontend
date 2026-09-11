import type { Metadata } from "next";
import AdLandingPage from "@/components/ads/AdLandingPage";
import { getCourses } from "@/lib/api/courses";

/** Open Water is what the ads sell, so its price is the one that has to match the ad. */
const HEADLINE_COURSE = "open-water-diver";

/** " from $395", or "" if the API is down — never a hardcoded price. */
const fromPrice = (courses: { slug: string; price: number }[]) => {
  const course = courses.find((c) => c.slug === HEADLINE_COURSE);
  return course ? ` from $${course.price}` : "";
};

export async function generateMetadata(): Promise<Metadata> {
  // Same call as the page — Next's Data Cache dedupes it to one request.
  const courses = await getCourses().catch(() => []);
  return {
    // No "| Diving Club" — the root layout's title.template already appends it.
    title: `PADI Courses in Trincomalee${fromPrice(courses)}`,
    description: `Get PADI certified in Trincomalee, Sri Lanka${fromPrice(courses)}. Open Water, Advanced, and specialty courses with small classes and warm, clear water. Message us on WhatsApp.`,
    robots: { index: false, follow: false },
  };
}

export default async function PadiPage() {
  const courses = await getCourses().catch(() => []);

  return (
    <AdLandingPage
      source="padi"
      message="Hi! Can you tell me about PADI courses?"
      urgentMessage="Hi! I'd like to start a PADI course this week — what's available?"
      bookingFor="course"
      items={courses}
      bookingHeading="Start your PADI course"
      // No fixedItem on this page — the form offers the whole course list. The hero price and
      // the What's-included section follow the headline course, which is already the one whose
      // price the ads quote.
      summaryItem={courses.find((c) => c.slug === HEADLINE_COURSE)}
      heading="Get PADI certified in Trincomalee"
      subheading="Open Water in two days, in 28°C water, on reefs with turtles and WWII wrecks. Your card is recognised at every dive centre in the world, for life."
      objections={[
        {
          title: "Do I need to be able to swim?",
          body: "For the full Open Water course, yes. PADI requires a 200 metre swim (no time limit, any stroke) and a 10 minute float. It's not a fitness test, but you do need to be comfortable in water. If you're not sure, do a try dive with us first and see how you feel.",
        },
        {
          title: "How old do you have to be?",
          body: "Ten for Junior Open Water, with some depth limits until you turn twelve, then fifteen. For the try dive the minimum is ten as well. Parents are welcome on the boat.",
        },
        {
          title: "I don't know which course I need",
          body: "Pick \"not sure yet\" in the form, or just message us. Never dived at all? The try dive is the place to start. Want the certification that works everywhere, for life? That's Open Water. Already certified and after the deeper wrecks? Advanced.",
        },
      ]}
      steps={[
        {
          title: "Fill in the form above",
          body: "Pick the course you're after, or choose \"not sure yet\" and we'll point you at the right one. Takes about a minute. You can WhatsApp us instead if you'd rather ask first.",
        },
        {
          title: "We book your dates",
          body: "We'll confirm start dates, how many days you need free, what's included, and the cost. We send the theory material ahead so you can start before you arrive.",
        },
        {
          title: "Turn up and learn",
          body: "Sandy Cove, Trincomalee. A short tuk-tuk from Uppuveli or Nilaveli. We handle the gear, the boat, and the paperwork.",
        },
      ]}
      // Swim requirement and age moved up into `objections`.
      faqs={[
        {
          question: "How long does the Open Water course take?",
          answer:
            "Two days, though we can sometimes stretch it over three if you'd rather go slower. There's theory you can knock out online before you arrive, which frees up more water time once you're here. If you're short on days, the PADI Scuba Diver course is a real option and it upgrades to Open Water later.",
        },
        {
          question: "How small are the classes?",
          answer:
            "Four students to one instructor at most. Enough attention that nobody gets left behind on a skill, and enough time that you're not rushing through the bits you find hard.",
        },
        {
          question: "Who teaches the courses?",
          answer:
            "Rockshan has taught here since 2010 — same instructors, same boats, same base at Sandy Cove. Students regularly come back for their Advanced with us, which is the part we're actually proud of.",
        },
        {
          question: "Where will I do my training dives?",
          answer:
            "You could learn in a swimming pool somewhere. Or you could do your first four dives on a reef with hawksbill turtles, sea fans, and a Hindu temple on the cliff above you. Theory, then pool-style skills in a shallow bay, then four open-water dives.",
        },
        {
          question: "Is the certification valid everywhere?",
          answer:
            "Yes. PADI is the most widely recognised diving certification in the world and the card doesn't expire. Egypt, Thailand, Mexico, the Maldives, anywhere with a dive centre will take it. If you've been out of the water a few years they'll suggest a refresher, which is normal.",
        },
      ]}
      closingHeading="Want to start your course?"
    />
  );
}
