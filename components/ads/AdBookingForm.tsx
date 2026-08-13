"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PhoneInput from "@/components/ui/PhoneInput";
import { splitPhone } from "@/lib/phone";
import { isValidPhoneNumber } from "react-phone-number-input";
import { CONVERSIONS, trackConversion } from "@/lib/ads";
import { getAttribution } from "@/lib/attribution";
import {
  fieldErrorsFromApi,
  todayISO,
  validateField,
  type BookingField,
} from "@/lib/booking-validation";
import type { BookableItem } from "@/lib/types";
import { headcount } from "@/lib/discount";
import WhatsAppCta from "./WhatsAppCta";

// min-h: py-2.5 + text-sm landed at ~42px, under the 44px minimum touch target — and this is
// the form paid mobile traffic lands on.
const inputClass =
  "w-full min-h-[48px] border border-charcoal-sea/20 rounded-xl px-4 py-2.5 text-charcoal-sea placeholder:text-charcoal-sea/40 focus:outline-none focus:ring-2 focus:ring-shallow-water text-sm bg-white";

const labelClass = "block text-sm font-medium text-charcoal-sea mb-1.5";

const errorInputClass =
  "border-tropic-coral focus:ring-tropic-coral bg-tropic-coral/[0.03]";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-tropic-coral text-xs mt-1.5">
      {message}
    </p>
  );
}

/** Price, duration and inclusions, straight from the API. Sells the item and confirms the choice. */
function ItemSummary({ item }: { item: BookableItem }) {
  const saving = item.originalPrice && item.originalPrice > item.price
    ? item.originalPrice - item.price
    : 0;

  return (
    <div className="bg-charcoal-sea rounded-2xl p-6">
      <p className="text-warm-white font-bold text-lg leading-snug mb-4">{item.name}</p>

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
        <ul className="mt-5 pt-5 border-t border-white/10 space-y-2">
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
  const [phone, setPhone] = useState("");
  const [itemName, setItemName] = useState(fixedItem?.name ?? "");
  const [reference, setReference] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<BookingField, string>>>({});
  // A field only shows its error once the visitor has left it (or tried to submit).
  // Marking it red while they're still typing the first character is hostile.
  const [touched, setTouched] = useState<Partial<Record<BookingField, boolean>>>({});
  const topRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  /** Phone needs the country context the input holds, so it can't live in the module. */
  const checkPhone = (value: string) =>
    validateField("phone", value) ||
    (isValidPhoneNumber(value) ? "" : "That number doesn't look right for the country picked.");

  function validateAll(): Partial<Record<BookingField, string>> {
    const form = formRef.current;
    const read = (name: string) =>
      (form?.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null)?.value ?? "";

    const next: Partial<Record<BookingField, string>> = {
      // A locked-in fixedItem has nothing for the visitor to get wrong.
      item: fixedItem ? "" : validateField("item", itemName),
      name: validateField("name", read("name")),
      email: validateField("email", read("email")),
      phone: checkPhone(phone),
      date: validateField("date", read("date")),
    };
    for (const key of Object.keys(next) as BookingField[]) if (!next[key]) delete next[key];
    return next;
  }

  /** Blur validates that one field. Re-typing in an already-flagged field re-checks live. */
  const handleBlur = (field: BookingField) => (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const message = field === "phone" ? checkPhone(phone) : validateField(field, e.target.value);
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: message || undefined }));
  };

  const revalidate = (field: BookingField, value: string) => {
    if (!touched[field]) return;
    const message = field === "phone" ? checkPhone(value) : validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: message || undefined }));
  };

  const errorProps = (field: BookingField) =>
    errors[field]
      ? { "aria-invalid": true as const, "aria-describedby": `${field}-error` }
      : {};

  // The success message is shorter than the form it replaces, so without this the
  // visitor is left staring at whitespace below it.
  useEffect(() => {
    if (status === "success") topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [status]);

  // "Not sure yet" matches nothing, so no card shows — which is right.
  const selected = fixedItem ?? items.find((i) => i.name === itemName);
  /** Activities only, and only once the admin sets a cap. Courses never have one. */
  const maxQuantity = selected?.maxQuantity ?? null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const getValue = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement)?.value ?? "";

    // Same rules blur uses, so nothing can pass one and fail the other.
    const found = validateAll();
    setTouched({ item: true, name: true, email: true, phone: true, date: true });
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = (Object.keys(found) as BookingField[])[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    const email = getValue("email");
    const people = getValue("people");
    // The form is noValidate, so min/max are decoration — clamp what actually gets sent.
    const quantity = maxQuantity ? Math.min(headcount(getValue("quantity")), maxQuantity) : null;

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: getValue("name"),
          email,
          ...splitPhone(phone),
          date: getValue("date"),
          // The backend wants an integer, and "7+" is a real option in the select.
          people: headcount(people),
          // An ad page sells one thing, so the cart the backend expects is one line long.
          items: [{ bookingFor, item: itemName, ...(quantity ? { quantity } : {}) }],
          // Which ad brought them here. Undefined on organic traffic, so the key drops out.
          attribution: getAttribution(),
        }),
      });
      const data = await res.json().catch(() => null);

      // A rejection names the fields it didn't like — show it on the inputs rather than
      // as a generic "something went wrong" the visitor can't act on.
      if (!res.ok) {
        const fromApi = fieldErrorsFromApi(data?.fields ?? {});
        if (Object.keys(fromApi).length > 0) {
          setTouched((t) => ({ ...t, ...Object.fromEntries(Object.keys(fromApi).map((k) => [k, true])) }));
          setErrors(fromApi);
          setStatus("idle");
          const first = (Object.keys(fromApi) as BookingField[])[0];
          form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
          return;
        }
        throw new Error();
      }

      setReference(data.reference ?? null);

      // A form booking is a different, higher-intent lead than a chat, so it gets its
      // own action. transaction_id dedupes it against the offline upload the backend
      // will send once the booking is actually confirmed.
      trackConversion("booking_submit", CONVERSIONS.form, {
        data: { source, item: itemName },
        conversion: {
          value: selected ? selected.price * headcount(people) * (quantity ?? 1) : undefined,
          currency: selected?.currency ?? "USD",
          transaction_id: data.reference ?? undefined,
        },
        userData: { email, phone_number: phone },
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
      onSubmit={handleSubmit}
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
        <div>
          <label htmlFor="item" className={labelClass}>
            Which {bookingFor}? <span className="text-tropic-coral">*</span>
          </label>
          <select
            id="item"
            name="item"
            value={itemName}
            onChange={(e) => {
              setItemName(e.target.value);
              revalidate("item", e.target.value);
            }}
            onBlur={handleBlur("item")}
            className={`${inputClass} ${errors.item ? errorInputClass : ""}`}
            {...errorProps("item")}
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
          <FieldError id="item-error" message={errors.item} />

          {selected && (
            <div className="mt-4">
              <ItemSummary item={selected} />
            </div>
          )}
        </div>
      )}

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full name <span className="text-tropic-coral">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            enterKeyHint="next"
            placeholder="Your name"
            onBlur={handleBlur("name")}
            onChange={(e) => revalidate("name", e.target.value)}
            className={`${inputClass} ${errors.name ? errorInputClass : ""}`}
            {...errorProps("name")}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-tropic-coral">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            enterKeyHint="next"
            placeholder="you@email.com"
            onBlur={handleBlur("email")}
            onChange={(e) => revalidate("email", e.target.value)}
            className={`${inputClass} ${errors.email ? errorInputClass : ""}`}
            {...errorProps("email")}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
      </div>

      {/* Phone */}
      <div onBlur={() => handleBlur("phone")({ target: { value: phone } } as never)}>
        <label className={labelClass}>
          Phone / WhatsApp <span className="text-tropic-coral">*</span>
        </label>
        <PhoneInput
          value={phone}
          onChange={(v) => {
            setPhone(v);
            revalidate("phone", v);
          }}
        />
        <FieldError id="phone-error" message={errors.phone} />
        {!errors.phone && (
          <p className="text-xs text-charcoal-sea/40 mt-1.5">
            This is how we&apos;ll reach you to confirm.
          </p>
        )}
      </div>

      {/* Date + People */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className={labelClass}>
            Preferred date{" "}
            <span className="text-charcoal-sea/40 font-normal">(optional)</span>
          </label>
          <input
            id="date"
            name="date"
            type="date"
            autoComplete="off"
            min={todayISO()}
            onBlur={handleBlur("date")}
            onChange={(e) => revalidate("date", e.target.value)}
            className={`${inputClass} ${errors.date ? errorInputClass : ""}`}
            {...errorProps("date")}
          />
          <FieldError id="date-error" message={errors.date} />
          {!errors.date && (
            <p className="text-xs text-charcoal-sea/40 mt-1.5">
              Not sure yet? Leave it blank.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="people" className={labelClass}>
            How many of you?
          </label>
          <select id="people" name="people" defaultValue="1" className={inputClass}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "person" : "people"}
              </option>
            ))}
            <option value="7+">7+ (contact us first)</option>
          </select>
        </div>

        {/* Activities with a cap only. `key` resets the uncontrolled value when the
            visitor switches to a different item with a different cap. */}
        {maxQuantity && (
          <div>
            <label htmlFor="quantity" className={labelClass}>
              How many dives?
            </label>
            <input
              key={selected?.slug}
              id="quantity"
              name="quantity"
              type="number"
              inputMode="numeric"
              min={1}
              max={maxQuantity}
              step={1}
              defaultValue={1}
              className={inputClass}
              {...errorProps("quantity")}
            />
            {/* Only ever set by the backend rejecting the cap — the input's own max is
                decoration on a noValidate form. */}
            <FieldError id="quantity-error" message={errors.quantity} />
            <p className="text-xs text-charcoal-sea/40 mt-1.5">
              Each person, up to {maxQuantity}.
            </p>
          </div>
        )}
      </div>

      {status === "error" && (
        <p className="text-tropic-coral text-sm bg-tropic-coral/10 border border-tropic-coral/20 rounded-xl px-4 py-3">
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
