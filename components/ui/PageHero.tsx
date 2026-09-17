import Link from "next/link";
import Readout, { type ReadoutCell } from "@/components/ui/Readout";
import { Bubbles, Diver, Fish, Tang, Turtle } from "@/components/illustrations/Sea";

export interface Crumb {
  label: string;
  href?: string;
}

const style = (v: Record<string, string>) => v as React.CSSProperties;

/**
 * The top of every inner page: breadcrumb, h1, lead, and the page's own notes as chips — all at
 * the surface, with something alive in the water. Server-rendered; the motion is CSS only.
 *
 * `notes` takes the short label line these pages used to print above the heading ("PADI
 * Certified · Trincomalee"). The words stay; they sit under the lead as chips instead.
 */
export default function PageHero({
  crumbs,
  notes,
  title,
  lead,
  stats,
  art = "diver",
  children,
}: {
  crumbs: Crumb[];
  notes?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  stats?: ReadoutCell[];
  art?: "diver" | "turtle" | "none";
  children?: React.ReactNode;
}) {
  const chips = notes ? notes.split(" · ") : [];
  return (
    <section className="zone-surface lane relative overflow-hidden px-5 sm:px-8 pt-8 pb-12 lg:pt-12 lg:pb-16">
      <div className="ambient inset-x-0 bottom-1 h-10" aria-hidden="true">
        <Fish className="swim absolute left-0 top-0 w-9" style={style({ "--swim-time": "31s", "--rest": "74%" })} />
        <Tang className="swim absolute left-0 top-3 w-7" style={style({ "--swim-time": "39s", animationDelay: "-15s", "--rest": "86%" })} />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <nav aria-label="Breadcrumb" className="mb-8 lg:mb-10">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-charcoal-sea/80">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {c.href ? (
                  <Link href={c.href} className="underline-offset-4 hover:underline hover:text-charcoal-sea">
                    {c.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-charcoal-sea" aria-current="page">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {art !== "none" && (
          <div
            className="absolute right-0 top-10 w-28 sm:w-44 lg:top-14 lg:w-72 pointer-events-none"
            aria-hidden="true"
          >
            <div className="enter-swim">
              <div className="bob relative">
                {art === "turtle" ? (
                  <Turtle className="block w-full h-auto" />
                ) : (
                  <>
                    <Diver className="block w-full h-auto" />
                    <div className="absolute right-[4%] bottom-[55%] h-32 w-10 text-shallow-water">
                      <Bubbles count={5} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <h1 className="text-hero font-extrabold max-w-[16ch] pr-24 sm:pr-40 lg:pr-0 rise-in">{title}</h1>
        {lead && <p className="mt-5 lg:mt-6 text-lead text-muted max-w-[52ch]">{lead}</p>}

        {chips.length > 0 && (
          <p className="mt-6 flex flex-wrap gap-2 text-label uppercase font-semibold">
            {chips.map((c, i) => (
              <span key={c} className="contents">
                {i > 0 && <span className="sr-only"> · </span>}
                <span className={`rounded-full px-3 py-1.5 text-surface-dark ${i % 2 ? "bg-shallow-water" : "bg-sunrise"}`}>
                  {c}
                </span>
              </span>
            ))}
          </p>
        )}

        {stats && stats.length > 0 && (
          <Readout cells={stats} cols={stats.length >= 4 ? 4 : (stats.length as 2 | 3)} className="mt-10 lg:mt-12" />
        )}

        {children}
      </div>
    </section>
  );
}
