import { Bubbles, Diver, Fish } from "@/components/illustrations/Sea";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import Link from "next/link";

const style = (v: Record<string, string>) => v as React.CSSProperties;

/**
 * The bottom of an inner page: the page's closing question, at depth. `notes` is the small label
 * these bands used to carry above the heading; it now sits on the log line with the depth.
 */
export default function CtaBand({
  notes,
  title,
  body,
  children,
}: {
  notes?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="zone-abyss lane relative overflow-hidden px-5 sm:px-8 pt-3 pb-40 lg:pb-36">
      <div className="ambient inset-x-0 bottom-6 h-24" aria-hidden="true">
        <div className="swim-right absolute left-0 top-0 w-36 lg:w-52" style={style({ "--swim-time": "36s", "--rest": "64%" })}>
          <Diver className="block w-full h-auto" suit="var(--color-shallow-water)" line="var(--color-surface-dark)" />
        </div>
        <Fish className="swim absolute left-0 top-3 w-8" style={style({ "--swim-time": "28s", animationDelay: "-9s", "--rest": "30%" })} />
      </div>
      <div className="ambient left-[6%] top-16 h-[60%] w-24 text-sunrise/50" aria-hidden="true">
        <Bubbles count={7} />
      </div>

      <div className="relative max-w-6xl mx-auto flex items-baseline justify-between gap-4 border-t-2 border-tropic-coral pt-3">
        <span className="font-display font-bold text-sub tabular text-sunrise" aria-hidden="true">18&thinsp;m</span>
        {notes && <p className="text-label uppercase font-semibold text-sunrise text-right">{notes}</p>}
      </div>

      <div className="relative max-w-6xl mx-auto pt-12 lg:pt-16 grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 lg:items-end">
        <h2 className="text-section lg:text-[3.75rem] lg:leading-[0.95] font-extrabold reveal">{title}</h2>
        <div className="reveal">
          {body && <div className="text-lead text-muted max-w-[44ch] mb-8">{body}</div>}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">{children}</div>
        </div>
      </div>
    </section>
  );
}

/** The phone-number WhatsApp button these bands all carry. */
export function WhatsAppButton({ children, href = "https://wa.me/94743945010" }: { children: React.ReactNode; href?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 min-h-13 px-6 rounded-full bg-whatsapp text-surface-dark font-bold hover:bg-whatsapp-hover transition-colors"
    >
      <WhatsAppIcon size={20} />
      {children}
    </a>
  );
}

/** Quiet secondary link for the dark band. */
export function BandLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 min-h-11 font-semibold text-warm-white underline-offset-4 hover:underline">
      {children}
    </Link>
  );
}
