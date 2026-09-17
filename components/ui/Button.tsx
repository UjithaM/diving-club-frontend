import Link from "next/link";

type Variant = "action" | "ink" | "ghost" | "line";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-[2px] transition-colors duration-200 whitespace-nowrap";

const sizes = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-13 px-7 text-base",
};

/**
 * action — tropic coral with dark ink (5.51:1). The site's one "do this" colour.
 * ink    — for sunrise fields, where coral would sit on its own neighbour.
 * ghost  — a quiet secondary: text plus arrow, inherits the zone's ink.
 * line   — outlined, inherits the zone's ink.
 */
const variants: Record<Variant, string> = {
  action: "bg-action text-action-ink hover:bg-action-hover",
  ink: "bg-surface-dark text-warm-white hover:bg-charcoal-sea",
  ghost: "px-0! w-fit justify-start! underline-offset-4 hover:underline",
  line: "border-2 border-current hover:bg-rule",
};

export function buttonClass(variant: Variant = "action", size: keyof typeof sizes = "md") {
  return `${base} ${sizes[size]} ${variants[variant]}`;
}

export function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export default function Button({
  href,
  variant = "action",
  size = "md",
  arrow = false,
  className = "",
  children,
  ...rest
}: {
  href: string;
  variant?: Variant;
  size?: keyof typeof sizes;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">) {
  const cls = `${buttonClass(variant, size)} ${className}`;
  const body = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );
  // External links (wa.me, maps) stay plain anchors; everything on-site goes through Link.
  if (/^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
        {body}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {body}
    </Link>
  );
}
