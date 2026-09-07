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
    <div className="mt-4 rounded-xl border border-charcoal-sea/15 bg-surface-muted/50 p-4">
      <p className="text-center text-[11px] font-semibold uppercase tracking-wider text-charcoal-sea/45">
        Front of boat
      </p>

      {/* Wide boats scroll rather than pushing the page sideways. */}
      <div className="my-3 overflow-x-auto">
        <div
          role="group"
          aria-label="Choose your seats"
          className="mx-auto flex w-max flex-col gap-2"
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
                    className={`h-11 w-11 rounded-lg border text-xs font-semibold transition-colors ${
                      isSelected
                        ? "border-shallow-water bg-shallow-water text-white"
                        : isTaken
                          ? "cursor-not-allowed border-charcoal-sea/10 bg-charcoal-sea/10 text-charcoal-sea/30 line-through"
                          : full
                            ? "cursor-not-allowed border-charcoal-sea/15 bg-white text-charcoal-sea/30"
                            : "border-charcoal-sea/25 bg-white text-charcoal-sea hover:border-shallow-water"
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

      <p className={`${hintClass} text-center`}>
        {selected.length === needed
          ? `Seats ${selected.join(", ")} selected.`
          : `Pick ${needed - selected.length} more seat${needed - selected.length === 1 ? "" : "s"}.`}
      </p>
    </div>
  );
}
