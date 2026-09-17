"use client";

/**
 * The filter row for the listing pages: one chip per option with its count, and the live result
 * summary under it. Scrolls sideways on a phone instead of wrapping into a wall of chips.
 */
export function FilterBar({
  options,
  active,
  onChange,
  summary,
}: {
  options: { value: string; label: string; count: number }[];
  active: string;
  onChange: (value: string) => void;
  summary: string;
}) {
  return (
    <div className="mb-8">
      <div className="-mx-5 px-5 sm:mx-0 sm:px-0 overflow-x-auto [scrollbar-width:none]" role="group" aria-label="Filter">
        <div className="flex w-max sm:w-auto sm:flex-wrap gap-2">
          {options.map((o) => {
            const on = o.value === active;
            return (
              <button
                key={o.value}
                type="button"
                aria-pressed={on}
                onClick={() => onChange(o.value)}
                className={`inline-flex items-center gap-2 min-h-11 px-4 rounded-full text-sm font-bold border-2 transition-[background-color,border-color,scale] duration-200 active:scale-95 cursor-pointer ${
                  on
                    ? "bg-surface-dark text-warm-white border-surface-dark"
                    : "bg-warm-white text-charcoal-sea border-transparent hover:border-surface-dark"
                }`}
              >
                {o.label}
                <span
                  className={`min-w-6 rounded-full px-1.5 text-xs tabular ${
                    on ? "bg-warm-white/20" : "bg-charcoal-sea/10"
                  }`}
                >
                  {o.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <p className="mt-5 text-sm font-semibold" aria-live="polite">
        {summary}
      </p>
    </div>
  );
}
