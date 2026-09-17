/**
 * Dive-slate illustrations: one line weight (charcoal-sea, 2px at 1x), flat brand fills, round
 * joins. Every piece is decorative — aria-hidden, no text — and sized by its container.
 */

const INK = "var(--color-charcoal-sea)";
const LINE = {
  stroke: INK,
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type Props = { className?: string; style?: React.CSSProperties };

export function Fish({
  className,
  style,
  body = "var(--color-tropic-coral)",
  stripe = "var(--color-warm-white)",
}: Props & { body?: string; stripe?: string }) {
  // Faces left. Two clownfish bands, a dorsal and a pectoral fin.
  return (
    <svg viewBox="0 0 72 44" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M26 8 C 30 3, 38 3, 42 9" fill={body} {...LINE} />
      <path d="M26 36 C 29 40, 35 41, 38 36" fill={body} {...LINE} />
      <path
        d="M4 22 C 12 9, 30 5, 46 13 L 64 5 C 60 13, 60 31, 64 39 L 46 31 C 30 39, 12 35, 4 22 Z"
        fill={body}
        {...LINE}
      />
      <path d="M20 9.5 C 16 16, 16 28, 20 34.5 L 26 35 C 23 28, 23 16, 26 9 Z" fill={stripe} {...LINE} />
      <path d="M36 9.5 C 33 16, 33 28, 36 34 L 41 32.5 C 39 26, 39 18, 41 11.5 Z" fill={stripe} {...LINE} />
      <path d="M30 22 C 34 24, 34 28, 30 29" fill="none" {...LINE} />
      <circle cx="11.5" cy="19.5" r="2.4" fill={INK} />
      <circle cx="12.2" cy="18.8" r="0.8" fill="var(--color-warm-white)" />
      <path d="M6 25 C 8 26, 9.5 26, 11 25" fill="none" {...LINE} strokeWidth={1.5} />
    </svg>
  );
}

export function Tang({ className, style, body = "var(--color-sunrise)" }: Props & { body?: string }) {
  // A tall-bodied reef fish, faces left.
  return (
    <svg viewBox="0 0 60 48" className={className} style={style} aria-hidden="true" focusable="false">
      <path
        d="M4 24 C 8 10, 22 2, 36 8 C 40 10, 42 16, 44 20 L 56 12 L 52 24 L 56 36 L 44 28 C 42 32, 40 38, 36 40 C 22 46, 8 38, 4 24 Z"
        fill={body}
        {...LINE}
      />
      <path d="M22 6 C 26 14, 26 34, 22 42" fill="none" {...LINE} strokeWidth={1.5} />
      <path d="M30 6.5 C 33 14, 33 34, 30 41.5" fill="none" {...LINE} strokeWidth={1.5} />
      <circle cx="12" cy="20" r="2.2" fill={INK} />
      <path d="M5 27 L 9 27" {...LINE} strokeWidth={1.5} />
    </svg>
  );
}

export function Turtle({ className, style }: Props) {
  // Swimming right, front flippers mid-stroke.
  return (
    <svg viewBox="0 0 140 90" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M86 30 C 100 8, 120 4, 128 10 C 118 16, 104 26, 94 38 Z" fill="var(--color-shallow-water)" {...LINE} />
      <path d="M84 60 C 96 78, 112 84, 118 80 C 110 74, 100 64, 92 54 Z" fill="var(--color-shallow-water)" {...LINE} />
      <path d="M34 34 C 24 26, 12 26, 6 30 C 14 34, 22 40, 30 44 Z" fill="var(--color-shallow-water)" {...LINE} />
      <path d="M34 56 C 26 62, 16 66, 10 64 C 16 58, 24 52, 32 50 Z" fill="var(--color-shallow-water)" {...LINE} />
      <path d="M24 46 L 12 47" {...LINE} />
      <path d="M104 40 C 112 30, 128 32, 132 42 C 134 50, 124 56, 112 54 C 106 52, 102 48, 104 40 Z" fill="var(--color-shallow-water)" {...LINE} />
      <circle cx="122" cy="41" r="2.2" fill={INK} />
      <path d="M125 48 C 127 49, 129 48, 130 47" fill="none" {...LINE} strokeWidth={1.5} />
      <ellipse cx="66" cy="45" rx="42" ry="26" fill="var(--color-sunrise)" {...LINE} />
      <path
        d="M66 22 L 66 31 M 50 26 L 54 34 M 82 26 L 78 34 M 54 34 L 66 31 L 78 34 L 80 46 L 66 52 L 52 46 Z M 52 46 L 36 48 M 80 46 L 96 48 M 66 52 L 66 68 M 52 46 L 44 62 M 80 46 L 88 62"
        fill="none"
        {...LINE}
        strokeWidth={1.75}
      />
    </svg>
  );
}

export function Diver({
  className,
  style,
  suit = "var(--color-charcoal-sea)",
  line = INK,
}: Props & { suit?: string; line?: string }) {
  // Swimming right: fins trailing, tank on the back, mask forward, one arm trimmed along the body.
  const L = { ...LINE, stroke: line };
  return (
    <svg viewBox="0 0 220 90" className={className} style={style} aria-hidden="true" focusable="false">
      {/* legs: thigh then shin, drawn as outlined capsules so the knees read */}
      <path d="M108 42 L 82 39 L 58 33" fill="none" stroke={line} strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M108 42 L 82 39 L 58 33" fill="none" stroke={suit} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M108 50 L 84 55 L 60 60" fill="none" stroke={line} strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M108 50 L 84 55 L 60 60" fill="none" stroke={suit} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
      {/* fins: a foot pocket at the ankle, the blade widening straight back along the shin */}
      <path d="M62 29 L 30 18 C 20 15, 12 20, 13 27 C 14 33, 22 35, 30 34 L 60 38 Z" fill="var(--color-tropic-coral)" {...L} />
      <path d="M62 56 L 32 57 C 22 57, 14 62, 16 69 C 18 75, 26 76, 33 73 L 62 64 Z" fill="var(--color-tropic-coral)" {...L} />
      <path d="M50 31 L 22 24 M 50 34.5 L 24 31 M 50 59 L 24 64 M 50 62 L 26 70" fill="none" {...L} strokeWidth={1.25} />
      <path d="M66 28 C 60 29, 58 35, 61 39 C 64 40, 68 36, 66 28 Z" fill={suit} {...L} />
      <path d="M66 55 C 60 56, 58 62, 61 66 C 64 66, 68 62, 66 55 Z" fill={suit} {...L} />
      {/* torso */}
      <path d="M104 36 C 122 28, 150 28, 168 36 C 172 40, 172 50, 166 54 C 150 60, 122 60, 104 54 C 97 50, 97 40, 104 36 Z" fill={suit} {...L} />
      {/* tank */}
      <rect x="110" y="16" width="52" height="15" rx="7.5" fill="var(--color-sunrise)" {...L} />
      <path d="M125 16 L 125 31 M 148 16 L 148 31" fill="none" {...L} strokeWidth={1.5} />
      <path d="M162 23 L 170 23 L 174 32" fill="none" {...L} />
      {/* BCD strap */}
      <path d="M132 32 L 136 57" stroke="var(--color-shallow-water)" strokeWidth={4} strokeLinecap="round" />
      {/* arm, reaching forward under the head */}
      <path d="M156 50 L 172 60 L 190 62" fill="none" stroke={line} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M156 50 L 172 60 L 190 62" fill="none" stroke={suit} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      {/* head */}
      <circle cx="180" cy="40" r="12.5" fill={suit} {...L} />
      {/* mask */}
      <path d="M183 31 L 196 31 C 199 31, 201 33, 201 36 L 201 43 C 201 46, 199 47, 196 47 L 186 47 C 183 47, 182 45, 182 42 Z" fill="var(--color-shallow-water)" {...L} />
      <path d="M187 35 L 192 35" stroke="var(--color-warm-white)" strokeWidth={2} strokeLinecap="round" />
      {/* regulator */}
      <circle cx="193" cy="52" r="3.5" fill="var(--color-sunrise)" {...L} />
    </svg>
  );
}

export function Mask({ className, style }: Props) {
  // Front view, strap behind, snorkel clipped on the right.
  return (
    <svg viewBox="0 0 96 64" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M4 26 C 4 18, 10 16, 14 18 M 82 18 C 86 16, 92 18, 92 26" fill="none" {...LINE} strokeWidth={4} stroke="var(--color-charcoal-sea)" />
      <path
        d="M14 16 C 14 12, 17 10, 21 10 L 75 10 C 79 10, 82 12, 82 16 L 82 34 C 82 42, 76 46, 68 46 C 60 46, 54 40, 48 40 C 42 40, 36 46, 28 46 C 20 46, 14 42, 14 34 Z"
        fill="var(--color-tropic-coral)"
        {...LINE}
      />
      <path
        d="M20 18 L 44 18 L 44 32 C 44 36, 40 39, 34 39 L 28 39 C 23 39, 20 36, 20 32 Z M 52 18 L 76 18 L 76 32 C 76 36, 73 39, 68 39 L 62 39 C 56 39, 52 36, 52 32 Z"
        fill="var(--color-shallow-water)"
        {...LINE}
      />
      <path d="M25 22 L 31 22 M 57 22 L 63 22" stroke="var(--color-warm-white)" strokeWidth={2.5} strokeLinecap="round" />
      <path d="M88 4 L 88 48 C 88 56, 82 60, 76 58 L 70 56" fill="none" {...LINE} strokeWidth={5} stroke="var(--color-sunrise)" />
      <path d="M88 4 L 88 48 C 88 56, 82 60, 76 58 L 70 56" fill="none" {...LINE} strokeWidth={1.25} />
    </svg>
  );
}

export function Fins({ className, style }: Props) {
  return (
    <svg viewBox="0 0 84 90" className={className} style={style} aria-hidden="true" focusable="false">
      {[0, 1].map((i) => (
        <g key={i} transform={i ? "translate(40 6) rotate(8 20 40)" : "rotate(-8 20 40)"}>
          <path d="M8 84 C 4 60, 6 34, 12 24 L 30 24 C 36 34, 38 60, 34 84 C 28 88, 14 88, 8 84 Z" fill={i ? "var(--color-sunrise)" : "var(--color-tropic-coral)"} {...LINE} />
          <path d="M12 24 C 12 12, 14 4, 21 4 C 28 4, 30 12, 30 24 Z" fill="var(--color-charcoal-sea)" {...LINE} />
          <path d="M15 40 L 13 80 M 27 40 L 29 80" fill="none" {...LINE} strokeWidth={1.5} />
        </g>
      ))}
    </svg>
  );
}

export function BranchCoral({ className, style, color = "var(--color-tropic-coral)" }: Props & { color?: string }) {
  const branch = { fill: "none", stroke: color, strokeWidth: 7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 100 110" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M50 108 L 50 70 C 50 56, 40 50, 30 44 L 22 26 M 30 44 L 14 40 M 50 70 C 52 56, 62 48, 70 40 L 74 20 M 70 40 L 88 34 M 50 84 C 42 80, 36 74, 34 64 M 50 60 L 50 34 L 44 16 M 50 34 L 58 12" {...branch} />
      <path d="M50 108 L 50 70 C 50 56, 40 50, 30 44 L 22 26 M 30 44 L 14 40 M 50 70 C 52 56, 62 48, 70 40 L 74 20 M 70 40 L 88 34 M 50 84 C 42 80, 36 74, 34 64 M 50 60 L 50 34 L 44 16 M 50 34 L 58 12" fill="none" {...LINE} strokeWidth={1.25} strokeOpacity={0.55} />
    </svg>
  );
}

export function FanCoral({ className, style, color = "var(--color-sunrise)" }: Props & { color?: string }) {
  return (
    <svg viewBox="0 0 120 110" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M60 106 C 20 96, 6 60, 16 34 C 30 8, 90 8, 104 34 C 114 60, 100 96, 60 106 Z" fill={color} {...LINE} />
      <path d="M60 106 L 60 20 M 60 90 L 30 40 M 60 90 L 90 40 M 60 76 L 20 58 M 60 76 L 100 58 M 45 65 L 42 26 M 75 65 L 78 26 M 60 50 L 48 16 M 60 50 L 72 16" fill="none" {...LINE} strokeWidth={1.5} />
    </svg>
  );
}

export function BrainCoral({ className, style }: Props) {
  return (
    <svg viewBox="0 0 110 64" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M4 62 C 4 24, 28 6, 55 6 C 82 6, 106 24, 106 62 Z" fill="var(--color-shallow-water)" {...LINE} />
      <path
        d="M16 56 C 16 40, 26 30, 34 34 C 42 38, 38 50, 46 50 C 54 50, 50 22, 62 22 C 74 22, 68 44, 78 44 C 86 44, 84 30, 92 34 C 98 38, 96 50, 96 56"
        fill="none"
        {...LINE}
        strokeWidth={1.75}
      />
      <path d="M28 20 C 34 14, 44 14, 48 16 M 70 14 C 78 14, 86 18, 90 24" fill="none" {...LINE} strokeWidth={1.75} />
    </svg>
  );
}

export function Seaweed({ className, style, color = "var(--color-shallow-water)" }: Props & { color?: string }) {
  return (
    <svg viewBox="0 0 60 140" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M22 138 C 10 118, 32 104, 20 84 C 8 64, 30 50, 18 30 C 12 20, 16 10, 22 4 C 30 14, 30 24, 26 32 C 38 52, 16 66, 28 86 C 40 106, 20 118, 30 138 Z" fill={color} {...LINE} />
      <path d="M36 138 C 30 124, 46 114, 40 98 C 36 88, 42 80, 48 76 C 52 86, 50 94, 48 100 C 54 116, 42 126, 44 138 Z" fill={color} {...LINE} />
    </svg>
  );
}

/** Rising bubbles. Each circle drifts on its own timing (see .bubble in globals.css). */
export function Bubbles({ className, count = 7 }: { className?: string; count?: number }) {
  const seeds = [
    [8, 6, 0], [22, 4, 1.4], [14, 9, 2.6], [30, 5, 0.8], [4, 3, 3.4], [26, 7, 4.1], [18, 4, 5.2], [34, 3, 2],
  ].slice(0, count);
  return (
    <span className={`bubbles ${className ?? ""}`} aria-hidden="true">
      {seeds.map(([x, r, d], i) => (
        <span
          key={i}
          className="bubble"
          style={{ left: `${x * 2.5}%`, width: r * 2, height: r * 2, animationDelay: `${d}s` } as React.CSSProperties}
        />
      ))}
    </span>
  );
}
