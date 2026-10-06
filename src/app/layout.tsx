import type { Metadata } from "next";
import { Playfair_Display, Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://continent-auto-repair-shop.vercel.app"),
  title: "Continent Auto Repair Shop | 24/7 Mechanic & Diagnostic Services Portland, OR",
  description: "Portland's premier 24/7 auto repair shop. Specialized engine diagnostics, brake replacement, tune-ups, battery service & 25-mile emergency dispatch at 7415 SE 92nd Ave.",
  keywords: [
    "Continent Auto Repair Shop",
    "Auto repair Portland OR",
    "24/7 mechanic Portland",
    "Engine diagnostics Portland",
    "Brake repair 97266",
    "Emergency roadside service Portland",
    "Paulin Charly Poumeni",
    "25 mile auto repair Portland"
  ],
  authors: [{ name: "Paulin Charly Poumeni" }],
  openGraph: {
    title: "Continent Auto Repair Shop | 24/7 Precision Mechanic Services",
    description: "24/7 high-performance auto repair & cyber engine diagnostics in Portland, Oregon. Located at 7415 SE 92nd Ave.",
    url: "https://continent-auto-repair-shop.vercel.app",
    siteName: "Continent Auto Repair Shop",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Continent Auto Repair Shop Diagnostic Bay",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Continent Auto Repair Shop | 24/7 Portland OR Auto Repair",
    description: "Engine diagnostics, brakes, oil changes, battery service & emergency repair within 25 miles.",
    images: ["/images/hero.jpg"],
  },
  alternates: {
    canonical: "https://continent-auto-repair-shop.vercel.app",
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": "https://continent-auto-repair-shop.vercel.app/#business",
  name: "Continent Auto Repair Shop",
  url: "https://continent-auto-repair-shop.vercel.app",
  telephone: "+15134013101",
  alternateTelephone: "+19713867255",
  email: "Poumenicharly86@gmail.com",
  image: "https://continent-auto-repair-shop.vercel.app/images/hero.jpg",
  founder: {
    "@type": "Person",
    name: "Paulin Charly Poumeni",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "7415 SE 92nd Ave",
    addressLocality: "Portland",
    addressRegion: "OR",
    postalCode: "97266",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.4687386,
    longitude: -122.5689837,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 45.4687386,
      longitude: -122.5689837,
    },
    geoRadius: "40233.6", // 25 miles in meters
  },
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${spaceGrotesk.variable} ${jakarta.variable} antialiased min-h-screen selection:bg-red-500 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
