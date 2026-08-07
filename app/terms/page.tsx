import type { Metadata } from "next";
import Link from "next/link";
import LegalDoc from "@/components/legal/LegalDoc";

export const metadata: Metadata = {
  title: "Terms & Conditions | Diving Club Trincomalee, Sri Lanka",
  description:
    "The plain-English terms for booking dives, courses and boat trips with Diving Club in Trincomalee — payment, arrival times, safety rules and cancellations.",
  alternates: { canonical: "https://divingclub.lk/terms" },
  openGraph: {
    title: "Terms & Conditions | Diving Club Trincomalee",
    description:
      "How booking with us works: payment, arrival times, safety rules and cancellations, in plain English.",
    url: "https://divingclub.lk/terms",
  },
};

export default function TermsPage() {
  return (
    <LegalDoc
      title="Terms & conditions"
      breadcrumb="Terms & Conditions"
      intro="No small print games. Here's how booking with us works, what we promise you, and what we need from you in return."
      updated="7 August 2026"
    >
      <h2>Who you&apos;re booking with</h2>
      <p>
        Diving Club, a PADI dive centre at 74/9 Sandy Cove, Trincomalee 31000, Sri Lanka. Phone
        and WhatsApp{" "}
        <a href="https://wa.me/94743945010" target="_blank" rel="noopener noreferrer">
          074 394 5010
        </a>
        , email <a href="mailto:info@divingclub.lk">info@divingclub.lk</a>. When these terms say
        &ldquo;we&rdquo; or &ldquo;us&rdquo;, that&apos;s who they mean. Using this site or
        booking with us means you&apos;re happy with what&apos;s written here.
      </p>

      <h2>Making a booking</h2>
      <p>
        Sending the form is a <strong>request</strong>, not a confirmed booking. We check the
        boat, the tide and the instructor, then come back to you on WhatsApp or email — usually
        within a few hours, always within 24. Your booking exists once we&apos;ve confirmed it
        and your advance has gone through. Until then, nothing is held.
      </p>
      <p>
        Please give us a real phone number you&apos;ll actually answer in Sri Lanka. Almost every
        problem we&apos;ve ever had with a booking started with a number nobody picked up.
      </p>

      <h2>Prices and paying</h2>
      <p>
        Prices are shown per person in US dollars, and include the gear listed on that
        course&apos;s or activity&apos;s page. They don&apos;t include getting yourself to
        Trincomalee, travel insurance, or PADI certification fees where those are listed
        separately.
      </p>
      <p>
        To hold your spot we take an <strong>advance</strong> — the amount is shown before you
        pay, and it&apos;s a share of the total, not an extra charge. The balance is due on the
        day, before you get in the water. Card payments run through a secure payment gateway;
        your card details go to them, never to us, and we never see or store them.
      </p>

      <h2>Turning up on time</h2>
      <p>
        This one matters more than anything else on this page.{" "}
        <strong>Be at the centre at the time we agreed.</strong> Not the time the dive starts —
        the time we told you to arrive. Gear has to be fitted, paperwork signed, and the
        briefing given before the boat goes out.
      </p>
      <p>
        Boats leave on a schedule set by the tide and the other divers on board, and they
        can&apos;t wait. <strong>If you arrive after your boat has left, the booking is
        cancelled and the advance isn&apos;t refunded.</strong> That&apos;s not us being
        difficult — the seat sailed empty and nobody else could take it.
      </p>
      <p>
        So: if you&apos;re running late, call us straight away. If there&apos;s a later slot
        that day or the next and we can move you, we will, and it costs you nothing. What we
        can&apos;t do is fix it after the fact.
      </p>

      <h2>Cancellations and refunds</h2>
      <p>
        Cancel 48 hours or more before your start time and your advance comes back in full.
        Inside 48 hours it doesn&apos;t. If <em>we</em> cancel — weather, sea state, safety —
        you get every rupee back or a free reschedule, your choice. The full detail is in our{" "}
        <Link href="/refund-policy">refund and cancellation policy</Link>.
      </p>

      <h2>Being fit to dive</h2>
      <p>
        Diving is safe when it&apos;s done honestly. Before your first dive you&apos;ll fill in
        a PADI medical questionnaire. Answer it truthfully, even if you think an answer will
        stop you diving — some conditions just need a doctor&apos;s sign-off, and a few genuinely
        rule diving out. We&apos;d far rather reschedule you than treat you on a boat.
      </p>
      <ul>
        <li>Tell us in advance about any medical condition, medication, or recent surgery.</li>
        <li>
          Don&apos;t dive after drinking, and don&apos;t fly for 18 to 24 hours after your last
          dive — your instructor will give you the exact window.
        </li>
        <li>
          Minimum ages are listed on each course and activity page. Under-18s need a parent or
          guardian to sign.
        </li>
      </ul>
      <p>
        Our instructors can end or refuse a dive at any point on safety grounds — sea
        conditions, your comfort in the water, or something you told us on the day. That call is
        final, and it&apos;s always about getting you home safe. If we refuse a dive because you
        withheld a medical condition, that counts as a late cancellation.
      </p>

      <h2>Follow the briefing</h2>
      <p>
        Stay with your guide, respect the depth limits for your certification, and don&apos;t
        touch or take anything from the reef. Trincomalee&apos;s reefs are recovering and
        we&apos;d like to keep them that way. Anyone diving in a way that puts themselves,
        another diver or the reef at risk will be brought back to the boat, with no refund.
      </p>

      <h2>Your things, and ours</h2>
      <p>
        Bring as little as you can. We can&apos;t take responsibility for personal belongings
        left at the centre or on the boat, and phones and cameras go in the water at your own
        risk. Our gear is checked and serviced regularly — if you damage it through misuse, we
        may ask you to cover the repair.
      </p>

      <h2>Photos</h2>
      <p>
        We often take photos and video on trips, and we sometimes use them on this site or on
        social media. If you&apos;d rather we didn&apos;t use yours, just say so on the day —
        one sentence to the guide is enough, and there&apos;s no need to explain.
      </p>

      <h2>Insurance</h2>
      <p>
        We carry the insurance a PADI centre is required to carry. That is not the same as
        covering <em>you</em>. Travel insurance that includes recreational diving to your
        certified depth is strongly recommended, and for technical or deep dives, essential.
        Nothing in these terms limits our liability for death or personal injury caused by our
        own negligence.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update this page — prices, timings and policies shift. The version live on the
        day you book is the one that applies to your booking, so the date at the top is the one
        that counts. These terms are governed by the laws of Sri Lanka.
      </p>

      <h2>Talk to us first</h2>
      <p>
        If something goes wrong, tell us before you tell the internet. We&apos;re a small local
        team and almost everything is fixable on the day.{" "}
        <a href="https://wa.me/94743945010" target="_blank" rel="noopener noreferrer">
          074 394 5010
        </a>{" "}
        · <a href="mailto:info@divingclub.lk">info@divingclub.lk</a> · open every day, 7am to
        6pm. See also our <Link href="/privacy-policy">privacy policy</Link>.
      </p>
    </LegalDoc>
  );
}
