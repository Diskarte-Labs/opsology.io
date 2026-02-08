import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import { newsreader } from "./fonts";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Opsology — Independent Infrastructure Assurance",
    template: "%s — Opsology",
  },
  description:
    "Senior, independent technical assurance for organisations whose platforms cannot afford instability, scaling failure, or hidden architectural risk.",
  keywords: [
    "infrastructure assurance",
    "operational resilience",
    "technical assurance",
    "platform reliability",
    "infrastructure consultancy",
    "scaling readiness",
    "independent assurance",
  ],
  metadataBase: new URL("https://opsology.io"),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Opsology — Independent Infrastructure Assurance",
    description:
      "Senior, independent technical assurance for organisations whose platforms cannot afford instability, scaling failure, or hidden architectural risk.",
    url: "https://opsology.io",
    siteName: "Opsology",
    type: "website",
    images: [
      {
        url: "/opsology-logo.png",
        width: 1150,
        height: 280,
        alt: "Opsology — Independent Infrastructure Assurance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Opsology — Independent Infrastructure Assurance",
    description:
      "Senior, independent technical assurance for organisations whose platforms cannot afford instability, scaling failure, or hidden architectural risk.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Opsology",
  url: "https://opsology.io",
  description:
    "Senior, independent technical assurance for organisations whose platforms cannot afford instability, scaling failure, or hidden architectural risk.",
  email: "hello@opsology.io",
  sameAs: ["https://www.linkedin.com/in/markkaye/"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable} ${newsreader.variable}`}>
      <body className="antialiased font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
