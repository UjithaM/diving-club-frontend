"use client";

import { useEffect, useRef, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import type { BookingConfirmation, PaymentOptions } from "@/lib/types";

interface PaymentStepProps {
  bookingRef: string;
  totalPrice: number | null;
  currency: string;
  paymentOptions: PaymentOptions;
  onBack: () => void;
  onSuccess: (ref: string) => void;
}

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://admin.divingclub.lk/api";

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-dashed border-charcoal-sea/15 last:border-0">
      <span className="text-charcoal-sea/80 shrink-0">{label}</span>
      <span
        className={`font-semibold text-charcoal-sea text-right break-all ${mono ? "tabular bg-sunrise/35 px-1.5 rounded-[4px]" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

/** A two-way choice, shared by the amount and method pickers. */
const option = (on: boolean) =>
  `flex-1 min-h-12 rounded-[12px] px-3 text-sm font-bold border-2 transition-[background-color,border-color,scale] duration-200 active:scale-[0.98] cursor-pointer ${
    on
      ? "bg-shallow-water text-surface-dark border-surface-dark"
      : "bg-white text-charcoal-sea border-charcoal-sea/20 hover:border-shallow-water"
  }`;

const PANEL = "rounded-[18px] bg-white p-5 sm:p-6 ring-1 ring-charcoal-sea/10 shadow-[0_18px_40px_-30px_rgba(15,30,37,0.5)] mb-5";

export default function PaymentStep({
  bookingRef,
  totalPrice,
  currency,
  paymentOptions,
  onBack,
  onSuccess,
}: PaymentStepProps) {
  const hasPayPal = Boolean(paymentOptions.gateways.paypal?.enabled);
  const hasBankTransfer = Boolean(paymentOptions.gateways.bank_transfer?.enabled);

  const defaultGateway = hasPayPal ? "paypal" : "bank_transfer";
  const [depositOnly, setDepositOnly] = useState(false);
  const [gateway, setGateway] = useState<"paypal" | "bank_transfer">(defaultGateway);
  const [error, setError] = useState<string | null>(null);
  const [bankConfirming, setBankConfirming] = useState(false);

  /**
   * The booking as the server sees it. This is the ONLY source of the advance figure:
   * `deposit.amount` already accounts for the per-item override, the per-person maths on
   * a fixed advance, any discount, and clamping to the total. Computing it here from
   * paymentOptions (the site default) is what this component used to do, and it is wrong
   * the moment an item overrides the default — see docs on the Deposit type.
   */
  const [booking, setBooking] = useState<BookingConfirmation | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API}/bookings/${bookingRef}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled && d) setBooking(d as BookingConfirmation);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [bookingRef]);

  const deposit = booking?.deposit;
  // Falls back to the site default only for the enabled/disabled decision — never for a
  // number. Until the booking loads, the deposit option simply isn't offered.
  const depositEnabled = deposit ? deposit.enabled : false;
  const depositAmount = deposit?.amount;
  const total = booking?.total_price ?? totalPrice;
  const cur = booking?.currency ?? currency;
  const discountAmount = booking?.discount_amount ?? 0;

  // Carries the internal payment_id from createOrder into onApprove
  const pendingPaymentIdRef = useRef<string | null>(null);

  async function initiatePayment(gatewayId: number) {
    const res = await fetch(`${API}/payments/initiate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        booking_reference: bookingRef,
        gateway_id: gatewayId,
        deposit_only: depositOnly,
      }),
    });
    if (!res.ok) throw new Error("Failed to initiate payment");
    return res.json() as Promise<{
      payment_id: string;
      external_id: string;
      amount: string;
      currency: string;
    }>;
  }

  async function capturePayment(paymentId: string) {
    const res = await fetch(`${API}/payments/capture`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payment_id: paymentId }),
    });
    if (!res.ok) throw new Error("Capture failed");
    const data = await res.json();
    if (!data.success) throw new Error("Payment not confirmed");
  }

  async function handleBankTransfer() {
    const bt = paymentOptions.gateways.bank_transfer;
    if (!bt) return;
    setBankConfirming(true);
    setError(null);
    try {
      const initiated = await initiatePayment(bt.id);
      await capturePayment(initiated.payment_id);
      onSuccess(bookingRef);
    } catch {
      setError(
        "Could not confirm transfer. Please WhatsApp us if you've already sent payment."
      );
      setBankConfirming(false);
    }
  }

  const paypal = paymentOptions.gateways.paypal;
  const bt = paymentOptions.gateways.bank_transfer;

  return (
    <div>
      <h2 className="flex items-center gap-3 text-charcoal-sea text-section font-extrabold mb-2">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-dark font-display text-lg text-warm-white tabular" aria-hidden="true">4</span>
        Payment
      </h2>
      <p className="text-charcoal-sea/80 text-body mb-7">
        Choose how you&apos;d like to pay to confirm your spot.
      </p>

      {/* Booking ref + price badge */}
      <div className="zone-deep rounded-[18px] px-5 py-5 mb-5 space-y-3 tabular">
        <div className="flex items-center justify-between gap-3">
          <span className="text-label uppercase font-semibold text-sunrise">Booking ref</span>
          <span className="font-display font-extrabold text-warm-white">{bookingRef}</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex items-center justify-between border-t border-dashed border-rule pt-3">
            <span className="text-label uppercase font-semibold text-muted">Discount</span>
            <span className="text-sm font-semibold text-sunrise">
              −{cur} {discountAmount.toFixed(2)}
            </span>
          </div>
        )}
        {total != null && (
          <div className="flex items-baseline justify-between border-t-2 border-warm-white/40 pt-3">
            <span className="text-label uppercase font-semibold text-muted">Total</span>
            <span className="font-display text-readout font-extrabold text-warm-white">{cur} {total.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Deposit toggle. Every figure here comes from the server — nothing is derived. */}
      {depositEnabled && depositAmount != null && (
        <div className={PANEL}>
          <p className="text-sm font-semibold text-charcoal-sea mb-3">
            Payment amount
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setDepositOnly(false)}
              aria-pressed={!depositOnly}
              className={option(!depositOnly)}
            >
              Pay full amount
            </button>
            <button
              type="button"
              onClick={() => setDepositOnly(true)}
              aria-pressed={depositOnly}
              className={option(depositOnly)}
            >
              Pay advance ({cur} {depositAmount.toFixed(2)})
            </button>
          </div>
          <p className="text-xs text-charcoal-sea/80 mt-3" aria-live="polite">
            {depositOnly
              ? `Pay ${cur} ${depositAmount.toFixed(2)} now to secure your spot. Remaining balance due on arrival.`
              : "Pay the full amount now. All equipment and guide fees included."}
          </p>
        </div>
      )}

      {/* Gateway selector — only shown when multiple options available */}
      {hasPayPal && hasBankTransfer && (
        <div className={PANEL}>
          <p className="text-sm font-semibold text-charcoal-sea mb-3">
            Payment method
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              aria-pressed={gateway === "paypal"}
              onClick={() => { setGateway("paypal"); setError(null); }}
              className={option(gateway === "paypal")}
            >
              PayPal
            </button>
            <button
              type="button"
              aria-pressed={gateway === "bank_transfer"}
              onClick={() => { setGateway("bank_transfer"); setError(null); }}
              className={option(gateway === "bank_transfer")}
            >
              Bank Transfer
            </button>
          </div>
        </div>
      )}

      {/* PayPal panel */}
      {gateway === "paypal" && paypal && (
        <div className={`${PANEL} pop-in`}>
          <PayPalScriptProvider
            options={{
              clientId: paypal.client_id,
              currency: "USD",
              intent: "capture",
              ...(paypal.mode === "sandbox" && { "data-sdk-integration-source": "button-factory" }),
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical", color: "blue", shape: "pill", label: "pay" }}
              createOrder={async () => {
                setError(null);
                const initiated = await initiatePayment(paypal.id);
                pendingPaymentIdRef.current = initiated.payment_id;
                return initiated.external_id;
              }}
              onApprove={async () => {
                const paymentId = pendingPaymentIdRef.current;
                if (!paymentId) {
                  setError("Payment session lost. Please try again.");
                  return;
                }
                try {
                  await capturePayment(paymentId);
                  onSuccess(bookingRef);
                } catch {
                  setError(
                    "Payment was approved but could not be confirmed. Please WhatsApp us on 0743 945 010."
                  );
                }
              }}
              onError={() => {
                setError(
                  hasBankTransfer
                    ? "PayPal payment failed. Please try again or switch to bank transfer."
                    : "PayPal payment failed. Please try again or WhatsApp us on 0743 945 010."
                );
              }}
            />
          </PayPalScriptProvider>
        </div>
      )}

      {/* Bank Transfer panel */}
      {gateway === "bank_transfer" && bt && (
        <div className={`${PANEL} pop-in space-y-3`}>
          <p className="text-sub font-extrabold text-charcoal-sea">Bank details</p>
          <div className="text-sm">
            <Row label="Bank" value={bt.bank_name} />
            <Row label="Account name" value={bt.account_name} />
            <Row label="Account number" value={bt.account_number} />
            <Row label="IBAN" value={bt.iban} />
            <Row label="Reference" value={bookingRef} mono />
          </div>
          <p className="text-xs text-charcoal-sea/80 pt-3 border-t-2 border-charcoal-sea/10">
            Use your booking reference as the payment description so we can match your transfer.
          </p>
          <button
            type="button"
            disabled={bankConfirming}
            onClick={handleBankTransfer}
            className="w-full min-h-14 inline-flex items-center justify-center gap-3 bg-action text-action-ink font-bold rounded-[12px] text-base hover:bg-action-hover active:scale-[0.99] transition-[background-color,scale] disabled:opacity-70 cursor-pointer"
          >
            {bankConfirming && (
              <span className="h-5 w-5 rounded-full border-2 border-action-ink/30 border-t-action-ink motion-safe:animate-spin" aria-hidden="true" />
            )}
            {bankConfirming ? "Confirming…" : "I've transferred the funds →"}
          </button>
        </div>
      )}

      {error && (
        <p role="alert" className="text-coral-deep text-sm font-semibold bg-tropic-coral/10 border-2 border-tropic-coral/40 rounded-[12px] px-4 py-3 mb-4">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={onBack}
        className="w-full min-h-12 border-2 border-charcoal-sea/25 text-charcoal-sea font-semibold rounded-[12px] text-sm hover:border-charcoal-sea hover:bg-white transition-colors cursor-pointer"
      >
        ← Back to review
      </button>
    </div>
  );
}
