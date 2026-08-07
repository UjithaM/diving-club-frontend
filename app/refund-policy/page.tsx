import type { Metadata } from "next";
import Link from "next/link";
import LegalDoc from "@/components/legal/LegalDoc";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Diving Club Trincomalee",
  description:
    "Cancel 48 hours or more before your dive and we refund your advance in full. Read how cancellations, late arrivals and weather days work at Diving Club Trincomalee.",
  alternates: { canonical: "https://divingclub.lk/refund-policy" },
  openGraph: {
    title: "Refund & Cancellation Policy | Diving Club",
    description:
      "Cancel 48 hours or more before your dive and your advance comes back in full. Here's exactly how it works.",
    url: "https://divingclub.lk/refund-policy",
  },
};

export default function RefundPolicyPage() {
  return (
    <LegalDoc
      title="Refunds & cancellations"
      breadcrumb="Refund Policy"
      intro="The short version: give us 48 hours and you get your advance back, all of it. Miss your slot without telling us and we can't."
      updated="7 August 2026"
    >
      <h2>Cancelling your booking</h2>
      <p>
        Plans change on the road. Just tell us as early as you can — message us on{" "}
        <a href="https://wa.me/94743945010" target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>{" "}
        or email <a href="mailto:info@divingclub.lk">info@divingclub.lk</a> with your booking
        reference, and we&apos;ll sort it out.
      </p>

      <h3>48 hours or more before your start time</h3>
      <p>
        <strong>Full refund of your advance.</strong> No questions, no fee. If you&apos;d rather
        move the date than cancel, we&apos;ll move it and your advance carries over.
      </p>

      <h3>Less than 48 hours before your start time</h3>
      <p>
        <strong>The advance isn&apos;t refunded.</strong> By that point we&apos;ve held the
        instructor, the tanks and a seat on the boat for you, and it&apos;s too late to offer
        them to anyone else. You&apos;ve paid nothing beyond the advance, so there&apos;s
        nothing further to settle.
      </p>

      <h3>If you don&apos;t turn up</h3>
      <p>
        A no-show counts as a late cancellation, so the advance isn&apos;t refunded. Same if you
        arrive after the boat has left — see{" "}
        <Link href="/terms">turning up on time</Link> in our terms. If you&apos;re running late,
        call us. If we can still fit you in that day or the next, we will.
      </p>

      <h2>If we cancel</h2>
      <p>
        Sometimes we have to. Rough sea, poor visibility, a storm, a boat problem, or too few
        divers to run a trip. Safety decides this, not the calendar, and the call is ours.
      </p>
      <p>When we cancel, you choose:</p>
      <ul>
        <li>Move to another day or another dive site, at no extra cost, or</li>
        <li>
          <strong>A full refund of everything you&apos;ve paid</strong>, advance included.
        </li>
      </ul>
      <p>
        The same applies if we can&apos;t take you for a medical reason you told us about
        honestly in advance — that&apos;s a full refund, and no hard feelings.
      </p>

      <h2>Part-finished courses</h2>
      <p>
        If you start a multi-day course and stop partway through by choice, we refund the days
        you didn&apos;t use, minus any PADI materials or certification fees already paid on your
        behalf — those we can&apos;t get back. If you stop because of illness or an injury,
        talk to us. We&apos;d rather hold your credit for a future visit than argue over it.
      </p>

      <h2>How the money comes back</h2>
      <p>
        Refunds go back the same way you paid, to the same card or account. Once we approve it,
        expect it to land within <strong>7 to 10 working days</strong> — the exact timing is
        your bank&apos;s, not ours. We&apos;ll confirm by email or WhatsApp the moment we send
        it.
      </p>
      <p>
        Prices on this site are shown in US dollars. If your card is billed in another currency,
        your bank sets that exchange rate, and the amount refunded is the amount we received —
        currency movement between the two dates isn&apos;t something we can control.
      </p>

      <h2>Questions</h2>
      <p>
        Ask us before you book if anything here matters to your plans. Diving Club, 74/9 Sandy
        Cove, Trincomalee 31000, Sri Lanka ·{" "}
        <a href="https://wa.me/94743945010" target="_blank" rel="noopener noreferrer">
          074 394 5010
        </a>{" "}
        · <a href="mailto:info@divingclub.lk">info@divingclub.lk</a>. We&apos;re open every day,
        7am to 6pm.
      </p>
    </LegalDoc>
  );
}
