import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Assets Real Estate Investments",
  description: "Jeddah's trusted name in luxury real estate.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
