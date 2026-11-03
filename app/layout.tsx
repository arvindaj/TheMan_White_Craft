import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

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
    default: "Best Barber & Haircut Styles in Coimbatore | White Craft",
    template: "%s | White Craft Mens Salon",
  },
  description:
    "White Craft Mens Salon, Coimbatore: expert barber, trending haircut styles, fades, beard care & spa grooming by Sans. Athipalayam Road. Book on Instagram.",
  keywords: [
    "barber in Coimbatore",
    "best barber Coimbatore",
    "haircut styles Coimbatore",
    "men's haircut Coimbatore",
    "hairstyles for men Coimbatore",
    "fade haircut Coimbatore",
    "mens salon Coimbatore",
    "men's fashion and styling Coimbatore",
    "fashion designer Coimbatore",
    "beard grooming Coimbatore",
    "mens spa Coimbatore",
    "barber near me",
    "salon near Athipalayam Road",
    "White Craft Mens Salon",
    "sansmokie",
  ],
  authors: [{ name: "White Craft Mens Salon" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "White Craft Mens Salon",
    title: "Best Barber & Haircut Styles in Coimbatore | White Craft",
    description:
      "Expert barber, trending haircut styles, fades and beard care in Coimbatore. Book on Instagram @whitecraft_salon.",
    images: [{ url: "/images/branding.jpg", width: 720, height: 1108, alt: "White Craft Mens Salon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Barber & Haircut Styles in Coimbatore | White Craft",
    description: "Expert barber, trending haircut styles, fades and beard care in Coimbatore.",
    images: ["/images/branding.jpg"],
  },
  category: "Barber shop",
  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Coimbatore",
    "geo.position": "11.0168;76.9558",
    ICBM: "11.0168, 76.9558",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
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
  url: SITE_URL,
  description:
    "Men's salon in Coimbatore offering barber services, haircut styles, fades, beard care and spa grooming.",
  geo: { "@type": "GeoCoordinates", latitude: 11.0168, longitude: 76.9558 },
  areaServed: { "@type": "City", name: "Coimbatore" },
  knowsAbout: ["Barber", "Haircut styles", "Men's hairstyles", "Fade haircut", "Beard grooming", "Men's styling"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: ["Haircut", "Hairstyling", "Beard care", "Spa & facial"].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
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
      <body className="font-body antialiased overflow-x-hidden"><Header />
        {children}
      </body>
    </html>
  );
}
