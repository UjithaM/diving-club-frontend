"use client";

import { useState } from "react";
import Link from "next/link";
import PhoneInput from "@/components/ui/PhoneInput";
import { splitPhone } from "@/lib/phone";
import type { BookableItem } from "@/lib/types";
import WhatsAppCta from "./WhatsAppCta";

const inputClass =
  "w-full border border-charcoal-sea/20 rounded-xl px-4 py-2.5 text-charcoal-sea placeholder:text-charcoal-sea/40 focus:outline-none focus:ring-2 focus:ring-shallow-water text-sm bg-white";

const labelClass = "block text-sm font-medium text-charcoal-sea mb-1.5";

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

  // "Not sure yet" matches nothing, so no card shows — which is right.
  const selected = fixedItem ?? items.find((i) => i.name === itemName);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const getValue = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement)?.value ?? "";

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: getValue("name"),
          email: getValue("email"),
          ...splitPhone(phone),
          date: getValue("date"),
          people: getValue("people"),
          bookingFor,
          item: itemName,
        }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setReference(data.reference ?? null);
      // No gtag conversion yet — Ads only has a conversion action for WhatsApp clicks.
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "booking_submit", source });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white border border-shallow-water/30 rounded-2xl p-8 text-center">
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
    <form onSubmit={handleSubmit} className="bg-white border border-charcoal-sea/10 rounded-2xl p-6 sm:p-8 space-y-5">
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
            required
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className={inputClass}
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
          <input id="name" name="name" type="text" required placeholder="Your name" className={inputClass} />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-tropic-coral">*</span>
          </label>
          <input id="email" name="email" type="email" required placeholder="you@email.com" className={inputClass} />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className={labelClass}>
          Phone / WhatsApp <span className="text-tropic-coral">*</span>
        </label>
        <PhoneInput value={phone} onChange={setPhone} required />
        <p className="text-xs text-charcoal-sea/40 mt-1.5">This is how we&apos;ll reach you to confirm.</p>
      </div>

      {/* Date + People */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className={labelClass}>
            Preferred date <span className="text-tropic-coral">*</span>
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            min={new Date().toISOString().split("T")[0]}
            className={inputClass}
          />
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
            <option value="7+">7+ — a group</option>
          </select>
        </div>
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
        {status === "submitting" ? "Sending…" : "Book Now"}
      </button>

      <p className="text-xs text-charcoal-sea/45 text-center">
        Nothing is charged now. We&apos;ll confirm your dates and the advance payment on WhatsApp.
      </p>
    </form>
  );
}
