import type { Metadata } from "next";
import Link from "next/link";
import LegalDoc from "@/components/legal/LegalDoc";

export const metadata: Metadata = {
  title: "Privacy Policy | Diving Club Trincomalee, Sri Lanka",
  description:
    "What Diving Club does with your details when you book a dive in Trincomalee: what we collect, why we need it, who sees it, and how to have it deleted.",
  alternates: { canonical: "https://divingclub.lk/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | Diving Club Trincomalee",
    description:
      "What we collect when you book, why we need it, who sees it, and how to have it deleted.",
    url: "https://divingclub.lk/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalDoc
      title="Privacy policy"
      breadcrumb="Privacy Policy"
      intro="We ask for what we need to run your dive safely, and nothing else. We don't sell your details to anybody."
      updated="7 August 2026"
    >
      <h2>What we collect</h2>
      <p>When you book or message us, you give us:</p>
      <ul>
        <li>Your name, email address and phone number</li>
        <li>Your nationality or country, so we know which paperwork applies</li>
        <li>The date you want, how many of you there are, and what you want to do</li>
        <li>Your diving certification level, and anything you write in the notes box</li>
      </ul>
      <p>
        Before your first dive we also take a <strong>medical questionnaire</strong>. That&apos;s
        health information, we treat it as the sensitive thing it is, and only the instructors
        taking you in the water see it.
      </p>
      <p>
        <strong>We never see your card details.</strong> Card payments go straight to our payment
        gateway, who handle them under their own security standards. What comes back to us is
        whether the payment worked and for how much.
      </p>

      <h2>Why we need it</h2>
      <ul>
        <li>To confirm your booking and reach you if the boat time or the weather changes</li>
        <li>To dive with you safely, and to meet PADI&apos;s standards for training records</li>
        <li>To take payment and issue refunds</li>
        <li>To keep the records Sri Lankan law requires us to keep</li>
      </ul>
      <p>
        If you&apos;re taking a PADI course, some of your details go to PADI to issue your
        certification — that&apos;s the certification card itself, so it can&apos;t be opted out
        of and still get you certified.
      </p>

      <h2>Cookies and the tools on this site</h2>
      <p>
        This site uses Google Tag Manager and Google Ads to understand which pages and adverts
        actually lead to bookings, and Ahrefs Analytics for basic visitor numbers. Between them
        they set cookies and store a small record in your browser of which advert you arrived
        from, kept for up to 90 days.
      </p>
      <p>
        When a booking comes in from an advert, we send Google a <strong>scrambled
        (hashed)</strong> version of your email and phone number so it can match the booking to
        the click. Google receives the scrambled values, not the readable ones. You can turn all
        of this off with your browser&apos;s cookie settings or an ad blocker, and the site will
        still work normally.
      </p>

      <h2>Who else sees your details</h2>
      <p>Only the people who have to:</p>
      <ul>
        <li>Our payment gateway, to take the payment</li>
        <li>PADI, for course certifications</li>
        <li>Google, for the advert measurement described above</li>
        <li>A hospital or the coastguard, if there&apos;s a medical emergency</li>
      </ul>
      <p>
        That&apos;s the whole list.{" "}
        <strong>We don&apos;t sell your details, rent them, or hand them to marketers.</strong>
      </p>

      <h2>How long we keep it</h2>
      <p>
        Booking and payment records: seven years, because tax rules say so. Training and medical
        records: as long as PADI requires for your certification. Enquiries that never became a
        booking: two years, then deleted. Ad-click records expire on their own after 90 days.
      </p>

      <h2>Your say over it</h2>
      <p>
        Email <a href="mailto:info@divingclub.lk">info@divingclub.lk</a> and you can ask us for a
        copy of what we hold, ask us to fix anything wrong, or ask us to delete it. We&apos;ll
        come back to you within 30 days. The one thing we can&apos;t delete early is a record
        the law or PADI requires us to keep — we&apos;ll tell you plainly if that applies.
      </p>
      <p>
        We&apos;ll only email you about your own booking. We don&apos;t run a marketing list.
      </p>

      <h2>Keeping it safe</h2>
      <p>
        The site runs over an encrypted connection, bookings live in an access-controlled admin
        only our staff can reach, and paper medical forms are locked up at the centre. No system
        is perfect, but nothing sits where it shouldn&apos;t.
      </p>

      <h2>Children</h2>
      <p>
        Under-18s dive with us only with a parent or guardian&apos;s signature, and we take a
        young diver&apos;s details from that adult, not from the child.
      </p>

      <h2>Changes, and how to reach us</h2>
      <p>
        If we change this policy we&apos;ll update the date at the top. Questions about any of
        it: Diving Club, 74/9 Sandy Cove, Trincomalee 31000, Sri Lanka ·{" "}
        <a href="https://wa.me/94743945010" target="_blank" rel="noopener noreferrer">
          074 394 5010
        </a>{" "}
        · <a href="mailto:info@divingclub.lk">info@divingclub.lk</a>. See also our{" "}
        <Link href="/terms">terms</Link> and{" "}
        <Link href="/refund-policy">refund policy</Link>.
      </p>
    </LegalDoc>
  );
}
