import type { Metadata, Viewport } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ServiceWorkerRegistration from "@/components/seo/ServiceWorkerRegistration";
import Analytics from "@/components/seo/Analytics";
import StructuredData from "@/components/seo/StructuredData";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "GI Patient Hub — Evidence-Based Patient Education",
    template: "%s | GI Patient Hub",
  },
  description:
    "Clear, evidence-based information for gastrointestinal conditions. Interactive patient education created by a Canadian gastroenterologist.",
  keywords: [
    "GI patient education",
    "gastroenterology",
    "digestive health",
    "GERD",
    "IBS",
    "colonoscopy",
    "IBD",
    "celiac disease",
    "fatty liver",
    "patient information",
    "Canada",
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "GI Patient Hub",
  },
  openGraph: {
    title: "GI Patient Hub",
    description:
      "Evidence-based patient education for gastrointestinal conditions.",
    type: "website",
    locale: "en_CA",
    siteName: "GI Patient Hub",
  },
};

export const viewport: Viewport = {
  themeColor: "#2B6CB0",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="bg-neutral-50 text-neutral-700 antialiased">
        <ServiceWorkerRegistration />
        <Analytics />
        <StructuredData />
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
