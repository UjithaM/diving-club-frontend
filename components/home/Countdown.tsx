"use client";

import { useSyncExternalStore } from "react";
import Readout from "@/components/ui/Readout";

/**
 * Days · hours · minutes to the book-by moment, as dive-computer readouts.
 * The clock is read in whole minutes: the server's minute for the first paint (so hydration
 * matches), the visitor's after that, and a re-render only when the minute actually changes.
 */
const minuteNow = () => Math.floor(Date.now() / 6e4);

function subscribe(onTick: () => void) {
  const id = setInterval(onTick, 10_000);
  return () => clearInterval(id);
}

export default function Countdown({ endsAt, serverNow }: { endsAt: string; serverNow: number }) {
  const now = useSyncExternalStore(subscribe, minuteNow, () => Math.floor(serverNow / 6e4)) * 6e4;

  const left = Math.max(new Date(endsAt).getTime() - now, 0);
  const days = Math.floor(left / 864e5);
  const hours = Math.floor((left % 864e5) / 36e5);
  const minutes = Math.floor((left % 36e5) / 6e4);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div role="timer" aria-label={`${days} days, ${hours} hours and ${minutes} minutes left`}>
      <Readout
        cols={3}
        size="section"
        className="[&>div:last-child]:hidden sm:[&>div:last-child]:flex"
        cells={[
          { value: days, label: days === 1 ? "Day" : "Days" },
          { value: pad(hours), label: "Hours" },
          { value: pad(minutes), label: "Minutes" },
        ]}
      />
    </div>
  );
}
