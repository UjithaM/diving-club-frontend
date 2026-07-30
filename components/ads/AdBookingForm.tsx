"use client";

import { useState } from "react";
import PhoneInput from "@/components/ui/PhoneInput";
import { splitPhone } from "@/lib/phone";
import WhatsAppCta from "./WhatsAppCta";

const inputClass =
  "w-full border border-charcoal-sea/20 rounded-xl px-4 py-2.5 text-charcoal-sea placeholder:text-charcoal-sea/40 focus:outline-none focus:ring-2 focus:ring-shallow-water text-sm bg-white";

const labelClass = "block text-sm font-medium text-charcoal-sea mb-1.5";

interface AdBookingFormProps {
  bookingFor: "course" | "activity";
  /** Names pulled from the API by the page. May be empty if the API is down. */
  items: string[];
  /** GTM event label: "dive" | "padi". */
  source: string;
  /** WhatsApp prefill text, un-encoded. */
  message: string;
}

export default function AdBookingForm({ bookingFor, items, source, message }: AdBookingFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [phone, setPhone] = useState("");
  const [reference, setReference] = useState<string | null>(null);

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
          item: getValue("item"),
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
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-charcoal-sea/10 rounded-2xl p-6 sm:p-8 space-y-5">
      {/* What */}
      <div>
        <label htmlFor="item" className={labelClass}>
          Which {bookingFor}? <span className="text-tropic-coral">*</span>
        </label>
        <select id="item" name="item" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Pick one…
          </option>
          {items.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
          <option value="Not sure yet">Not sure yet — help me choose</option>
        </select>
      </div>

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
        {status === "submitting" ? "Sending…" : "Request your spot"}
      </button>

      <p className="text-xs text-charcoal-sea/45 text-center">
        Nothing is charged now. We&apos;ll confirm your dates and the advance payment on WhatsApp.
      </p>
    </form>
  );
}
