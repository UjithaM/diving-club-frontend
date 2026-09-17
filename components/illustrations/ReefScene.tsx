import { BranchCoral, BrainCoral, Bubbles, Diver, FanCoral, Fish, Seaweed, Tang, Turtle } from "./Sea";

const style = (v: Record<string, string>) => v as React.CSSProperties;

/**
 * A window into the reef: surface light at the top, a diver hanging mid-water, fish crossing,
 * a turtle below and coral on the floor. Pure SVG and CSS — no image request, nothing for the
 * LCP to wait on — and every loop stops under reduced motion.
 */
export default function ReefScene({ className = "" }: { className?: string }) {
  return (
    <div
      className={`zone-shallow lane relative overflow-hidden rounded-[20px] ${className}`}
      aria-hidden="true"
    >
      {/* the surface, seen from below */}
      <svg viewBox="0 0 400 40" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-8 w-full">
        <path d="M0 0 H400 V18 Q 350 30 300 18 T 200 18 T 100 18 T 0 18 Z" fill="var(--color-warm-white)" opacity="0.35" />
      </svg>
      <span className="absolute right-[12%] top-[7%] h-14 w-14 rounded-full bg-sunrise ring-8 ring-sunrise/25" />

      {/* fish lanes */}
      <div className="absolute inset-x-0 top-[16%] h-16">
        <Fish className="swim absolute left-0 top-0 w-10" style={style({ "--swim-time": "19s", "--rest": "12%" })} />
        <Tang className="swim absolute left-0 top-7 w-8" body="var(--color-warm-white)" style={style({ "--swim-time": "23s", animationDelay: "-8s", "--rest": "70%" })} />
        <Fish className="swim absolute left-0 top-3 w-6" style={style({ "--swim-time": "19s", animationDelay: "-1.1s", "--rest": "22%" })} />
      </div>

      {/* the diver */}
      <div className="absolute left-[12%] right-[10%] top-[32%]">
        <div className="enter-swim">
          <div className="bob relative">
            <Diver className="block w-full h-auto" />
            <div className="absolute right-[4%] bottom-[55%] h-44 w-12 text-warm-white">
              <Bubbles count={7} />
            </div>
          </div>
        </div>
      </div>

      {/* the turtle, lower down and slower */}
      <div className="absolute inset-x-0 top-[60%] h-20">
        <Turtle className="swim-right absolute left-0 top-0 w-24" style={style({ "--swim-time": "31s", animationDelay: "-10s", "--rest": "55%" })} />
      </div>

      {/* the reef floor */}
      <div className="absolute inset-x-0 bottom-0 h-[22%]">
        <span className="absolute inset-x-0 bottom-0 h-3 bg-sunrise/40" />
        {[
          { el: <Seaweed className="w-7" />, left: "6%", t: "5s" },
          { el: <BranchCoral className="w-20" />, left: "18%", t: "6.4s" },
          { el: <BrainCoral className="w-24" />, left: "42%", t: "0s" },
          { el: <FanCoral className="w-20" />, left: "66%", t: "5.8s" },
          { el: <Seaweed className="w-6" color="var(--color-sunrise)" />, left: "82%", t: "4.6s" },
          { el: <BranchCoral className="w-14" color="var(--color-sunrise)" />, left: "93%", t: "6.9s" },
        ].map((p, i) => (
          <div
            key={i}
            className={`absolute bottom-2 -translate-x-1/2 [&>svg]:block ${p.t !== "0s" ? "sway" : ""}`}
            style={style({ left: p.left, "--sway-time": p.t, animationDelay: `-${i * 0.8}s` })}
          >
            {p.el}
          </div>
        ))}
      </div>
    </div>
  );
}
