import Image from "next/image";
import Link from "next/link";
import Section from "@/components/ui/Section";
import Button, { Arrow } from "@/components/ui/Button";
import type { HomeDiveSite } from "@/lib/types";
import { Diver, Fish, Turtle } from "@/components/illustrations/Sea";
import { parseDepth } from "@/lib/depth";

/**
 * The profile: every site as a column of water with its depth range drawn to one shared scale,
 * so "which one is deeper?" is answered before anyone reads a word. Hidden from assistive tech —
 * the list beside it carries the same facts as text.
 */
function DepthProfile({ sites }: { sites: HomeDiveSite[] }) {
  const ranges = sites.map((s) => parseDepth(s.depth));
  const deepest = Math.max(30, ...ranges.map((r) => (r ? r[1] : 0)));
  const floor = Math.ceil(deepest / 10) * 10;
  const ticks = Array.from({ length: floor / 10 + 1 }, (_, i) => i * 10);
  const pct = (m: number) => `${(m / floor) * 100}%`;

  return (
    <div className="grid grid-cols-[2.25rem_minmax(0,1fr)] sm:grid-cols-[3rem_minmax(0,1fr)] gap-x-2" aria-hidden="true">
      {/* depth axis */}
      <div className="relative h-60 sm:h-72 lg:h-[22rem]">
        {ticks.map((t) => (
          <span
            key={t}
            className="absolute right-0 -translate-y-1/2 text-[0.6875rem] tabular text-muted"
            style={{ top: pct(t) }}
          >
            {t}&thinsp;m
          </span>
        ))}
      </div>

      <div className="relative h-60 sm:h-72 lg:h-[22rem] border-t-2 border-warm-white/70">
        {/* recessive grid */}
        {ticks.slice(1, -1).map((t) => (
          <span key={t} className="absolute inset-x-0 border-t border-dashed border-warm-white/15" style={{ top: pct(t) }} />
        ))}
        {/* the sea floor */}
        <span className="absolute inset-x-0 bottom-0 h-1.5 bg-sunrise/35" />

        <div
          className="absolute inset-0 grid gap-2 sm:gap-5"
          style={{ gridTemplateColumns: `repeat(${sites.length}, minmax(0, 1fr))` }}
        >
          {sites.map((site, i) => {
            const r = ranges[i];
            return (
              <Link
                key={site.slug}
                href={`/dive-sites/${site.slug}`}
                tabIndex={-1}
                className="group/col relative block rounded-b-[6px] bg-warm-white/[0.04] transition-colors hover:bg-warm-white/[0.1]"
              >
                {r && (
                  <>
                    <span
                      className="absolute left-1/2 w-3 sm:w-4 -translate-x-1/2 rounded-full bg-sunrise transition-colors duration-200 group-hover/col:bg-tropic-coral"
                      style={{ top: pct(r[0]), height: pct(r[1] - r[0]) }}
                    />
                    {/* the diver at the deepest point, head down */}
                    <span className="absolute left-1/2 w-12 sm:w-14 -translate-x-1/2 -translate-y-1/2" style={{ top: pct(r[1]) }}>
                      <Diver
                        className="block w-full rotate-90"
                        suit="var(--color-shallow-water)"
                        line="var(--color-surface-dark)"
                      />
                    </span>
                    <span
                      className="absolute left-1/2 ml-3 sm:ml-4 -translate-y-1/2 whitespace-nowrap font-display font-extrabold text-xs sm:text-base tabular text-sunrise"
                      style={{ top: pct(r[0]) }}
                    >
                      {site.depth}
                    </span>
                  </>
                )}
                <span className="absolute inset-x-1 bottom-3 text-center text-[0.6875rem] sm:text-meta font-semibold leading-tight text-warm-white">
                  {site.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function DiveSitesSection({ sites }: { sites: HomeDiveSite[] }) {
  if (sites.length === 0) return null;

  return (
    <Section zone="deep" depth={12} log="Explore Below" className="relative overflow-x-clip pb-32! lg:pb-28!">
      <div className="ambient lane inset-x-0 bottom-4 h-24 lg:bottom-auto lg:top-6" aria-hidden="true">
        <Turtle className="swim-right absolute left-0 top-0 w-24 lg:w-32" style={{ "--swim-time": "46s", "--rest": "58%" } as React.CSSProperties} />
        <Fish className="swim absolute left-0 top-16 w-7" style={{ "--swim-time": "33s", animationDelay: "-12s", "--rest": "60%" } as React.CSSProperties} />
      </div>

      <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 lg:mb-14 reveal">
        <div>
          <h2 className="text-section font-extrabold">Trincomalee&apos;s Best Dive Sites</h2>
          <p className="text-lead text-muted mt-4 max-w-[48ch]">
            Every site has its own personality. Here are three that keep divers coming back year after year.
          </p>
        </div>
        <Button href="/dive-sites" variant="line" arrow className="shrink-0 text-sunrise">
          All dive sites
        </Button>
      </div>

      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-14 lg:items-start">
        <div className="reveal lg:sticky lg:top-24">
          <DepthProfile sites={sites} />
        </div>

        <ol className="list-none border-t-2 border-current">
          {sites.map((site) => (
            <li key={site.slug} className="reveal border-b border-rule">
              <article className="group relative grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-5 gap-y-1.5 py-5">
                {site.image && (
                  <div className="plate col-span-2 aspect-[16/9] mb-3">
                    <Image
                      src={site.image}
                      alt={`${site.name} dive site in Trincomalee, Sri Lanka`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                )}
                <h3 className="text-sub lg:text-[1.625rem] font-extrabold leading-tight">{site.name}</h3>
                <p className="font-display font-extrabold text-sub tabular text-sunrise text-right">{site.depth}</p>
                <p className="col-span-2 text-label uppercase font-semibold text-muted">{site.difficulty}</p>
                <p className="col-span-2 text-meta text-muted line-clamp-3 mt-1">{site.description}</p>
                <Link
                  href={`/dive-sites/${site.slug}`}
                  className="col-span-2 inline-flex items-center gap-2 min-h-11 w-fit text-sm font-semibold text-sunrise group-hover:text-warm-white after:absolute after:inset-0 after:content-['']"
                  aria-label={`Learn more about ${site.name}`}
                >
                  Learn more <Arrow />
                </Link>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
