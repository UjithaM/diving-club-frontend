import Image from "next/image";
import Section from "@/components/ui/Section";
import { photos } from "@/lib/photos";
import { BranchCoral, BrainCoral, FanCoral, Fins, Fish, Mask, Seaweed, Turtle } from "@/components/illustrations/Sea";

const items = [
  {
    title: "PADI Certified",
    body: "Every course follows official PADI standards. Your certification is recognised in 186 countries. Dive anywhere in the world.",
    art: <Mask className="w-14" />,
  },
  {
    title: "Small Groups",
    body: "Maximum 2 divers per guide. Your instructor knows your name, your comfort level, and exactly where you want to go.",
    art: (
      <span className="relative block w-14 h-10">
        <Fish className="absolute left-0 top-0 w-8" />
        <Fish className="absolute right-0 top-3 w-6" />
        <Fish className="absolute left-3 bottom-0 w-5" />
      </span>
    ),
  },
  {
    title: "Local Expertise",
    body: "We've been diving Trincomalee's reefs for years. We know where the turtles sleep, where the whale sharks feed, and when the water is clearest.",
    art: <Turtle className="w-16" />,
  },
  {
    title: "All Levels Welcome",
    body: "First dive or your 500th, we have something for you. Try diving needs zero experience. Divemaster training takes you as far as you want to go.",
    art: <Fins className="w-10" />,
  },
];

/** The sea floor at the bottom of the shallows: coral and weed, each swaying on its own clock. */
function Reef() {
  const pieces = [
    { el: <Seaweed className="w-8 lg:w-10" />, left: "3%", t: "5.5s" },
    { el: <BranchCoral className="w-16 lg:w-24" />, left: "9%", t: "7s" },
    { el: <BrainCoral className="w-20 lg:w-28" />, left: "22%", t: "0s" },
    { el: <FanCoral className="w-16 lg:w-24" />, left: "46%", t: "6.2s" },
    { el: <Seaweed className="w-7 lg:w-9" color="var(--color-sunrise)" />, left: "58%", t: "4.8s" },
    { el: <BranchCoral className="w-14 lg:w-20" color="var(--color-sunrise)" />, left: "70%", t: "6.6s" },
    { el: <BrainCoral className="w-16 lg:w-24" />, left: "82%", t: "0s" },
    { el: <Seaweed className="w-8 lg:w-11" />, left: "94%", t: "5.1s" },
  ];
  return (
    <div className="ambient inset-x-0 bottom-0 h-24 lg:h-32 overflow-hidden" aria-hidden="true">
      {pieces.map((p, i) => (
        <div
          key={i}
          className={`absolute bottom-0 -translate-x-1/2 ${p.t !== "0s" ? "sway" : ""} [&>svg]:block`}
          style={{ left: p.left, "--sway-time": p.t, animationDelay: `-${i * 0.7}s` } as React.CSSProperties}
        >
          {p.el}
        </div>
      ))}
    </div>
  );
}

/** Still in the shallows: the reassurance before the deep water. */
export default function WhyChooseUsSection() {
  return (
    <Section zone="shallow" depth={9} log="What Sets Us Apart" className="relative pt-4! lg:pt-8! pb-36! lg:pb-48!">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div className="reveal">
          <h2 className="text-section font-extrabold mb-6 lg:mb-8">Why Dive with Us</h2>
          <div className="plate aspect-[16/10] lg:aspect-[7/8]">
            <Image
              src={photos.group.src}
              alt={photos.group.alt}
              fill
              placeholder="blur"
              className="object-cover object-[50%_40%]"
              sizes="(max-width: 1024px) 100vw, 36vw"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 content-start border-t-2 border-current lg:mt-[4.25rem]">
          {items.map((item) => (
            <div
              key={item.title}
              className="reveal grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-4 sm:block py-5 sm:py-7 sm:pr-8 border-b border-rule sm:[&:nth-child(even)]:pl-8 sm:[&:nth-child(even)]:pr-0 sm:[&:nth-child(even)]:border-l"
            >
              <div className="h-12 flex items-center sm:mb-4" aria-hidden="true">{item.art}</div>
              <div>
                <h3 className="text-sub font-extrabold mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-meta sm:text-body">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Reef />
    </Section>
  );
}
