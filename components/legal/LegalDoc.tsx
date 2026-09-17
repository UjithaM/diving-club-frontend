import PageHero from "@/components/ui/PageHero";

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
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: breadcrumb }]}
        notes="Diving Club · Trincomalee"
        title={title}
        lead={intro}
        art="turtle"
      >
        <p className="mt-6 text-sm font-semibold text-charcoal-sea/80 tabular">Last updated: {updated}</p>
      </PageHero>

      <section className="zone-surface py-12 lg:py-20 px-5 sm:px-8 border-t-2 border-charcoal-sea/10">
        <div
          className="max-w-[68ch] mx-auto lg:mx-0 lg:ml-[max(0px,calc((100%-72rem)/2))] text-charcoal-sea/85 text-[1.0625rem] leading-[1.75]
            [&_h2]:text-charcoal-sea [&_h2]:text-[1.625rem] [&_h2]:leading-tight [&_h2]:font-extrabold [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:pt-6 [&_h2]:border-t-2 [&_h2]:border-charcoal-sea/15 [&_h2:first-child]:mt-0 [&_h2:first-child]:pt-0 [&_h2:first-child]:border-0
            [&_h3]:text-charcoal-sea [&_h3]:font-bold [&_h3]:text-lg [&_h3]:mt-8 [&_h3]:mb-2
            [&_p]:mb-4
            [&_ul]:mb-5 [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:list-disc [&_li]:marker:text-shallow-water
            [&_a]:text-charcoal-sea [&_a]:font-semibold [&_a]:underline [&_a]:decoration-2 [&_a]:decoration-shallow-water [&_a]:underline-offset-4 hover:[&_a]:decoration-charcoal-sea
            [&_strong]:text-charcoal-sea [&_strong]:font-semibold"
        >
          {children}
        </div>
      </section>
    </>
  );
}
