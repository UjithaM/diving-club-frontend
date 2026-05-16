import type { Metadata } from "next";
import BookingConfirmationClient from "@/components/booking/BookingConfirmationClient";

export const metadata: Metadata = {
  title: "Booking Confirmation | Diving Club Trincomalee",
  description:
    "Your diving booking is confirmed. Check your payment status and booking details.",
  robots: { index: false, follow: false },
};

export default async function BookingConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;

  return (
    <section className="bg-warm-white min-h-screen py-16 px-6">
      <div className="max-w-lg mx-auto">
        <BookingConfirmationClient bookingRef={ref ?? null} />
      </div>
    </section>
  );
}
