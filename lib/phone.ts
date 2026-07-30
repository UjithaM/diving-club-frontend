import { parsePhoneNumber } from "react-phone-number-input";

/**
 * Split the E.164 value from <PhoneInput> into the two fields the API wants:
 * a national number and a dial code with a plus ("+94743945010" → "743945010" + "+94").
 */
export function splitPhone(e164: string): { phone: string; country_code: string } {
  const parsed = e164 ? parsePhoneNumber(e164) : undefined;
  // ponytail: unparseable → pass it through and let the server say what's wrong
  if (!parsed) return { phone: e164, country_code: "" };
  return { phone: parsed.nationalNumber, country_code: `+${parsed.countryCallingCode}` };
}
