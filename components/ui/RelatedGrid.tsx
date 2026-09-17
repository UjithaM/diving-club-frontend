import Link from "next/link";
import { Arrow } from "@/components/ui/Button";
import { toneClass, type Tone } from "@/components/ui/DetailHero";

interface RelatedItem {
  slug: string;
  name: string;
  description: string;
  badge?: string;
  badgeTone?: Tone;
  href: string;
}

interface RelatedGridProps {
  items: RelatedItem[];
  heading?: string;
}

export default function RelatedGrid({ items, heading = "You might also like" }: RelatedGridProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="zone-deep py-14 lg:py-20 px-5 sm:px-8 border-t border-rule">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-section font-extrabold mb-8 lg:mb-10 reveal">{heading}</h2>

        <ul className="rail md:grid-cols-3 md:gap-6">
          {items.map((item) => (
            <li key={item.slug} className="reveal">
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-[14px] bg-warm-white/[0.06] p-6 ring-1 ring-warm-white/10 transition-[background-color,translate] duration-300 hover:-translate-y-1 hover:bg-warm-white/[0.1]"
              >
                {item.badge && (
                  <span className={`mb-4 w-fit rounded-full px-2.5 py-1 text-label uppercase font-semibold ${toneClass[item.badgeTone ?? "shallow"]}`}>
                    {item.badge}
                  </span>
                )}
                <h3 className="text-sub font-extrabold mb-2 group-hover:underline underline-offset-4">{item.name}</h3>
                <p className="text-muted text-sm leading-relaxed line-clamp-3 flex-1">{item.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-sunrise">
                  Learn more <Arrow />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
