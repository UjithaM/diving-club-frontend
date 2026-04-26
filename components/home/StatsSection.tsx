import AnimatedSection from "@/components/ui/AnimatedSection";

const stats = [
  { value: "15+", label: "Years in Business" },
  { value: "2,000+", label: "Divers Trained" },
  { value: "12", label: "Dive Sites" },
  { value: "9", label: "PADI Courses" },
];

export default function StatsSection() {
  return (
    <section className="bg-warm-white py-10 lg:py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <hr className="border-t border-charcoal-sea/10 mb-8 lg:mb-12" />
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.08}>
              <div
                className={`px-4 sm:px-6 py-6 text-center${
                  i % 2 === 0
                    ? " border-r border-charcoal-sea/10"
                    : i < stats.length - 1
                    ? " lg:border-r lg:border-charcoal-sea/10"
                    : ""
                }`}
              >
                <span className="block text-[clamp(2.5rem,5vw,4rem)] font-extrabold font-display leading-none text-charcoal-sea">
                  {stat.value}
                </span>
                <span className="block text-[11px] uppercase tracking-[0.2em] text-charcoal-sea/45 mt-2">
                  {stat.label}
                </span>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <hr className="border-t border-charcoal-sea/10 mt-8 lg:mt-12" />
      </div>
    </section>
  );
}
