import type { Metadata } from "next";
import { shop } from "@/data/products";
import "./globals.css";

export const metadata: Metadata = {
  title: `${shop.name} — George Kimathi`,
  description: shop.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
