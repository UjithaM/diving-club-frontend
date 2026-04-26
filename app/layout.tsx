import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFab from "@/components/ui/WhatsAppFab";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
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
  "@type": "LocalBusiness",
  "@id": "https://divingclub.lk",
  name: "Diving Club",
  description:
    "PADI-certified diving center in Trincomalee, Sri Lanka offering scuba courses, fun diving, snorkeling, and whale watching.",
  url: "https://divingclub.lk",
  telephone: "0743945010",
  address: {
    "@type": "PostalAddress",
    streetAddress: "74/9, Sandy Cove",
    postalCode: "31000",
    addressLocality: "Trincomalee",
    addressCountry: "LK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 8.5874,
    longitude: 81.2152,
  },
  openingHours: "Mo-Su 07:30-18:00",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${dmSans.variable} antialiased`}
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
