declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

const ADS_ID = "AW-18356209738";

/**
 * Google Ads conversion actions, one per lead type, so Smart Bidding can weigh a
 * form booking differently from a chat. Empty string = action not created yet in
 * the Ads UI; trackConversion still fires the GTM event, just not the conversion.
 */
export const CONVERSIONS = {
  /**
   * Deliberately empty: chats don't reliably become bookings, so WhatsApp is no
   * longer a conversion. The GTM event still fires for analytics — only the Ads
   * conversion is off. (The old "WhatsApp click" action is REMOVED in Ads anyway.)
   */
  whatsapp: "",
  /** "Booking form submitted" — Submit lead form category. Sends value + transaction_id. */
  form: `${ADS_ID}/wS7xCI3FrtocEMqQ9rBE`,
};

/** Email + phone for enhanced conversions for leads. */
export interface UserData {
  email?: string;
  phone_number?: string;
}

interface TrackOptions {
  /** Extra keys on the GTM dataLayer push. */
  data?: Record<string, unknown>;
  /** Extra keys on the gtag conversion — value, currency, transaction_id. */
  conversion?: Record<string, unknown>;
  /** Enhanced conversions. Phone must be E.164. */
  userData?: UserData;
}

/**
 * Pushes the GTM event and fires the matching Ads conversion.
 *
 * Every caller is on an anchor that opens a new tab or on a form that stays put,
 * so the page never unloads mid-call — no event_callback or navigation delay needed.
 */
export function trackConversion(event: string, sendTo: string, opts: TrackOptions = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...opts.data });

  if (!sendTo) return;
  if (opts.userData) window.gtag?.("set", "user_data", opts.userData);
  window.gtag?.("event", "conversion", { send_to: sendTo, ...opts.conversion });
}
