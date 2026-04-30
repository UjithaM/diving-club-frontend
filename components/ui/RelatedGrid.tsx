import Link from "next/link";

interface RelatedItem {
  slug: string;
  name: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  href: string;
}

interface RelatedGridProps {
  items: RelatedItem[];
  heading?: string;
}

export default function RelatedGrid({ items, heading = "You might also like" }: RelatedGridProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="bg-charcoal-sea py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <span className="h-px w-6 bg-tropic-coral" aria-hidden="true" />
          <h2 className="text-warm-white font-display text-2xl font-extrabold">{heading}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={item.href}
              className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-white/20 transition-all duration-200"
            >
              {item.badge && (
                <span
                  className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-4"
                  style={{ background: item.badgeColor ?? "#2A9D8F", color: "#fff" }}
                >
                  {item.badge}
                </span>
              )}
              <h3 className="text-warm-white font-bold text-lg mb-2 group-hover:text-tropic-coral transition-colors">
                {item.name}
              </h3>
              <p className="text-warm-white/45 text-sm leading-relaxed line-clamp-3">
                {item.description}
              </p>
              <span className="inline-flex items-center gap-1.5 text-tropic-coral/70 text-xs font-semibold mt-4 group-hover:text-tropic-coral transition-colors">
                Learn more
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M2.5 6h7M6.5 3l3 3-3 3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
