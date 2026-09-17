import Button from "@/components/ui/Button";
import { Bubbles, Diver, Fish } from "@/components/illustrations/Sea";

/** The bottom of the dive: the one thing left to do. */
export default function ContactCtaSection() {
  return (
    <section className="zone-abyss lane relative overflow-hidden px-5 sm:px-8 pb-40 lg:pb-44">
      <div className="ambient inset-x-0 bottom-8 h-24" aria-hidden="true">
        <div className="swim-right absolute left-0 top-0 w-40 lg:w-56" style={{ "--swim-time": "38s", "--rest": "58%" } as React.CSSProperties}>
          <Diver className="block w-full h-auto" suit="var(--color-shallow-water)" line="var(--color-surface-dark)" />
        </div>
        <Fish className="swim absolute left-0 top-2 w-8" style={{ "--swim-time": "30s", animationDelay: "-9s", "--rest": "40%" } as React.CSSProperties} />
      </div>
      <div className="ambient left-[8%] bottom-24 h-[70%] w-32 text-sunrise/50" aria-hidden="true">
        <Bubbles count={7} />
      </div>
      <div className="relative max-w-6xl mx-auto flex items-baseline justify-between gap-4 border-t-2 border-tropic-coral pt-3">
        <span className="font-display font-bold text-sub tabular text-sunrise" aria-hidden="true">18&thinsp;m</span>
        <p className="text-label uppercase font-semibold text-sunrise">Book Your Dive Today</p>
      </div>
      <div className="relative max-w-6xl mx-auto pt-12 lg:pt-20 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 items-end">
        <div className="reveal">
          <h2 className="text-display font-extrabold">
            Ready to Dive?
          </h2>
        </div>

        <div className="reveal">
          <p className="text-lead text-muted max-w-[40ch] mb-8">
            The water is warm, the viz is clear, and your instructor is waiting.
            Join us any day of the week. No experience necessary.
          </p>

          <Button href="/book" size="lg" className="w-full sm:w-auto">
            Book a Dive
          </Button>

          <p className="text-muted text-meta mt-6">
            Or WhatsApp us:{" "}
            <a
              href="https://wa.me/94743945010"
              target="_blank"
              rel="noopener noreferrer"
              className="text-warm-white font-semibold underline hover:text-sunrise tabular"
            >
              0743 945 010
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
