"use client";

import { useState } from "react";
import PhoneInput from "@/components/ui/PhoneInput";

const inputClass =
  "w-full border border-charcoal-sea/20 rounded-xl px-4 py-2.5 text-charcoal-sea placeholder:text-charcoal-sea/40 focus:outline-none focus:ring-2 focus:ring-shallow-water text-sm bg-white";

const labelClass = "block text-sm font-medium text-charcoal-sea mb-1.5";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [phone, setPhone] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const getValue = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement)?.value ?? "";

    const data = {
      name: getValue("name"),
      email: getValue("email"),
      phone,
      subject: getValue("subject"),
      message: getValue("message"),
    };

    try {
      const res = await fetch("/api/contact", {
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
        <p className="text-5xl mb-4">✉️</p>
        <h3 className="text-xl font-bold text-charcoal-sea mb-2">Message sent!</h3>
        <p className="text-charcoal-sea/70 leading-relaxed">
          Thanks for getting in touch. We&apos;ll reply within 24 hours — usually much faster.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm text-shallow-water underline underline-offset-2 hover:text-charcoal-sea transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

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
            placeholder="Your name"
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

      {/* Phone */}
      <div>
        <label className={labelClass}>Phone / WhatsApp</label>
        <PhoneInput value={phone} onChange={setPhone} />
        <p className="text-xs text-charcoal-sea/40 mt-1.5">Optional — helpful if you&apos;d like us to WhatsApp you back</p>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className={labelClass}>
          Subject <span className="text-tropic-coral">*</span>
        </label>
        <select id="subject" name="subject" required className={inputClass}>
          <option value="">What&apos;s this about?</option>
          <option value="booking">I want to book a course or activity</option>
          <option value="courses">Questions about PADI courses</option>
          <option value="activities">Questions about activities</option>
          <option value="conditions">Dive conditions and best times to visit</option>
          <option value="groups">Group or corporate bookings</option>
          <option value="other">Something else</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClass}>
          Message <span className="text-tropic-coral">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us what you need to know…"
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
        className="w-full bg-charcoal-sea text-warm-white font-bold py-3.5 rounded-full hover:bg-shallow-water transition-colors disabled:opacity-60 text-base"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>

      <p className="text-xs text-charcoal-sea/45 text-center">
        We reply within 24 hours — usually much sooner.
      </p>
    </form>
  );
}
