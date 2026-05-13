"use client";

import Link from "next/link";

interface DiveSiteDetailClientProps {
  siteName: string;
  depth: string;
  boatTime: string;
  season: string;
  difficulty: string;
  difficultyTextClass: string;
}

export default function DiveSiteDetailClient({
  siteName,
  depth,
  boatTime,
  season,
  difficulty,
  difficultyTextClass,
}: DiveSiteDetailClientProps) {
  return (
    <div className="sticky top-24 bg-white rounded-2xl shadow-md p-7 border border-charcoal-sea/8">
      <div className="mb-6">
        <p className="text-charcoal-sea/45 text-xs uppercase tracking-widest mb-1">Book a dive here</p>
        <p className="text-charcoal-sea/80 text-sm leading-snug">
          Tell us which sites you want and we&apos;ll sort the rest.
        </p>
      </div>

      <div className="space-y-3 mb-7 text-sm text-charcoal-sea/60">
        <div className="flex justify-between">
          <span>Depth</span>
          <span className="font-semibold text-charcoal-sea">{depth}</span>
        </div>
        <div className="flex justify-between">
          <span>Boat time</span>
          <span className="font-semibold text-charcoal-sea">{boatTime}</span>
        </div>
        <div className="flex justify-between">
          <span>Season</span>
          <span className="font-semibold text-charcoal-sea">{season}</span>
        </div>
        <div className="flex justify-between">
          <span>Level</span>
          <span className={`font-semibold ${difficultyTextClass}`}>{difficulty}</span>
        </div>
      </div>

      <Link
        href={`/book?type=dive-site&item=${encodeURIComponent(siteName)}`}
        className="block w-full text-center bg-charcoal-sea text-warm-white font-bold py-3.5 rounded-full hover:bg-shallow-water transition-colors text-sm mb-3"
      >
        Book a Dive
      </Link>
      <Link
        href="/contact"
        className="block w-full text-center border border-charcoal-sea/20 text-charcoal-sea/70 font-semibold py-3.5 rounded-full hover:border-charcoal-sea/40 hover:text-charcoal-sea transition-colors text-sm"
      >
        Ask a question
      </Link>

      <p className="text-center text-xs text-charcoal-sea/35 mt-4 leading-relaxed">
        Equipment included · Local guides · Small groups
      </p>
    </div>
  );
}
