import Image from "next/image";
import Button from "@/components/ui/Button";
import { photos } from "@/lib/photos";
import { Bubbles, Diver, Fish, Tang } from "@/components/illustrations/Sea";

/**
 * 0 m. The surface: the headline, the boat that takes you out, and a diver already heading in.
 * Server-rendered with no client JS; every movement here is CSS and stops under reduced motion.
 */
export default function HeroSection() {
  return (
    <section className="zone-surface lane relative overflow-hidden px-5 sm:px-8">
      {/* Two reef fish crossing low behind the photo and headline. Desktop only: on a phone the
          diver already fills the hero and the fish would sit on the buttons. */}
      <div className="ambient hidden lg:block inset-x-0 bottom-16 h-20" aria-hidden="true">
        <Fish className="swim absolute left-0 top-0 w-10 lg:w-14" style={{ "--swim-time": "34s", "--rest": "40%" } as React.CSSProperties} />
        <Tang className="swim absolute left-0 top-9 w-8 lg:w-11" style={{ "--swim-time": "43s", animationDelay: "-17s", "--rest": "50%" } as React.CSSProperties} />
      </div>

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-12 gap-x-10 lg:min-h-[min(calc(100svh-4rem-7.5rem),46rem)]">
        {/* The log line: where this dive starts. */}
        <div className="lg:col-span-12 flex items-baseline justify-between gap-4 border-b-2 border-current pt-5 pb-3 self-start">
          <span className="font-display font-bold text-sub tabular" aria-hidden="true">00&thinsp;m</span>
          <span className="text-label uppercase font-semibold">Trincomalee · Sri Lanka</span>
        </div>

        <div className="relative lg:col-span-7 pt-8 pb-4 sm:pb-16 lg:py-14 flex flex-col justify-center">
          {/* The diver swims in on load and treads water beside "Dive into". */}
          <div
            className="absolute z-10 left-[40%] top-[3.75rem] w-40 sm:left-[36%] sm:w-52 lg:left-[34%] lg:top-auto lg:bottom-[58%] lg:w-72 pointer-events-none"
            aria-hidden="true"
          >
            <div className="enter-swim">
              <div className="bob relative">
                <Diver className="block w-full h-auto" />
                <div className="absolute right-[2%] bottom-[60%] h-40 w-10 text-shallow-water">
                  <Bubbles count={6} />
                </div>
              </div>
            </div>
          </div>

          <h1 className="relative text-display font-extrabold mb-6 lg:mb-8">
            <span className="block font-light text-shallow-water rise-in">Dive</span>
            <span className="block font-bold rise-in" style={{ "--i": 1 } as React.CSSProperties}>into</span>
            <span className="block rise-in" style={{ "--i": 2 } as React.CSSProperties}>
              <span className="relative inline-block">
                Trincomalee
                {/* The waterline under the name. */}
                <span className="absolute left-0 right-0 -bottom-1 h-2 bg-tropic-coral" aria-hidden="true" />
              </span>
            </span>
          </h1>

          <p className="text-lead text-muted max-w-[40ch] mb-7 lg:mb-9">
            PADI courses, guided reef dives, and whale watching. No experience necessary.
            The Indian Ocean is waiting right outside our door.
          </p>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            <Button href="/courses" size="lg">
              Explore Courses
            </Button>
            <Button href="/contact" variant="ghost" size="lg" arrow>
              Book a Dive
            </Button>
          </div>
        </div>

        {/* The surface photo bleeds off the right edge of the page on wide screens. */}
        <div className="hidden lg:block lg:col-span-5 relative lg:-mr-[max(2rem,calc((100vw_-_72rem)/2))] lg:mt-6">
          <div className="plate absolute inset-0 rounded-none">
            <Image
              src={photos.boatSunrise.src}
              alt={photos.boatSunrise.alt}
              fill
              priority
              placeholder="blur"
              className="object-cover object-[50%_70%]"
              // Hidden below lg, so phones fetch the smallest candidate rather than a full photo.
              sizes="(max-width: 1023px) 16px, 42vw"
            />
          </div>

          <div className="zone-surface absolute -left-8 bottom-10 px-5 py-4 border-t-2 border-tropic-coral">
            <p className="font-display font-extrabold text-readout tabular">15+</p>
            <p className="text-label uppercase font-semibold text-muted mt-1">Years · Trincomalee</p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex absolute bottom-5 left-[max(2rem,calc((100vw_-_72rem)/2))] items-center gap-3 text-charcoal-sea" aria-hidden="true">
        <span className="text-label uppercase font-semibold">Scroll</span>
        <span className="block w-0.5 h-8 bg-current origin-top motion-safe:animate-[descend_2s_var(--ease-surface)_infinite]" />
      </div>
    </section>
  );
}
