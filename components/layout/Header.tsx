"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { buttonClass, Arrow } from "@/components/ui/Button";

export interface NavItem {
  slug: string;
  name: string;
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 12 12"
      className={className}
      fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="square"
      aria-hidden="true"
    >
      <path d="M2 4l4 4 4-4" />
    </svg>
  );
}

const navLink =
  "text-[0.8125rem] font-semibold text-charcoal-sea/80 hover:text-charcoal-sea transition-colors py-2";

interface DropdownProps {
  label: string;
  href: string;
  baseHref: string;
  items: NavItem[];
}

function DesktopDropdown({ label, href, baseHref, items }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelId = `nav-${baseHref.slice(1)}`;

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        className={`${navLink} flex items-center gap-1.5 cursor-pointer ${open ? "text-charcoal-sea!" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        {label}
        <ChevronDown className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Always mounted, so it must not eat clicks while shut; the panel turns pointer events
          back on when it opens. */}
      <div className="absolute top-full -left-4 w-64 pt-3 z-50 pointer-events-none">
        <div
          id={panelId}
          className={`zone-deep border-t-2 border-tropic-coral transition-[opacity,translate] duration-200 ${
            open
              ? "opacity-100 translate-y-0 pointer-events-auto visible"
              : "opacity-0 -translate-y-1 pointer-events-none invisible"
          }`}
        >
          <Link
            href={href}
            className="flex items-center justify-between px-4 py-3.5 text-sunrise font-semibold text-sm hover:bg-white/5 transition-colors border-b border-rule"
            onClick={() => setOpen(false)}
          >
            View All {label}
            <Arrow />
          </Link>
          <div className="py-2">
            {items.map((item) => (
              <Link
                key={item.slug}
                href={`${baseHref}/${item.slug}`}
                className="block px-4 py-2 text-muted text-sm hover:text-warm-white hover:bg-white/5 transition-colors"
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

interface HeaderProps {
  courseItems: NavItem[];
  experienceItems: NavItem[];
  diveSiteItems: NavItem[];
}

const mobileLink =
  "py-3.5 text-charcoal-sea text-base font-semibold border-t border-rule";

export default function Header({ courseItems, experienceItems, diveSiteItems }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const mobileOpenRef = useRef(false);

  useEffect(() => {
    mobileOpenRef.current = mobileOpen;
  }, [mobileOpen]);

  // Hides on scroll-down, returns on scroll-up. components/ads/BookCta.tsx relies on this.
  useEffect(() => {
    function update() {
      const scrollY = window.scrollY;
      if (!mobileOpenRef.current) {
        setHidden(scrollY >= 10 && scrollY > lastScrollY.current);
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

  const sections = [
    { key: "courses", label: "Courses", all: "View All Courses →", href: "/courses", items: courseItems },
    { key: "dive-sites", label: "Dive Sites", all: "All 12 Dive Sites →", href: "/dive-sites", items: diveSiteItems },
    { key: "activities", label: "Activities", all: "View All Activities →", href: "/activities", items: experienceItems },
  ];

  return (
    <header
      className={`zone-surface sticky top-0 z-50 border-b-2 border-charcoal-sea transition-transform duration-300 ease-(--ease-surface) ${
        hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
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
          <span className="font-display font-extrabold text-lg tracking-[-0.02em] text-charcoal-sea">
            Diving Club
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 lg:gap-7" aria-label="Main">
          <DesktopDropdown label="Courses" href="/courses" baseHref="/courses" items={courseItems} />
          <DesktopDropdown label="Dive Sites" href="/dive-sites" baseHref="/dive-sites" items={diveSiteItems} />
          <DesktopDropdown label="Activities" href="/activities" baseHref="/activities" items={experienceItems} />
          <Link href="/packages" className={navLink}>Packages</Link>
          <Link href="/book" className={buttonClass("action")}>
            Book a Dive
          </Link>
        </nav>

        <button
          className="md:hidden flex flex-col justify-center gap-1.5 w-11 h-11 -mr-2 items-center cursor-pointer"
          onClick={() => { setMobileOpen((v) => !v); setMobileSection(null); }}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <span className={`block w-6 h-0.5 bg-charcoal-sea transition-transform duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-charcoal-sea transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-charcoal-sea transition-transform duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* How far down the page you are — the phone-width version of the depth gauge. */}
      <div className="depth-progress absolute left-0 right-0 -bottom-0.5" aria-hidden="true" />

      <div
        id="mobile-menu"
        className={`md:hidden overflow-y-auto transition-[max-height] duration-300 ease-(--ease-surface) ${
          mobileOpen ? "max-h-[calc(100svh-4rem)]" : "max-h-0"
        }`}
      >
        <nav className="px-5 sm:px-8 pb-6 flex flex-col" aria-label="Mobile">
          {sections.map((sec) => (
            <div key={sec.key} className="flex flex-col">
              <button
                className="flex items-center justify-between w-full py-3.5 text-charcoal-sea font-semibold text-left text-base border-t border-rule cursor-pointer"
                onClick={() => toggleSection(sec.key)}
                aria-expanded={mobileSection === sec.key}
              >
                {sec.label}
                <ChevronDown className={`transition-transform duration-200 ${mobileSection === sec.key ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-[max-height] duration-300 ${mobileSection === sec.key ? "max-h-[600px]" : "max-h-0"}`}>
                <div className="pb-4 pl-4 border-l-2 border-shallow-water flex flex-col">
                  <Link
                    href={sec.href}
                    className="py-2 text-coral-deep font-semibold text-sm"
                    onClick={closeMobile}
                  >
                    {sec.all}
                  </Link>
                  {sec.items.map((item) => (
                    <Link
                      key={item.slug}
                      href={`${sec.href}/${item.slug}`}
                      className="py-2 text-charcoal-sea/80 text-sm hover:text-charcoal-sea"
                      onClick={closeMobile}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <Link href="/packages" className={mobileLink} onClick={closeMobile}>Packages</Link>
          <Link href="/gallery" className={mobileLink} onClick={closeMobile}>Gallery</Link>
          <Link href="/blog" className={mobileLink} onClick={closeMobile}>Blog</Link>
          <Link href="/about" className={mobileLink} onClick={closeMobile}>About Us</Link>
          <Link href="/contact" className={mobileLink} onClick={closeMobile}>Contact</Link>
          <div className="pt-4 border-t border-rule">
            <Link href="/book" className={`${buttonClass("action", "lg")} w-full`} onClick={closeMobile}>
              Book a Dive
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
