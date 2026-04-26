"use client";

import { useState } from "react";
import RawPhoneInput, { type Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";

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
        value={value}
        onChange={(v) => onChange(v ?? "")}
        placeholder="Enter phone number"
        numberInputProps={{
          required,
          className: "flex-1 bg-transparent outline-none text-charcoal-sea placeholder:text-charcoal-sea/40 text-sm",
        }}
        className="flex items-center gap-2 w-full border border-charcoal-sea/20 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-shallow-water"
      />
    </div>
  );
}
