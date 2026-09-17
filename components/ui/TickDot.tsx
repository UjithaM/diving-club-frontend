/** The list tick used in page bodies: a teal disc with an ink check (5.13:1). */
export default function TickDot() {
  return (
    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-shallow-water" aria-hidden="true">
      <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
        <path d="M4 10.5l4 4 8-9" stroke="var(--color-surface-dark)" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
