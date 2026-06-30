import type { Product } from "@/data/products";

export function formatPrice(p: Product) {
  if (p.currency === "KES") return `KES ${p.price.toLocaleString()}`;
  return `$${p.price}`;
}

export function formatLineTotal(line: CartLine) {
  const total = line.product.price * line.qty;
  if (line.product.currency === "KES") return `KES ${total.toLocaleString()}`;
  return `$${total}`;
}

export type CartLine = { product: Product; qty: number };

export function addLine(lines: CartLine[], product: Product): CartLine[] {
  const idx = lines.findIndex((l) => l.product.id === product.id);
  if (idx >= 0) {
    const next = [...lines];
    next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
    return next;
  }
  return [...lines, { product, qty: 1 }];
}

export function removeLine(lines: CartLine[], id: string): CartLine[] {
  const idx = lines.findIndex((l) => l.product.id === id);
  if (idx < 0) return lines;
  const line = lines[idx];
  if (line.qty <= 1) return lines.filter((l) => l.product.id !== id);
  const next = [...lines];
  next[idx] = { ...line, qty: line.qty - 1 };
  return next;
}

export function cartTotals(lines: CartLine[]) {
  const usd = lines
    .filter((l) => l.product.currency === "USD")
    .reduce((s, l) => s + l.product.price * l.qty, 0);
  const kes = lines
    .filter((l) => l.product.currency === "KES")
    .reduce((s, l) => s + l.product.price * l.qty, 0);
  return { usd, kes };
}

export function formatTotals(usd: number, kes: number) {
  const parts: string[] = [];
  if (usd > 0) parts.push(`$${usd}`);
  if (kes > 0) parts.push(`KES ${kes.toLocaleString()}`);
  return parts.length ? parts.join(" + ") : "$0";
}

export function cartCount(lines: CartLine[]) {
  return lines.reduce((s, l) => s + l.qty, 0);
}
