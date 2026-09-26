"use client";

import { useState } from "react";

/**
 * One field joined to one button: "tell me when next season opens / a deal starts". The visible
 * heading lives with the section, so the label here is for screen readers only.
 */
export default function NotifyForm({ source, label }: { source: string; label: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const id = `notify-${source}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;

    try {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? data.message ?? "Couldn't save that. Please try again.");
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't save that. Please try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p role="status" className="pop-in flex items-center gap-3 font-semibold">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-dark" aria-hidden="true">
          <svg className="draw-check" width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M4 10.5l4 4 8-9" stroke="var(--color-sunrise)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        You&apos;re on the list. We&apos;ll email you when it opens.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-[20rem] sm:max-w-md">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div
        className={`flex min-h-14 items-center rounded-[3px] border-2 bg-warm-white shadow-[0_18px_30px_-20px_rgba(15,30,37,0.7)] transition-[border-color,box-shadow] duration-150 focus-within:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-surface-dark)_22%,transparent)] ${
          error ? "border-coral-deep" : "border-surface-dark"
        }`}
      >
        <input
          id={id}
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : `${id}-hint`}
          className="min-w-0 flex-1 self-stretch bg-transparent pl-4 pr-2 text-base text-charcoal-sea placeholder:text-charcoal-sea/55 focus:outline-none sm:text-sm"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="mr-2 flex h-10 shrink-0 items-center rounded-full bg-surface-dark px-4 text-sm font-bold text-sunrise transition-colors hover:bg-charcoal-sea disabled:opacity-70 cursor-pointer"
        >
          {status === "submitting" ? "Saving…" : "Notify me"}
        </button>
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm font-bold text-surface-dark">
          {error}
        </p>
      ) : (
        <p id={`${id}-hint`} className="mt-2 text-xs text-muted">
          Season news and deals only. Unsubscribe any time.
        </p>
      )}
    </form>
  );
}
