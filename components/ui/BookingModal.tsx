"use client";

import { useEffect, useRef, useState } from "react";
import BookingForm from "@/components/ui/BookingForm";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedItem: string;
  preselectedType: "course" | "activity";
}

const ease = "cubic-bezier(0.16, 1, 0.3, 1)";

export default function BookingModal({
  isOpen,
  onClose,
  preselectedItem,
  preselectedType,
}: BookingModalProps) {
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<Element | null>(null);

  // Mount/unmount with exit animation delay
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      previousFocus.current = document.activeElement;
      // Focus panel after paint
      requestAnimationFrame(() => panelRef.current?.focus());
    } else {
      const t = setTimeout(() => setMounted(false), 220);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Restore focus on close
  useEffect(() => {
    if (!isOpen && previousFocus.current) {
      (previousFocus.current as HTMLElement).focus?.();
    }
  }, [isOpen]);

  // ESC key
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!mounted) return null;

  const panelStyle = {
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "scale(1) translateY(0)" : "scale(0.95) translateY(8px)",
    transition: `opacity 0.22s ${ease}, transform 0.22s ${ease}`,
  };

  const backdropStyle = {
    opacity: isOpen ? 1 : 0,
    transition: `opacity 0.18s ${ease}`,
  };

  return (
    /* Outer: full-screen overlay, positioned below the sticky header (pt-16 = 64px header height) */
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center pt-16 px-4 pb-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      {/* Backdrop — covers the full screen including behind the header */}
      <div
        className="fixed inset-0 backdrop-blur-sm"
        style={{ ...backdropStyle, background: "rgba(9,31,40,0.78)" }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel — fills remaining space below header, scrolls internally */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative w-full max-w-lg bg-warm-white rounded-2xl shadow-2xl outline-none flex flex-col"
        style={{ ...panelStyle, maxHeight: "calc(100dvh - 80px)" }}
      >
        {/* Sticky modal header — never scrolls away */}
        <div className="flex-shrink-0 bg-warm-white rounded-t-2xl px-6 pt-6 pb-4 border-b border-charcoal-sea/8 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-2 h-2 rounded-full bg-shallow-water flex-shrink-0" />
              <span className="text-xs font-bold text-shallow-water uppercase tracking-widest capitalize">
                {preselectedType}
              </span>
            </div>
            <h2
              id="booking-modal-title"
              className="text-charcoal-sea font-bold text-lg leading-snug truncate"
            >
              {preselectedItem}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close booking modal"
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-charcoal-sea/50 hover:text-charcoal-sea hover:bg-charcoal-sea/8 transition-colors mt-0.5"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable form body */}
        <div className="overflow-y-auto flex-1 px-6 py-6">
          <BookingForm
            preselectedItem={preselectedItem}
            preselectedType={preselectedType}
            showItemSelect={false}
          />
        </div>
      </div>
    </div>
  );
}
