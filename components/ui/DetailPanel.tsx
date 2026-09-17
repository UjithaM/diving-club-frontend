import Link from "next/link";
import { Arrow } from "@/components/ui/Button";

/**
 * The sticky side panel on detail pages: the price (or the pitch), the facts as readout rows,
 * then book and ask. Server-rendered — it has no state.
 */
export default function DetailPanel({
  eyebrow,
  price,
  intro,
  rows,
  book,
  footnote,
}: {
  eyebrow: string;
  price?: { amount: React.ReactNode; currency: string; note?: string };
  intro?: React.ReactNode;
  rows: { label: string; value: React.ReactNode; accent?: boolean }[];
  book: { href: string; label: string };
  footnote: string;
}) {
  return (
    <aside className="lg:sticky lg:top-24 zone-deep rounded-[18px] p-6 sm:p-7 shadow-[0_24px_50px_-30px_rgba(15,30,37,0.7)]">
      <p className="text-label uppercase font-semibold text-sunrise mb-2">{eyebrow}</p>
      {price && (
        <>
          <p className="font-display text-figure font-extrabold leading-none tabular text-tropic-coral">
            {price.amount}
            <span className="ml-2 font-sans text-base font-semibold text-muted">{price.currency}</span>
          </p>
          {price.note && <p className="text-muted text-xs mt-1">{price.note}</p>}
        </>
      )}
      {intro && <p className="text-sm leading-snug">{intro}</p>}

      <dl className="mt-6 mb-7 text-sm tabular">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between gap-4 border-t border-dashed border-rule py-2.5">
            <dt className="text-muted">{r.label}</dt>
            <dd className={`font-semibold text-right ${r.accent ? "text-sunrise" : ""}`}>{r.value}</dd>
          </div>
        ))}
      </dl>

      <Link
        href={book.href}
        className="group flex w-full min-h-13 items-center justify-center gap-2 rounded-[12px] bg-action text-action-ink font-bold hover:bg-action-hover transition-colors mb-3"
      >
        {book.label}
        <span className="transition-transform group-hover:translate-x-1"><Arrow /></span>
      </Link>
      <Link
        href="/contact"
        className="flex w-full min-h-12 items-center justify-center rounded-[12px] border-2 border-warm-white/30 font-semibold text-sm hover:border-warm-white transition-colors"
      >
        Ask a question
      </Link>

      <p className="text-center text-xs text-muted mt-4 leading-relaxed">{footnote}</p>
    </aside>
  );
}
