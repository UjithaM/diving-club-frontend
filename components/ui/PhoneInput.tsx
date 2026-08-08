"use client";

import { useState } from "react";
import RawPhoneInput, { type Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import CountrySelect from "./CountrySelect";

/**
 * Pinned above the divider so most visitors never search: Sri Lanka, then the usual
 * Trincomalee source markets. "..." is the library's token for "everything else,
 * alphabetical".
 *
 * Replace this with real data once bookings have volume — `country_code` is stored on
 * every booking row, so the top nine are one GROUP BY away.
 */
const TOP_COUNTRIES: (Country | "|" | "...")[] = [
  "LK", "GB", "DE", "FR", "NL", "RU", "IN", "AU", "US", "|", "...",
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function PhoneInput({ value, onChange, required }: PhoneInputProps) {
  const [country, setCountry] = useState<Country>("LK");

  return (
    <div className="phone-input-wrapper">
      <RawPhoneInput
        international
        countryCallingCodeEditable={false}
        defaultCountry={country}
        onCountryChange={(c) => c && setCountry(c)}
        countrySelectComponent={CountrySelect}
        countryOptionsOrder={TOP_COUNTRIES}
        value={value}
        onChange={(v) => onChange(v ?? "")}
        placeholder="Enter phone number"
        numberInputProps={{
          required,
          // Both booking forms render this, so the autofill and keyboard hints land in one
          // place. The library sets type="tel"; it doesn't set these.
          autoComplete: "tel",
          enterKeyHint: "next",
          className: "flex-1 bg-transparent outline-none text-charcoal-sea placeholder:text-charcoal-sea/40 text-sm",
        }}
        className="flex items-center gap-2 w-full min-h-[48px] border border-charcoal-sea/20 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-shallow-water"
      />
    </div>
  );
}
