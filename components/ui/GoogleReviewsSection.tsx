import GoogleReviews, { ELFSIGHT_REVIEWS } from "./GoogleReviews";

/**
 * The reviews band, used on the ad pages, the detail pages and the homepage.
 *
 * min-h reserves the widget's space: Elfsight mounts client-side, and without this the
 * page jumps once it arrives.
 *
 * One global feed, not per-item — every review is of the same dive centre, so a course
 * page shows the same reviews as a dive-site page. That's a deliberate trade for real
 * reviews over the invented per-item quotes this replaced.
 */
export default function GoogleReviewsSection({
  heading = "What our divers say on Google",
}: {
  heading?: string;
}) {
  return (
    <section className="bg-warm-white py-14 px-6">
      <div className="max-w-6xl mx-auto min-h-[320px]">
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px w-6 bg-tropic-coral" aria-hidden="true" />
          <h2 className="text-tropic-coral text-[11px] font-semibold tracking-[0.22em] uppercase">
            {heading}
          </h2>
        </div>
        <GoogleReviews appId={ELFSIGHT_REVIEWS} />
      </div>
    </section>
  );
}
