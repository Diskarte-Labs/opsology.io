import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
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
  metadataBase: new URL("https://opsology.io"),
  openGraph: {
    title: "Opsology — Independent Infrastructure Assurance",
    description:
      "Senior, independent technical assurance for organisations whose platforms cannot afford instability, scaling failure, or hidden architectural risk.",
    url: "https://opsology.io",
    siteName: "Opsology",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
