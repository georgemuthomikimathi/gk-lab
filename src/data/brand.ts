/** Shared GK ecosystem links — anonymous public persona */
export const brand = {
  name: "Georgie the Educator",
  shortName: "Georgie",
  persona: "Georgie the Educator",
  tagline: "I teach everything",
  subtagline: "Crypto · Trading · Code · Tech · Algo — Mon–Fri",
  descriptor: "Engineer · Trader · Educator",
  heroBlurb: "10 MT5 modules · scripts · narration · full bundle.",
  urls: {
    portfolio: process.env.NEXT_PUBLIC_PORTFOLIO_URL ?? "http://localhost:3001",
    gkLab: process.env.NEXT_PUBLIC_GK_LAB_URL ?? "http://localhost:3003",
    gkWoo: process.env.NEXT_PUBLIC_GK_WOO_URL ?? "http://localhost:3002",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "https://www.youtube.com/@georgietheeducator",
  },
  colors: {
    dark: "#0d1117",
    accent: "#58a6ff",
    green: "#3fb950",
    gold: "#d4a853",
    navy: "#0f2744",
    cream: "#f8f6f1",
  },
  imtat: {
    fullName: "Introduction to MetaTrader and Algorithmic Trading",
    shortName: "IMTAT",
    moduleCount: 10,
    series: [
      "Crypto Monday",
      "Trading Tuesday",
      "Code Wednesday",
      "Technology Thursday",
      "Algo-Trading Friday",
    ],
  },
} as const;
