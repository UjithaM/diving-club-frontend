"use client";

import Link from "next/link";
import Image from "next/image";
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
  { slug: "jet-ski", name: "Jet Ski" },
  { slug: "boat-tours", name: "Boat Tours" },
  { slug: "sunset-tours", name: "Sunset Tours" },
];

const diveSiteItems = [
  { slug: "swami-rock", name: "Swami Rock" },
  { slug: "pigeon-island", name: "Pigeon Island" },
  { slug: "hms-hermes-wreck", name: "HMS Hermes Wreck" },
  { slug: "ss-british-sergeant-wreck", name: "SS British Sergeant" },
  { slug: "coral-garden", name: "Coral Garden" },
  { slug: "klathipa-deep", name: "Klathipa Deep" },
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
  scrolled: boolean;
}

function DesktopDropdown({ label, href, baseHref, items, scrolled }: DropdownProps) {
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
        className={`flex items-center gap-1 text-[13px] font-medium tracking-wide transition-colors ${
          scrolled
            ? open ? "text-charcoal-sea" : "text-charcoal-sea/70 hover:text-charcoal-sea"
            : open ? "text-warm-white" : "text-warm-white/75 hover:text-warm-white"
        }`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {label}
        <ChevronDown className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <div className="absolute top-full left-0 w-60 pt-2">
        <div
          className={`rounded-xl overflow-hidden border border-charcoal-sea/10 shadow-xl bg-warm-white transition-all duration-200 ${
            open
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-1 pointer-events-none"
          }`}
        >
          <Link
            href={href}
            className="flex items-center justify-between px-4 py-3 text-tropic-coral font-semibold text-sm hover:bg-charcoal-sea/5 transition-colors border-b border-charcoal-sea/8"
            onClick={() => setOpen(false)}
          >
            View All {label}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <div className="py-1.5">
            {items.map((item) => (
              <Link
                key={item.slug}
                href={`${baseHref}/${item.slug}`}
                className="block px-4 py-2 text-charcoal-sea/60 text-sm hover:text-charcoal-sea hover:bg-charcoal-sea/5 transition-colors"
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
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const mobileOpenRef = useRef(false);

  useEffect(() => {
    mobileOpenRef.current = mobileOpen;
    if (mobileOpen) setHidden(false);
  }, [mobileOpen]);

  useEffect(() => {
    function update() {
      if (mobileOpenRef.current) {
        lastScrollY.current = window.scrollY;
        ticking.current = false;
        return;
      }
      const scrollY = window.scrollY;
      setScrolled(scrollY > 60);
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

  const navLinkClass = scrolled
    ? "text-[13px] font-medium tracking-wide text-charcoal-sea/70 hover:text-charcoal-sea transition-colors"
    : "text-[13px] font-medium tracking-wide text-warm-white/75 hover:text-warm-white transition-colors";

  const bookCtaClass = scrolled
    ? "border border-charcoal-sea text-charcoal-sea text-xs font-medium px-5 py-2 rounded-full hover:bg-charcoal-sea hover:text-warm-white transition-colors duration-200"
    : "border border-warm-white/50 text-warm-white text-xs font-medium px-5 py-2 rounded-full hover:bg-warm-white/10 hover:border-warm-white transition-colors duration-200";

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-warm-white/95 backdrop-blur-md border-b border-charcoal-sea/10"
          : "bg-charcoal-sea/95 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 hover:opacity-85 transition-opacity"
          aria-label="Diving Club — home"
        >
          <Image
            src="/logo.webp"
            alt="Diving Club logo"
            width={36}
            height={36}
            className="rounded-full"
            priority
          />
          <span className={`text-xs font-medium tracking-[0.18em] uppercase ${scrolled ? "text-charcoal-sea" : "text-warm-white"} transition-colors`}>
            Diving Club
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <DesktopDropdown
            label="Courses"
            href="/courses"
            baseHref="/courses"
            items={courseItems}
            scrolled={scrolled}
          />
          <DesktopDropdown
            label="Dive Sites"
            href="/dive-sites"
            baseHref="/dive-sites"
            items={diveSiteItems}
            scrolled={scrolled}
          />
          <DesktopDropdown
            label="Activities"
            href="/activities"
            baseHref="/activities"
            items={experienceItems}
            scrolled={scrolled}
          />
          <Link href="/scuba-diving-in-trincomalee" className={navLinkClass}>Trincomalee Guide</Link>
          <Link href="/faq" className={navLinkClass}>FAQ</Link>
          <Link href="/book" className={bookCtaClass}>
            Book a Dive
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          onClick={() => { setMobileOpen((v) => !v); setMobileSection(null); }}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 transition-all origin-center duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""} ${scrolled ? "bg-charcoal-sea md:bg-charcoal-sea" : "bg-warm-white"}`} />
          <span className={`block w-6 h-0.5 transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""} ${scrolled ? "bg-charcoal-sea md:bg-charcoal-sea" : "bg-warm-white"}`} />
          <span className={`block w-6 h-0.5 transition-all origin-center duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""} ${scrolled ? "bg-charcoal-sea md:bg-charcoal-sea" : "bg-warm-white"}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[800px]" : "max-h-0"
        } bg-warm-white`}
      >
        <nav className="border-t border-charcoal-sea/8 px-4 py-2 flex flex-col">

          {/* Courses accordion */}
          <button
            className="flex items-center justify-between w-full py-3 text-charcoal-sea/70 hover:text-charcoal-sea font-medium transition-colors text-left text-sm cursor-pointer"
            onClick={() => toggleSection("courses")}
          >
            Courses
            <ChevronDown className={`transition-transform duration-200 ${mobileSection === "courses" ? "rotate-180" : ""}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${mobileSection === "courses" ? "max-h-[600px]" : "max-h-0"}`}>
            <div className="pb-3 flex flex-col gap-0.5 pl-2 border-l border-shallow-water/30 ml-1 mb-1">
              <Link
                href="/courses"
                className="py-2 text-tropic-coral font-semibold text-sm flex items-center gap-1.5 hover:text-charcoal-sea transition-colors"
                onClick={closeMobile}
              >
                View All Courses →
              </Link>
              {courseItems.map((item) => (
                <Link
                  key={item.slug}
                  href={`/courses/${item.slug}`}
                  className="py-1.5 text-charcoal-sea/50 text-sm hover:text-charcoal-sea transition-colors"
                  onClick={closeMobile}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Dive Sites accordion */}
          <button
            className="flex items-center justify-between w-full py-3 text-charcoal-sea/70 hover:text-charcoal-sea font-medium transition-colors text-left text-sm border-t border-charcoal-sea/5 cursor-pointer"
            onClick={() => toggleSection("dive-sites")}
          >
            Dive Sites
            <ChevronDown className={`transition-transform duration-200 ${mobileSection === "dive-sites" ? "rotate-180" : ""}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${mobileSection === "dive-sites" ? "max-h-[400px]" : "max-h-0"}`}>
            <div className="pb-3 flex flex-col gap-0.5 pl-2 border-l border-shallow-water/30 ml-1 mb-1">
              <Link
                href="/dive-sites"
                className="py-2 text-tropic-coral font-semibold text-sm flex items-center gap-1.5 hover:text-charcoal-sea transition-colors"
                onClick={closeMobile}
              >
                All 12 Dive Sites →
              </Link>
              {diveSiteItems.map((item) => (
                <Link
                  key={item.slug}
                  href={`/dive-sites/${item.slug}`}
                  className="py-1.5 text-charcoal-sea/50 text-sm hover:text-charcoal-sea transition-colors"
                  onClick={closeMobile}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Activities accordion */}
          <button
            className="flex items-center justify-between w-full py-3 text-charcoal-sea/70 hover:text-charcoal-sea font-medium transition-colors text-left text-sm border-t border-charcoal-sea/5 cursor-pointer"
            onClick={() => toggleSection("activities")}
          >
            Activities
            <ChevronDown className={`transition-transform duration-200 ${mobileSection === "activities" ? "rotate-180" : ""}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${mobileSection === "activities" ? "max-h-[400px]" : "max-h-0"}`}>
            <div className="pb-3 flex flex-col gap-0.5 pl-2 border-l border-shallow-water/30 ml-1 mb-1">
              <Link
                href="/activities"
                className="py-2 text-tropic-coral font-semibold text-sm flex items-center gap-1.5 hover:text-charcoal-sea transition-colors"
                onClick={closeMobile}
              >
                View All Activities →
              </Link>
              {experienceItems.map((item) => (
                <Link
                  key={item.slug}
                  href={`/activities/${item.slug}`}
                  className="py-1.5 text-charcoal-sea/50 text-sm hover:text-charcoal-sea transition-colors"
                  onClick={closeMobile}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/scuba-diving-in-trincomalee" className="py-3 text-charcoal-sea/70 hover:text-charcoal-sea text-sm font-medium transition-colors border-t border-charcoal-sea/5" onClick={closeMobile}>Trincomalee Guide</Link>
          <Link href="/faq" className="py-3 text-charcoal-sea/70 hover:text-charcoal-sea text-sm font-medium transition-colors border-t border-charcoal-sea/5" onClick={closeMobile}>FAQ</Link>
          <Link href="/gallery" className="py-3 text-charcoal-sea/70 hover:text-charcoal-sea text-sm font-medium transition-colors border-t border-charcoal-sea/5" onClick={closeMobile}>Gallery</Link>
          <Link href="/blog" className="py-3 text-charcoal-sea/70 hover:text-charcoal-sea text-sm font-medium transition-colors border-t border-charcoal-sea/5" onClick={closeMobile}>Blog</Link>
          <Link href="/about" className="py-3 text-charcoal-sea/70 hover:text-charcoal-sea text-sm font-medium transition-colors border-t border-charcoal-sea/5" onClick={closeMobile}>About Us</Link>
          <Link href="/contact" className="py-3 text-charcoal-sea/70 hover:text-charcoal-sea text-sm font-medium transition-colors border-t border-charcoal-sea/5" onClick={closeMobile}>Contact</Link>
          <div className="pt-3 pb-2 border-t border-charcoal-sea/5">
            <Link
              href="/book"
              className="block border border-charcoal-sea text-charcoal-sea font-medium px-4 py-2.5 rounded-full text-center hover:bg-charcoal-sea hover:text-warm-white transition-colors text-sm"
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
