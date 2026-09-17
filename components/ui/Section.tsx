export type Zone = "surface" | "sunrise" | "shallow" | "deep" | "abyss";

/**
 * A stop on the descent. `zone` sets the ground and ink; `depth` and `log` render the stop in
 * the section's margin ("09 m" over the log label) — the log label is the section's own copy,
 * placed beside the content rather than stacked above the heading.
 */
export default function Section({
  zone = "surface",
  depth,
  log,
  id,
  className = "",
  inner = "",
  as: Tag = "section",
  children,
  ...rest
}: {
  zone?: Zone;
  depth?: number;
  log?: string;
  id?: string;
  className?: string;
  inner?: string;
  as?: "section" | "div" | "article" | "aside";
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  const hasStop = depth !== undefined || log;
  return (
    <Tag id={id} className={`zone-${zone} px-5 sm:px-8 py-12 sm:py-16 lg:py-28 ${className}`} {...rest}>
      <div
        className={`max-w-6xl mx-auto ${
          hasStop ? "grid gap-y-6 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-x-10" : ""
        } ${inner}`}
      >
        {hasStop && <DepthStop depth={depth} log={log} />}
        <div className="min-w-0">{children}</div>
      </div>
    </Tag>
  );
}

export function DepthStop({ depth, log }: { depth?: number; log?: string }) {
  return (
    <div className="flex items-baseline gap-3 lg:flex-col lg:gap-2 lg:pt-3 border-t-2 border-current pt-3 lg:self-start">
      {depth !== undefined && (
        <span className="depth-stop font-display text-sub font-bold" aria-hidden="true">
          {String(depth).padStart(2, "0")}&thinsp;m
        </span>
      )}
      {log && <p className="text-label uppercase font-semibold text-muted">{log}</p>}
    </div>
  );
}
