"use client";

import Link from "next/link";

interface ActivityDetailClientProps {
  experienceName: string;
  price: number;
  currency: string;
  duration: string;
  minAge: number;
  divesIncluded?: number;
  metaTextClass: string;
  metaLabel: string;
}

export default function ActivityDetailClient({
  experienceName,
  price,
  currency,
  duration,
  minAge,
  divesIncluded,
  metaTextClass,
  metaLabel,
}: ActivityDetailClientProps) {
  return (
    <div className="sticky top-24 bg-white rounded-2xl shadow-md p-7 border border-charcoal-sea/8">
      <div className="mb-6">
        <p className="text-charcoal-sea/45 text-xs uppercase tracking-widest mb-1">Activity price</p>
        <p className="text-charcoal-sea text-4xl font-bold leading-none">
          ${price}
          <span className="text-charcoal-sea/35 text-base font-normal ml-1">{currency}</span>
        </p>
        <p className="text-charcoal-sea/40 text-xs mt-1">per person</p>
      </div>

      <div className="space-y-3 mb-7 text-sm text-charcoal-sea/60">
        <div className="flex justify-between">
          <span>Duration</span>
          <span className="font-semibold text-charcoal-sea">{duration}</span>
        </div>
        <div className="flex justify-between">
          <span>Min age</span>
          <span className="font-semibold text-charcoal-sea">{minAge}+</span>
        </div>
        {divesIncluded && (
          <div className="flex justify-between">
            <span>Dives included</span>
            <span className="font-semibold text-shallow-water">{divesIncluded}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Type</span>
          <span className={`font-semibold ${metaTextClass}`}>{metaLabel}</span>
        </div>
      </div>

      <Link
        href={`/book?type=activity&item=${encodeURIComponent(experienceName)}`}
        className="block w-full text-center bg-charcoal-sea text-warm-white font-bold py-3.5 rounded-full hover:bg-shallow-water transition-colors text-sm mb-3"
      >
        Book Now
      </Link>
      <Link
        href="/contact"
        className="block w-full text-center border border-charcoal-sea/20 text-charcoal-sea/70 font-semibold py-3.5 rounded-full hover:border-charcoal-sea/40 hover:text-charcoal-sea transition-colors text-sm"
      >
        Ask a question
      </Link>

      <p className="text-center text-xs text-charcoal-sea/35 mt-4 leading-relaxed">
        All equipment included · Small groups · Expert guides
      </p>
    </div>
  );
}
