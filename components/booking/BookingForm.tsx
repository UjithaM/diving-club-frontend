"use client";

import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { splitPhone } from "@/lib/phone";
import { getAttribution } from "@/lib/attribution";
import { trackBookingBlocked } from "@/lib/ads";
import { useFormAbandon } from "@/lib/hooks/useFormAbandon";
import { revealField } from "@/lib/revealField";
import { fieldErrorsFromApi, itemError, type BookingField } from "@/lib/booking-schema";
import { bookingFormDefaults, type BookingFormValues } from "@/lib/booking-form";
import {
  errorId,
  errorInputClass,
  hintClass,
  inputClass,
  labelClass,
} from "@/components/ui/fieldStyles";
import BookingFields, { FieldError, Req } from "@/components/booking/BookingFields";
import SlotPicker from "@/components/booking/SlotPicker";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { Bubbles, Diver, Fins, Mask, Turtle } from "@/components/illustrations/Sea";
import dynamic from "next/dynamic";
import type { Deposit, PaymentOptions, SlotChoice } from "@/lib/types";
import type { DiscountLink } from "@/lib/api/discount-links";
import { discountReasonMessage } from "@/lib/api/discount-links";
import { cartSubtotal, depositRuleLabel, headcount, previewDiscount } from "@/lib/discount";

/**
 * Loaded on demand: it pulls in PayPal's SDK wrapper, and nobody needs that until the booking
 * exists and the payment screen opens.
 */
const PaymentStep = dynamic(() => import("@/components/booking/PaymentStep"), {
  ssr: false,
  loading: () => (
    <p className="flex items-center justify-center gap-3 py-12 text-charcoal-sea/80 text-sm">
      <span className="h-5 w-5 rounded-full border-2 border-charcoal-sea/20 border-t-shallow-water motion-safe:animate-spin" aria-hidden="true" />
      Loading payment options…
    </p>
  ),
});

// ─── Types & helpers ─────────────────────────────────────────────────────────

type BookingType = "course" | "activity" | "package" | "dive-site";

/** What the backend calls each line. Dive sites are booked as activities — see below. */
function apiType(type: BookingType): "course" | "activity" | "package" {
  return type === "dive-site" ? "activity" : type;
}

/**
 * The activity a dive site is booked as. Dive sites are places, not products — they carry no
 * price and the backend has no item to match them against, so picking one books a fun dive
 * and records which site they asked for.
 *
 * ponytail: matched by name. If admin renames the activity the booking is rejected with the
 * backend's own message rather than failing quietly — swap to a slug if that gets annoying.
 */
const DIVE_SITE_ACTIVITY = "Fun Dive";

/** One thing being booked. The cap belongs to the item, so quantity lives on the line. */
export interface BookingLine {
  type: BookingType;
  item: string;
  /** Dives per person. Only ever sent for items with a maxQuantity. */
  quantity: string;
  /** Set only for dive sites: the place they asked for, passed along in the notes. */
  site?: string;
}

/** Turns whatever the picker holds into a line the backend can actually resolve. */
function toLine(type: BookingType, name: string, quantity = "1"): BookingLine {
  return type === "dive-site"
    ? { type: "activity", item: DIVE_SITE_ACTIVITY, quantity, site: name }
    : { type, item: name, quantity };
}

/** What the customer chose, not what gets posted — "Fun Dive at Swami Rock". */
function lineLabel(line: BookingLine) {
  return line.site ? `${line.item} at ${line.site}` : line.item;
}

/** Unique per line: two fun dives at different sites share an item name. */
function lineKey(line: BookingLine) {
  return `${line.item}|${line.site ?? ""}`;
}

/** Nothing picked yet. Shared so an unset line doesn't get a fresh object every render. */
const NO_SLOT: SlotChoice = { slotId: null, seats: [] };

/** What the option lists carry — price and deposit ride along in the same payload. */
interface ItemOption {
  name: string;
  slug: string;
  price?: number;
  currency?: string;
  /** Activities only. Non-null turns on the "How many dives?" input, capped at this. */
  maxQuantity?: number | null;
  deposit?: Deposit;
}

function money(amount: number, currency: string) {
  return `${currency} ${amount.toFixed(2)}`;
}

function typeLabel(type: BookingType) {
  if (type === "course") return "Course";
  if (type === "activity") return "Activity";
  if (type === "package") return "Package";
  return "Dive Site";
}

const ease = "cubic-bezier(0.16, 1, 0.3, 1)";

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
      <div className="rounded-[14px] border-2 border-tropic-coral/40 bg-tropic-coral/[0.06] px-4 py-3.5">
        <p className="text-sm text-charcoal-sea leading-relaxed">{rejected}</p>
        <button
          type="button"
          onClick={onDrop}
          className="mt-2 min-h-11 text-sm font-bold text-coral-deep underline underline-offset-2"
        >
          Continue without the discount
        </button>
      </div>
    );
  }

  if (!link.valid) {
    return (
      <div className="rounded-[14px] border-2 border-charcoal-sea/15 bg-white px-4 py-3.5">
        <p className="text-sm text-charcoal-sea/80 leading-relaxed">
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
    <div className="pop-in flex items-start gap-3 rounded-[14px] bg-sunrise px-4 py-3.5 text-surface-dark">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" /><circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" /></svg>
      <div>
      <p className="text-sm font-bold">
        {off} — {link.label}
      </p>
      {link.item && (
        <p className="text-xs mt-1">
          Applies to {link.item.name}, already selected below.
        </p>
      )}
      {link.expires_at && (
        <p className="text-xs mt-1 tabular">
          Valid until {link.expires_at.split(" ")[0]}
        </p>
      )}
      </div>
    </div>
  );
}

// ─── Success screen ───────────────────────────────────────────────────────────

interface SuccessSummary {
  items: string;
  date: string;
  people: string;
  name: string;
  phone: string;
}

function SuccessScreen({ summary }: { summary: SuccessSummary }) {
  const [entered, setEntered] = useState(false);
  const [checkDrawn, setCheckDrawn] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    requestAnimationFrame(() => {
      setEntered(true);
      setTimeout(() => setCheckDrawn(true), 200);
    });
  }, []);

  const waText = encodeURIComponent(
    `Hi, I just submitted a booking request for ${summary.items}${
      summary.date ? ` on ${summary.date}` : ""
    }.`
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
      <div className="relative w-20 h-20 rounded-full bg-shallow-water flex items-center justify-center mx-auto mb-6">
        <span className="absolute -inset-6 text-shallow-water/60" aria-hidden="true"><Bubbles count={6} /></span>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <path
            d="M10 20l8 8 14-14"
            stroke="var(--color-surface-dark)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="36"
            strokeDashoffset={checkDrawn ? 0 : 36}
            style={{ transition: `stroke-dashoffset 500ms ${ease}` }}
          />
        </svg>
      </div>

      <h2 className="text-charcoal-sea text-section font-extrabold mb-3">
        Booking received
      </h2>
      <p className="text-charcoal-sea/80 text-body mb-8 max-w-sm mx-auto">
        Our team will contact you shortly on {summary.phone} to confirm your booking and share
        the advance payment details. Nothing is charged until then.
      </p>

      <div className="zone-deep rounded-[18px] p-6 text-left mb-7 max-w-sm mx-auto">
        <p className="text-label uppercase font-semibold text-sunrise mb-4">
          Booking summary
        </p>
        <div className="space-y-3 text-sm [&_span:first-child]:text-muted [&_span:last-child]:text-warm-white">
          <div className="flex justify-between gap-3">
            <span>What</span>
            <span className="font-semibold text-right max-w-[60%]">
              {summary.items}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Date</span>
            <span className="font-semibold text-right">
              {summary.date || "We'll agree one on WhatsApp"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>People</span>
            <span className="font-semibold text-right">{summary.people}</span>
          </div>
          <div className="flex justify-between">
            <span>Name</span>
            <span className="font-semibold text-right">{summary.name}</span>
          </div>
        </div>
      </div>

      <a
        href={`https://wa.me/94743945010?text=${waText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="cta-pulse relative inline-flex items-center gap-2.5 min-h-13 bg-whatsapp text-surface-dark font-bold px-7 rounded-full hover:bg-whatsapp-hover transition-colors mb-5"
      >
        <WhatsAppIcon size={20} />
        Chat with us on WhatsApp
      </a>

      <div>
        <Link
          href="/"
          className="inline-flex items-center min-h-11 text-sm font-semibold text-charcoal-sea/80 hover:text-charcoal-sea transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}

/**
 * Plain section label. The numbered circles and their hint lines went when the form was
 * shortened — three stages on one screen don't need signposting, and each one cost a row.
 */
function SectionHeading({ title, step }: { title: string; step: number }) {
  return (
    <h2 className="flex items-center gap-3 text-charcoal-sea text-sub font-extrabold mb-5">
      {/* The number carries information: the order these get filled in. */}
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-dark font-display text-base text-warm-white tabular" aria-hidden="true">
        {step}
      </span>
      {title}
    </h2>
  );
}

/** One stage of the form, as a panel. */
const PANEL = "rounded-[18px] bg-white p-5 sm:p-7 ring-1 ring-charcoal-sea/10 shadow-[0_18px_40px_-30px_rgba(15,30,37,0.5)]";

const TAB_ART: Record<BookingType, React.ReactNode> = {
  course: <Mask className="w-9" />,
  activity: <Fins className="w-5" />,
  package: <Turtle className="w-10" />,
  "dive-site": <Diver className="w-12" />,
};

// ─── Main form ────────────────────────────────────────────────────────────────

interface BookingFormProps {
  initialType?: string;
  initialItem?: string;
  /** Raw token from ?discount=. Sent back on submit; the backend re-validates. */
  discountCode?: string;
  /** Resolved server-side. null = no token, or we couldn't reach the API to check. */
  discountLink?: DiscountLink | null;
}

/**
 * One page, not a four-step wizard.
 *
 * The wizard's step 1 hid a required "+ Add to booking" click behind a select: picking a
 * course left "Next" disabled with nothing on screen explaining why, and the message that
 * would have explained it was unreachable — the button couldn't be clicked in the only state
 * that triggered it. Choosing an item now books it outright, and every field lives on one
 * page where an error can't render off-screen behind a step transition.
 *
 * Payment stays a separate screen: it happens after the booking row exists, so it isn't a
 * form step and collapsing it in would mean charging before we have a reference.
 */
export default function BookingForm({
  initialType,
  initialItem,
  discountCode,
  discountLink = null,
}: BookingFormProps) {
  // A link scoped to one item locks the picker to it — swapping it away would silently throw
  // away the discount they followed a link for.
  const lockedItem = discountLink?.valid ? discountLink.item : null;

  const validType = (["course", "activity", "package", "dive-site"] as const).includes(
    initialType as BookingType
  )
    ? (initialType as BookingType)
    : "course";

  const [bookingType, setBookingType] = useState<BookingType>(
    lockedItem ? (lockedItem.type as BookingType) : validType
  );
  /** Items added beyond the one in the picker. Rare — most bookings are a single item. */
  const [extraLines, setExtraLines] = useState<BookingLine[]>([]);
  /**
   * The time (and seats) each line was booked into, keyed by lineKey.
   *
   * Kept out of the form values on purpose: react-hook-form holds one flat object, and a cart
   * can carry two items with two different departure times. The one `slot_id` form field is
   * only there to receive a backend rejection.
   */
  const [slotChoices, setSlotChoices] = useState<Record<string, SlotChoice>>({});

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [courseOptions, setCourseOptions] = useState<ItemOption[]>([]);
  const [activityOptions, setActivityOptions] = useState<ItemOption[]>([]);
  const [diveSiteOptions, setDiveSiteOptions] = useState<ItemOption[]>([]);
  const [packageOptions, setPackageOptions] = useState<ItemOption[]>([]);
  const [optionsLoading, setOptionsLoading] = useState(true);

  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [currency, setCurrency] = useState<string>("USD");
  /** Set when the backend refuses the code at submit — e.g. redeemed since page load. */
  const [discountRejected, setDiscountRejected] = useState<string | null>(null);
  /** Any other field rejection the backend named but we can't pin to an input. */
  const [apiError, setApiError] = useState<string | null>(null);
  const [useDiscount, setUseDiscount] = useState(true);
  const [paymentOptions, setPaymentOptions] = useState<PaymentOptions | null>(null);
  const [paymentOptionsError, setPaymentOptionsError] = useState(false);
  const [summary, setSummary] = useState<SuccessSummary | null>(null);
  const topRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const funnel = useFormAbandon("book");

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
    defaultValues: {
      ...bookingFormDefaults,
      item: lockedItem?.name ?? initialItem ?? "",
    },
  });
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors },
  } = form;

  // useWatch, not watch(): watch() can't be memoized, so it opts the component out of the
  // React Compiler entirely.
  const pickerItem = useWatch({ control, name: "item" });
  const people = useWatch({ control, name: "people" });
  const quantity = useWatch({ control, name: "quantity" });
  // The slot pickers refetch on this, so it has to be watched rather than read at submit.
  const bookingDate = useWatch({ control, name: "date" });

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";
    Promise.all([
      fetch(`${base}/courses`).then((r) => r.json()),
      fetch(`${base}/activities`).then((r) => r.json()),
      fetch(`${base}/dive-sites`).then((r) => r.json()),
      // Optional: a packages outage must not stop courses and activities from loading.
      fetch(`${base}/packages`).then((r) => r.json()).catch(() => ({ data: [] })),
    ])
      .then(([c, a, d, p]) => {
        // Keep the whole object. Price, currency and the per-item deposit all ride along
        // in this same payload — throwing them away used to mean a second round trip.
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
        setPackageOptions(toOptions(p.data));
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

  function optionsForType(type: BookingType) {
    if (type === "course") return courseOptions;
    if (type === "activity") return activityOptions;
    if (type === "package") return packageOptions;
    return diveSiteOptions;
  }

  /** The catalogue entry behind a line, once the options have loaded. */
  function optionFor(type: BookingType, name: string) {
    return optionsForType(type).find((o) => o.name === name);
  }

  function lineMaxQuantity(line: BookingLine) {
    // A dive-site line is booked as the fun-dive activity, so its cap comes from there.
    return (line.site ? optionFor("activity", line.item) : optionFor(line.type, line.item))
      ?.maxQuantity ?? null;
  }

  /** What actually gets billed for a line — and so how many seats a seated boat needs. */
  function lineQuantity(line: BookingLine) {
    const max = lineMaxQuantity(line);
    return headcount(people) * (max ? Math.min(headcount(line.quantity), max) : 1);
  }

  function choiceFor(line: BookingLine) {
    return slotChoices[lineKey(line)] ?? NO_SLOT;
  }

  /** setState-shaped, so SlotPicker can clear a selection that has since sold out. */
  function setChoiceFor(line: BookingLine): Dispatch<SetStateAction<SlotChoice>> {
    const key = lineKey(line);
    return (next) =>
      setSlotChoices((prev) => {
        const current = prev[key] ?? NO_SLOT;
        const value = typeof next === "function" ? next(current) : next;
        // Every refetch re-checks the selection; returning the same record when it hasn't
        // actually changed keeps that from re-rendering the whole form.
        return value === current ? prev : { ...prev, [key]: value };
      });
  }

  const pickerOption = pickerItem ? optionFor(bookingType, pickerItem) : undefined;
  const pickerLine = pickerItem ? toLine(bookingType, pickerItem, quantity ?? "1") : null;
  /** The booking. Extras were chosen first, so they lead. */
  const lines: BookingLine[] = [...extraLines, ...(pickerLine ? [pickerLine] : [])];

  const cart = lines.map((line) => {
    const option = line.site ? optionFor("activity", line.item) : optionFor(line.type, line.item);
    return {
      line,
      option,
      // Courses and one-off activities have no cap, so they never multiply.
      quantity: option?.maxQuantity ? line.quantity : "1",
    };
  });

  const hasAnyGateway = Boolean(
    paymentOptions?.gateways?.paypal?.enabled ||
    paymentOptions?.gateways?.bank_transfer?.enabled
  );

  // ── Price preview ──────────────────────────────────────────────────────────
  // Preview only. Once the booking exists, the server's total_price and discount_amount
  // are the truth — this just stops the customer committing to an unknown number.

  /** One booking, one currency — the backend enforces it, so the first line decides. */
  const cartCurrency = cart.find((c) => c.option?.currency)?.option?.currency;
  const itemCurrency = cartCurrency ?? pickerOption?.currency ?? "USD";
  const sub = cartSubtotal(
    cart.map((c) => ({ price: c.option?.price, quantity: c.quantity })),
    people
  );
  const activeDiscount =
    useDiscount && !discountRejected && discountLink?.valid ? discountLink : null;
  /**
   * A link scoped to one item only discounts that item's line; a generic link discounts the
   * whole cart. Mirrors Api/BookingController::store — if these two disagree, the preview
   * lies about the total.
   */
  const discountedLine = activeDiscount?.item
    ? cart.find((c) => c.line.item === activeDiscount.item?.name)
    : null;
  const discountBase = !activeDiscount
    ? 0
    : activeDiscount.item
    ? cartSubtotal(
        discountedLine ? [{ price: discountedLine.option?.price, quantity: discountedLine.quantity }] : [],
        people
      )
    : sub;
  const discountOff = activeDiscount
    ? previewDiscount(discountBase, activeDiscount.discount_type, activeDiscount.discount_value)
    : 0;
  const previewTotal = Math.max(sub - discountOff, 0);
  // The advance is per booking, so one label for the cart. The server computes the amount.
  const depositLabel = depositRuleLabel(
    cart.find((c) => c.option?.deposit?.enabled)?.option?.deposit,
    itemCurrency
  );

  /**
   * Choosing an item books it — there is no second "add" click. Picking something already in
   * the booking, or in a different currency, is refused here with a reason rather than three
   * fields later by the backend.
   */
  function onPick(value: string) {
    if (!value) {
      setValue("item", "", { shouldValidate: true });
      return;
    }
    const line = toLine(bookingType, value);
    /**
     * The select is uncontrolled, so a refused pick leaves the new label showing over the old
     * booking. Snap it back to what's actually booked, or the summary below disagrees with
     * the box above it.
     */
    const refuse = (message: string) => {
      setValue("item", pickerItem ?? "");
      setError("item", { message });
    };

    // Two fun dives at two different sites are a fair thing to want, so the site counts
    // towards identity here.
    if (extraLines.some((l) => l.item === line.item && l.site === line.site)) {
      refuse("That's already in your booking.");
      return;
    }
    // The backend refuses a booking that mixes currencies, so catch it here rather than let
    // them fill in the rest of the page and eat a rejection at the end.
    const picked = optionFor(bookingType, value)?.currency;
    const existing = extraLines.length
      ? cart.find((c) => extraLines.includes(c.line))?.option?.currency
      : undefined;
    if (picked && existing && picked !== existing) {
      refuse(
        `Everything in one booking has to be priced in ${existing}. Please book the ${picked} items separately.`
      );
      return;
    }
    setValue("item", value, { shouldValidate: true });
  }

  /** Moves the current pick aside so the select is free for the next one. */
  function addAnother() {
    if (!pickerLine) return;
    setExtraLines((prev) => [...prev, pickerLine]);
    setValue("item", "", { shouldValidate: false });
    setValue("quantity", "1");
  }

  async function onValid(values: BookingFormValues) {
    setStatus("submitting");
    setDiscountRejected(null);
    setApiError(null);
    funnel.noteSubmitted();

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
          items: lines.map((line) => {
            const max = lineMaxQuantity(line);
            const choice = choiceFor(line);
            return {
              bookingFor: apiType(line.type),
              item: line.item,
              // Only items with a cap take a quantity — everything else has no key at all.
              ...(max ? { quantity: Math.min(headcount(line.quantity), max) } : {}),
              // Absent for anything the shop hasn't set times for, which is what keeps those
              // items booking by date alone.
              ...(choice.slotId ? { slot_id: choice.slotId } : {}),
              ...(choice.seats.length ? { seats: choice.seats } : {}),
            };
          }),
          // The sites they picked have nowhere else to go — the backend books the fun dive,
          // the crew reads the sites here.
          notes: [
            values.notes,
            ...lines.filter((l) => l.site).map((l) => `Dive site requested: ${l.site}`),
          ]
            .filter(Boolean)
            .join("\n"),
          // Which ad brought them here. Undefined on organic traffic, so the key drops out.
          attribution: getAttribution(),
          ...(activeDiscount && discountCode ? { discount_code: discountCode } : {}),
        }),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        // A bad code is a hard error by design — the backend won't quietly charge full
        // price. Say so and let them choose to drop it rather than deciding for them.
        const codeError = data?.fields?.discount_code;
        if (codeError) {
          setDiscountRejected(codeError);
          setStatus("idle");
          topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        // Anything the backend pinned to a field goes back on that field, where the visitor
        // can act on it — and takes the focus with it.
        const fromApi = fieldErrorsFromApi(data?.fields ?? {});
        const named = Object.keys(fromApi) as BookingField[];
        if (named.length > 0) {
          named.forEach((field) => setError(field, { message: fromApi[field] }));
          // Not setError's shouldFocus: that is the same bare .focus() iOS ignores.
          revealField(topRef.current, named);
          trackBookingBlocked("book", named);
          setStatus("idle");
          return;
        }
        // Named a field we don't render — say what it was rather than "something went wrong".
        const fieldError = Object.values((data?.fields ?? {}) as Record<string, string>)[0];
        if (fieldError) {
          setApiError(fieldError);
          setStatus("idle");
          topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        throw new Error();
      }

      setSummary({
        items: lines.map(lineLabel).join(", "),
        date: values.date,
        people: values.people,
        name: values.name,
        phone: values.phone,
      });

      if (data.reference) {
        setBookingRef(data.reference);
        if (data.total_price != null) setTotalPrice(data.total_price);
        if (data.currency) setCurrency(data.currency);
      }
      setStatus("idle");
      // Payment needs a booking to pay for, so it only opens once we have the reference.
      if (!(hasAnyGateway && data.reference)) setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success" && summary) {
    return (
      <div className="max-w-xl mx-auto px-5 sm:px-6 py-12">
        <SuccessScreen summary={summary} />
      </div>
    );
  }

  // Payment is its own screen — the booking exists by now and has a reference to pay against.
  if (bookingRef && hasAnyGateway) {
    return (
      <div className="max-w-xl mx-auto px-5 sm:px-6 py-10">
        {paymentOptions ? (
          <PaymentStep
            bookingRef={bookingRef}
            totalPrice={totalPrice}
            currency={currency}
            paymentOptions={paymentOptions}
            onBack={() => setStatus("success")}
            onSuccess={(ref) => router.push(`/booking/confirmation?ref=${ref}`)}
          />
        ) : (
          <div className="py-12 text-center">
            {paymentOptionsError ? (
              <p className="text-coral-deep text-sm font-semibold">
                Could not load payment options. Please{" "}
                <a href="https://wa.me/94743945010" className="font-semibold underline">
                  WhatsApp us
                </a>{" "}
                to complete your booking.
              </p>
            ) : (
              <p className="flex items-center justify-center gap-3 text-charcoal-sea/80 text-sm">
                <span className="h-5 w-5 rounded-full border-2 border-charcoal-sea/20 border-t-shallow-water motion-safe:animate-spin" aria-hidden="true" />
                Loading payment options…
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  const tabs: { value: BookingType; label: string }[] = [
    { value: "course", label: "Course" },
    { value: "activity", label: "Activity" },
    ...(packageOptions.length ? [{ value: "package" as const, label: "Package" }] : []),
    { value: "dive-site", label: "Dive Site" },
  ];

  return (
    <form
      ref={topRef}
      // Built at submit time, not during render: onValid closes over topRef, and calling
      // handleSubmit inline would read that ref while rendering.
      onSubmit={(e) =>
        handleSubmit(onValid, (invalid) => {
          const named = Object.keys(invalid);
          // react-hook-form's own shouldFocusError runs after an await, and iOS drops
          // programmatic focus once the gesture stack has unwound — so it does nothing on a
          // phone. revealField scrolls instead, which carries no such restriction.
          revealField(topRef.current, named);
          trackBookingBlocked("book", named);
        })(e)
      }
      onFocusCapture={funnel.noteFocus}
      noValidate
      className="relative max-w-2xl mx-auto px-5 sm:px-6 py-10 scroll-mt-20 space-y-5"
    >
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

      {/* ── 1. What ── */}
      <section className={PANEL}>
        <SectionHeading step={1} title="What would you like to book?" />

        {!lockedItem && (
          <div className="mb-4">
            <p className={labelClass}>I want to book a</p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(5.5rem,1fr))] gap-2" role="group" aria-label="Booking type">
              {tabs.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setBookingType(value);
                    setValue("item", "");
                  }}
                  aria-pressed={bookingType === value}
                  className={`flex-1 flex flex-col items-center justify-center gap-1.5 min-h-[76px] rounded-[12px] text-sm font-bold border-2 transition-[background-color,border-color,scale] duration-200 active:scale-[0.97] cursor-pointer ${
                    bookingType === value
                      ? "bg-shallow-water text-surface-dark border-surface-dark"
                      : "bg-white text-charcoal-sea border-charcoal-sea/20 hover:border-shallow-water"
                  }`}
                >
                  <span className="flex h-7 items-center" aria-hidden="true">{TAB_ART[value]}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div data-field="item">
          {/* A locked item is shown, not offered in a disabled select: react-hook-form skips
              disabled fields when reading values back, and a greyed-out dropdown is a poor
              way to say "this one is fixed" anyway. The value lives in defaultValues. */}
          {lockedItem ? (
            <>
              <p className={labelClass}>You&apos;re booking</p>
              <div className="rounded-[12px] border-2 border-shallow-water bg-shallow-water/10 px-4 py-3">
                <p className="text-sub font-extrabold text-charcoal-sea">{lockedItem.name}</p>
                <p className={hintClass}>
                  Locked in by your discount link — book anything else separately.
                </p>
              </div>
            </>
          ) : (
            <>
              <label htmlFor="item" className={labelClass}>
                Which {typeLabel(bookingType).toLowerCase()}? <Req />
              </label>
              <select
                id="item"
                {...register("item", { validate: (v) => itemError(v) || true })}
                onChange={(e) => onPick(e.target.value)}
                disabled={optionsLoading}
                className={`${inputClass} ${errors.item ? errorInputClass : ""} disabled:opacity-60`}
                {...(errors.item
                  ? { "aria-invalid": true as const, "aria-describedby": errorId("item") }
                  : {})}
              >
                <option value="">
                  {optionsLoading
                    ? "Loading…"
                    : `Select a ${typeLabel(bookingType).toLowerCase()}…`}
                </option>
                {/* A preselected name may not be in the list yet while it loads. */}
                {pickerItem &&
                  !optionsForType(bookingType).some((o) => o.name === pickerItem) && (
                    <option value={pickerItem}>{pickerItem}</option>
                  )}
                {optionsForType(bookingType).map((opt) => (
                  <option key={opt.slug || opt.name} value={opt.name}>
                    {opt.name}
                  </option>
                ))}
              </select>
              <FieldError id={errorId("item")} message={errors.item?.message} />
            </>
          )}

          {pickerOption?.price != null && pickerOption.price > 0 && (
            <p className="pop-in mt-3 inline-flex items-baseline gap-2 rounded-full bg-sunrise/35 px-3.5 py-1.5 text-sm font-semibold text-charcoal-sea">
              <span className="font-display text-base font-extrabold tabular">{money(pickerOption.price, pickerOption.currency ?? "USD")}</span> per person
            </p>
          )}
          {bookingType === "dive-site" && pickerItem && (
            <p className={hintClass}>
              We&apos;ll book you a fun dive and note that you want to dive {pickerItem}.
            </p>
          )}
        </div>

        {/* The booking so far. Everything here gets submitted as one request. */}
        {cart.length > 0 && (
          <>
            <ul className="mt-5 space-y-2">
              {cart.map(({ line, option }, i) => {
                const isExtra = i < extraLines.length;
                return (
                  <li
                    key={lineKey(line)}
                    className="pop-in rounded-[12px] border-2 border-charcoal-sea/12 bg-warm-white px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-charcoal-sea">{lineLabel(line)}</p>
                        <p className="text-xs text-charcoal-sea/80 mt-0.5 tabular">
                          {typeLabel(line.type)}
                          {option?.price
                            ? ` · ${money(option.price, option.currency ?? "USD")} per person`
                            : ""}
                        </p>
                      </div>
                      {isExtra ? (
                        <button
                          type="button"
                          onClick={() =>
                            setExtraLines((prev) => prev.filter((_, j) => j !== i))
                          }
                          aria-label={`Remove ${lineLabel(line)} from your booking`}
                          className="shrink-0 flex items-center justify-center w-11 h-11 rounded-full text-charcoal-sea/70 hover:bg-tropic-coral/15 hover:text-coral-deep transition-colors cursor-pointer"
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M2 2l10 10M12 2 2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </button>
                      ) : (
                        <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-shallow-water px-2.5 py-1 text-xs font-bold text-surface-dark">
                          <svg width="12" height="12" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          Selected
                        </span>
                      )}
                    </div>

                    {/* Extras only: the line still in the picker gets its times under the date
                        field instead, where the date it depends on is right above it. */}
                    {isExtra && (
                      <div className="mt-3 border-t border-charcoal-sea/10 pt-3">
                        <SlotPicker
                          type={apiType(line.type)}
                          item={line.item}
                          date={bookingDate ?? ""}
                          people={lineQuantity(line)}
                          value={choiceFor(line)}
                          onChange={setChoiceFor(line)}
                          heading={`Pick a time for ${lineLabel(line)}`}
                        />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Optional, and clearly so — the wizard's version of this was mandatory and
                invisible, which is what left people stuck on a dead "Next" button. */}
            {!lockedItem && pickerLine && (
              <button
                type="button"
                onClick={addAnother}
                className="mt-3 inline-flex items-center min-h-11 gap-2 rounded-full border-2 border-dashed border-charcoal-sea/30 px-4 text-sm font-semibold text-charcoal-sea hover:border-shallow-water hover:bg-shallow-water/10 transition-colors cursor-pointer"
              >
                + Book something else as well
              </button>
            )}

            {sub > 0 && (
              <p className="text-sm text-charcoal-sea/80 mt-4 tabular">
                {money(sub, itemCurrency)} for {headcount(people)}{" "}
                {headcount(people) === 1 ? "person" : "people"}
                {depositLabel ? ` · ${depositLabel}` : ""}
              </p>
            )}
          </>
        )}
      </section>

      {/* ── 2. Details ── */}
      <section className={`${PANEL} space-y-5`}>
        <SectionHeading step={2} title="Your details" />
        <BookingFields
          form={form}
          maxQuantity={pickerOption?.maxQuantity ?? null}
          quantityKey={pickerOption?.slug}
          slotPicker={
            pickerLine ? (
              <SlotPicker
                type={apiType(pickerLine.type)}
                item={pickerLine.item}
                date={bookingDate ?? ""}
                people={lineQuantity(pickerLine)}
                value={choiceFor(pickerLine)}
                onChange={setChoiceFor(pickerLine)}
                heading={`Pick a time for ${lineLabel(pickerLine)}`}
                error={errors.slot_id?.message}
              />
            ) : null
          }
        />
      </section>

      {/* ── 3. Review & send ── */}
      <section className={PANEL}>
        <SectionHeading step={3} title="Anything else?" />

        <div className="mb-4">
          <label htmlFor="notes" className={labelClass}>
            Questions or special requests{" "}
            <span className="text-charcoal-sea/75 font-normal">(optional)</span>
          </label>
          <textarea
            id="notes"
            rows={2}
            placeholder="Medical conditions, allergies, specific questions, dates to avoid…"
            {...register("notes")}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Estimate. The server recalculates on submit and its number wins — which is why
            this says "estimate" rather than quoting a total as final. */}
        {sub > 0 && (
          <div className="zone-deep relative overflow-hidden rounded-[16px] p-5 sm:p-6 mb-5">
            <p className="text-label uppercase font-semibold text-sunrise mb-4">
              Your booking
            </p>
            <div className="space-y-2.5 text-sm tabular">
              {cart.map(({ line, option, quantity: q }) => (
                <div key={lineKey(line)} className="flex justify-between gap-3">
                  <span className="text-muted">
                    {lineLabel(line)} — {money(option?.price ?? 0, option?.currency ?? itemCurrency)}{" "}
                    × {people}
                    {option?.maxQuantity ? ` × ${q} dives` : ""}
                  </span>
                  <span className="text-warm-white font-semibold whitespace-nowrap">
                    {money(cartSubtotal([{ price: option?.price, quantity: q }], people), itemCurrency)}
                  </span>
                </div>
              ))}
              {discountOff > 0 && (
                <div className="flex justify-between border-t border-dashed border-rule pt-2.5">
                  <span className="text-sunrise">Discount</span>
                  <span className="text-sunrise font-semibold">
                    −{money(discountOff, itemCurrency)}
                  </span>
                </div>
              )}
              <div className="flex items-baseline justify-between border-t-2 border-warm-white/40 pt-3 mt-1">
                <span className="text-muted">Estimated total</span>
                <span className="font-display text-warm-white font-extrabold text-readout">
                  {money(previewTotal, itemCurrency)}
                </span>
              </div>
              {depositLabel && (
                <p className="text-muted text-xs pt-1">
                  You can pay {depositLabel} now and the rest on arrival.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Named by the backend — an item that's no longer bookable, a quantity over its
            cap, a currency mix. Actionable, unlike the generic failure below. */}
        {apiError && (
          <p
            role="alert"
            className="text-coral-deep text-sm font-semibold bg-tropic-coral/10 border-2 border-tropic-coral/40 rounded-[12px] px-4 py-3 mb-4"
          >
            {apiError}
          </p>
        )}

        {status === "error" && (
          <p
            role="alert"
            className="text-coral-deep text-sm font-semibold bg-tropic-coral/10 border-2 border-tropic-coral/40 rounded-[12px] px-4 py-3 mb-4"
          >
            Something went wrong. Please try again or WhatsApp us on{" "}
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

        {/* Consent at the point of commitment, not buried in the footer — the 48-hour
            refund rule and the late-arrival rule only hold if they were shown here. */}
        <p className="text-xs text-charcoal-sea/80 leading-relaxed mb-4">
          By sending this you agree to our{" "}
          <Link href="/terms" className="underline hover:text-shallow-water">terms</Link> and{" "}
          <Link href="/refund-policy" className="underline hover:text-shallow-water">refund policy</Link>
          . Cancel 48 hours or more before your start time and the advance comes back in full.
        </p>

        {/* Never disabled on validity. A greyed-out button with no reason is exactly what
            people bounced off — let them press it and tell them what's missing. */}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group w-full min-h-14 inline-flex items-center justify-center gap-3 bg-action text-action-ink font-bold rounded-[12px] text-lg hover:bg-action-hover active:scale-[0.99] transition-[background-color,scale] disabled:opacity-70 cursor-pointer"
        >
          {status === "submitting" && (
            <span className="h-5 w-5 rounded-full border-2 border-action-ink/30 border-t-action-ink motion-safe:animate-spin" aria-hidden="true" />
          )}
          {status === "submitting" ? "Booking…" : "Book"}
          {status !== "submitting" && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
              <path d="M4 12h15M13 6l6 6-6 6" />
            </svg>
          )}
        </button>

        <p className="text-xs text-charcoal-sea/80 text-center mt-3">
          Nothing is charged yet — we confirm your dates on WhatsApp first.
        </p>
      </section>
    </form>
  );
}
