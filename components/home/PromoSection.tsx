import Section from "@/components/ui/Section";
import Link from "next/link";
import Button, { Arrow } from "@/components/ui/Button";
import Countdown from "@/components/home/Countdown";
import NotifyForm from "@/components/home/NotifyForm";
import Waterline from "@/components/illustrations/Waterline";
import { Bubbles, Fish, Tang, Turtle } from "@/components/illustrations/Sea";
import { formatDay, leadPromotion, promoLabel, travelWindow } from "@/lib/discount";
import type { Promotion } from "@/lib/types";

/**
 * The running deal, right under the hero, on a sunrise field so it reads as its own moment rather
 * than more of the hero's warm white. Sunrise is an accent between zones, not a stage of the dive,
 * so it carries a log label but no depth. The countdown sits on a dark dive-computer slate, the
 * one instrument on the field. With no deal running this shrinks to the "tell me first" form,
 * so the mailing list keeps growing through the off-season.
 */
export default function PromoSection({ promotions, serverNow }: { promotions: Promotion[]; serverNow: number }) {
  const lead = leadPromotion(promotions);

  if (!lead) {
    return (
      <>
        <Waterline from="surface" to="sunrise" />
        <Section zone="sunrise" log="Next Season" className="relative overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-end reveal">
            <div>
              <h2 className="text-section font-extrabold">Be first in the water next season</h2>
              <p className="text-lead text-muted mt-4 max-w-[44ch]">
                Early-bird prices go to the list first. One email when booking opens, nothing else.
              </p>
            </div>
            <NotifyForm source="home-offseason" label="Your email" />
          </div>
        </Section>
        <Waterline from="sunrise" to="surface" />
      </>
    );
  }

  const others = promotions.filter((p) => p !== lead);
  const dives = travelWindow(lead);

  return (
    <>
      <Waterline from="surface" to="sunrise" />
      <Section
        id="offer"
        zone="sunrise"
        log={lead.travel_from || lead.travel_to ? "Early Bird" : "Special Offer"}
        className="lane relative overflow-hidden scroll-mt-20"
      >
        {/* A small school crossing low behind the offer, desktop only: on a phone it would sit on the form. */}
        <div className="ambient hidden lg:block inset-x-0 bottom-10 h-14" aria-hidden="true">
          <Fish className="swim absolute left-0 top-0 w-9" style={{ "--swim-time": "31s", "--rest": "58%" } as React.CSSProperties} />
          <Tang body="var(--color-warm-white)" className="swim absolute left-0 top-6 w-7" style={{ "--swim-time": "31s", animationDelay: "-1.3s", "--rest": "64%" } as React.CSSProperties} />
        </div>

        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14 lg:items-start">
          <div className="reveal">
            <div className="relative">
              {/* The turtle treads water beside the number. */}
              <Turtle className="bob absolute right-0 -top-3 w-20 sm:w-24 lg:-right-4 lg:w-32 -rotate-6 pointer-events-none" />
              {/* White on sunrise is 1.96:1, too faint to read, so white is the highlight material here,
                  not the ink: a warm-white tag carrying the number, marker swipes on the dates. */}
              <p className="mr-24 sm:mr-28 lg:mr-36">
                <span className="pop-in inline-block -rotate-2 rounded-[3px] bg-warm-white px-4 pt-2 pb-3 font-display font-extrabold text-display leading-[0.85] text-surface-dark shadow-[0_22px_34px_-22px_rgba(15,30,37,0.7)]">
                  {promoLabel(lead)}
                </span>
              </p>
            </div>
            <h2 className="text-section font-extrabold mt-5 text-balance">{lead.title}</h2>
            {lead.description && <p className="text-lead text-muted mt-4 max-w-[46ch]">{lead.description}</p>}

            <p className="mt-6 max-w-[46ch] text-lg font-bold leading-snug">
              {lead.travel_from && lead.travel_to ? (
                <>
                  For dives between <Mark>{formatDay(lead.travel_from)}</Mark> and <Mark>{formatDay(lead.travel_to)}</Mark>.
                </>
              ) : dives ? (
                `For dives ${dives}.`
              ) : (
                "On any dive date."
              )}
              {lead.applicable_to !== "all" && ` ${lead.applicable_to === "course" ? "Courses" : "Activities"} only.`}
            </p>
            <p className="text-meta text-muted mt-2 max-w-[46ch]">
              Cancel 48 hours or more before your start time and the advance comes back in full.
            </p>

            {others.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2 list-none">
                {others.map((p) => (
                  <li key={p.id} className="flex items-center gap-2.5 rounded-full bg-warm-white py-1.5 pl-1.5 pr-4 text-sm font-semibold text-surface-dark">
                    <span className="rounded-full bg-surface-dark px-2.5 py-1 text-label uppercase font-bold text-sunrise">
                      {p.min_people ? `${p.min_people}+ divers` : p.title}
                    </span>
                    {p.min_people ? `Book together, get ${promoLabel(p)}` : promoLabel(p)}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
              {/* Warm white like the "15% off" tag, so the section's two highlights read as one set:
                  the deal, and the way to take it. Inverts to dark on hover. */}
              <Link
                href="/book#offer-details"
                className="group inline-flex w-full items-center justify-between gap-4 min-h-14 rounded-[3px] border-2 border-surface-dark bg-warm-white py-2 pl-6 pr-2 text-base font-bold text-surface-dark shadow-[0_18px_30px_-20px_rgba(15,30,37,0.7)] transition-colors duration-200 hover:bg-surface-dark hover:text-warm-white sm:w-auto"
              >
                {dives ? "Book early-bird dates" : "Book with the offer"}
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-dark text-sunrise transition-[translate,background-color] duration-200 group-hover:translate-x-0.5 group-hover:bg-sunrise group-hover:text-surface-dark"
                  aria-hidden="true"
                >
                  <Arrow />
                </span>
              </Link>
              <Button href="/courses" variant="ghost" arrow>
                See courses
              </Button>
            </div>
          </div>

          {lead.ends_at && (
            <div className="reveal zone-abyss relative overflow-hidden rounded-[18px] p-5 sm:p-7 shadow-[0_24px_50px_-30px_rgba(15,30,37,0.7)]">
              <div className="ambient right-5 top-0 h-full w-8 text-shallow-water" aria-hidden="true">
                <Bubbles count={5} />
              </div>
              <p className="relative flex items-center gap-2.5 text-label uppercase font-semibold">
                <span className="h-2 w-2 rounded-full bg-sunrise" aria-hidden="true" />
                Offer ends {formatDay(lead.ends_at)}
              </p>
              <div className="relative mt-4 text-sunrise">
                <Countdown endsAt={lead.ends_at} serverNow={serverNow} />
              </div>
              <p className="relative mt-4 text-meta text-muted">
                {promoLabel(lead)} comes off automatically when you pick a date in the window. No code needed.
              </p>
            </div>
          )}
        </div>

        {/* The quieter way in, for planners not ready to commit: its own ruled row, not a card. */}
        <div className="relative mt-12 lg:mt-16 grid gap-5 border-t-2 border-current pt-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:items-center lg:gap-14">
          <div>
            <h3 className="text-sub font-extrabold">Not ready to book yet?</h3>
            <p className="text-meta text-muted mt-1 max-w-[44ch]">
              Leave your email and we&apos;ll send the next deal and the date next season opens.
            </p>
          </div>
          <NotifyForm source="home-promo" label="Your email for deals" />
        </div>
      </Section>
      <Waterline from="sunrise" to="surface" />
    </>
  );
}

/** A warm-white marker swipe: the highlight on sunrise, where white text itself can't be read. */
function Mark({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded-[3px] bg-warm-white px-1.5 text-surface-dark [box-decoration-break:clone] whitespace-nowrap">
      {children}
    </mark>
  );
}
