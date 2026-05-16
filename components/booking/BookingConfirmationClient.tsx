"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
    <div className="flex justify-between border-t border-white/10 pt-3 first:border-0 first:pt-0">
      <span className="text-warm-white/50">{label}</span>
      <span
        className={`text-warm-white font-semibold text-right ${mono ? "font-mono text-xs" : ""}`}
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
        <p className="text-charcoal-sea/60 text-sm">No booking reference found.</p>
        <Link
          href="/book"
          className="mt-4 inline-block text-shallow-water font-semibold hover:underline text-sm"
        >
          Make a booking
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-tropic-coral text-sm mb-4">
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
          <span className="font-mono font-semibold">{bookingRef}</span>
        </p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="text-center py-20">
        <div className="w-8 h-8 rounded-full border-2 border-shallow-water border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-charcoal-sea/50 text-sm">Loading your booking…</p>
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
          <div className="w-16 h-16 rounded-full bg-shallow-water/10 border-2 border-shallow-water flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M8 16l6 6 10-10"
                stroke="#2A9D8F"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-charcoal-sea font-bold text-2xl mb-1">
            {isPaid ? "Payment confirmed!" : "Deposit received!"}
          </h1>
          <p className="text-charcoal-sea/55 text-sm">
            {isPaid
              ? "You're all set. See you in the water."
              : "Deposit received. Remaining balance due on arrival."}
          </p>
        </div>
      )}

      {isPending && (
        <div className="text-center mb-8">
          <div className="w-8 h-8 rounded-full border-2 border-sunrise border-t-transparent animate-spin mx-auto mb-4" />
          <h1 className="text-charcoal-sea font-bold text-xl mb-1">
            Confirming payment…
          </h1>
          <p className="text-charcoal-sea/55 text-sm">
            This usually takes a few seconds.
          </p>
        </div>
      )}

      {isTimedOut && (
        <div className="text-center mb-8">
          <h1 className="text-charcoal-sea font-bold text-xl mb-2">
            Payment pending
          </h1>
          <p className="text-charcoal-sea/55 text-sm mb-4">
            We haven&apos;t received payment confirmation yet. If you&apos;ve
            paid, please{" "}
            <a
              href="https://wa.me/94743945010"
              className="font-semibold text-shallow-water underline"
            >
              WhatsApp us
            </a>
            .
          </p>
        </div>
      )}

      {/* Booking summary card */}
      <div className="bg-charcoal-sea rounded-2xl p-6 mb-6">
        <p className="text-warm-white/40 text-xs uppercase tracking-widest mb-4">
          Booking summary
        </p>
        <div className="space-y-3 text-sm">
          <SummaryRow label="Reference" value={booking.reference ?? bookingRef} mono />
          <SummaryRow label="Item" value={booking.item} />
          <SummaryRow label="Date" value={booking.booking_date} />
          <SummaryRow label="People" value={String(booking.participants)} />
          <SummaryRow
            label="Total"
            value={`${booking.total_price} ${booking.currency}`}
          />
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
          className="w-full min-h-[52px] flex items-center justify-center bg-tropic-coral text-white font-bold rounded-full text-sm hover:bg-sunrise transition-colors"
        >
          Back to home
        </Link>
        <a
          href="https://wa.me/94743945010"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full min-h-[52px] flex items-center justify-center gap-2 border border-charcoal-sea/20 text-charcoal-sea/70 font-semibold rounded-full text-sm hover:border-charcoal-sea/40 transition-colors"
        >
          Questions? WhatsApp us
        </a>
      </div>
    </div>
  );
}
