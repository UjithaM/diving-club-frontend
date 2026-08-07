import Link from "next/link";

/**
 * Shell for the three policy pages PayHere's partner banks check for before they activate
 * an account: terms, refunds, privacy. They're identical apart from the words, so the
 * typography lives here once as descendant selectors instead of on every heading.
 */
export default function LegalDoc({
  title,
  intro,
  breadcrumb,
  updated,
  children,
}: {
  title: string;
  intro: string;
  breadcrumb: string;
  /** Human-readable, e.g. "7 August 2026". Bump it whenever the wording changes. */
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="bg-charcoal-sea py-16 lg:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-warm-white/35 text-xs mb-8">
            <Link href="/" className="hover:text-warm-white/60 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-warm-white/60">{breadcrumb}</span>
          </nav>

          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-6 bg-tropic-coral" aria-hidden="true" />
            <span className="text-tropic-coral text-[11px] font-semibold tracking-[0.22em] uppercase">
              Diving Club · Trincomalee
            </span>
          </div>

          <h1 className="text-warm-white font-display text-[clamp(2rem,5vw,3rem)] font-extrabold leading-tight mb-4">
            {title}
          </h1>
          <p className="text-warm-white/70 leading-relaxed">{intro}</p>
          <p className="text-warm-white/35 text-sm mt-6">Last updated: {updated}</p>
        </div>
      </section>

      <section className="bg-warm-white py-14 lg:py-20 px-6">
        <div
          className="max-w-3xl mx-auto text-charcoal-sea/75 leading-relaxed
            [&_h2]:text-charcoal-sea [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:mt-12 [&_h2]:mb-4 [&_h2:first-child]:mt-0
            [&_h3]:text-charcoal-sea [&_h3]:font-bold [&_h3]:text-base [&_h3]:mt-7 [&_h3]:mb-2
            [&_p]:mb-4
            [&_ul]:mb-4 [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:list-disc [&_li]:marker:text-tropic-coral
            [&_a]:text-shallow-water [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-tropic-coral
            [&_strong]:text-charcoal-sea [&_strong]:font-semibold"
        >
          {children}
        </div>
      </section>
    </>
  );
}
