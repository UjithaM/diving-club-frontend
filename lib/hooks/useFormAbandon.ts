"use client";

import { useEffect, useRef } from "react";
import { trackBookingAbandon, trackBookingStart } from "@/lib/ads";

/**
 * Turns "lots of people try to book and leave" into numbers: how many started filling the
 * form in, which field they were on when they gave up, and how many never submitted.
 *
 * `pagehide` rather than `beforeunload` — mobile Safari skips beforeunload when a page goes
 * into the bfcache, and mobile is most of the traffic this is meant to measure.
 */
export function useFormAbandon(source: string) {
  const started = useRef(false);
  const submitted = useRef(false);
  const lastField = useRef("");

  useEffect(() => {
    const onHide = () => {
      if (started.current && !submitted.current) {
        trackBookingAbandon(source, lastField.current);
      }
    };
    window.addEventListener("pagehide", onHide);
    return () => window.removeEventListener("pagehide", onHide);
  }, [source]);

  return {
    /**
     * Wire to the form's `onFocusCapture` — one listener catches every field, including the
     * phone input's internal `<input>`, which no per-field handler would reach.
     */
    noteFocus(e: React.FocusEvent<HTMLElement>) {
      const el = e.target as HTMLInputElement;
      lastField.current = el.name || el.id || "";
      if (!started.current) {
        started.current = true;
        trackBookingStart(source);
      }
    },
    noteSubmitted() {
      submitted.current = true;
    },
  };
}
