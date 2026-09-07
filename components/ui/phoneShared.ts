import type { Country } from "react-phone-number-input";
import CountrySelect from "./CountrySelect";

/**
 * Config shared by both phone inputs.
 *
 * Kept in its own module with no runtime import from `react-phone-number-input` — the plain
 * and react-hook-form variants come from two different entry points, and a file importing
 * both drags both component trees into every page that renders either. `Country` is a type,
 * so it erases.
 */

/**
 * Pinned above the divider so most visitors never search: Sri Lanka, then the usual
 * Trincomalee source markets. "..." is the library's token for "everything else,
 * alphabetical".
 *
 * Replace this with real data once bookings have volume — `country_code` is stored on
 * every booking row, so the top nine are one GROUP BY away.
 */
export const TOP_COUNTRIES: (Country | "|" | "...")[] = [
  "LK", "GB", "DE", "FR", "NL", "RU", "IN", "AU", "US", "|", "...",
];

export const wrapperClass = (invalid?: boolean) =>
  `flex items-center gap-2 w-full min-h-[52px] border rounded-xl px-3 py-3 focus-within:ring-2 ${
    invalid
      ? "border-tropic-coral focus-within:ring-tropic-coral bg-tropic-coral/[0.03]"
      : "border-charcoal-sea/20 focus-within:ring-shallow-water"
  }`;

export const sharedProps = {
  international: true,
  countryCallingCodeEditable: false,
  countrySelectComponent: CountrySelect,
  countryOptionsOrder: TOP_COUNTRIES,
  placeholder: "Enter phone number",
  numberInputProps: {
    // Every form renders this, so the autofill and keyboard hints land in one place.
    // The library sets type="tel"; it doesn't set these.
    autoComplete: "tel",
    enterKeyHint: "next" as const,
    className:
      "flex-1 bg-transparent outline-none text-charcoal-sea placeholder:text-charcoal-sea/40 text-sm",
  },
};
