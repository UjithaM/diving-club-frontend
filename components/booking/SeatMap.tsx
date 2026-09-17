"use client";

import { hintClass } from "@/components/ui/fieldStyles";

interface SeatMapProps {
  rows: number;
  perRow: number;
  /** Already gone on this date. Rendered disabled, never selectable. */
  taken: string[];
  selected: string[];
  /** How many seats this booking needs — one per person. */
  needed: number;
  onChange: (seats: string[]) => void;
}

/** Row-major labels: A1, A2, … B1, B2. Matches SlotTemplate::seatLabels() on the backend. */
export function seatLabels(rows: number, perRow: number): string[][] {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: perRow }, (_, seat) => `${String.fromCharCode(65 + row)}${seat + 1}`)
  );
}

/**
 * The boat, drawn as a grid.
 *
 * Selection is capped at `needed` rather than left open: picking a seventh seat for six people
 * is always a mistake, and the backend rejects the whole booking for it. Once the count is met
 * further seats are disabled, so the only way forward is to deselect one.
 */
export default function SeatMap({
  rows,
  perRow,
  taken,
  selected,
  needed,
  onChange,
}: SeatMapProps) {
  const takenSet = new Set(taken);
  const full = selected.length >= needed;

  function toggle(seat: string) {
    onChange(
      selected.includes(seat) ? selected.filter((s) => s !== seat) : [...selected, seat]
    );
  }

  return (
    <div className="mt-4 rounded-[14px] bg-shallow-water/12 p-4 sm:p-5">
      {/* Wide boats scroll rather than pushing the page sideways. */}
      <div className="overflow-x-auto">
        {/* The boat seen from above: a bow at the top, the seats inside the hull. */}
        <div className="relative mx-auto w-max px-6 pt-16 pb-6">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M50 1 C 72 10, 97 24, 97 44 L 97 92 C 97 96, 94 99, 90 99 L 10 99 C 6 99, 3 96, 3 92 L 3 44 C 3 24, 28 10, 50 1 Z"
              fill="var(--color-warm-white)"
              stroke="var(--color-charcoal-sea)"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <p className="relative -mt-9 mb-4 text-center text-label uppercase font-semibold text-charcoal-sea/80">
            Front of boat
          </p>
          <div
            role="group"
            aria-label="Choose your seats"
            className="relative flex flex-col gap-2"
          >
            {seatLabels(rows, perRow).map((row) => (
              <div key={row[0]} className="flex gap-2">
                {row.map((seat) => {
                  const isTaken = takenSet.has(seat);
                  const isSelected = selected.includes(seat);
                  return (
                    <button
                      key={seat}
                      type="button"
                      disabled={isTaken || (full && !isSelected)}
                      aria-pressed={isSelected}
                      aria-label={`Seat ${seat}${isTaken ? ", taken" : ""}`}
                      onClick={() => toggle(seat)}
                      className={`h-11 w-11 rounded-[10px] border-2 text-xs font-bold tabular transition-[background-color,border-color,scale] duration-150 active:scale-95 ${
                        isSelected
                          ? "pop-in border-surface-dark bg-shallow-water text-surface-dark"
                          : isTaken
                            ? "cursor-not-allowed border-transparent bg-charcoal-sea/15 text-charcoal-sea/45 line-through"
                            : full
                              ? "cursor-not-allowed border-charcoal-sea/10 bg-white text-charcoal-sea/40"
                              : "border-charcoal-sea/25 bg-white text-charcoal-sea hover:border-shallow-water cursor-pointer"
                      }`}
                    >
                      {seat}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-charcoal-sea/80" aria-hidden="true">
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-[3px] border-2 border-charcoal-sea/25 bg-white" />Free</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-[3px] bg-shallow-water border-2 border-surface-dark" />Yours</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-[3px] bg-charcoal-sea/15" />Taken</span>
      </div>

      <p className={`${hintClass} text-center font-semibold`} aria-live="polite">
        {selected.length === needed
          ? `Seats ${selected.join(", ")} selected.`
          : `Pick ${needed - selected.length} more seat${needed - selected.length === 1 ? "" : "s"}.`}
      </p>
    </div>
  );
}
