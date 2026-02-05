import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
