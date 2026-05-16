"use client";

import { useRef, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import type { PaymentOptions } from "@/lib/types";

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
    <div className="flex justify-between gap-4">
      <span className="text-charcoal-sea/50 shrink-0">{label}</span>
      <span
        className={`font-semibold text-charcoal-sea text-right ${mono ? "font-mono text-xs" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

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
      <h2 className="text-charcoal-sea text-xl font-bold mb-1">Payment</h2>
      <p className="text-charcoal-sea/55 text-sm mb-6 leading-relaxed">
        Choose how you&apos;d like to pay to confirm your spot.
      </p>

      {/* Booking ref + price badge */}
      <div className="bg-shallow-water/10 border border-shallow-water/20 rounded-xl px-4 py-3 mb-5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-charcoal-sea/50 uppercase tracking-widest">Booking ref</span>
          <span className="font-mono text-sm font-semibold text-charcoal-sea">{bookingRef}</span>
        </div>
        {totalPrice != null && (
          <div className="flex items-center justify-between border-t border-shallow-water/20 pt-2">
            <span className="text-xs text-charcoal-sea/50 uppercase tracking-widest">Total</span>
            <span className="text-sm font-semibold text-charcoal-sea">{currency} {totalPrice.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Deposit toggle */}
      {paymentOptions.deposit.enabled && (
        <div className="mb-5 bg-white border border-charcoal-sea/10 rounded-xl p-4">
          <p className="text-sm font-semibold text-charcoal-sea mb-3">
            Payment amount
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setDepositOnly(false)}
              className={`flex-1 min-h-[44px] rounded-xl text-sm font-semibold border transition-all ${
                !depositOnly
                  ? "bg-charcoal-sea text-warm-white border-charcoal-sea"
                  : "bg-white text-charcoal-sea/55 border-charcoal-sea/20 hover:border-charcoal-sea/40"
              }`}
            >
              Pay full amount
            </button>
            <button
              type="button"
              onClick={() => setDepositOnly(true)}
              className={`flex-1 min-h-[44px] rounded-xl text-sm font-semibold border transition-all ${
                depositOnly
                  ? "bg-charcoal-sea text-warm-white border-charcoal-sea"
                  : "bg-white text-charcoal-sea/55 border-charcoal-sea/20 hover:border-charcoal-sea/40"
              }`}
            >
              Pay deposit ({paymentOptions.deposit.percentage}%{totalPrice != null ? ` — ${currency} ${((totalPrice * paymentOptions.deposit.percentage) / 100).toFixed(2)}` : ""})
            </button>
          </div>
          <p className="text-xs text-charcoal-sea/40 mt-2">
            {depositOnly
              ? `Pay ${paymentOptions.deposit.percentage}% now to secure your spot. Remaining balance due on arrival.`
              : "Pay the full amount now. All equipment and guide fees included."}
          </p>
        </div>
      )}

      {/* Gateway selector — only shown when multiple options available */}
      {hasPayPal && hasBankTransfer && (
        <div className="mb-5">
          <p className="text-sm font-semibold text-charcoal-sea mb-3">
            Payment method
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => { setGateway("paypal"); setError(null); }}
              className={`flex-1 min-h-[48px] rounded-xl text-sm font-semibold border transition-all ${
                gateway === "paypal"
                  ? "bg-charcoal-sea text-warm-white border-charcoal-sea"
                  : "bg-white text-charcoal-sea/55 border-charcoal-sea/20 hover:border-charcoal-sea/40"
              }`}
            >
              PayPal
            </button>
            <button
              type="button"
              onClick={() => { setGateway("bank_transfer"); setError(null); }}
              className={`flex-1 min-h-[48px] rounded-xl text-sm font-semibold border transition-all ${
                gateway === "bank_transfer"
                  ? "bg-charcoal-sea text-warm-white border-charcoal-sea"
                  : "bg-white text-charcoal-sea/55 border-charcoal-sea/20 hover:border-charcoal-sea/40"
              }`}
            >
              Bank Transfer
            </button>
          </div>
        </div>
      )}

      {/* PayPal panel */}
      {gateway === "paypal" && paypal && (
        <div className="bg-white border border-charcoal-sea/10 rounded-xl p-4 mb-4">
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
        <div className="bg-white border border-charcoal-sea/10 rounded-xl p-5 mb-4 space-y-3">
          <p className="text-sm font-semibold text-charcoal-sea">Bank details</p>
          <div className="space-y-2 text-sm">
            <Row label="Bank" value={bt.bank_name} />
            <Row label="Account name" value={bt.account_name} />
            <Row label="Account number" value={bt.account_number} />
            <Row label="IBAN" value={bt.iban} />
            <Row label="Reference" value={bookingRef} mono />
          </div>
          <p className="text-xs text-charcoal-sea/40 pt-2 border-t border-charcoal-sea/8">
            Use your booking reference as the payment description so we can match your transfer.
          </p>
          <button
            type="button"
            disabled={bankConfirming}
            onClick={handleBankTransfer}
            className="w-full min-h-[52px] bg-tropic-coral text-white font-bold rounded-full text-sm hover:bg-sunrise transition-colors disabled:opacity-50"
          >
            {bankConfirming ? "Confirming…" : "I've transferred the funds →"}
          </button>
        </div>
      )}

      {error && (
        <p className="text-tropic-coral text-sm bg-tropic-coral/10 border border-tropic-coral/20 rounded-xl px-4 py-3 mb-4">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={onBack}
        className="w-full min-h-[48px] border border-charcoal-sea/20 text-charcoal-sea/70 font-semibold rounded-full text-sm hover:border-charcoal-sea/40 transition-colors"
      >
        ← Back to review
      </button>
    </div>
  );
}
