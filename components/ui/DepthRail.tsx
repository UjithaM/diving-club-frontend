import { Diver } from "@/components/illustrations/Sea";

const TICKS = [0, 3, 6, 9, 12, 15, 18];

/** The depth gauge in the left margin. Decorative: all motion is CSS (see .depth-rail). */
export default function DepthRail() {
  return (
    <>
      <div className="depth-rail" aria-hidden="true">
        <div className="depth-rail__scale" />
        {TICKS.map((m, i) => (
          <div key={m} className="depth-rail__tick" style={{ top: `${(i / (TICKS.length - 1)) * 100}%` }}>
            <span>{m} m</span>
          </div>
        ))}
      </div>
      <div className="depth-rail depth-rail--marker" aria-hidden="true">
        <div className="depth-rail__marker">
          <Diver suit="var(--color-tropic-coral)" />
        </div>
      </div>
    </>
  );
}
