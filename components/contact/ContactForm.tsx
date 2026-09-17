"use client";

import { useState } from "react";
import PhoneInput from "@/components/ui/PhoneInput";
import { splitPhone } from "@/lib/phone";
import { inputClass, labelClass } from "@/components/ui/fieldStyles";

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
      // country_code is only required alongside a phone number
      ...(phone ? splitPhone(phone) : {}),
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
      <div role="status" className="relative overflow-hidden bg-shallow-water/12 border-2 border-shallow-water rounded-[18px] p-8 text-center">
        <div className="pop-in mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-shallow-water" aria-hidden="true">
          <svg className="draw-check" width="30" height="30" viewBox="0 0 20 20" fill="none"><path d="M4 10.5l4 4 8-9" stroke="var(--color-surface-dark)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h3 className="text-sub font-extrabold text-charcoal-sea mb-2">Message sent!</h3>
        <p className="text-charcoal-sea/85 leading-relaxed">
          Thanks for getting in touch. We&apos;ll reply within 24 hours — usually much faster.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 min-h-11 text-sm font-semibold text-charcoal-sea underline underline-offset-4 hover:no-underline cursor-pointer"
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
            Full Name <span className="text-coral-deep">*</span>
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
            Email <span className="text-coral-deep">*</span>
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
        <p className="text-xs text-charcoal-sea/80 mt-2">Optional — helpful if you&apos;d like us to WhatsApp you back</p>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className={labelClass}>
          Subject <span className="text-coral-deep">*</span>
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
          Message <span className="text-coral-deep">*</span>
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
        <p role="alert" className="text-coral-deep text-sm font-semibold bg-tropic-coral/10 border-2 border-tropic-coral/40 rounded-[12px] px-4 py-3">
          Something went wrong. Please try again or WhatsApp us on{" "}
          <a href="https://wa.me/94743945010" target="_blank" rel="noopener noreferrer" className="font-semibold underline">0743 945 010</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full min-h-14 bg-action text-action-ink font-bold rounded-[12px] hover:bg-action-hover active:scale-[0.99] transition-[background-color,scale] disabled:opacity-70 text-lg cursor-pointer"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>

      <p className="text-xs text-charcoal-sea/80 text-center">
        We reply within 24 hours — usually much sooner.
      </p>
    </form>
  );
}
