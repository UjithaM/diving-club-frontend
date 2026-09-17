import type { Zone } from "@/components/ui/Section";

const WAVE =
  "M0 18 Q 90 4 180 18 T 360 18 T 540 18 T 720 18 T 900 18 T 1080 18 T 1260 18 T 1440 18 V 40 H 0 Z";

const ground: Record<Zone, string> = {
  surface: "var(--color-warm-white)",
  sunrise: "var(--color-sunrise)",
  shallow: "var(--color-shallow-water)",
  deep: "var(--color-charcoal-sea)",
  abyss: "var(--color-surface-dark)",
};

/**
 * The moving water surface between two zones: the band is the zone above, the wave is the
 * zone below. The path repeats every 360 units; six 1440px copies scroll by half their width,
 * so the loop stays seamless on screens up to 4320px wide.
 */
export default function Waterline({ from, to, speed = 18 }: { from: Zone; to: Zone; speed?: number }) {
  return (
    <div className="relative h-10 overflow-hidden -mb-px" style={{ background: ground[from] }} aria-hidden="true">
      <div
        className="marquee__track absolute bottom-0 left-0 h-10"
        style={{ "--marquee-time": `${speed}s` } as React.CSSProperties}
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <svg key={i} viewBox="0 0 1440 40" preserveAspectRatio="none" className="h-10 w-[1440px] shrink-0">
            <path d={WAVE} fill={ground[to]} />
          </svg>
        ))}
      </div>
    </div>
  );
}
