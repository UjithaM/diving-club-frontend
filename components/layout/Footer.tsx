import Link from "next/link";
import Image from "next/image";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

const link = "text-sm text-warm-white/74 hover:text-warm-white transition-colors";
const heading = "text-label uppercase font-semibold text-sunrise mb-5";

export default function Footer() {
  return (
    <footer className="zone-abyss mt-auto border-t-2 border-tropic-coral">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 pb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
        <div className="sm:col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-3 mb-5 hover:opacity-85 transition-opacity w-fit">
            <Image
              src="/logo.webp"
              alt="Diving Club logo"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="font-display font-extrabold text-lg tracking-[-0.02em] text-warm-white">
              Diving Club
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-muted mb-5 max-w-[30ch]">
            PADI-certified diving center in Trincomalee, Sri Lanka. Exploring the ocean since 2010.
          </p>
          <a
            href="https://wa.me/94743945010"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 min-h-11 text-sm font-semibold text-sunrise hover:text-warm-white transition-colors"
          >
            <WhatsAppIcon size={16} />
            WhatsApp
          </a>
        </div>

        <div>
          <p className={heading}>Explore</p>
          <ul className="space-y-2.5">
            <li><Link href="/courses" className={link}>PADI Courses</Link></li>
            <li><Link href="/dive-sites" className={link}>Dive Sites</Link></li>
            <li><Link href="/activities" className={link}>Activities</Link></li>
            <li><Link href="/packages" className={link}>Dive &amp; Activity Packages</Link></li>
            <li><Link href="/scuba-diving-in-trincomalee" className={link}>Trincomalee Guide</Link></li>
            <li><Link href="/scuba-diving-in-sri-lanka" className={link}>Sri Lanka Diving</Link></li>
            <li><Link href="/gallery" className={link}>Gallery</Link></li>
            <li><Link href="/faq" className={link}>FAQ</Link></li>
            <li><Link href="/blog" className={link}>Blog</Link></li>
            <li><Link href="/about" className={link}>About Us</Link></li>
            <li><Link href="/contact" className={link}>Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className={heading}>Popular Courses</p>
          <ul className="space-y-2.5">
            <li><Link href="/courses/discover-scuba-diving" className={link}>Discover Scuba</Link></li>
            <li><Link href="/courses/open-water-diver" className={link}>Open Water Diver</Link></li>
            <li><Link href="/courses/advanced-open-water" className={link}>Advanced Open Water</Link></li>
            <li><Link href="/courses/divemaster" className={link}>Divemaster</Link></li>
          </ul>
        </div>

        <div>
          <p className={heading}>Find Us</p>
          <address className="not-italic space-y-2.5">
            <p className="text-sm text-warm-white/74 leading-relaxed">74/9, Sandy Cove<br />31000, Trincomalee<br />Sri Lanka</p>
            <p>
              <a href="https://wa.me/94743945010" target="_blank" rel="noopener noreferrer" className={`${link} tabular`}>0743 945 010</a>
            </p>
            <p>
              <a href="https://wa.me/94743945010" className={link} target="_blank" rel="noopener noreferrer">
                WhatsApp us
              </a>
            </p>
            <p>
              <a href="mailto:info@divingclub.lk" className={link}>
                info@divingclub.lk
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-rule">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <p className="text-xs text-warm-white/70">© {new Date().getFullYear()} Diving Club. All rights reserved.</p>
          {/* The payment gateway's partner banks check these three are reachable from the
              site before they activate an account — keep all three linked. */}
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-1" aria-label="Legal">
            <Link href="/terms" className="text-xs text-warm-white/70 hover:text-warm-white transition-colors py-1">Terms &amp; Conditions</Link>
            <Link href="/refund-policy" className="text-xs text-warm-white/70 hover:text-warm-white transition-colors py-1">Refund Policy</Link>
            <Link href="/privacy-policy" className="text-xs text-warm-white/70 hover:text-warm-white transition-colors py-1">Privacy Policy</Link>
          </nav>
          <p className="text-label uppercase text-warm-white/70 tabular">PADI Certified · Est. 2010 · Trincomalee</p>
        </div>
      </div>
    </footer>
  );
}
