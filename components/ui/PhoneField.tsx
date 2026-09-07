"use client";

import RhfPhoneInput from "react-phone-number-input/react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import "react-phone-number-input/style.css";
import { sharedProps, wrapperClass } from "./phoneShared";

interface PhoneFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  /** react-hook-form rules, forwarded to the Controller this renders internally. */
  rules?: { validate?: (value: string) => string | true };
  invalid?: boolean;
  describedBy?: string;
}

/**
 * The react-hook-form phone input, and the reason submit no longer fails silently.
 *
 * The old wrapper rendered an `<input>` with no `name`, so the forms' own
 * `querySelector('[name="phone"]').focus()` matched nothing and quietly did nothing — fill
 * the form in, type a local number without a country code, tap submit, and the page didn't
 * move. This entry point wires the input through react-hook-form's `Controller` and exposes a
 * `focus()` via `useImperativeHandle`, so `shouldFocusError` can actually reach it.
 *
 * Its own file, not a second export from PhoneInput.tsx: the two variants come from separate
 * library entry points, and importing both in one module put both component trees on every
 * page that rendered either — 12 KB gzipped onto /contact, which only needs the plain one.
 */
export default function PhoneField<T extends FieldValues>({
  name,
  control,
  rules,
  invalid,
  describedBy,
}: PhoneFieldProps<T>) {
  return (
    <div className="phone-input-wrapper">
      <RhfPhoneInput
        {...sharedProps}
        name={name}
        control={control}
        rules={rules}
        defaultCountry="LK"
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={wrapperClass(invalid)}
      />
    </div>
  );
}
