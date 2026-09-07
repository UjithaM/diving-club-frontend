/**
 * The shape both booking forms hold, and the one rule that can only run in the browser.
 *
 * The ad landers render a subset of these fields; the ones they skip are optional, so /dive
 * and /book can't drift apart the way they had.
 */
import { isValidPhoneNumber } from "react-phone-number-input";
import { phoneError } from "./booking-schema";

export interface BookingFormValues {
  /**
   * On the ad pages this is the item select (or the locked fixedItem). On /book it mirrors
   * the cart: selecting an item adds a line and sets this at the same time, so "the cart is
   * empty" and "no item chosen" are the same failure and get the same message.
   */
  item: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  people: string;
  /**
   * Clamped against the item's own cap at submit — the cap lives on the item and changes with
   * the selection, so it isn't a fixed rule. The backend owns the real limit and its rejection
   * lands back on this field.
   */
  quantity?: string;
  /**
   * Never rendered as an input — the picker holds the real choice, which is per line and so
   * can't live in a single form field. This exists so a backend slot rejection has somewhere
   * to land, and react-hook-form will only accept setError for a key it knows about.
   */
  slot_id?: string;

  // /book only. Optional so the ad forms, which never render them, still validate.
  nationality?: string;
  notes?: string;
  certificationLevel?: string;
}

/**
 * Presence (shared with the server) plus the country-aware check, which needs libphonenumber's
 * metadata and so can't live in the module the API route imports.
 */
export const phoneFieldError = (v: unknown) =>
  phoneError(v) ||
  (isValidPhoneNumber(String(v ?? ""))
    ? ""
    : "That number doesn't look right for the country picked.");

/**
 * react-hook-form needs every field present from the first render or the inputs flip from
 * uncontrolled to controlled once the visitor types.
 */
export const bookingFormDefaults: BookingFormValues = {
  item: "",
  name: "",
  email: "",
  phone: "",
  date: "",
  people: "1",
  quantity: "1",
  slot_id: "",
  nationality: "",
  notes: "",
  certificationLevel: "",
};
