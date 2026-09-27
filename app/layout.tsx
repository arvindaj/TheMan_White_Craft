import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import "./globals.css";

const displayFont = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

const SITE_URL = "https://www.whitecraftsalon.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "White Craft Mens Salon | Hair, Beard & Grooming in Coimbatore",
    template: "%s | White Craft Mens Salon",
  },
  description:
    "White Craft Mens Salon in Coimbatore — cuts, beard care and spa grooming by Sans (@sansmokie). 73a Athipalayam Road, Sunnambukalvai, Coimbatore 641046. Book on Instagram @whitecraft_salon.",
  keywords: [
    "mens salon Coimbatore",
    "White Craft salon",
    "best barber Coimbatore",
    "beard grooming Coimbatore",
    "sansmokie",
    "haircut Athipalayam Road",
    "mens spa Coimbatore",
  ],
  authors: [{ name: "White Craft Mens Salon" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "White Craft Mens Salon",
    title: "White Craft Mens Salon | Hair, Beard & Grooming in Coimbatore",
    description:
      "Cuts, beard care and spa grooming by Sans (@sansmokie). Book on Instagram @whitecraft_salon.",
    images: [{ url: "/images/branding.jpg", width: 720, height: 1108, alt: "White Craft Mens Salon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "White Craft Mens Salon | Coimbatore",
    description: "Cuts, beard care and spa grooming by Sans (@sansmokie).",
    images: ["/images/branding.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#141210",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "White Craft Mens Salon",
  image: `${SITE_URL}/images/branding.jpg`,
  founder: { "@type": "Person", name: "Sans", alternateName: "sansmokie" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "73a, Athipalayam Road, Sunnambukalvai",
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    postalCode: "641046",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.instagram.com/whitecraft_salon/",
    "https://www.instagram.com/sansmokie/",
  ],
  priceRange: "$$",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
