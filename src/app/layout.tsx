import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://oahu-dive-conditions.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#0f172a", // slate-900 header
};

export const metadata: Metadata = {
  title: {
    default: "Oahu Dive Conditions — Shore Diving Reports & Forecasts",
    template: "%s | Oahu Dive Conditions",
  },
  description:
    "Historical shore-diving conditions awareness tool for Oahu. See what divers reported at Electric Beach, Shark's Cove, Three Tables, and more under similar swell, wind, and tide conditions.",
  keywords: [
    "scuba diving",
    "shore diving",
    "Electric Beach",
    "Shark's Cove",
    "Three Tables",
    "Makaha Caverns",
    "China Walls",
    "Point Panic",
    "Magic Island",
    "Lanai Lookout",
    "Oahu",
    "Hawaii",
    "dive conditions",
    "swell forecast",
    "dive reports",
  ],
  authors: [{ name: "Oahu Dive Conditions" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Oahu Dive Conditions",
    title: "Oahu Dive Conditions — Shore Diving Reports & Forecasts",
    description:
      "Historical shore-diving conditions awareness tool for Oahu. See what divers reported under similar swell, wind, and tide conditions.",
  },
  twitter: {
    card: "summary",
    title: "Oahu Dive Conditions",
    description:
      "Historical shore-diving conditions for Oahu. Forecasts and diver reports for 8 sites across the island.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Dive Conditions",
  },
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="antialiased bg-slate-100 text-slate-900 overflow-x-hidden max-w-full">
        {children}
      </body>
    </html>
  );
}
