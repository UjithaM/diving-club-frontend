"use client";

import { useState } from "react";
import RawPhoneInput, { type Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { sharedProps, wrapperClass } from "./phoneShared";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  invalid?: boolean;
}

/**
 * Plain controlled phone input, for forms that aren't on react-hook-form — the contact form,
 * which validates natively and asks for a number only as an optional extra.
 *
 * Booking forms use PhoneField instead; see the note there on why the two variants are kept
 * in separate files.
 */
export default function PhoneInput({ value, onChange, required, invalid }: PhoneInputProps) {
  const [country, setCountry] = useState<Country>("LK");

  return (
    <div className="phone-input-wrapper">
      <RawPhoneInput
        {...sharedProps}
        numberInputProps={{ ...sharedProps.numberInputProps, required }}
        defaultCountry={country}
        onCountryChange={(c) => c && setCountry(c)}
        value={value}
        onChange={(v) => onChange(v ?? "")}
        className={wrapperClass(invalid)}
      />
    </div>
  );
}
