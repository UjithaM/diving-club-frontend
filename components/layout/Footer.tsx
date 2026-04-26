import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-charcoal-sea text-warm-white/80 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="sm:col-span-2 md:col-span-1">
          <p className="text-xl font-bold text-warm-white mb-2">Diving Club</p>
          <p className="text-sm leading-relaxed">
            PADI-certified diving center in Trincomalee, Sri Lanka. Exploring the ocean since 2010.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <p className="font-semibold text-warm-white mb-3">Explore</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/courses" className="hover:text-sunrise transition-colors">PADI Courses</Link></li>
            <li><Link href="/activities" className="hover:text-sunrise transition-colors">Activities</Link></li>
            <li><Link href="/about" className="hover:text-sunrise transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-sunrise transition-colors">Contact</Link></li>
            <li><Link href="/book" className="hover:text-sunrise transition-colors">Book a Dive</Link></li>
          </ul>
        </div>

        {/* Courses */}
        <div>
          <p className="font-semibold text-warm-white mb-3">Popular Courses</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/courses/discover-scuba-diving" className="hover:text-sunrise transition-colors">Discover Scuba</Link></li>
            <li><Link href="/courses/open-water-diver" className="hover:text-sunrise transition-colors">Open Water Diver</Link></li>
            <li><Link href="/courses/advanced-open-water" className="hover:text-sunrise transition-colors">Advanced Open Water</Link></li>
            <li><Link href="/courses/divemaster" className="hover:text-sunrise transition-colors">Divemaster</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="font-semibold text-warm-white mb-3">Find Us</p>
          <address className="text-sm not-italic space-y-2">
            <p>74/9, Sandy Cove<br />31000, Trincomalee<br />Sri Lanka</p>
            <p>
              <a href="tel:0743945010" className="hover:text-sunrise transition-colors">0743945010</a>
            </p>
            <p>
              <a
                href="https://wa.me/94743945010"
                className="hover:text-sunrise transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp us
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-warm-white/50 gap-2">
          <p>© {new Date().getFullYear()} Diving Club Trincomalee. All rights reserved.</p>
          <p>74/9, Sandy Cove, 31000, Trincomalee, Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
}
