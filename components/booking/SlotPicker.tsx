"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import SeatMap from "@/components/booking/SeatMap";
import { errorId, labelClass } from "@/components/ui/fieldStyles";
import { FieldError } from "@/components/booking/BookingFields";
import { getSlots } from "@/lib/api/slots";
import type { Slot, SlotChoice } from "@/lib/types";

interface SlotPickerProps {
  type: "course" | "activity" | "package";
  /** Item name or slug — the backend resolves either. */
  item: string;
  /** YYYY-MM-DD, or "" while they haven't picked one. */
  date: string;
  /** Headcount for this line: how many seats a seated boat needs. */
  people: number;
  value: SlotChoice;
  /**
   * setState-shaped on purpose: the picker has to clear a selection that vanished using the
   * value it had at fetch time, and reading `value` inside the fetch effect would mean listing
   * it as a dependency and refetching on every click.
   */
  onChange: Dispatch<SetStateAction<SlotChoice>>;
  /** Backend rejection, e.g. the slot filled up between load and submit. */
  error?: string;
  /** Shown above the times. Set it when more than one line has a picker. */
  heading?: string;
}

/**
 * Date first, then a time.
 *
 * Renders nothing at all when the item has no times set — that's the whole backwards
 * compatibility story: an item the shop hasn't configured books by date alone, exactly as it
 * did before slots existed, and no visitor sees a new required field.
 */
export default function SlotPicker({
  type,
  item,
  date,
  people,
  value,
  onChange,
  error,
  heading,
}: SlotPickerProps) {
  /**
   * The answer, tagged with the question it answers.
   *
   * One state, not a `slots` plus a `loading`: both would have to be set synchronously in the
   * effect to clear the previous item's times, and a setState in an effect body is a cascading
   * render. Tagging the result lets "is this list still the right one?" be derived instead.
   */
  const [fetched, setFetched] = useState<{ key: string; slots: Slot[] }>({ key: "", slots: [] });

  const key = `${type}|${item}|${date}`;
  const ready = fetched.key === key;
  const slots = ready ? fetched.slots : [];
  const loading = Boolean(item && date && !ready);

  useEffect(() => {
    if (!item || !date) return;

    // Availability moves under us, so a stale response must never overwrite a fresh one.
    let current = true;

    getSlots(type, item, date).then((rows) => {
      if (!current) return;
      setFetched({ key: `${type}|${item}|${date}`, slots: rows });
      // A slot that vanished (date changed, sold out, shop removed it) can't stay selected,
      // or we post an id the backend will only refuse.
      onChange((prev) => {
        if (prev.slotId === null) return prev;
        const stillThere = rows.find((s) => s.id === prev.slotId && !s.sold_out);
        return stillThere ? prev : { slotId: null, seats: [] };
      });
    });

    return () => {
      current = false;
    };
    // onChange is the parent's setState and changes identity every render; listing it would
    // refetch on every keystroke elsewhere in the form.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, item, date]);

  // Nothing configured for this item — and nothing to show before a date is picked, so an
  // unconfigured item never grows a new field. That's the whole compatibility story.
  if (!loading && slots.length === 0 && !error) return null;

  const selected = slots.find((s) => s.id === value.slotId) ?? null;

  return (
    <div data-field="slot_id">
      <p className={labelClass}>{heading ?? "Pick a time"}</p>

      {loading ? (
        <div className="flex flex-wrap gap-2" aria-live="polite">
          <span className="sr-only">Checking availability…</span>
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-[62px] w-32 rounded-[10px] bg-charcoal-sea/8 motion-safe:animate-pulse" aria-hidden="true" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
          {slots.map((slot) => {
            const isSelected = slot.id === value.slotId;
            return (
              <button
                key={slot.id}
                type="button"
                disabled={slot.sold_out}
                aria-pressed={isSelected}
                onClick={() => onChange({ slotId: slot.id, seats: [] })}
                className={`relative rounded-[10px] border-2 px-4 py-3 text-left transition-[background-color,border-color,scale] duration-150 active:scale-[0.98] sm:min-w-32 ${
                  isSelected
                    ? "border-surface-dark bg-shallow-water"
                    : slot.sold_out
                      ? "cursor-not-allowed border-transparent bg-charcoal-sea/8"
                      : "cursor-pointer border-charcoal-sea/25 bg-white hover:border-shallow-water"
                }`}
              >
                {isSelected && (
                  <svg className="draw-check absolute right-2.5 top-2.5" width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M4 10.5l4 4 8-9" stroke="var(--color-surface-dark)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                <span
                  className={`block font-display text-base font-extrabold tabular ${
                    slot.sold_out ? "text-charcoal-sea/45 line-through" : "text-surface-dark"
                  }`}
                >
                  {slot.label}
                </span>
                <span className={`mt-0.5 block text-xs ${isSelected ? "text-surface-dark" : "text-charcoal-sea/75"}`}>
                  {slot.sold_out
                    ? "Fully booked"
                    : slot.exclusive
                      ? "Whole boat"
                      : // Unlimited slots show no counter — a number implies a limit there isn't one of.
                        slot.remaining === null
                        ? "Available"
                        : `${slot.remaining} space${slot.remaining === 1 ? "" : "s"} left`}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {selected?.seat_map && (
        <SeatMap
          rows={selected.seat_map.rows}
          perRow={selected.seat_map.perRow}
          taken={selected.taken_seats}
          selected={value.seats}
          needed={people}
          onChange={(seats) => onChange({ slotId: selected.id, seats })}
        />
      )}

      <FieldError id={errorId("slot_id")} message={error} />
    </div>
  );
}
