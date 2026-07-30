import type { Metadata } from "next";
import AdLandingPage from "@/components/ads/AdLandingPage";
import { getCourses } from "@/lib/api/courses";

export const metadata: Metadata = {
  title: "PADI Courses in Trincomalee | Diving Club",
  description:
    "Get PADI certified in Trincomalee, Sri Lanka. Open Water, Advanced, and specialty courses with small classes and warm, clear water. Message us on WhatsApp.",
  robots: { index: false, follow: false },
};

export default async function PadiPage() {
  const courses = await getCourses().catch(() => []);

  return (
    <AdLandingPage
      source="padi"
      message="Hi! Can you tell me about PADI courses?"
      bookingFor="course"
      items={courses}
      bookingHeading="Start your PADI course"
      eyebrow="PADI centre · Trincomalee · since 2010"
      heading="Get PADI certified in Trincomalee"
      subheading="Open Water in four days, in 28°C water, on reefs with turtles and WWII wrecks. Your card is recognised at every dive centre in the world, for life."
      image="/assets/J-rockshan-with-open-water-students.webp"
      imageAlt="PADI instructor Rockshan briefing Open Water students in Trincomalee, Sri Lanka"
      points={[
        {
          title: "Four days to Open Water",
          body: "Theory, pool-style skills in a shallow bay, then four open-water dives. You finish with a PADI Open Water certification that lets you dive anywhere in the world to 18 metres.",
        },
        {
          title: "Classes stay small",
          body: "Four students to one instructor at most. Enough attention that nobody gets left behind on a skill, and enough time that you're not rushing through the bits you find hard.",
        },
        {
          title: "Rockshan has taught here since 2010",
          body: "Same instructors, same boats, same base at Sandy Cove. Students regularly come back for their Advanced with us, which is the part we're actually proud of.",
        },
        {
          title: "Somewhere worth learning",
          body: "You could learn in a swimming pool somewhere. Or you could do your first four dives on a reef with hawksbill turtles, sea fans, and a Hindu temple on the cliff above you.",
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
      faqs={[
        {
          question: "How long does the Open Water course take?",
          answer:
            "Four days, though we can sometimes stretch it over five if you'd rather go slower. There's theory you can knock out online before you arrive, which frees up more water time once you're here. If you're short on days, the two-day PADI Scuba Diver course is a real option and it upgrades to Open Water later.",
        },
        {
          question: "Do I need to be able to swim?",
          answer:
            "For the full Open Water course, yes. PADI requires a 200 metre swim (no time limit, any stroke) and a 10 minute float. It's not a fitness test, but you do need to be comfortable in water. If you're not sure, do a try dive with us first and see how you feel.",
        },
        {
          question: "How old do you have to be?",
          answer:
            "Ten for Junior Open Water, with some depth limits until you turn twelve, then fifteen. For the try dive the minimum is ten as well. Parents are welcome on the boat.",
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
