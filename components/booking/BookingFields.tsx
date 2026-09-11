"use client";

import type { UseFormReturn } from "react-hook-form";
import PhoneField from "@/components/ui/PhoneField";
import {
  errorId,
  errorInputClass,
  hintClass,
  inputClass,
  labelClass,
} from "@/components/ui/fieldStyles";
import { dateError, emailError, nameError, todayISO } from "@/lib/booking-schema";
import { phoneFieldError, type BookingFormValues } from "@/lib/booking-form";

/**
 * react-hook-form treats a returned string as the error message and `true` as "valid", which
 * is exactly the inverse of our predicates' "" for valid.
 */
const rule = (check: (v: unknown) => string) => (v: unknown) => check(v) || true;

/**
 * The repo's only announced error message, promoted out of AdBookingForm so /book gets it
 * too — it used to render five bare `<p>` tags a screen reader never mentioned.
 */
export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-tropic-coral text-xs mt-1.5">
      {message}
    </p>
  );
}

/** Marks a required field for sighted users; the input's own `aria-required` does the rest. */
export function Req() {
  return <span className="text-tropic-coral">*</span>;
}

interface BookingFieldsProps {
  form: UseFormReturn<BookingFormValues>;
  /** Non-null turns on "How many dives?", capped at this. Activities only. */
  maxQuantity?: number | null;
  /** Resets the uncontrolled quantity when the visitor switches to an item with a new cap. */
  quantityKey?: string;
  /**
   * Rendered under the date. Optional because it depends on the item, which only the parent
   * knows — and because an item with no times set renders nothing at all, so both forms are
   * unchanged for everything the shop hasn't configured yet.
   */
  slotPicker?: React.ReactNode;
}

/**
 * Name, phone, date and headcount — everything both booking forms ask for, in one place.
 *
 * These fields were duplicated across the ad form and the wizard with different validation,
 * different heights and different error markup, and the copies had drifted: the wizard
 * required a date the ad form treated as optional, and computed its minimum in UTC.
 */
export default function BookingFields({
  form,
  maxQuantity,
  quantityKey,
  slotPicker,
}: BookingFieldsProps) {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  /** Error styling plus the wiring that makes it announced rather than just red. */
  const fieldProps = (name: keyof BookingFormValues) => ({
    className: `${inputClass} ${errors[name] ? errorInputClass : ""}`,
    ...(errors[name]
      ? { "aria-invalid": true as const, "aria-describedby": errorId(name) }
      : {}),
  });

  return (
    <>
      {/* Name + Email. data-field marks what revealField flashes — the whole cell, so the
          label and message move with the ring rather than just the box. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div data-field="name">
          <label htmlFor="name" className={labelClass}>
            Full name <Req />
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            enterKeyHint="next"
            placeholder="Your name"
            {...register("name", { validate: rule(nameError) })}
            {...fieldProps("name")}
          />
          <FieldError id={errorId("name")} message={errors.name?.message} />
        </div>

        <div data-field="email">
          <label htmlFor="email" className={labelClass}>
            Email <Req />
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            enterKeyHint="next"
            placeholder="you@email.com"
            {...register("email", { validate: rule(emailError) })}
            {...fieldProps("email")}
          />
          <FieldError id={errorId("email")} message={errors.email?.message} />
        </div>
      </div>

      {/* Phone. PhoneField goes through react-hook-form's Controller, which is what gives it a
          ref at all — and the country-aware rule needs libphonenumber, so it can't live in the
          module the API route shares. */}
      <div data-field="phone">
        <label className={labelClass}>
          Phone / WhatsApp <Req />
        </label>
        <PhoneField
          name="phone"
          control={control}
          rules={{ validate: rule(phoneFieldError) }}
          invalid={Boolean(errors.phone)}
          describedBy={errors.phone ? errorId("phone") : undefined}
        />
        <FieldError id={errorId("phone")} message={errors.phone?.message} />
        {!errors.phone && (
          <p className={hintClass}>Include your country code — this is how we confirm.</p>
        )}
      </div>

      {/* Date + People */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div data-field="date">
          <label htmlFor="date" className={labelClass}>
            Preferred date{" "}
            <span className="text-charcoal-sea/75 font-normal">(optional)</span>
          </label>
          <input
            id="date"
            type="date"
            autoComplete="off"
            // todayISO, not toISOString — the old wizard helper shifted the day either side
            // of UTC and locked out "today" for anyone east of Greenwich.
            min={todayISO()}
            {...register("date", { validate: rule(dateError) })}
            {...fieldProps("date")}
          />
          <FieldError id={errorId("date")} message={errors.date?.message} />
          {!errors.date && <p className={hintClass}>Not sure yet? Leave it blank.</p>}
        </div>

        <div>
          <label htmlFor="people" className={labelClass}>
            How many of you?
          </label>
          <select id="people" {...register("people")} className={inputClass}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "person" : "people"}
              </option>
            ))}
            <option value="7+">7+ (contact us first)</option>
          </select>
        </div>

        {/* Activities with a cap only. `key` resets the value when the visitor switches to a
            different item with a different cap. */}
        {maxQuantity ? (
          <div key={quantityKey}>
            <label htmlFor="quantity" className={labelClass}>
              How many dives?
            </label>
            <input
              id="quantity"
              type="number"
              inputMode="numeric"
              min={1}
              max={maxQuantity}
              step={1}
              {...register("quantity")}
              {...fieldProps("quantity")}
            />
            {/* Only ever set by the backend rejecting the cap — the cap belongs to the item,
                so it can't live in a static schema. */}
            <FieldError id={errorId("quantity")} message={errors.quantity?.message} />
            <p className={hintClass}>Each person, up to {maxQuantity}.</p>
          </div>
        ) : null}
      </div>

      {/* Full width under the date — a row of times and a boat plan don't fit half a grid. */}
      {slotPicker}
    </>
  );
}
