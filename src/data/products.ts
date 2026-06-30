import { imtatBundle, imtatModules } from "./imtat";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: "USD" | "KES";
  category: "digital" | "course" | "merch" | "consulting";
  image?: string;
  badge?: string;
  moduleNumber?: number;
};

const imtatProducts: Product[] = imtatModules.map((m) => ({
  id: m.id,
  name: `IMTAT Module ${String(m.number).padStart(2, "0")} — ${m.title}`,
  description: m.summary,
  price: m.price,
  currency: "USD" as const,
  category: "course" as const,
  badge: m.badge ?? "Course",
  image: "/assets/brand/IMTAT Logo Slide.png",
  moduleNumber: m.number,
}));

export const products: Product[] = [
  {
    id: "btc-ea",
    name: "BTC Daily Trend Swing EA",
    description: "BTC daily swing EA.",
    price: 49,
    currency: "USD",
    category: "digital",
    badge: "Digital Drop",
  },
  ...imtatProducts,
  {
    id: imtatBundle.id,
    name: imtatBundle.title,
    description: imtatBundle.summary,
    price: imtatBundle.price,
    currency: "USD",
    category: "course",
    badge: imtatBundle.badge,
    image: "/assets/brand/IMTAT Course Title Slide.png",
  },
  {
    id: "hoodie-woo",
    name: "GK WOO Hoodie",
    description: "Smoke black drill-wave hoodie.",
    price: 65,
    currency: "USD",
    category: "merch",
    badge: "Merch",
  },
  {
    id: "tee-best",
    name: "Best In Class Tee",
    description: "Navy & gold merit tee.",
    price: 35,
    currency: "USD",
    category: "merch",
    badge: "Merch",
  },
  {
    id: "cap-engineer",
    name: "ECE Engineer Cap",
    description: "Embroidered GK cap.",
    price: 28,
    currency: "USD",
    category: "merch",
  },
  {
    id: "consult-1hr",
    name: "1-Hour Algo Trading Consult",
    description: "1-hour MQL5 or algo-trading session.",
    price: 7500,
    currency: "KES",
    category: "consulting",
    badge: "Booking",
  },
];

export const shop = {
  name: "GK Lab",
  tagline: "Drops, courses, merch & consulting — from Georgie's classroom",
  portfolioUrl: process.env.NEXT_PUBLIC_PORTFOLIO_URL ?? "http://localhost:3001",
  vibeUrl: process.env.NEXT_PUBLIC_GK_WOO_URL ?? "http://localhost:3002",
  youtubeUrl: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "https://www.youtube.com/@georgietheeducator",
  mpesa: {
    enabled: false,
    shortcode: process.env.MPESA_SHORTCODE ?? "174379",
    note: "M-Pesa STK Push scaffold — add Safaricom credentials to .env",
  },
  stripe: {
    enabled: false,
    note: "Stripe scaffold — add STRIPE_SECRET_KEY to .env",
  },
};
