import type { Metadata } from "next";
import WhatsAppBridge from "@/components/WhatsAppBridge";

export const metadata: Metadata = {
  title: "PADI Courses in Trincomalee | Diving Club",
  robots: { index: false, follow: false },
};

export default function PadiBridge() {
  return (
    <WhatsAppBridge
      source="padi"
      heading="Ask us about PADI courses"
      message="Hi! I'd like to ask about PADI courses."
    />
  );
}
