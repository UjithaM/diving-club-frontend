"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const courseItems = [
  { slug: "discover-scuba-diving", name: "Discover Scuba Diving" },
  { slug: "scuba-diver", name: "Scuba Diver" },
  { slug: "open-water-diver", name: "Open Water Diver" },
  { slug: "advanced-open-water", name: "Advanced Open Water Diver" },
  { slug: "rescue-diver", name: "Rescue Diver" },
  { slug: "emergency-first-response", name: "Emergency First Response" },
  { slug: "deep-diving", name: "Deep Diving Specialty" },
  { slug: "underwater-photography", name: "Underwater Photography" },
  { slug: "divemaster", name: "Divemaster" },
];

const experienceItems = [
  { slug: "try-diving", name: "Try Diving" },
  { slug: "fun-diving-2", name: "Fun Diving — 2 Dives" },
  { slug: "fun-diving-4", name: "Fun Diving — 4 Dives" },
  { slug: "snorkeling-tour", name: "Snorkeling Tour" },
  { slug: "whale-watching", name: "Whale & Dolphin Watching" },
];

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 12 12"
      className={className}
      fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M2 4l4 4 4-4" />
    </svg>
  );
}

interface DropdownProps {
  label: string;
  href: string;
  baseHref: string;
  items: { slug: string; name: string }[];
}

function DesktopDropdown({ label, href, baseHref, items }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function enter() {
    clearTimeout(timerRef.current);
    setOpen(true);
  }

  function leave() {
    timerRef.current = setTimeout(() => setOpen(false), 80);
  }

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        className={`flex items-center gap-1 text-sm font-medium transition-colors ${
          open ? "text-shallow-water" : "text-warm-white/80 hover:text-warm-white"
        }`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {label}
        <ChevronDown className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* pt-2 bridges the gap so onMouseLeave doesn't fire mid-transition */}
      <div className="absolute top-full left-0 w-60 pt-2">
        <div
          className={`rounded-xl overflow-hidden border border-white/10 transition-all duration-200 ${
            open
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-1 pointer-events-none"
          }`}
          style={{ background: "#162830" }}
        >
          {/* View All */}
          <Link
            href={href}
            className="flex items-center justify-between px-4 py-3 text-shallow-water font-semibold text-sm hover:bg-white/5 transition-colors border-b border-white/8"
            onClick={() => setOpen(false)}
          >
            View All {label}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          {/* Items */}
          <div className="py-1.5">
            {items.map((item) => (
              <Link
                key={item.slug}
                href={`${baseHref}/${item.slug}`}
                className="block px-4 py-2 text-warm-white/55 text-sm hover:text-warm-white hover:bg-white/5 transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const mobileOpenRef = useRef(false);

  // Keep ref in sync so the scroll handler always sees current value
  useEffect(() => {
    mobileOpenRef.current = mobileOpen;
    // Always show header when mobile menu is open
    if (mobileOpen) setHidden(false);
  }, [mobileOpen]);

  useEffect(() => {
    function update() {
      // Never hide while mobile menu is open
      if (mobileOpenRef.current) {
        lastScrollY.current = window.scrollY;
        ticking.current = false;
        return;
      }
      const scrollY = window.scrollY;
      if (scrollY < 10) {
        setHidden(false);
      } else if (scrollY > lastScrollY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = scrollY;
      ticking.current = false;
    }

    function onScroll() {
      if (!ticking.current) {
        requestAnimationFrame(update);
        ticking.current = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleSection(section: string) {
    setMobileSection((prev) => (prev === section ? null : section));
  }

  function closeMobile() {
    setMobileOpen(false);
    setMobileSection(null);
  }

  return (
    <header
      className={`bg-charcoal-sea text-warm-white sticky top-0 z-50 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-warm-white hover:text-sunrise transition-colors"
        >
          Diving Club
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <DesktopDropdown
            label="Courses"
            href="/courses"
            baseHref="/courses"
            items={courseItems}
          />
          <DesktopDropdown
            label="Activities"
            href="/activities"
            baseHref="/activities"
            items={experienceItems}
          />
          <Link
            href="/about"
            className="text-sm font-medium text-warm-white/80 hover:text-warm-white transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-warm-white/80 hover:text-warm-white transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/contact"
            className="bg-tropic-coral text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-sunrise transition-colors"
          >
            Book a Dive
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => { setMobileOpen((v) => !v); setMobileSection(null); }}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-warm-white transition-transform origin-center duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-warm-white transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-warm-white transition-transform origin-center duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[800px]" : "max-h-0"
        }`}
      >
        <nav className="border-t border-white/10 px-4 py-2 flex flex-col">

          {/* Courses accordion */}
          <button
            className="flex items-center justify-between w-full py-3 text-warm-white/80 hover:text-warm-white font-medium transition-colors text-left"
            onClick={() => toggleSection("courses")}
          >
            Courses
            <ChevronDown className={`transition-transform duration-200 ${mobileSection === "courses" ? "rotate-180" : ""}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${mobileSection === "courses" ? "max-h-[600px]" : "max-h-0"}`}>
            <div className="pb-3 flex flex-col gap-0.5 pl-2 border-l border-shallow-water/40 ml-1 mb-1">
              <Link
                href="/courses"
                className="py-2 text-shallow-water font-semibold text-sm flex items-center gap-1.5 hover:text-sunrise transition-colors"
                onClick={closeMobile}
              >
                View All Courses
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              {courseItems.map((item) => (
                <Link
                  key={item.slug}
                  href={`/courses/${item.slug}`}
                  className="py-1.5 text-warm-white/50 text-sm hover:text-warm-white transition-colors"
                  onClick={closeMobile}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Activities accordion */}
          <button
            className="flex items-center justify-between w-full py-3 text-warm-white/80 hover:text-warm-white font-medium transition-colors text-left border-t border-white/5"
            onClick={() => toggleSection("activities")}
          >
            Activities
            <ChevronDown className={`transition-transform duration-200 ${mobileSection === "activities" ? "rotate-180" : ""}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${mobileSection === "activities" ? "max-h-[300px]" : "max-h-0"}`}>
            <div className="pb-3 flex flex-col gap-0.5 pl-2 border-l border-shallow-water/40 ml-1 mb-1">
              <Link
                href="/activities"
                className="py-2 text-shallow-water font-semibold text-sm flex items-center gap-1.5 hover:text-sunrise transition-colors"
                onClick={closeMobile}
              >
                View All Activities
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              {experienceItems.map((item) => (
                <Link
                  key={item.slug}
                  href={`/activities/${item.slug}`}
                  className="py-1.5 text-warm-white/50 text-sm hover:text-warm-white transition-colors"
                  onClick={closeMobile}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Plain links */}
          <Link
            href="/about"
            className="py-3 text-warm-white/80 hover:text-warm-white font-medium transition-colors border-t border-white/5"
            onClick={closeMobile}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="py-3 text-warm-white/80 hover:text-warm-white font-medium transition-colors border-t border-white/5"
            onClick={closeMobile}
          >
            Contact
          </Link>
          <div className="pt-3 pb-2 border-t border-white/5">
            <Link
              href="/contact"
              className="block bg-tropic-coral text-white font-semibold px-4 py-2.5 rounded-full text-center hover:bg-sunrise transition-colors"
              onClick={closeMobile}
            >
              Book a Dive
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
