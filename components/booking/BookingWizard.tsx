"use client";

import { useReducer, useState, useEffect, useRef } from "react";
import PhoneInput from "@/components/ui/PhoneInput";
import Link from "next/link";

// ─── Data ────────────────────────────────────────────────────────────────────

const certOptions = [
  { value: "none", label: "No certification — complete beginner" },
  { value: "scuba-diver", label: "PADI Scuba Diver" },
  { value: "open-water", label: "PADI Open Water Diver" },
  { value: "advanced", label: "PADI Advanced Open Water" },
  { value: "rescue", label: "PADI Rescue Diver" },
  { value: "divemaster", label: "Divemaster or above" },
  { value: "other", label: "Other certification — mention in notes" },
];

// ─── State ───────────────────────────────────────────────────────────────────

type BookingType = "course" | "activity" | "dive-site";

interface BookingDraft {
  bookingType: BookingType;
  item: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  date: string;
  people: string;
  certificationLevel: string;
  notes: string;
}

type Action = { type: "SET_FIELD"; field: keyof BookingDraft; value: string };

function reducer(state: BookingDraft, action: Action): BookingDraft {
  return { ...state, [action.field]: action.value };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const ease = "cubic-bezier(0.16, 1, 0.3, 1)";

const inputClass =
  "w-full min-h-[52px] border border-charcoal-sea/20 rounded-xl px-4 py-3 text-charcoal-sea placeholder:text-charcoal-sea/40 focus:outline-none focus:ring-2 focus:ring-shallow-water text-sm bg-white";

const labelClass = "block text-sm font-semibold text-charcoal-sea mb-1.5";

function optionsForType(
  type: BookingType,
  courseOptions: string[],
  activityOptions: string[],
  diveSiteOptions: string[]
) {
  if (type === "course") return courseOptions;
  if (type === "activity") return activityOptions;
  return diveSiteOptions;
}

function typeLabel(type: BookingType) {
  if (type === "course") return "Course";
  if (type === "activity") return "Activity";
  return "Dive Site";
}

function certLabel(value: string) {
  return certOptions.find((c) => c.value === value)?.label ?? value;
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StepIndicator({ step }: { step: number }) {
  const labels = ["What", "Details", "Review"];

  return (
    <div className="mb-8">
      {/* Progress bar */}
      <div className="relative h-1 bg-charcoal-sea/10 rounded-full mb-4 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-tropic-coral rounded-full"
          style={{
            width: `${((step - 1) / 2) * 100}%`,
            transition: `width 400ms ${ease}`,
          }}
        />
      </div>

      {/* Step dots */}
      <div className="flex items-center justify-between">
        {labels.map((label, i) => {
          const n = i + 1;
          const done = n < step;
          const active = n === step;
          return (
            <div key={label} className="flex flex-col items-center gap-1.5 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  done
                    ? "bg-shallow-water text-white"
                    : active
                    ? "bg-tropic-coral text-white scale-110"
                    : "border-2 border-charcoal-sea/20 text-charcoal-sea/30"
                }`}
              >
                {done ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7l4 4 6-6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  n
                )}
              </div>
              <span
                className={`text-xs font-medium transition-colors duration-300 ${
                  active ? "text-charcoal-sea" : "text-charcoal-sea/40"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StickyNav({
  onBack,
  onNext,
  nextLabel,
  nextDisabled,
  submitting,
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel: string;
  nextDisabled?: boolean;
  submitting?: boolean;
}) {
  return (
    <div className="sticky bottom-0 -mx-6 px-6 pb-6 pt-4 mt-8 bg-warm-white/95 backdrop-blur-sm border-t border-charcoal-sea/8 md:static md:mx-0 md:px-0 md:pb-0 md:border-0 md:bg-transparent md:backdrop-blur-none">
      <div className="flex gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex-1 min-h-[52px] border border-charcoal-sea/20 text-charcoal-sea/70 font-semibold rounded-full text-sm hover:border-charcoal-sea/40 hover:text-charcoal-sea transition-colors"
          >
            ← Back
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled || submitting}
          className="flex-[2] min-h-[52px] bg-tropic-coral text-white font-bold rounded-full text-sm hover:bg-sunrise transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Sending…" : nextLabel}
        </button>
      </div>
    </div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function SuccessScreen({ draft }: { draft: BookingDraft }) {
  const [entered, setEntered] = useState(false);
  const [checkDrawn, setCheckDrawn] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setEntered(true);
      setTimeout(() => setCheckDrawn(true), 200);
    });
  }, []);

  const waText = encodeURIComponent(
    `Hi, I just submitted a booking request for ${draft.item} on ${draft.date}.`
  );

  return (
    <div
      style={{
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 400ms ${ease}, transform 400ms ${ease}`,
      }}
      className="text-center py-8"
    >
      {/* Animated checkmark */}
      <div className="w-20 h-20 rounded-full bg-shallow-water/10 border-2 border-shallow-water flex items-center justify-center mx-auto mb-6">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path
            d="M10 20l8 8 14-14"
            stroke="#2A9D8F"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="36"
            strokeDashoffset={checkDrawn ? 0 : 36}
            style={{ transition: `stroke-dashoffset 500ms ${ease}` }}
          />
        </svg>
      </div>

      <h2 className="text-charcoal-sea font-display text-2xl font-bold mb-2">
        Booking request sent!
      </h2>
      <p className="text-charcoal-sea/60 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
        We&apos;ll WhatsApp you within 24 hours to confirm your booking. Keep an
        eye on {draft.phone}.
      </p>

      {/* Summary */}
      <div className="bg-white border border-charcoal-sea/8 rounded-2xl p-5 text-left mb-6 max-w-sm mx-auto">
        <p className="text-xs text-charcoal-sea/40 uppercase tracking-widest mb-3">
          Booking summary
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-charcoal-sea/55">What</span>
            <span className="font-semibold text-charcoal-sea text-right max-w-[60%]">
              {draft.item}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-charcoal-sea/55">Date</span>
            <span className="font-semibold text-charcoal-sea">{draft.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-charcoal-sea/55">People</span>
            <span className="font-semibold text-charcoal-sea">{draft.people}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-charcoal-sea/55">Name</span>
            <span className="font-semibold text-charcoal-sea">{draft.name}</span>
          </div>
        </div>
      </div>

      <a
        href={`https://wa.me/94743945010?text=${waText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity mb-4"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Chat with us on WhatsApp
      </a>

      <div>
        <Link
          href="/"
          className="text-sm text-charcoal-sea/50 hover:text-charcoal-sea transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}

// ─── Animated Step Panel ──────────────────────────────────────────────────────

function StepPanel({
  children,
  dir,
}: {
  children: React.ReactNode;
  dir: "forward" | "backward";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const startX = dir === "forward" ? 40 : -40;
    el.style.opacity = "0";
    el.style.transform = `translateX(${startX}px)`;
    el.style.transition = "none";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = `opacity 280ms ${ease}, transform 280ms ${ease}`;
        el.style.opacity = "1";
        el.style.transform = "translateX(0)";
      });
    });
  }, [dir]);

  return (
    <div ref={ref}>
      {children}
    </div>
  );
}

// ─── Main Wizard ──────────────────────────────────────────────────────────────

interface BookingWizardProps {
  initialType?: string;
  initialItem?: string;
}

export default function BookingWizard({
  initialType,
  initialItem,
}: BookingWizardProps) {
  const validType = (["course", "activity", "dive-site"] as const).includes(
    initialType as BookingType
  )
    ? (initialType as BookingType)
    : "course";

  const [draft, dispatch] = useReducer(reducer, {
    bookingType: validType,
    item: initialItem ?? "",
    name: "",
    email: "",
    phone: "",
    nationality: "",
    date: "",
    people: "1",
    certificationLevel: "none",
    notes: "",
  });

  const [step, setStep] = useState(1);
  const [dir, setDir] = useState<"forward" | "backward">("forward");
  const [errors, setErrors] = useState<Partial<Record<keyof BookingDraft, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const topRef = useRef<HTMLDivElement>(null);

  const [courseOptions, setCourseOptions] = useState<string[]>([]);
  const [activityOptions, setActivityOptions] = useState<string[]>([]);
  const [diveSiteOptions, setDiveSiteOptions] = useState<string[]>([]);
  const [optionsLoading, setOptionsLoading] = useState(true);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";
    Promise.all([
      fetch(`${base}/courses`).then((r) => r.json()),
      fetch(`${base}/activities`).then((r) => r.json()),
      fetch(`${base}/dive-sites`).then((r) => r.json()),
    ])
      .then(([c, a, d]) => {
        setCourseOptions((c.data ?? []).map((x: { name: string }) => x.name));
        setActivityOptions((a.data ?? []).map((x: { name: string }) => x.name));
        setDiveSiteOptions((d.data ?? []).map((x: { name: string }) => x.name));
      })
      .finally(() => setOptionsLoading(false));
  }, []);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  function set(field: keyof BookingDraft, value: string) {
    dispatch({ type: "SET_FIELD", field, value });
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function goTo(n: number) {
    setDir(n > step ? "forward" : "backward");
    setStep(n);
  }

  // Step 1 → 2
  function step1Next() {
    const errs: typeof errors = {};
    if (!draft.item) errs.item = "Please select what you want to book.";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    goTo(2);
  }

  // Step 2 → 3
  function step2Next() {
    const errs: typeof errors = {};
    if (!draft.name.trim()) errs.name = "Full name is required.";
    if (!draft.email.trim() || !isValidEmail(draft.email)) errs.email = "A valid email is required.";
    if (!draft.phone) errs.phone = "Phone / WhatsApp number is required.";
    if (!draft.date) errs.date = "Please choose a preferred date.";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    goTo(3);
  }

  // Step 3 → submit
  async function submit() {
    setStatus("submitting");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: draft.name,
          email: draft.email,
          phone: draft.phone,
          nationality: draft.nationality,
          date: draft.date,
          people: draft.people,
          bookingFor: draft.bookingType === "course" ? "course" : "activity",
          item: draft.item,
          certificationLevel: draft.certificationLevel,
          notes: draft.notes,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="max-w-lg mx-auto px-6 py-12">
        <SuccessScreen draft={draft} />
      </div>
    );
  }

  const tabs: { value: BookingType; label: string }[] = [
    { value: "course", label: "Course" },
    { value: "activity", label: "Activity" },
    { value: "dive-site", label: "Dive Site" },
  ];

  return (
    <div ref={topRef} className="max-w-lg mx-auto px-6 py-10 pb-4 scroll-mt-20">
      <StepIndicator step={step} />

      {step === 1 && (
        <StepPanel dir={dir}>
          <h2 className="text-charcoal-sea text-xl font-bold mb-1">What would you like to book?</h2>
          <p className="text-charcoal-sea/55 text-sm mb-6 leading-relaxed">
            Pick a type and then choose the specific course, activity, or dive site.
          </p>

          {/* Type tabs */}
          <div className="mb-5">
            <p className={labelClass}>I want to book a</p>
            <div className="flex gap-2">
              {tabs.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    set("bookingType", value);
                    set("item", "");
                  }}
                  className={`flex-1 min-h-[48px] rounded-xl text-sm font-semibold border transition-all duration-200 ${
                    draft.bookingType === value
                      ? "bg-charcoal-sea text-warm-white border-charcoal-sea"
                      : "bg-white text-charcoal-sea/55 border-charcoal-sea/20 hover:border-charcoal-sea/40"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Item select */}
          <div className="mb-2">
            <label htmlFor="item" className={labelClass}>
              Which {typeLabel(draft.bookingType).toLowerCase()}?{" "}
              <span className="text-tropic-coral">*</span>
            </label>
            <select
              id="item"
              value={draft.item}
              onChange={(e) => set("item", e.target.value)}
              disabled={optionsLoading}
              className={`${inputClass} ${errors.item ? "border-tropic-coral ring-1 ring-tropic-coral" : ""} disabled:opacity-60`}
            >
              <option value="">
                {optionsLoading ? "Loading…" : `Select a ${typeLabel(draft.bookingType).toLowerCase()}…`}
              </option>
              {optionsLoading && draft.item && (
                <option value={draft.item}>{draft.item}</option>
              )}
              {optionsForType(draft.bookingType, courseOptions, activityOptions, diveSiteOptions).map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.item && (
              <p className="text-tropic-coral text-xs mt-1.5">{errors.item}</p>
            )}
          </div>

          <StickyNav
            nextLabel="Next — Your details →"
            onNext={step1Next}
            nextDisabled={!draft.item}
          />
        </StepPanel>
      )}

      {step === 2 && (
        <StepPanel dir={dir}>
          <h2 className="text-charcoal-sea text-xl font-bold mb-1">Your details</h2>
          <p className="text-charcoal-sea/55 text-sm mb-6 leading-relaxed">
            We&apos;ll use these to confirm your booking and get in touch.
          </p>

          <div className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className={labelClass}>
                Full Name <span className="text-tropic-coral">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={draft.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Your full name"
                className={`${inputClass} ${errors.name ? "border-tropic-coral ring-1 ring-tropic-coral" : ""}`}
              />
              {errors.name && <p className="text-tropic-coral text-xs mt-1.5">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className={labelClass}>
                Email <span className="text-tropic-coral">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={draft.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="you@email.com"
                className={`${inputClass} ${errors.email ? "border-tropic-coral ring-1 ring-tropic-coral" : ""}`}
              />
              {errors.email && <p className="text-tropic-coral text-xs mt-1.5">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className={labelClass}>
                Phone / WhatsApp <span className="text-tropic-coral">*</span>
              </label>
              <div className={errors.phone ? "ring-1 ring-tropic-coral rounded-xl" : ""}>
                <PhoneInput
                  value={draft.phone}
                  onChange={(v) => set("phone", v)}
                  required
                />
              </div>
              {errors.phone
                ? <p className="text-tropic-coral text-xs mt-1.5">{errors.phone}</p>
                : <p className="text-xs text-charcoal-sea/40 mt-1.5">Include country code — we reply on WhatsApp too</p>
              }
            </div>

            {/* Nationality */}
            <div>
              <label htmlFor="nationality" className={labelClass}>
                Nationality / Country
              </label>
              <input
                id="nationality"
                type="text"
                value={draft.nationality}
                onChange={(e) => set("nationality", e.target.value)}
                placeholder="e.g. British, German, Australian…"
                className={inputClass}
              />
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className={labelClass}>
                Preferred Date <span className="text-tropic-coral">*</span>
              </label>
              <input
                id="date"
                type="date"
                value={draft.date}
                onChange={(e) => set("date", e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className={`${inputClass} ${errors.date ? "border-tropic-coral ring-1 ring-tropic-coral" : ""}`}
              />
              {errors.date && <p className="text-tropic-coral text-xs mt-1.5">{errors.date}</p>}
            </div>

            {/* People */}
            <div>
              <label htmlFor="people" className={labelClass}>
                Number of People
              </label>
              <select
                id="people"
                value={draft.people}
                onChange={(e) => set("people", e.target.value)}
                className={inputClass}
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "person" : "people"}
                  </option>
                ))}
                <option value="7+">7+ — contact us first</option>
              </select>
            </div>

            {/* Certification */}
            <div>
              <label htmlFor="cert" className={labelClass}>
                Current Diving Certification
              </label>
              <select
                id="cert"
                value={draft.certificationLevel}
                onChange={(e) => set("certificationLevel", e.target.value)}
                className={inputClass}
              >
                {certOptions.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          <StickyNav
            onBack={() => goTo(1)}
            nextLabel="Next — Review →"
            onNext={step2Next}
          />
        </StepPanel>
      )}

      {step === 3 && (
        <StepPanel dir={dir}>
          <h2 className="text-charcoal-sea text-xl font-bold mb-1">Review & send</h2>
          <p className="text-charcoal-sea/55 text-sm mb-6 leading-relaxed">
            Check everything looks right, add any notes, then hit send.
          </p>

          {/* Summary card */}
          <div className="bg-charcoal-sea rounded-2xl p-6 mb-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block bg-tropic-coral text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {typeLabel(draft.bookingType)}
              </span>
            </div>
            <p className="text-warm-white font-bold text-lg leading-snug mb-5">{draft.item}</p>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-t border-white/10 pt-3">
                <span className="text-warm-white/50">Date</span>
                <span className="text-warm-white font-semibold">{draft.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warm-white/50">People</span>
                <span className="text-warm-white font-semibold">{draft.people} {draft.people === "1" ? "person" : "people"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warm-white/50">Level</span>
                <span className="text-warm-white font-semibold text-right max-w-[60%]">{certLabel(draft.certificationLevel)}</span>
              </div>
              <div className="border-t border-white/10 pt-3">
                <p className="text-warm-white/50 mb-1">Contact</p>
                <p className="text-warm-white font-semibold">{draft.name}</p>
                <p className="text-warm-white/70 text-xs">{draft.email}</p>
                <p className="text-warm-white/70 text-xs">{draft.phone}</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-2">
            <label htmlFor="notes" className={labelClass}>
              Questions or Special Requests
            </label>
            <textarea
              id="notes"
              value={draft.notes}
              onChange={(e) => set("notes", e.target.value)}
              rows={4}
              placeholder="Medical conditions, allergies, specific questions, dates to avoid…"
              className={`${inputClass} resize-none`}
            />
          </div>

          {status === "error" && (
            <p className="text-tropic-coral text-sm bg-tropic-coral/10 border border-tropic-coral/20 rounded-xl px-4 py-3 mb-4">
              Something went wrong. Please try again or WhatsApp us on{" "}
              <a href="https://wa.me/94743945010" target="_blank" rel="noopener noreferrer" className="font-semibold underline">0743 945 010</a>.
            </p>
          )}

          <p className="text-xs text-charcoal-sea/40 text-center mb-2">
            No payment required now — we&apos;ll confirm by phone or email within 24 hours.
          </p>

          <StickyNav
            onBack={() => goTo(2)}
            nextLabel="Send Booking Request →"
            onNext={submit}
            submitting={status === "submitting"}
          />
        </StepPanel>
      )}
    </div>
  );
}
