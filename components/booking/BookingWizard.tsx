"use client";

import { useReducer, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from "@/components/ui/PhoneInput";
import { isValidPhoneNumber } from "react-phone-number-input";
import { splitPhone } from "@/lib/phone";
import { getAttribution } from "@/lib/attribution";
import Link from "next/link";
import type { Deposit, PaymentOptions } from "@/lib/types";
import type { DiscountLink } from "@/lib/api/discount-links";
import { discountReasonMessage } from "@/lib/api/discount-links";
import { depositRuleLabel, previewDiscount, subtotal } from "@/lib/discount";
import PaymentStep from "@/components/booking/PaymentStep";

// ─── Data ────────────────────────────────────────────────────────────────────

const certOptions = [
  { value: "none", label: "No certification (complete beginner)" },
  { value: "scuba-diver", label: "PADI Scuba Diver" },
  { value: "open-water", label: "PADI Open Water Diver" },
  { value: "advanced", label: "PADI Advanced Open Water" },
  { value: "rescue", label: "PADI Rescue Diver" },
  { value: "divemaster", label: "Divemaster or above" },
  { value: "other", label: "Other certification (mention in notes)" },
];

// ─── State ───────────────────────────────────────────────────────────────────

type BookingType = "course" | "activity" | "dive-site";

export interface BookingDraft {
  bookingType: BookingType;
  item: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  date: string;
  people: string;
  /** Dives per person. Only ever sent for items with a maxQuantity. */
  quantity: string;
  certificationLevel: string;
  notes: string;
}

type Action = { type: "SET_FIELD"; field: keyof BookingDraft; value: string };

function reducer(state: BookingDraft, action: Action): BookingDraft {
  // The cap belongs to the item, so a 5 chosen for one item must not survive a switch to
  // another that allows 2 — or to a course, which allows none.
  const reset = action.field === "item" || action.field === "bookingType" ? { quantity: "1" } : null;
  return { ...state, ...reset, [action.field]: action.value };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const ease = "cubic-bezier(0.16, 1, 0.3, 1)";

const inputClass =
  "w-full min-h-[52px] border border-charcoal-sea/20 rounded-xl px-4 py-3 text-charcoal-sea placeholder:text-charcoal-sea/40 focus:outline-none focus:ring-2 focus:ring-shallow-water text-sm bg-white";

const labelClass = "block text-sm font-semibold text-charcoal-sea mb-1.5";

/** What the option lists carry now — the price and deposit were previously discarded. */
interface ItemOption {
  name: string;
  slug: string;
  price?: number;
  currency?: string;
  /** Activities only. Non-null turns on the "How many dives?" input, capped at this. */
  maxQuantity?: number | null;
  deposit?: Deposit;
}

function optionsForType(
  type: BookingType,
  courseOptions: ItemOption[],
  activityOptions: ItemOption[],
  diveSiteOptions: ItemOption[]
) {
  if (type === "course") return courseOptions;
  if (type === "activity") return activityOptions;
  return diveSiteOptions;
}

function money(amount: number, currency: string) {
  return `${currency} ${amount.toFixed(2)}`;
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

function getTomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StepIndicator({ step, hasPayment }: { step: number; hasPayment: boolean }) {
  const labels = hasPayment ? ["What", "Details", "Review", "Pay"] : ["What", "Details", "Review"];

  return (
    <div className="mb-8">
      {/* Progress bar */}
      <div className="relative h-1 bg-charcoal-sea/10 rounded-full mb-4 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-tropic-coral rounded-full"
          style={{
            width: `${((step - 1) / (labels.length - 1)) * 100}%`,
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

// ─── Discount banner ──────────────────────────────────────────────────────────

/**
 * An unusable link is NOT an error state — the customer did nothing wrong and can still
 * book at the normal price. It gets a neutral note, not red.
 */
function DiscountBanner({
  link,
  rejected,
  onDrop,
}: {
  link: DiscountLink;
  /** Backend rejection at submit time, e.g. the link was redeemed a moment ago. */
  rejected: string | null;
  onDrop: () => void;
}) {
  if (rejected) {
    return (
      <div className="mb-5 rounded-xl border border-tropic-coral/30 bg-tropic-coral/[0.06] px-4 py-3">
        <p className="text-sm text-charcoal-sea leading-relaxed">{rejected}</p>
        <button
          type="button"
          onClick={onDrop}
          className="mt-2 text-sm font-bold text-tropic-coral underline underline-offset-2"
        >
          Continue without the discount
        </button>
      </div>
    );
  }

  if (!link.valid) {
    return (
      <div className="mb-5 rounded-xl border border-charcoal-sea/15 bg-charcoal-sea/[0.04] px-4 py-3">
        <p className="text-sm text-charcoal-sea/70 leading-relaxed">
          {discountReasonMessage(link.reason)}
        </p>
      </div>
    );
  }

  const off =
    link.discount_type === "percentage"
      ? `${link.discount_value}% off`
      : `$${link.discount_value} off`;

  return (
    <div className="mb-5 rounded-xl border border-shallow-water/30 bg-shallow-water/[0.08] px-4 py-3">
      <p className="text-sm font-bold text-charcoal-sea">
        {off} — {link.label}
      </p>
      {link.item && (
        <p className="text-xs text-charcoal-sea/55 mt-1">
          Applies to {link.item.name}, already selected below.
        </p>
      )}
      {link.expires_at && (
        <p className="text-xs text-charcoal-sea/45 mt-1">
          Valid until {link.expires_at.split(" ")[0]}
        </p>
      )}
    </div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function SuccessScreen({ draft }: { draft: BookingDraft }) {
  const [entered, setEntered] = useState(false);
  const [checkDrawn, setCheckDrawn] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Success is an early return, so the step-change scroll never fires for it.
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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
      ref={topRef}
      style={{
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 400ms ${ease}, transform 400ms ${ease}`,
      }}
      className="text-center py-8 scroll-mt-24"
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
        Request received — you&apos;re not booked yet
      </h2>
      <p className="text-charcoal-sea/60 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
        Our team will WhatsApp you on {draft.phone} within 24 hours to confirm your
        dates and send the advance payment details. Nothing is charged until then.
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
  /** Raw token from ?discount=. Sent back on submit; the backend re-validates. */
  discountCode?: string;
  /** Resolved server-side. null = no token, or we couldn't reach the API to check. */
  discountLink?: DiscountLink | null;
}

export default function BookingWizard({
  initialType,
  initialItem,
  discountCode,
  discountLink = null,
}: BookingWizardProps) {
  // A link scoped to one item wins over ?type=&item= — the backend rejects anything else.
  const lockedItem = discountLink?.valid ? discountLink.item : null;

  const validType = (["course", "activity", "dive-site"] as const).includes(
    initialType as BookingType
  )
    ? (initialType as BookingType)
    : "course";

  const [draft, dispatch] = useReducer(reducer, {
    bookingType: lockedItem ? lockedItem.type : validType,
    item: lockedItem ? lockedItem.name : initialItem ?? "",
    name: "",
    email: "",
    phone: "",
    nationality: "",
    date: "",
    people: "1",
    quantity: "1",
    certificationLevel: "none",
    notes: "",
  });

  const hasPreselection = Boolean((initialType && initialItem) || lockedItem);
  const [step, setStep] = useState(hasPreselection ? 2 : 1);
  const [dir, setDir] = useState<"forward" | "backward">("forward");
  const [errors, setErrors] = useState<Partial<Record<keyof BookingDraft, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const topRef = useRef<HTMLDivElement>(null);

  const [courseOptions, setCourseOptions] = useState<ItemOption[]>([]);
  const [activityOptions, setActivityOptions] = useState<ItemOption[]>([]);
  const [diveSiteOptions, setDiveSiteOptions] = useState<ItemOption[]>([]);
  const [optionsLoading, setOptionsLoading] = useState(true);

  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [currency, setCurrency] = useState<string>("USD");
  /** Set when the backend refuses the code at submit — e.g. redeemed since page load. */
  const [discountRejected, setDiscountRejected] = useState<string | null>(null);
  const [useDiscount, setUseDiscount] = useState(true);
  const [paymentOptions, setPaymentOptions] = useState<PaymentOptions | null>(null);
  const [paymentOptionsError, setPaymentOptionsError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";
    Promise.all([
      fetch(`${base}/courses`).then((r) => r.json()),
      fetch(`${base}/activities`).then((r) => r.json()),
      fetch(`${base}/dive-sites`).then((r) => r.json()),
    ])
      .then(([c, a, d]) => {
        // Keep the whole object. Price, currency and the per-item deposit all ride along
        // in this same payload — throwing them away used to mean the wizard couldn't show
        // a price without a second round trip.
        const toOptions = (rows: ItemOption[]): ItemOption[] =>
          (rows ?? []).map(({ name, slug, price, currency, maxQuantity, deposit }) => ({
            name,
            slug,
            price,
            currency,
            maxQuantity,
            deposit,
          }));
        setCourseOptions(toOptions(c.data));
        setActivityOptions(toOptions(a.data));
        setDiveSiteOptions(toOptions(d.data));
      })
      .finally(() => setOptionsLoading(false));

    fetch(`${base}/payment-options`)
      .then((r) => {
        if (!r.ok) throw new Error("payment-options failed");
        return r.json();
      })
      .then((opts) => setPaymentOptions(opts as PaymentOptions))
      .catch(() => setPaymentOptionsError(true));
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
    if (!draft.phone || !isValidPhoneNumber(draft.phone)) errs.phone = "Enter a valid international phone number.";
    if (!draft.date) errs.date = "Please choose a preferred date.";
    // Native min/max don't block a typed-in value outside the range — this form never
    // submits the browser way, so it's checked here.
    if (maxQuantity) {
      const q = Number(draft.quantity);
      if (!Number.isInteger(q) || q < 1 || q > maxQuantity)
        errs.quantity = `Choose between 1 and ${maxQuantity} dives.`;
    }
    if (Object.keys(errs).length) { setErrors(errs); return; }
    goTo(3);
  }

  const hasAnyGateway = Boolean(
    paymentOptions?.gateways?.paypal?.enabled ||
    paymentOptions?.gateways?.bank_transfer?.enabled
  );

  // ── Price preview ──────────────────────────────────────────────────────────
  // Preview only. Once the booking exists, the server's total_price and discount_amount
  // are the truth — this just stops the customer committing to an unknown number.
  const selectedItem = optionsForType(
    draft.bookingType,
    courseOptions,
    activityOptions,
    diveSiteOptions
  ).find((o) => o.name === draft.item);

  const itemCurrency = selectedItem?.currency ?? "USD";
  /** Non-null only on activities the admin has opened up to multiple dives. */
  const maxQuantity = selectedItem?.maxQuantity ?? null;
  const sub = selectedItem?.price
    ? subtotal(selectedItem.price, draft.people, maxQuantity ? draft.quantity : 1)
    : 0;
  const activeDiscount = useDiscount && !discountRejected && discountLink?.valid ? discountLink : null;
  const discountOff = activeDiscount
    ? previewDiscount(sub, activeDiscount.discount_type, activeDiscount.discount_value)
    : 0;
  const previewTotal = Math.max(sub - discountOff, 0);
  const depositLabel = depositRuleLabel(selectedItem?.deposit, itemCurrency);

  // Step 3 → POST booking → advance to step 4 (payment) or show success
  async function step3Submit() {
    setStatus("submitting");
    setDiscountRejected(null);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: draft.name,
          email: draft.email,
          ...splitPhone(draft.phone),
          nationality: draft.nationality,
          date: draft.date,
          people: draft.people,
          // Only items with a cap take a quantity — everything else has no key at all.
          ...(maxQuantity ? { quantity: Number(draft.quantity) } : {}),
          bookingFor: draft.bookingType === "course" ? "course" : "activity",
          item: draft.item,
          certificationLevel: draft.certificationLevel,
          notes: draft.notes,
          // Which ad brought them here. Undefined on organic traffic, so the key drops out.
          attribution: getAttribution(),
          ...(activeDiscount && discountCode ? { discount_code: discountCode } : {}),
        }),
      });
      const data = await res.json().catch(() => null);

      // A bad code is a hard error by design — the backend won't quietly charge full
      // price. Say so and let them choose to drop it rather than deciding for them.
      if (!res.ok) {
        const codeError = data?.fields?.discount_code;
        if (codeError) {
          setDiscountRejected(codeError);
          setStatus("idle");
          topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        throw new Error();
      }

      if (data.reference) {
        setBookingRef(data.reference);
        if (data.total_price != null) setTotalPrice(data.total_price);
        if (data.currency) setCurrency(data.currency);
      }
      setStatus("idle");
      if (hasAnyGateway && data.reference) {
        goTo(4);
      } else {
        setStatus("success");
      }
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
      {discountLink && (
        <DiscountBanner
          link={discountLink}
          rejected={discountRejected}
          onDrop={() => {
            setUseDiscount(false);
            setDiscountRejected(null);
          }}
        />
      )}

      <StepIndicator step={step} hasPayment={hasAnyGateway} />

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
                  // The link is tied to one item; submitting anything else gets rejected,
                  // so disable rather than let them pick a dead end.
                  disabled={Boolean(lockedItem)}
                  onClick={() => {
                    set("bookingType", value);
                    set("item", "");
                  }}
                  className={`flex-1 min-h-[48px] rounded-xl text-sm font-semibold border transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
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
              disabled={optionsLoading || Boolean(lockedItem)}
              className={`${inputClass} ${errors.item ? "border-tropic-coral ring-1 ring-tropic-coral" : ""} disabled:opacity-60`}
            >
              <option value="">
                {optionsLoading ? "Loading…" : `Select a ${typeLabel(draft.bookingType).toLowerCase()}…`}
              </option>
              {/* The locked/preselected name may not be in the list yet while it loads. */}
              {draft.item &&
                !optionsForType(draft.bookingType, courseOptions, activityOptions, diveSiteOptions)
                  .some((o) => o.name === draft.item) && (
                  <option value={draft.item}>{draft.item}</option>
                )}
              {optionsForType(draft.bookingType, courseOptions, activityOptions, diveSiteOptions).map((opt) => (
                <option key={opt.slug || opt.name} value={opt.name}>{opt.name}</option>
              ))}
            </select>
            {lockedItem && (
              <p className="text-xs text-charcoal-sea/45 mt-1.5">
                Your discount link only applies to this one, so it&apos;s fixed.
              </p>
            )}
            {errors.item && (
              <p className="text-tropic-coral text-xs mt-1.5">{errors.item}</p>
            )}
            {!lockedItem && sub > 0 && (
              <p className="text-xs text-charcoal-sea/55 mt-2">
                {money(selectedItem?.price ?? 0, itemCurrency)} per person
                {depositLabel ? ` · ${depositLabel}` : ""}
              </p>
            )}
          </div>

          <StickyNav
            nextLabel="Next: Your details →"
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
                : <p className="text-xs text-charcoal-sea/40 mt-1.5">Include country code. We reply on WhatsApp too.</p>
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
                min={getTomorrow()}
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
                <option value="7+">7+ (contact us first)</option>
              </select>
            </div>

            {/* Dives per person — activities with a maxQuantity only. Lives on this step,
                not step 1: a link like /book?type=activity&item=Fun%20Dive opens straight
                on step 2, so anything on step 1 would never be seen. */}
            {maxQuantity && (
              <div>
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
                  value={draft.quantity}
                  onChange={(e) => set("quantity", e.target.value)}
                  className={`${inputClass} ${errors.quantity ? "border-tropic-coral ring-1 ring-tropic-coral" : ""}`}
                />
                {errors.quantity
                  ? <p className="text-tropic-coral text-xs mt-1.5">{errors.quantity}</p>
                  : <p className="text-xs text-charcoal-sea/40 mt-1.5">Each person, up to {maxQuantity}. Every dive goes to a different site.</p>
                }
              </div>
            )}

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
            nextLabel="Next: Review →"
            onNext={step2Next}
          />
        </StepPanel>
      )}

      {step === 3 && (
        <StepPanel dir={dir}>
          <h2 className="text-charcoal-sea text-xl font-bold mb-1">Review your booking</h2>
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
              {maxQuantity && (
                <div className="flex justify-between">
                  <span className="text-warm-white/50">Dives each</span>
                  <span className="text-warm-white font-semibold">{draft.quantity}</span>
                </div>
              )}
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

              {/* Estimate. The server recalculates on submit and its number wins — which
                  is why this says "estimate" rather than quoting a total as final. */}
              {sub > 0 && (
                <div className="border-t border-white/10 pt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-warm-white/50">
                      {money(selectedItem?.price ?? 0, itemCurrency)} × {draft.people}
                      {maxQuantity ? ` × ${draft.quantity} dives` : ""}
                    </span>
                    <span className="text-warm-white font-semibold">
                      {money(sub, itemCurrency)}
                    </span>
                  </div>
                  {discountOff > 0 && (
                    <div className="flex justify-between">
                      <span className="text-shallow-water">Discount</span>
                      <span className="text-shallow-water font-semibold">
                        −{money(discountOff, itemCurrency)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-white/10 pt-2">
                    <span className="text-warm-white/50">Estimated total</span>
                    <span className="text-warm-white font-bold text-base">
                      {money(previewTotal, itemCurrency)}
                    </span>
                  </div>
                  {depositLabel && (
                    <p className="text-warm-white/40 text-xs pt-1">
                      You can pay {depositLabel} now and the rest on arrival.
                    </p>
                  )}
                </div>
              )}
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

          <StickyNav
            onBack={() => goTo(2)}
            nextLabel={hasAnyGateway ? "Continue to Payment →" : "Send Booking Request →"}
            onNext={step3Submit}
            submitting={status === "submitting"}
          />
        </StepPanel>
      )}

      {step === 4 && bookingRef && paymentOptions && (
        <StepPanel dir={dir}>
          <PaymentStep
            bookingRef={bookingRef}
            totalPrice={totalPrice}
            currency={currency}
            paymentOptions={paymentOptions}
            onBack={() => goTo(3)}
            onSuccess={(ref) => router.push(`/booking/confirmation?ref=${ref}`)}
          />
        </StepPanel>
      )}

      {step === 4 && (!bookingRef || !paymentOptions) && (
        <StepPanel dir={dir}>
          <div className="py-12 text-center">
            {paymentOptionsError ? (
              <p className="text-tropic-coral text-sm">
                Could not load payment options. Please{" "}
                <a href="https://wa.me/94743945010" className="font-semibold underline">
                  WhatsApp us
                </a>{" "}
                to complete your booking.
              </p>
            ) : (
              <p className="text-charcoal-sea/50 text-sm">Loading payment options…</p>
            )}
          </div>
        </StepPanel>
      )}
    </div>
  );
}
