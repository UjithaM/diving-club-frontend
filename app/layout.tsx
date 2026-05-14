import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFab from "@/components/ui/WhatsAppFab";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Diving Club Trincomalee | PADI Courses & Dive Experiences",
    template: "%s | Diving Club Trincomalee",
  },
  description:
    "PADI-certified diving center in Trincomalee, Sri Lanka. Open Water courses, fun diving, snorkeling, and whale watching in one of Asia's most beautiful dive destinations.",
  metadataBase: new URL("https://divingclub.lk"),
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "Diving Club Trincomalee",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EducationalOrganization"],
  "@id": "https://divingclub.lk",
  name: "Diving Club",
  description:
    "PADI-certified diving center in Trincomalee, Sri Lanka offering scuba courses, fun diving, snorkeling, and whale watching.",
  url: "https://divingclub.lk",
  telephone: "+94743945010",
  address: {
    "@type": "PostalAddress",
    streetAddress: "74/9, Sandy Cove",
    postalCode: "31000",
    addressLocality: "Trincomalee",
    addressRegion: "Eastern Province",
    addressCountry: "LK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 8.5874,
    longitude: 81.2152,
  },
  openingHours: "Mo-Su 07:30-18:00",
  priceRange: "$$",
  areaServed: ["Trincomalee", "Nilaveli", "Uppuveli"],
  knowsAbout: ["Scuba Diving", "PADI Certification", "Wreck Diving", "Underwater Photography", "Marine Conservation"],
  sameAs: [
    "https://www.facebook.com/profile.php?id=100092324331693",
    "https://www.instagram.com/diving_club_s30212/",
    "https://www.padi.com/dive-center/sri-lanka/diving-club/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <SmoothScrollProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFab />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
