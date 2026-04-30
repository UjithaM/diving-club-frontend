import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="text-warm-white/80 mt-auto" style={{ background: "#0f1e25" }}>
      {/* Top brand accent strip */}
      <div
        className="h-0.5 w-full"
        style={{ background: "linear-gradient(90deg, #F4A261, #E76F51, #2A9D8F)" }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="sm:col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2.5 mb-4 hover:opacity-85 transition-opacity w-fit">
            <Image
              src="/logo.webp"
              alt="Diving Club logo"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="text-xs font-medium tracking-[0.18em] uppercase text-warm-white">
              Diving Club
            </span>
          </Link>
          <p className="text-xs leading-loose text-warm-white/40 mb-4 max-w-[22ch]">
            PADI-certified diving center in Trincomalee, Sri Lanka. Exploring the ocean since 2010.
          </p>
          <a
            href="https://wa.me/94743945010"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-tropic-coral hover:text-warm-white transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
        </div>

        {/* Quick links */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-warm-white/30 mb-5">Explore</p>
          <ul className="space-y-3">
            <li><Link href="/courses" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">PADI Courses</Link></li>
            <li><Link href="/dive-sites" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">Dive Sites</Link></li>
            <li><Link href="/activities" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">Activities</Link></li>
            <li><Link href="/scuba-diving-in-trincomalee" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">Trincomalee Guide</Link></li>
            <li><Link href="/scuba-diving-in-sri-lanka" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">Sri Lanka Diving</Link></li>
            <li><Link href="/gallery" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">Gallery</Link></li>
            <li><Link href="/faq" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">FAQ</Link></li>
            <li><Link href="/blog" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">Blog</Link></li>
            <li><Link href="/about" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Courses */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-warm-white/30 mb-5">Popular Courses</p>
          <ul className="space-y-3">
            <li><Link href="/courses/discover-scuba-diving" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">Discover Scuba</Link></li>
            <li><Link href="/courses/open-water-diver" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">Open Water Diver</Link></li>
            <li><Link href="/courses/advanced-open-water" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">Advanced Open Water</Link></li>
            <li><Link href="/courses/divemaster" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">Divemaster</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-warm-white/30 mb-5">Find Us</p>
          <address className="not-italic space-y-3">
            <p className="text-sm text-warm-white/50 leading-relaxed">74/9, Sandy Cove<br />31000, Trincomalee<br />Sri Lanka</p>
            <p>
              <a href="tel:0743945010" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">0743 945 010</a>
            </p>
            <p>
              <a
                href="https://wa.me/94743945010"
                className="text-sm text-warm-white/50 hover:text-warm-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp us
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-warm-white/25">© {new Date().getFullYear()} Diving Club Trincomalee. All rights reserved.</p>
          <p className="text-[10px] tracking-widest text-warm-white/20 uppercase">PADI Certified · Est. 2010 · Trincomalee</p>
        </div>
      </div>
    </footer>
  );
}
