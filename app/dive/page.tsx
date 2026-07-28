import type { Metadata } from "next";
import WhatsAppBridge from "@/components/WhatsAppBridge";

export const metadata: Metadata = {
  title: "Book a Dive in Trincomalee | Diving Club",
  robots: { index: false, follow: false },
};

export default function DiveBridge() {
  return (
    <WhatsAppBridge
      source="dive"
      heading="Let's get you in the water"
      message="Hi! I'd like to book a dive."
    />
  );
}
