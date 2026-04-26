"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";

const tiles = [
  {
    num: "01",
    accent: "#2A9D8F",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "PADI Certified",
    body: "Every course follows official PADI standards. Your certification is recognised in 186 countries — dive anywhere in the world.",
  },
  {
    num: "02",
    accent: "#F4A261",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Small Groups",
    body: "Maximum 5 divers per guided dive. Your instructor knows your name, your comfort level, and exactly where you want to go.",
  },
  {
    num: "03",
    accent: "#E76F51",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Local Expertise",
    body: "We've been diving Trincomalee's reefs for years. We know where the turtles sleep, where the whale sharks feed, and when the water is clearest.",
  },
  {
    num: "04",
    accent: "#2A9D8F",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: "All Levels Welcome",
    body: "First dive or your 500th — we have something for you. Try diving needs zero experience. Divemaster training takes you as far as you want to go.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a3540 0%, #1a4a42 50%, #264653 100%)" }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-bold leading-none select-none pointer-events-none opacity-[0.03] text-warm-white whitespace-nowrap"
        aria-hidden
      >
        DIVE
      </div>

      <div className="max-w-6xl mx-auto relative">
        <AnimatedSection className="mb-16">
          <span className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-shallow-water" />
            <span className="text-shallow-water text-xs font-semibold tracking-[0.2em] uppercase">
              What Sets Us Apart
            </span>
          </span>
          <h2 className="text-warm-white text-3xl sm:text-5xl font-bold">Why Dive with Us</h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiles.map((tile, i) => (
            <AnimatedSection key={tile.title} delay={i * 0.1}>
              <div
                className="hover:-translate-y-2 hover:scale-[1.02] transition-transform duration-300 ease-out rounded-2xl p-6 h-full flex flex-col gap-5 relative overflow-hidden"
                style={{ background: "rgba(255,248,240,0.05)", border: "1px solid rgba(255,248,240,0.08)" }}
              >
                <div className="h-0.5 w-10 rounded-full" style={{ background: tile.accent }} />
                <span
                  className="absolute -top-2 -right-2 text-7xl font-bold leading-none select-none opacity-[0.07]"
                  style={{ color: tile.accent }}
                  aria-hidden
                >
                  {tile.num}
                </span>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${tile.accent}25`, color: tile.accent }}
                >
                  {tile.icon}
                </div>
                <div>
                  <h3 className="text-warm-white font-bold text-xl mb-2">{tile.title}</h3>
                  <p className="text-warm-white/55 text-sm leading-relaxed">{tile.body}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
