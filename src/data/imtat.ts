export type ImtatModule = {
  id: string;
  number: number;
  slug: string;
  title: string;
  summary: string;
  price: number;
  badge?: string;
};

export const imtatModules: ImtatModule[] = [
  {
    id: "imtat-m01",
    number: 1,
    slug: "navigate-metatrader-5",
    title: "Navigate MetaTrader 5",
    summary: "Install MT5 & demo accounts.",
    price: 19,
    badge: "Start here",
  },
  {
    id: "imtat-m02",
    number: 2,
    slug: "execute-trades-on-mt5",
    title: "Execute Trades on MT5",
    summary: "Orders & charts.",
    price: 19,
  },
  {
    id: "imtat-m03",
    number: 3,
    slug: "introduction-to-mql5",
    title: "Introduction to MQL5",
    summary: "MetaEditor & first script.",
    price: 19,
  },
  {
    id: "imtat-m04",
    number: 4,
    slug: "scripting-in-mql5",
    title: "Scripting in MQL5",
    summary: "Vars, loops, compile & run.",
    price: 19,
  },
  {
    id: "imtat-m05",
    number: 5,
    slug: "expert-advisors-in-mql5",
    title: "Expert Advisors in MQL5",
    summary: "Build & attach your first EA.",
    price: 29,
    badge: "Popular",
  },
  {
    id: "imtat-m06",
    number: 6,
    slug: "advanced-mql5-concepts",
    title: "Advanced MQL5 Concepts",
    summary: "Indicators, events, modular code.",
    price: 19,
  },
  {
    id: "imtat-m07",
    number: 7,
    slug: "debugging-and-optimization",
    title: "Debugging & Optimization",
    summary: "Debug tools & performance.",
    price: 19,
  },
  {
    id: "imtat-m08",
    number: 8,
    slug: "backtesting-and-forward-testing",
    title: "Backtesting & Forward Testing",
    summary: "Strategy Tester & metrics.",
    price: 29,
  },
  {
    id: "imtat-m09",
    number: 9,
    slug: "advanced-topics-and-continuous-learning",
    title: "Advanced Topics & Continuous Learning",
    summary: "OOP, ML overview, next steps.",
    price: 19,
  },
  {
    id: "imtat-m10",
    number: 10,
    slug: "qa-and-practical-application",
    title: "Q&A & Practical Application",
    summary: "Capstone & FAQ.",
    price: 19,
    badge: "Capstone",
  },
];

export const imtatBundle = {
  id: "imtat-bundle",
  title: "IMTAT Full Bundle (10 Modules)",
  summary: "All 10 modules · scripts & narration.",
  price: 149,
  badge: "Best Value",
};
