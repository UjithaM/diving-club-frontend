export interface ReadoutCell {
  value: React.ReactNode;
  label: React.ReactNode;
}

/**
 * Dive-computer readouts: tabular numerals over an instrument label, in ruled cells.
 * `cols` sets the column count from `sm` up; phones always get two.
 */
export default function Readout({
  cells,
  cols = 4,
  size = "readout",
  className = "",
}: {
  cells: ReadoutCell[];
  cols?: 2 | 3 | 4;
  size?: "readout" | "section" | "sub";
  className?: string;
}) {
  const grid = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-4" }[cols];
  const text = { readout: "text-readout", section: "text-section", sub: "text-sub" }[size];
  return (
    <dl className={`grid grid-cols-2 ${grid} border-t-2 border-current ${className}`}>
      {cells.map((c, i) => (
        <div
          key={i}
          className="flex flex-col-reverse gap-2 py-4 pr-4 border-b border-rule sm:pl-5 sm:border-l sm:first:pl-0 sm:first:border-l-0"
        >
          <dt className="text-label uppercase font-semibold text-muted">{c.label}</dt>
          <dd className={`font-display font-bold tabular ${text}`}>{c.value}</dd>
        </div>
      ))}
    </dl>
  );
}
