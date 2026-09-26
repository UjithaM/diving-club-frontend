import { Fish, Tang } from "@/components/illustrations/Sea";
import { formatDay, itemLabel, promoLabel, promoPhrase, travelWindow } from "@/lib/discount";
import type { Promotion } from "@/lib/types";

/**
 * The deal, explained where the booking happens. Someone who clicked "Book early-bird dates"
 * lands here, so it answers the three things they came to check: how much, which dates, and
 * whether they need a code (they don't). The status line underneath follows the form live.
 */
export default function OfferPanel({
  lead,
  others,
  applied,
  saving,
  dateChosen,
}: {
  lead: Promotion;
  /** Other running deals, e.g. a group deal. */
  others: Promotion[];
  /** The promotion the booking currently gets, if any. */
  applied: Promotion | null;
  /** Formatted amount off, e.g. "USD 59.25". */
  saving: string | null;
  dateChosen: boolean;
}) {
  const dives = travelWindow(lead);
  const steps = [
    "Choose something on the deal below.",
    dives ? `Pick a dive date ${dives}.` : "Pick any dive date.",
    "The discount comes off automatically. No code needed.",
  ];

  return (
    <section
      id="offer-details"
      aria-labelledby="offer-details-title"
      className="zone-abyss relative overflow-hidden rounded-[18px] p-5 sm:p-7 scroll-mt-24"
    >
      <div className="ambient lane inset-x-0 top-3 h-10" aria-hidden="true">
        <Fish className="swim absolute left-0 top-0 w-7" style={{ "--swim-time": "26s", "--rest": "78%" } as React.CSSProperties} />
        <Tang className="swim absolute left-0 top-4 w-5" style={{ "--swim-time": "26s", animationDelay: "-1.4s", "--rest": "86%" } as React.CSSProperties} />
      </div>

      <p className="relative flex flex-wrap items-center gap-2 text-label uppercase font-semibold">
        <span className="rounded-full bg-sunrise px-3 py-1 text-surface-dark">
          {lead.travel_from || lead.travel_to ? "Early bird offer" : "Special offer"}
        </span>
        {lead.ends_at && <span className="text-sunrise">Book by {formatDay(lead.ends_at)}</span>}
      </p>

      <h2 id="offer-details-title" className="relative mt-4 font-display font-extrabold text-section leading-none">
        {promoLabel(lead)} <span className="block text-sub mt-2 text-warm-white/90">{lead.title}</span>
      </h2>
      {lead.description && <p className="relative mt-3 text-muted max-w-[52ch]">{lead.description}</p>}

      <ol className="relative mt-5 space-y-2.5 list-none">
        {steps.map((step, i) => (
          <li key={step} className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-shallow-water text-xs font-bold text-surface-dark tabular">
              {i + 1}
            </span>
            <span className="text-sm leading-6">{step}</span>
          </li>
        ))}
      </ol>

      {/* Each item has its own value and some aren't on the deal at all, so the full list is here. */}
      <details className="relative mt-4 group/items">
        <summary className="cursor-pointer text-sm font-bold text-sunrise underline decoration-2 underline-offset-4 min-h-11 flex items-center">
          What&apos;s on the deal ({lead.items.length} {lead.items.length === 1 ? "item" : "items"})
        </summary>
        <ul className="mt-2 list-none divide-y divide-warm-white/12 text-sm">
          {lead.items.map((item) => (
            <li key={`${item.type}-${item.slug}`} className="flex items-baseline justify-between gap-4 py-2">
              <span>{item.name}</span>
              <span className="shrink-0 font-bold text-sunrise tabular-nums">{itemLabel(lead, item)}</span>
            </li>
          ))}
        </ul>
      </details>

      {others.length > 0 && (
        <ul className="relative mt-4 space-y-2 list-none text-sm">
          {others.map((p) => (
            <li key={p.id} className="flex items-baseline gap-2.5">
              <span className="h-2 w-2 shrink-0 translate-y-[-1px] rounded-full bg-sunrise" aria-hidden="true" />
              <span>
                <span className="font-bold">{p.min_people ? `${p.min_people}+ divers?` : p.title}</span>{" "}
                <span className="text-muted">
                  {promoLabel(p)}
                  {p.min_people ? ` with ${p.title}` : ""}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Follows the form: confirms the saving, or says why it isn't there yet. */}
      <p
        role="status"
        className={`relative mt-5 rounded-[12px] px-4 py-3 text-sm font-semibold ${
          applied ? "pop-in bg-shallow-water text-surface-dark" : "bg-warm-white/10"
        }`}
      >
        {applied
          ? `✓ ${applied.title} applied${saving ? `: you save ${saving}` : ""}.`
          : dateChosen && dives
          ? `Your date is outside the offer. Pick a date ${dives} to get ${promoPhrase(lead)}.`
          : "Your saving shows here as soon as your booking qualifies."}
      </p>

      <p className="relative mt-3 text-xs text-muted">
        Cancel 48 hours or more before your start time and the advance comes back in full.
      </p>
    </section>
  );
}
