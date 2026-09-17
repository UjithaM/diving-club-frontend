"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { Bubbles } from "@/components/illustrations/Sea";
import type { BookingConfirmation } from "@/lib/types";

interface Props {
  bookingRef: string | null;
}

const POLL_INTERVAL_MS = 4000;
const MAX_POLLS = 15;

function SummaryRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4 border-t border-dashed border-rule pt-3 first:border-0 first:pt-0">
      <span className="text-muted shrink-0">{label}</span>
      <span
        className={`text-warm-white font-semibold text-right ${mono ? "font-display font-extrabold text-sunrise" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

export default function BookingConfirmationClient({ bookingRef }: Props) {
  const [booking, setBooking] = useState<BookingConfirmation | null>(null);
  const [error, setError] = useState(false);
  const [polls, setPolls] = useState(0);

  useEffect(() => {
    if (!bookingRef) return;

    const base =
      process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://admin.divingclub.lk/api";
    let pollCount = 0;

    async function poll() {
      try {
        const res = await fetch(`${base}/bookings/${bookingRef}`);
        if (!res.ok) throw new Error();
        const data: BookingConfirmation = await res.json();
        setBooking(data);
        setPolls(pollCount);
        if (data.payment_status === "paid" || data.payment_status === "partial") {
          clearInterval(id);
        }
      } catch {
        setError(true);
        clearInterval(id);
      }
    }

    poll();
    const id = setInterval(() => {
      pollCount++;
      if (pollCount >= MAX_POLLS) {
        clearInterval(id);
        setPolls(MAX_POLLS);
        return;
      }
      poll();
    }, POLL_INTERVAL_MS);

    return () => clearInterval(id);
  }, [bookingRef]);

  if (!bookingRef) {
    return (
      <div className="text-center py-20">
        <p className="text-charcoal-sea/80 text-body">No booking reference found.</p>
        <Link
          href="/book"
          className="mt-5 inline-flex items-center min-h-12 px-6 rounded-[12px] bg-action text-action-ink font-bold hover:bg-action-hover transition-colors"
        >
          Make a booking
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p role="alert" className="text-coral-deep text-sm font-semibold mb-4">
          Could not load booking details. Please{" "}
          <a
            href="https://wa.me/94743945010"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            WhatsApp us
          </a>{" "}
          with your reference:{" "}
          <span className="font-display font-extrabold tabular">{bookingRef}</span>
        </p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="text-center py-20">
        <div className="w-10 h-10 rounded-full border-[3px] border-shallow-water/25 border-t-shallow-water motion-safe:animate-spin mx-auto mb-4" aria-hidden="true" />
        <p className="text-charcoal-sea/80 text-sm" role="status">Loading your booking…</p>
      </div>
    );
  }

  const isPaid = booking.payment_status === "paid";
  const isPartial = booking.payment_status === "partial";
  const isTimedOut = booking.payment_status === "unpaid" && polls >= MAX_POLLS;
  const isPending = booking.payment_status === "unpaid" && polls < MAX_POLLS;

  return (
    <div>
      {/* Status heading */}
      {(isPaid || isPartial) && (
        <div className="text-center mb-8">
          <div className="pop-in relative w-20 h-20 rounded-full bg-shallow-water flex items-center justify-center mx-auto mb-5">
            <span className="absolute -inset-8 text-shallow-water/60" aria-hidden="true"><Bubbles count={7} /></span>
            <svg className="draw-check" width="36" height="36" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path
                d="M8 16l6 6 10-10"
                stroke="var(--color-surface-dark)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-charcoal-sea text-section font-extrabold mb-2">
            {isPaid ? "Payment confirmed!" : "Deposit received!"}
          </h1>
          <p className="text-charcoal-sea/80 text-body">
            {isPaid
              ? "You're all set. See you in the water."
              : "Deposit received. Remaining balance due on arrival."}
          </p>
        </div>
      )}

      {isPending && (
        <div className="text-center mb-8">
          <div className="w-10 h-10 rounded-full border-[3px] border-sunrise/30 border-t-sunrise motion-safe:animate-spin mx-auto mb-4" aria-hidden="true" />
          <h1 className="text-charcoal-sea text-sub font-extrabold mb-1" role="status">
            Confirming payment…
          </h1>
          <p className="text-charcoal-sea/80 text-sm">
            This usually takes a few seconds.
          </p>
        </div>
      )}

      {isTimedOut && (
        <div className="text-center mb-8">
          <h1 className="text-charcoal-sea text-sub font-extrabold mb-2">
            Payment pending
          </h1>
          <p className="text-charcoal-sea/80 text-sm mb-4">
            We haven&apos;t received payment confirmation yet. If you&apos;ve
            paid, please{" "}
            <a
              href="https://wa.me/94743945010"
              className="font-semibold text-whatsapp-deep underline"
            >
              WhatsApp us
            </a>
            .
          </p>
        </div>
      )}

      {/* Booking summary card */}
      <div className="zone-deep rounded-[18px] p-6 mb-6 tabular">
        <p className="text-label uppercase font-semibold text-sunrise mb-4">
          Booking summary
        </p>
        <div className="space-y-3 text-sm">
          <SummaryRow label="Reference" value={booking.reference ?? bookingRef} mono />
          {/* One booking can hold several items. `quantity` is already people × per-person. */}
          {booking.items?.map((item) => (
            <SummaryRow
              key={item.name}
              label="Item"
              value={[
                item.quantity > 1 ? `${item.name} × ${item.quantity}` : item.name,
                item.report_time,
                item.seats?.length ? `seats ${item.seats.join(", ")}` : null,
              ]
                .filter(Boolean)
                .join(" · ")}
            />
          ))}
          <SummaryRow label="Date" value={booking.booking_date} />
          {/* Only set once a time slot was booked; older date-only bookings skip the row. */}
          {booking.report_time && <SummaryRow label="Report at" value={booking.report_time} />}
          <SummaryRow label="People" value={String(booking.participants)} />
          {booking.discount_amount > 0 && (
            <SummaryRow
              label="Discount"
              value={`−${booking.discount_amount.toFixed(2)} ${booking.currency}`}
            />
          )}
          <SummaryRow
            label="Total"
            value={`${booking.total_price} ${booking.currency}`}
          />
          {/* Server-computed advance. Never derived from a percentage here. */}
          {isPartial && booking.deposit?.amount != null && (
            <SummaryRow
              label="Paid now"
              value={`${booking.deposit.amount.toFixed(2)} ${booking.currency}`}
            />
          )}
          <SummaryRow
            label="Payment"
            value={
              booking.payment_status === "paid"
                ? "Paid in full"
                : booking.payment_status === "partial"
                ? "Deposit paid"
                : "Pending"
            }
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Link
          href="/"
          className="w-full min-h-14 flex items-center justify-center bg-action text-action-ink font-bold rounded-[12px] text-base hover:bg-action-hover transition-colors"
        >
          Back to home
        </Link>
        <a
          href="https://wa.me/94743945010"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full min-h-14 flex items-center justify-center gap-2 bg-whatsapp text-surface-dark font-bold rounded-[12px] text-base hover:bg-whatsapp-hover transition-colors"
        >
          <WhatsAppIcon size={20} />
          Questions? WhatsApp us
        </a>
      </div>
    </div>
  );
}
