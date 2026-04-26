"use client";

import { useState } from "react";
import PhoneInput from "@/components/ui/PhoneInput";

interface BookingFormProps {
  preselectedItem?: string;
  preselectedType?: "course" | "activity";
  showItemSelect?: boolean;
}

const courseOptions = [
  "Discover Scuba Diving",
  "Scuba Diver",
  "Open Water Diver",
  "Advanced Open Water Diver",
  "Rescue Diver",
  "Emergency First Response",
  "Deep Diving Specialty",
  "Underwater Photography",
  "Divemaster",
];

const activityOptions = [
  "Try Diving",
  "Fun Diving — 2 Dives",
  "Fun Diving — 4 Dives",
  "Snorkeling Tour",
  "Whale & Dolphin Watching",
];

const inputClass =
  "w-full border border-charcoal-sea/20 rounded-xl px-4 py-2.5 text-charcoal-sea placeholder:text-charcoal-sea/40 focus:outline-none focus:ring-2 focus:ring-shallow-water text-sm bg-white";

const labelClass = "block text-sm font-medium text-charcoal-sea mb-1.5";

export default function BookingForm({
  preselectedItem,
  preselectedType,
  showItemSelect = false,
}: BookingFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [phone, setPhone] = useState("");
  const [bookingFor, setBookingFor] = useState<"course" | "activity">(preselectedType ?? "course");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const getValue = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value ?? "";

    const data = {
      name: getValue("name"),
      email: getValue("email"),
      phone,
      nationality: getValue("nationality"),
      date: getValue("date"),
      people: getValue("people"),
      bookingFor,
      item: preselectedItem ?? getValue("item"),
      certificationLevel: getValue("certificationLevel"),
      notes: getValue("notes"),
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
      setPhone("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-shallow-water/10 border border-shallow-water/30 rounded-2xl p-8 text-center">
        <p className="text-5xl mb-4">🎉</p>
        <h3 className="text-xl font-bold text-charcoal-sea mb-2">Request sent!</h3>
        <p className="text-charcoal-sea/70 leading-relaxed">
          Thanks for reaching out. We&apos;ll get back to you within 24 hours to confirm your booking details.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm text-shallow-water underline underline-offset-2 hover:text-charcoal-sea transition-colors"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Course vs Activity toggle */}
      {showItemSelect && (
        <div>
          <p className={labelClass}>I want to book a</p>
          <div className="flex gap-3">
            {(["course", "activity"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setBookingFor(t)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors capitalize ${
                  bookingFor === t
                    ? "bg-charcoal-sea text-warm-white border-charcoal-sea"
                    : "bg-white text-charcoal-sea/60 border-charcoal-sea/20 hover:border-charcoal-sea/40"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Item dropdown */}
      {showItemSelect && (
        <div>
          <label htmlFor="item" className={labelClass}>
            Which {bookingFor}? <span className="text-tropic-coral">*</span>
          </label>
          <select id="item" name="item" required className={inputClass}>
            <option value="">Select a {bookingFor}…</option>
            {(bookingFor === "course" ? courseOptions : activityOptions).map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      )}

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full Name <span className="text-tropic-coral">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your full name"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-tropic-coral">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@email.com"
            className={inputClass}
          />
        </div>
      </div>

      {/* Phone with country dial code */}
      <div>
        <label className={labelClass}>
          Phone / WhatsApp <span className="text-tropic-coral">*</span>
        </label>
        <PhoneInput value={phone} onChange={setPhone} required />
        <p className="text-xs text-charcoal-sea/40 mt-1.5">Include country code — we reply on WhatsApp too</p>
      </div>

      {/* Nationality */}
      <div>
        <label htmlFor="nationality" className={labelClass}>
          Nationality / Country
        </label>
        <input
          id="nationality"
          name="nationality"
          type="text"
          placeholder="e.g. British, German, Australian…"
          className={inputClass}
        />
      </div>

      {/* Date + People */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className={labelClass}>
            Preferred Date <span className="text-tropic-coral">*</span>
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
            Number of People
          </label>
          <select id="people" name="people" className={inputClass}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "person" : "people"}
              </option>
            ))}
            <option value="7+">7+ — contact us first</option>
          </select>
        </div>
      </div>

      {/* Certification level */}
      <div>
        <label htmlFor="certificationLevel" className={labelClass}>
          Current Diving Certification
        </label>
        <select id="certificationLevel" name="certificationLevel" className={inputClass}>
          <option value="none">No certification — complete beginner</option>
          <option value="scuba-diver">PADI Scuba Diver</option>
          <option value="open-water">PADI Open Water Diver</option>
          <option value="advanced">PADI Advanced Open Water</option>
          <option value="rescue">PADI Rescue Diver</option>
          <option value="divemaster">Divemaster or above</option>
          <option value="other">Other certification — mention in notes</option>
        </select>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className={labelClass}>
          Questions or Special Requests
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Medical conditions, allergies, specific questions, dates to avoid…"
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="text-tropic-coral text-sm bg-tropic-coral/10 border border-tropic-coral/20 rounded-xl px-4 py-3">
          Something went wrong. Please try again or call us on{" "}
          <a href="tel:0743945010" className="font-semibold underline">0743 945 010</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-tropic-coral text-white font-bold py-3.5 rounded-full hover:bg-sunrise transition-colors disabled:opacity-60 text-base"
      >
        {status === "submitting" ? "Sending…" : "Send Booking Request"}
      </button>

      <p className="text-xs text-charcoal-sea/45 text-center">
        No payment required now — we&apos;ll confirm by phone or email within 24 hours.
      </p>
    </form>
  );
}
