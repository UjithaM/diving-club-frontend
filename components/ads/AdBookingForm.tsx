"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { splitPhone } from "@/lib/phone";
import { CONVERSIONS, trackBookingBlocked, trackConversion } from "@/lib/ads";
import { getAttribution } from "@/lib/attribution";
import { useFormAbandon } from "@/lib/hooks/useFormAbandon";
import { revealField } from "@/lib/revealField";
import { fieldErrorsFromApi, itemError, type BookingField } from "@/lib/booking-schema";
import { bookingFormDefaults, type BookingFormValues } from "@/lib/booking-form";
import { errorId, errorInputClass, inputClass, labelClass } from "@/components/ui/fieldStyles";
import BookingFields, { FieldError, Req } from "@/components/booking/BookingFields";
import SlotPicker from "@/components/booking/SlotPicker";
import type { BookableItem, SlotChoice } from "@/lib/types";
import { headcount } from "@/lib/discount";
import WhatsAppCta from "./WhatsAppCta";

/**
 * Price, duration and inclusions, straight from the API. Sells the item and confirms the
 * choice.
 *
 * The inclusions sit in a `<details>` rather than an always-open list. Fully expanded this
 * card ran ~350px, and it's the first thing inside the form — so "Book your spot" landed the
 * visitor on a price with every input below the fold. Collapsed, the price still lands but
 * the first fields come with it. Native disclosure, so it works before hydration.
 */
function ItemSummary({ item }: { item: BookableItem }) {
  const saving = item.originalPrice && item.originalPrice > item.price
    ? item.originalPrice - item.price
    : 0;

  return (
    <div className="bg-charcoal-sea rounded-2xl p-5">
      <p className="text-warm-white font-bold text-lg leading-snug mb-3">{item.name}</p>

      <div className="flex items-end gap-3 flex-wrap mb-2">
        <span className="text-tropic-coral text-4xl font-extrabold leading-none">
          ${item.price}
        </span>
        <span className="text-warm-white/40 text-sm mb-1">{item.currency} per person</span>
        {saving > 0 && (
          <>
            <span className="text-warm-white/40 text-lg line-through mb-0.5">
              ${item.originalPrice}
            </span>
            <span className="bg-tropic-coral text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-1">
              Save ${saving}
            </span>
          </>
        )}
      </div>

      <p className="text-warm-white/50 text-sm">
        {item.duration}
        {item.minAge ? ` · Ages ${item.minAge}+` : ""}
      </p>

      {item.includes?.length ? (
        <details className="mt-4 pt-4 border-t border-white/10 group">
          <summary className="cursor-pointer list-none text-warm-white/70 text-sm font-semibold flex items-center justify-between gap-2 min-h-[24px]">
            What&apos;s included ({item.includes.length})
            <span
              className="text-warm-white/40 transition-transform group-open:rotate-180"
              aria-hidden="true"
            >
              ▾
            </span>
          </summary>
          <ul className="mt-3 space-y-2">
            {item.includes.map((line) => (
              <li key={line} className="flex gap-2.5 text-warm-white/75 text-sm leading-relaxed">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                  className="flex-shrink-0 mt-0.5"
                >
                  <path
                    d="M4 10.5l4 4 8-9"
                    stroke="#2A9D8F"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {line}
              </li>
            ))}
          </ul>
        </details>
      ) : null}
    </div>
  );
}

interface AdBookingFormProps {
  bookingFor: "course" | "activity";
  /** Dropdown options. Empty when the page books one fixed thing. */
  items: BookableItem[];
  /** When set, this item is locked in — no dropdown, nothing to choose. */
  fixedItem?: BookableItem;
  /** GTM event label: "dive" | "padi". */
  source: string;
  /** WhatsApp prefill text, un-encoded. */
  message: string;
}

export default function AdBookingForm({
  bookingFor,
  items,
  fixedItem,
  source,
  message,
}: AdBookingFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [reference, setReference] = useState<string | null>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const funnel = useFormAbandon(source);

  const form = useForm<BookingFormValues>({
    // onTouched, not onBlur: with onBlur, react-hook-form's skipValidation returns early on
    // every change event until the first submit, so a flagged field stayed red the whole time
    // the visitor was fixing it and only cleared when they left it. onTouched stays quiet
    // while a field is filled in for the first time, then re-checks on every keystroke.
    mode: "onTouched",
    reValidateMode: "onChange",
    // revealField owns this. Left on, react-hook-form's plain .focus() jumps the page and
    // fights the smooth scroll — and on iOS it does nothing at all.
    shouldFocusError: false,
    defaultValues: { ...bookingFormDefaults, item: fixedItem?.name ?? "" },
  });
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = form;
  // useWatch, not watch(): watch() can't be memoized, so it opts the whole component out of
  // the React Compiler — and this one renders on paid traffic.
  const itemName = useWatch({ control, name: "item" });
  // The slot picker refetches on this, so it has to be watched rather than read at submit.
  const bookingDate = useWatch({ control, name: "date" });
  const people = useWatch({ control, name: "people" });
  const quantity = useWatch({ control, name: "quantity" });
  const [slotChoice, setSlotChoice] = useState<SlotChoice>({ slotId: null, seats: [] });

  // The success message is shorter than the form it replaces, so without this the
  // visitor is left staring at whitespace below it.
  useEffect(() => {
    if (status === "success") topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [status]);

  // "Not sure yet" matches nothing, so no card shows — which is right.
  const selected = fixedItem ?? items.find((i) => i.name === itemName);
  /** Activities only, and only once the admin sets a cap. Courses never have one. */
  const maxQuantity = selected?.maxQuantity ?? null;
  /** What actually gets billed — and so how many seats a seated boat needs. Mirrors onValid. */
  const seatsNeeded =
    headcount(people) * (maxQuantity ? Math.min(headcount(quantity ?? "1"), maxQuantity) : 1);

  async function onValid(values: BookingFormValues) {
    setStatus("submitting");
    funnel.noteSubmitted();
    const quantity = maxQuantity
      ? Math.min(headcount(values.quantity ?? "1"), maxQuantity)
      : null;

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          ...splitPhone(values.phone),
          date: values.date,
          // The backend wants an integer, and "7+" is a real option in the select.
          people: headcount(values.people),
          // An ad page sells one thing, so the cart the backend expects is one line long.
          items: [
            {
              bookingFor,
              item: values.item,
              ...(quantity ? { quantity } : {}),
              // Absent for anything the shop hasn't set times for, which keeps those items
              // booking by date alone exactly as they did before.
              ...(slotChoice.slotId ? { slot_id: slotChoice.slotId } : {}),
              ...(slotChoice.seats.length ? { seats: slotChoice.seats } : {}),
            },
          ],
          // Which ad brought them here. Undefined on organic traffic, so the key drops out.
          attribution: getAttribution(),
        }),
      });
      const data = await res.json().catch(() => null);

      // A rejection names the fields it didn't like — show it on the inputs rather than
      // as a generic "something went wrong" the visitor can't act on.
      if (!res.ok) {
        const fromApi = fieldErrorsFromApi(data?.fields ?? {});
        const named = Object.keys(fromApi) as BookingField[];
        if (named.length > 0) {
          named.forEach((field) => setError(field, { message: fromApi[field] }));
          // Not setError's shouldFocus: that is the same bare .focus() iOS ignores.
          revealField(formRef.current, named);
          trackBookingBlocked(source, named);
          setStatus("idle");
          return;
        }
        throw new Error();
      }

      setReference(data.reference ?? null);

      // A form booking is a different, higher-intent lead than a chat, so it gets its
      // own action. transaction_id dedupes it against the offline upload the backend
      // will send once the booking is actually confirmed.
      trackConversion("booking_submit", CONVERSIONS.form, {
        data: { source, item: values.item },
        conversion: {
          value: selected ? selected.price * headcount(values.people) * (quantity ?? 1) : undefined,
          currency: selected?.currency ?? "USD",
          transaction_id: data.reference ?? undefined,
        },
        userData: { email: values.email, phone_number: values.phone },
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={topRef}
        className="bg-white border border-shallow-water/30 rounded-2xl p-8 text-center scroll-mt-24"
      >
        <div className="w-14 h-14 rounded-full bg-shallow-water/10 border-2 border-shallow-water flex items-center justify-center mx-auto mb-5">
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path
              d="M10 20l8 8 14-14"
              stroke="#2A9D8F"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h3 className="text-xl font-bold text-charcoal-sea mb-2">
          Request received — you&apos;re not booked yet
        </h3>
        <p className="text-charcoal-sea/70 leading-relaxed mb-6">
          Our team will WhatsApp you within 24 hours to confirm your dates and send the advance
          payment details. Nothing is charged until then.
        </p>

        {reference && (
          <p className="text-sm text-charcoal-sea/50 mb-6">
            Your reference: <span className="font-bold text-charcoal-sea">{reference}</span>
          </p>
        )}

        <WhatsAppCta message={message} source={source} label="Message us on WhatsApp" />

        <div className="mt-6">
          <Link
            href="/"
            className="text-sm text-charcoal-sea/50 hover:text-charcoal-sea transition-colors"
          >
            ← Back to Diving Club
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      // Built at submit time, not during render: onValid closes over formRef, and calling
      // handleSubmit inline would read that ref while rendering.
      onSubmit={(e) =>
        handleSubmit(onValid, (invalid) => {
          const named = Object.keys(invalid);
          // react-hook-form's own shouldFocusError runs after an await, and iOS drops
          // programmatic focus once the gesture stack has unwound — so it does nothing on a
          // phone. revealField scrolls instead, which carries no such restriction.
          revealField(formRef.current, named);
          trackBookingBlocked(source, named);
        })(e)
      }
      onFocusCapture={funnel.noteFocus}
      // noValidate: our messages are friendlier than the browser's bubbles, and the
      // native ones only fire on submit — which is the thing being fixed here.
      noValidate
      className="bg-white border border-charcoal-sea/10 rounded-2xl p-6 sm:p-8 space-y-5"
    >
      {/* What */}
      {fixedItem ? (
        <div>
          <p className={labelClass}>You&apos;re booking</p>
          <ItemSummary item={fixedItem} />
        </div>
      ) : (
        <div data-field="item">
          <label htmlFor="item" className={labelClass}>
            Which {bookingFor}? <Req />
          </label>
          <select
            id="item"
            {...register("item", { validate: (v) => itemError(v) || true })}
            className={`${inputClass} ${errors.item ? errorInputClass : ""}`}
            {...(errors.item
              ? { "aria-invalid": true as const, "aria-describedby": errorId("item") }
              : {})}
          >
            <option value="" disabled>
              Pick one…
            </option>
            {items.map((item) => (
              <option key={item.slug} value={item.name}>
                {item.name}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet — help me choose</option>
          </select>
          <FieldError id={errorId("item")} message={errors.item?.message} />

          {selected && (
            <div className="mt-4">
              <ItemSummary item={selected} />
            </div>
          )}
        </div>
      )}

      <BookingFields
        form={form}
        maxQuantity={maxQuantity}
        quantityKey={selected?.slug}
        slotPicker={
          itemName ? (
            <SlotPicker
              type={bookingFor}
              item={itemName}
              date={bookingDate ?? ""}
              people={seatsNeeded}
              value={slotChoice}
              onChange={setSlotChoice}
              error={errors.slot_id?.message}
            />
          ) : null
        }
      />

      {status === "error" && (
        <p
          role="alert"
          className="text-tropic-coral text-sm bg-tropic-coral/10 border border-tropic-coral/20 rounded-xl px-4 py-3"
        >
          Something went wrong. Please try again, or WhatsApp us on{" "}
          <a
            href="https://wa.me/94743945010"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            0743 945 010
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-tropic-coral text-white font-bold py-3.5 rounded-full hover:bg-sunrise transition-colors disabled:opacity-60 text-base"
      >
        {/* Not "Book Now" — nothing is booked, and the word makes people brace for a
            card form that never comes. The success screen already says as much. */}
        {status === "submitting" ? "Sending…" : "Check availability"}
      </button>

      {/* Baymard: trust markers do the most work at the point of commitment, not in a
          section further down the page. */}
      <div className="text-center space-y-2">
        <p className="text-xs text-charcoal-sea/45">
          No card needed. Nothing is charged now — we confirm your dates and the advance on
          WhatsApp first.
        </p>
        <p className="text-xs text-charcoal-sea/45">
          PADI dive centre in Trincomalee since 2010
        </p>
        {/* Consent has to be visible at the point of commitment for the 48-hour rule and
            the late-arrival rule to hold. */}
        <p className="text-xs text-charcoal-sea/40 leading-relaxed">
          By sending this you agree to our{" "}
          <Link href="/terms" className="underline hover:text-shallow-water">terms</Link> and{" "}
          <Link href="/refund-policy" className="underline hover:text-shallow-water">refund policy</Link>.
        </p>
      </div>
    </form>
  );
}
