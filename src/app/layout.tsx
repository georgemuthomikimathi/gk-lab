import type { Metadata } from "next";
import { brand } from "@/data/brand";
import { shop } from "@/data/products";
import "./globals.css";

export const metadata: Metadata = {
  title: `${shop.name} — Georgie the Educator`,
  description: `${brand.tagline}. ${brand.subtagline}. MQL5 drops, IMTAT, merch.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
