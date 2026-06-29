export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: "USD" | "KES";
  category: "digital" | "course" | "merch" | "consulting";
  image?: string;
  badge?: string;
};

export const products: Product[] = [
  {
    id: "btc-ea",
    name: "BTC Daily Trend Swing EA",
    description: "MQL5 Expert Advisor — daily trend swing strategy for Bitcoin. Battle-tested logic from Georgie's algo-trading lab.",
    price: 49,
    currency: "USD",
    category: "digital",
    badge: "Digital Drop",
  },
  {
    id: "imtat-m01",
    name: "IMTAT Module 01 — Navigate MT5",
    description: "Full module: intro, lesson, outro scripts + ElevenLabs-ready narration exports.",
    price: 19,
    currency: "USD",
    category: "course",
    badge: "Course",
  },
  {
    id: "imtat-m05",
    name: "IMTAT Module 05 — Expert Advisors",
    description: "Build your first EA in MQL5. From OnInit to OnTick — the full pipeline.",
    price: 29,
    currency: "USD",
    category: "course",
    badge: "Course",
  },
  {
    id: "imtat-bundle",
    name: "IMTAT Full Bundle (10 Modules)",
    description: "Complete MetaTrader & MQL5 algorithmic trading course. All modules, scripts, and templates.",
    price: 149,
    currency: "USD",
    category: "course",
    badge: "Best Value",
  },
  {
    id: "hoodie-woo",
    name: "GK WOO Hoodie",
    description: "Drill-wave luxury hoodie. Smoke black with chrome GK logo. Print-on-demand.",
    price: 65,
    currency: "USD",
    category: "merch",
    badge: "Merch",
  },
  {
    id: "tee-best",
    name: "Best In Class Tee",
    description: "NUST Merit Award tribute tee. Navy & gold. For the ones who topped the class 3 years straight.",
    price: 35,
    currency: "USD",
    category: "merch",
    badge: "Merch",
  },
  {
    id: "cap-engineer",
    name: "ECE Engineer Cap",
    description: "Structured cap with embroidered GK monogram. Clean professional drip.",
    price: 28,
    currency: "USD",
    category: "merch",
  },
  {
    id: "consult-1hr",
    name: "1-Hour Algo Trading Consult",
    description: "Live session: MQL5 EA review, strategy debug, or ECE code walkthrough with George.",
    price: 7500,
    currency: "KES",
    category: "consulting",
    badge: "Booking",
  },
];

export const shop = {
  name: "GK Lab",
  tagline: "Digital drops · Courses · Merch · Consulting",
  portfolioUrl: "http://localhost:3001",
  vibeUrl: "http://localhost:3002",
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
