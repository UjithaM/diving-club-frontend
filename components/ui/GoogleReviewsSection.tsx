/**
 * The reviews band, used on the ad pages, the detail pages and the homepage.
 *
 * Server-rendered on purpose. This replaced an Elfsight widget that mounted client-side, so
 * not one word of a review ever reached the HTML — Google indexed none of it and every page
 * paid for a third-party script. Here the text ships in the document.
 *
 * ONLY REAL REVIEWS GO IN THIS LIST, COPIED VERBATIM from the Google listing. Don't tidy the
 * spelling, don't trim, don't write a new one to fill a gap. An earlier version of this
 * section carried invented quotes, which is why it was thrown out for a widget in the first
 * place. To refresh: open the listing, paste the reviews in, convert the relative date Google
 * shows ("a week ago") to a fixed month so it can't rot.
 *
 * One global feed, not per-item — every review is of the same dive centre, so a course page
 * shows the same reviews as a dive-site page.
 */

import { DepthStop, type Zone } from "@/components/ui/Section";
import ScrollButtons from "@/components/ui/ScrollButtons";

/**
 * Lands on the REVIEWS tab, not the map pin — that's the `!9m1!1b1` on the end. The
 * `?entry=ttu&g_ep=…` Google appends when you copy the URL is a session/build stamp and is
 * dropped on purpose; it goes stale and changes nothing about where the link lands.
 */
const GOOGLE_LISTING =
  "https://www.google.com/maps/place/Diving+Club+padi+diving+center+S-30212/@8.5609627,81.2431568,19z/data=!4m8!3m7!1s0x3afbbdb47010bccd:0xade22adddd90b6c!8m2!3d8.5609377!4d81.2422479!9m1!1b1!16s%2Fg%2F11n9pwpxsr";

interface Review {
  name: string;
  text: string;
  rating: number;
  /** Fixed month, never "2 weeks ago" — a relative date is wrong the week after it ships. */
  date: string;
  localGuide?: boolean;
  /** Set when the English is Google's translation rather than the reviewer's own words. */
  translatedFrom?: string;
}

const reviews: Review[] = [
  {
    name: "Paulina Och",
    // Google truncates this one behind a "More" link; the ellipsis keeps that honest.
    text: "Two wonderful family dives. It was my daughter's first time underwater, but thanks to the instructor's support, she managed without any problems. We recommend the Diving Club for its professionalism and excellent dive masters…",
    rating: 5,
    date: "July 2026",
    localGuide: true,
    translatedFrom: "Polish",
  },
  {
    name: "Mélïa El Afghani",
    text: "Incredible experience! We saw hundreds of veil jellyfish (which don't sting), turtles, squid, and tons of fish 🐠 The guide was so kind, attentive, and genuinely caring. He was so thoughtful and looked after us. Thank you everyone, it was a wonderful experience ❤️",
    rating: 5,
    date: "August 2026",
    translatedFrom: "French",
  },
  {
    name: "Blanca FRANSITORRA",
    text: "He flipadoooo! Anu and Kethee the best Diving màsters!!! Super good experience! I touched a turtle and saw a lot of fishes with professionalism and kindness!!! I fully recommend it!!!",
    rating: 5,
    date: "August 2026",
  },
  {
    name: "Lidia Merino",
    text: "They took us to three different snorkeling spots, and we saw turtles, moray eels, and a wide variety of fish and coral. Spectacular!",
    rating: 5,
    date: "August 2026",
    translatedFrom: "Spanish",
  },
  {
    name: "Leila Lebban",
    text: "Incredible experience! We saw a variety of fish in different spots. The guide was very kind, attentive, and caring. I highly recommend it. P.S.: They even lent us a GoPro for free!",
    rating: 5,
    date: "August 2026",
    translatedFrom: "French",
  },
  {
    name: "Jason Badger",
    text: "Friendly and very safe! Wonder recommend to all levels. The sea was so beautiful and full of life. The staff is very cool and welcoming. We felt at home and so will you.",
    rating: 5,
    date: "July 2026",
  },
  {
    name: "Aanya Patel",
    text: "Great experience, saw so many dolphins on the trip and the boat driver was great with finding a good area without too many other boats",
    rating: 5,
    date: "August 2026",
  },
  {
    name: "Dionysus Christyselvarajah",
    text: "Went for a jet ski experience for 30mins. Gave good instructions and was a memorable experience. People watching beware they may splash you😂",
    rating: 5,
    date: "August 2026",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill={i < rating ? "var(--color-sunrise)" : "none"}
          stroke="var(--color-sunrise)"
          strokeWidth="1"
          aria-hidden="true"
        >
          <path d="M7 1l1.54 3.12L12 4.72l-2.5 2.44.59 3.44L7 8.77l-3.09 1.83.59-3.44L2 4.72l3.46-.6z" />
        </svg>
      ))}
    </div>
  );
}

/** Google's own mark, so a card reads as a Google review at a glance and not a pull quote. */
function GoogleMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true" className="flex-shrink-0">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

const avatarTones = ["bg-sunrise", "bg-shallow-water", "bg-tropic-coral"];

function ReviewCard({ r, i }: { r: Review; i: number }) {
  return (
    <a
      href={GOOGLE_LISTING}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Read ${r.name}'s review on Google Maps`}
      className="group zone-surface relative flex border border-charcoal-sea/15 w-[19rem] sm:w-[23rem] shrink-0 flex-col rounded-[2px] p-6 sm:p-7 transition-transform duration-300 hover:-translate-y-1"
    >
      <figure className="flex flex-col flex-1 m-0">
        <div className="flex items-center justify-between mb-4">
          <StarRating rating={r.rating} />
          <GoogleMark />
        </div>

        <span className="font-display font-extrabold text-[4.5rem] leading-[0.6] h-8 text-sunrise select-none" aria-hidden="true">
          &ldquo;
        </span>
        <blockquote className="flex-1 m-0">
          <p className="text-meta sm:text-body text-charcoal-sea">{r.text}</p>
        </blockquote>

        <figcaption className="mt-6 pt-4 border-t-2 border-charcoal-sea flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${avatarTones[i % avatarTones.length]} flex items-center justify-center shrink-0`}>
            <span className="text-surface-dark font-display font-extrabold">{r.name.charAt(0)}</span>
          </div>
          <div className="min-w-0">
            <p className="text-charcoal-sea font-semibold text-sm leading-tight truncate">{r.name}</p>
            <p className="text-muted text-xs">
              {r.localGuide ? "Local Guide · " : ""}
              {r.date}
            </p>
            {/* Say whose words these are: Google's translation, not the reviewer's. */}
            {r.translatedFrom && (
              <p className="text-muted text-[11px] mt-0.5">Translated from {r.translatedFrom}</p>
            )}
          </div>
        </figcaption>
      </figure>
    </a>
  );
}

export default function GoogleReviewsSection({
  heading = "What our divers say on Google",
  limit,
  zone = "surface",
  depth,
}: {
  heading?: string;
  /** Ad pages pass 4 — the form matters more there than scroll depth. Default shows all. */
  limit?: number;
  /** @deprecated Every variant now renders a real section heading. */
  plainHeading?: boolean;
  zone?: Zone;
  depth?: number;
}) {
  const shown = limit ? reviews.slice(0, limit) : reviews;
  const light = zone === "surface" || zone === "sunrise";
  const stripId = limit ? `reviews-${limit}` : "reviews";

  return (
    <section className={`zone-${zone} py-16 lg:py-28 overflow-hidden`}>
      <div className="px-5 sm:px-8">
        <div className={`max-w-6xl mx-auto ${depth !== undefined ? "grid gap-y-6 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-x-10" : ""}`}>
          {depth !== undefined && <DepthStop depth={depth} />}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8 lg:mb-12 reveal">
            <h2 className="text-section font-extrabold max-w-[16ch]">{heading}</h2>
            <div className="flex flex-wrap items-center gap-3">
              {/* Every quote below is checkable in one click — that's the point of using real ones. */}
              <a
                href={GOOGLE_LISTING}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2.5 min-h-11 px-5 rounded-[2px] text-sm font-semibold transition-colors w-fit ${light ? "bg-charcoal-sea text-warm-white hover:bg-surface-dark" : "bg-warm-white text-charcoal-sea hover:bg-white"}`}
              >
                <GoogleMark />
                Read every review on our Google listing
              </a>
              <ScrollButtons target={stripId} label="Scroll reviews" />
            </div>
          </div>
        </div>
      </div>

      {/* A native horizontal scroller: swipe, trackpad, shift+wheel or the buttons above. The
          side padding lines the first card up with the page grid and lets the last one reach the
          viewport edge. */}
      <div
        id={stripId}
        role="region"
        aria-label="Google reviews"
        tabIndex={0}
        className="review-strip flex gap-4 overflow-x-auto snap-x snap-mandatory pb-5"
      >
        {shown.map((r, i) => (
          <div key={r.name} className="snap-start shrink-0 flex">
            <ReviewCard r={r} i={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
