import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://assets-realty.vercel.app"),
  title: {
    default: "Assets Real Estate Investments",
    template: "%s | Assets Real Estate Investments",
  },
  description: "Jeddah's trusted name in luxury real estate investment and development.",
  openGraph: {
    siteName: "Assets Real Estate Investments",
    type: "website",
    images: [{ url: "/logo.png", width: 220, height: 53 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
