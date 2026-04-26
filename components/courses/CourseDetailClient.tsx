"use client";

import { useState } from "react";
import Link from "next/link";
import BookingModal from "@/components/ui/BookingModal";

interface CourseDetailClientProps {
  courseName: string;
  price: number;
  currency: string;
  duration: string;
  maxDepth: string;
  minAge: number;
  metaTextClass: string;
  metaLabel: string;
}

export default function CourseDetailClient({
  courseName,
  price,
  currency,
  duration,
  maxDepth,
  minAge,
  metaTextClass,
  metaLabel,
}: CourseDetailClientProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="sticky top-24 bg-white rounded-2xl shadow-md p-7 border border-charcoal-sea/8">
        <div className="mb-6">
          <p className="text-charcoal-sea/45 text-xs uppercase tracking-widest mb-1">Course price</p>
          <p className="text-charcoal-sea text-4xl font-bold leading-none">
            ${price}
            <span className="text-charcoal-sea/35 text-base font-normal ml-1">{currency}</span>
          </p>
        </div>

        <div className="space-y-3 mb-7 text-sm text-charcoal-sea/60">
          <div className="flex justify-between">
            <span>Duration</span>
            <span className="font-semibold text-charcoal-sea">{duration}</span>
          </div>
          {maxDepth !== "N/A" && (
            <div className="flex justify-between">
              <span>Max depth</span>
              <span className="font-semibold text-charcoal-sea">{maxDepth}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Min age</span>
            <span className="font-semibold text-charcoal-sea">{minAge}+</span>
          </div>
          <div className="flex justify-between">
            <span>Level</span>
            <span className={`font-semibold ${metaTextClass}`}>{metaLabel}</span>
          </div>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="block w-full text-center bg-charcoal-sea text-warm-white font-bold py-3.5 rounded-full hover:bg-shallow-water transition-colors text-sm mb-3"
        >
          Book This Course
        </button>
        <Link
          href="/contact"
          className="block w-full text-center border border-charcoal-sea/20 text-charcoal-sea/70 font-semibold py-3.5 rounded-full hover:border-charcoal-sea/40 hover:text-charcoal-sea transition-colors text-sm"
        >
          Ask a question
        </Link>

        <p className="text-center text-xs text-charcoal-sea/35 mt-4 leading-relaxed">
          All equipment included · Small groups · PADI certified
        </p>
      </div>

      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedItem={courseName}
        preselectedType="course"
      />
    </>
  );
}
