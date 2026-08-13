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
          fill={i < rating ? "#F4A261" : "none"}
          stroke="#F4A261"
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

export default function GoogleReviewsSection({
  heading = "What our divers say on Google",
  limit,
}: {
  heading?: string;
  /** Ad pages pass 4 — the form matters more there than scroll depth. Default shows all. */
  limit?: number;
}) {
  const shown = limit ? reviews.slice(0, limit) : reviews;

  return (
    <section className="bg-warm-white py-14 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px w-6 bg-tropic-coral" aria-hidden="true" />
          <h2 className="text-tropic-coral text-[11px] font-semibold tracking-[0.22em] uppercase">
            {heading}
          </h2>
        </div>

        {/* Mobile is a swipe carousel, desktop is a grid — CSS scroll-snap does both, so
            this stays a server component with no JS. The negative margin lets cards run to
            the screen edge, and the 85% width leaves the next one peeking so it's obvious
            there's more to swipe. tabIndex makes the strip keyboard-scrollable. */}
        <div
          tabIndex={0}
          role="region"
          aria-label="Google reviews"
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pb-3 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-5 md:overflow-visible md:mx-0 md:px-0 md:pb-0"
        >
          {shown.map((r) => (
            <a
              key={r.name}
              href={GOOGLE_LISTING}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read ${r.name}'s review on Google Maps`}
              className="snap-start shrink-0 w-[85%] max-w-sm md:w-auto md:max-w-none bg-white border border-charcoal-sea/8 rounded-2xl p-6 flex flex-col hover:border-shallow-water/40 transition-colors"
            >
              <figure className="flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <StarRating rating={r.rating} />
                  <GoogleMark />
                </div>

                <blockquote className="flex-1">
                  <p className="text-charcoal-sea/70 text-sm leading-relaxed">
                    &ldquo;{r.text}&rdquo;
                  </p>
                </blockquote>

                <figcaption className="mt-5 pt-5 border-t border-charcoal-sea/8 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-tropic-coral/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-tropic-coral font-bold text-sm">{r.name.charAt(0)}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-charcoal-sea font-semibold text-sm leading-tight truncate">
                      {r.name}
                    </p>
                    <p className="text-charcoal-sea/40 text-xs">
                      {r.localGuide ? "Local Guide · " : ""}
                      {r.date}
                    </p>
                    {/* Say whose words these are: Google's translation, not the reviewer's. */}
                    {r.translatedFrom && (
                      <p className="text-charcoal-sea/30 text-[11px] mt-0.5">
                        Translated from {r.translatedFrom}
                      </p>
                    )}
                  </div>
                </figcaption>
              </figure>
            </a>
          ))}
        </div>

        {/* Every quote above is checkable in one click — that's the point of using real ones. */}
        <a
          href={GOOGLE_LISTING}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-8 text-charcoal-sea/60 hover:text-shallow-water text-sm font-medium transition-colors"
        >
          <GoogleMark />
          Read every review on our Google listing
        </a>
      </div>
    </section>
  );
}
