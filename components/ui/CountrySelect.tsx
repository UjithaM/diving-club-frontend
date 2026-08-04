"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getCountryCallingCode, type Country } from "react-phone-number-input";
import { matchesCountry } from "@/lib/country-search";

/** What react-phone-number-input hands a `countrySelectComponent`. */
interface Option {
  value?: string;
  label: string;
  divider?: boolean;
}

interface CountrySelectProps {
  value?: string;
  onChange: (value?: string) => void;
  options: Option[];
  disabled?: boolean;
  readOnly?: boolean;
}

/** Same CDN the library's own flags come from, so nothing new is loaded. */
const flagSrc = (iso: string) =>
  `https://purecatamphetamine.github.io/country-flag-icons/3x2/${iso}.svg`;

/** "ZZ" is the library's stand-in for International, which has no flag or dial code. */
function dialCode(iso?: string): string {
  if (!iso) return "";
  try {
    return getCountryCallingCode(iso as Country);
  } catch {
    return "";
  }
}

function Flag({ iso, className }: { iso?: string; className: string }) {
  if (!iso) {
    return (
      <span className={`${className} grid place-items-center text-[10px] text-charcoal-sea/50`} aria-hidden="true">
        🌐
      </span>
    );
  }
  return (
    // Not next/image: these are third-party SVGs, which Next refuses to optimise without
    // dangerouslyAllowSVG, and 240 of them would each need a remotePatterns round trip.
    // Native lazy loading is the right tool — without it, opening the list fires 240 requests.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={flagSrc(iso)}
      alt=""
      loading="lazy"
      className={`${className} object-cover rounded-[2px]`}
    />
  );
}

/**
 * Searchable country picker: a bottom sheet on phones, a dropdown on desktop.
 *
 * Replaces the native <select>, which on iOS is a scroll wheel through ~240 countries with
 * no search at all — visitors were opening it, failing to find their country and leaving.
 * Matches on name, ISO code and dial code, so "germany", "de", "+49" and "49" all work.
 */
export default function CountrySelect({
  value,
  onChange,
  options,
  disabled,
  readOnly,
}: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // The library has already applied `countryOptionsOrder`, so the pinned countries and their
  // divider arrive in place. Dividers only make sense unfiltered — once someone types, the
  // grouping they separate no longer exists.
  const results = useMemo(() => {
    const real = options.filter((o) => !o.divider);
    if (!query.trim()) return options;
    return real.filter((o) => matchesCountry(o.label, o.value ?? "", dialCode(o.value), query));
  }, [options, query]);

  /** Indexes that can actually be selected, so arrow keys skip the dividers. */
  const selectable = useMemo(
    () => results.map((o, i) => (o.divider ? -1 : i)).filter((i) => i >= 0),
    [results],
  );

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) close();
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  // Without this the page scrolls behind the sheet on mobile, which reads as the picker
  // having dragged the whole page sideways.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLElement>('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  function close() {
    setOpen(false);
    setQuery("");
    triggerRef.current?.focus();
  }

  function select(option: Option) {
    onChange(option.value || undefined);
    setOpen(false);
    setQuery("");
    triggerRef.current?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const option = results[active];
      if (option && !option.divider) select(option);
      return;
    }
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;

    e.preventDefault();
    const at = selectable.indexOf(active);
    const step = e.key === "ArrowDown" ? 1 : -1;
    // Wraps, so holding one arrow never dead-ends at an edge.
    const next = (at + step + selectable.length) % selectable.length;
    setActive(selectable[next] ?? 0);
  }

  const selected = options.find((o) => o.value === value && !o.divider);
  const code = dialCode(value);
  const highlighted = results[active];
  const activeOption = highlighted && !highlighted.divider ? highlighted : undefined;

  return (
    <div className="relative" ref={containerRef}>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled || readOnly}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Country: ${selected?.label ?? "International"}. Change`}
        className="flex items-center gap-1.5 shrink-0 disabled:opacity-50"
      >
        <Flag iso={value} className="w-6 h-4" />
        <span className="text-sm text-charcoal-sea tabular-nums">{code ? `+${code}` : ""}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-charcoal-sea/50" />
        </svg>
      </button>

      {open && (
        <>
          {/* Backdrop is mobile-only; on desktop the outside-click handler is enough. It
              needs its own onClick — it renders inside containerRef, so the outside-click
              listener never fires for it. */}
          <div
            onClick={close}
            className="fixed inset-0 z-40 bg-charcoal-sea/40 sm:hidden"
            aria-hidden="true"
          />

          <div
            onKeyDown={onKeyDown}
            className="
              fixed inset-x-0 bottom-0 z-50 flex max-h-[75svh] flex-col rounded-t-2xl border-t border-charcoal-sea/10 bg-white shadow-2xl
              sm:absolute sm:inset-x-auto sm:bottom-auto sm:top-full sm:mt-2 sm:w-80 sm:max-h-80 sm:rounded-2xl sm:border
            "
          >
            <div className="p-3 border-b border-charcoal-sea/10">
              <input
                autoFocus
                type="text"
                value={query}
                // Reset the highlight here rather than syncing it from `results` in an
                // effect — typing is the only thing that reorders the list. Index 0 is
                // always selectable: the divider only ever sits mid-list, and filtering
                // drops it entirely.
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Search country or code…"
                aria-label="Search country or dialling code"
                // Focus stays in the input while the arrows move the highlight, so without
                // aria-activedescendant a screen reader announces nothing as it moves.
                role="combobox"
                aria-expanded
                aria-controls="country-listbox"
                aria-autocomplete="list"
                aria-activedescendant={activeOption && `country-${activeOption.value ?? "ZZ"}`}
                className="w-full rounded-xl border border-charcoal-sea/20 px-3 py-2.5 text-sm text-charcoal-sea placeholder:text-charcoal-sea/40 focus:outline-none focus:ring-2 focus:ring-shallow-water"
              />
            </div>

            <ul
              ref={listRef}
              id="country-listbox"
              role="listbox"
              aria-label="Country"
              className="flex-1 overflow-y-auto overscroll-contain py-1"
            >
              {results.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-charcoal-sea/50">
                  No country matches “{query}”.
                </li>
              )}

              {results.map((option, i) =>
                option.divider ? (
                  // role=presentation: a listbox's children must all be options, and a bare
                  // <li> in there makes screen readers miscount the list.
                  <li
                    key={`divider-${i}`}
                    role="presentation"
                    className="my-1 border-t border-charcoal-sea/10"
                    aria-hidden="true"
                  />
                ) : (
                  <li
                    key={option.value ?? "ZZ"}
                    id={`country-${option.value ?? "ZZ"}`}
                    role="option"
                    aria-selected={option.value === value}
                    data-active={i === active}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => select(option)}
                    className={`flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm ${
                      i === active ? "bg-shallow-water/10" : ""
                    } ${option.value === value ? "font-semibold text-charcoal-sea" : "text-charcoal-sea/80"}`}
                  >
                    <Flag iso={option.value} className="w-6 h-4 shrink-0" />
                    <span className="flex-1 truncate">{option.label}</span>
                    {dialCode(option.value) && (
                      <span className="tabular-nums text-charcoal-sea/50">+{dialCode(option.value)}</span>
                    )}
                  </li>
                ),
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
