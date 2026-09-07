"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import SeatMap from "@/components/booking/SeatMap";
import { errorId, hintClass, labelClass } from "@/components/ui/fieldStyles";
import { FieldError } from "@/components/booking/BookingFields";
import { getSlots } from "@/lib/api/slots";
import type { Slot, SlotChoice } from "@/lib/types";

interface SlotPickerProps {
  type: "course" | "activity";
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
        <p className={hintClass}>Checking availability…</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {slots.map((slot) => {
            const isSelected = slot.id === value.slotId;
            return (
              <button
                key={slot.id}
                type="button"
                disabled={slot.sold_out}
                aria-pressed={isSelected}
                onClick={() => onChange({ slotId: slot.id, seats: [] })}
                className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                  isSelected
                    ? "border-shallow-water bg-shallow-water/10 ring-2 ring-shallow-water"
                    : slot.sold_out
                      ? "cursor-not-allowed border-charcoal-sea/10 bg-charcoal-sea/5"
                      : "border-charcoal-sea/20 bg-white hover:border-shallow-water"
                }`}
              >
                <span
                  className={`block text-sm font-semibold ${
                    slot.sold_out ? "text-charcoal-sea/35" : "text-charcoal-sea"
                  }`}
                >
                  {slot.label}
                </span>
                <span className="mt-0.5 block text-xs text-charcoal-sea/50">
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
