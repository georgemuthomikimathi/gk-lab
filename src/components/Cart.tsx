"use client";

import { CreditCard, Minus, ShoppingCart, Smartphone, Trash2, X, Zap } from "lucide-react";
import type { CartLine } from "@/lib/cart";
import { formatLineTotal, formatTotals } from "@/lib/cart";
import { shop } from "@/data/products";
import { cn } from "@/lib/utils";

type Props = {
  lines: CartLine[];
  usd: number;
  kes: number;
  payMethod: "card" | "mpesa";
  onPayMethod: (m: "card" | "mpesa") => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  checkoutMsg: string;
  checkingOut?: boolean;
  onClose?: () => void;
  mobile?: boolean;
};

export function CartPanel({
  lines,
  usd,
  kes,
  payMethod,
  onPayMethod,
  onRemove,
  onCheckout,
  checkoutMsg,
  checkingOut,
  onClose,
  mobile,
}: Props) {
  const empty = lines.length === 0;

  return (
    <div className={cn("flex flex-col", mobile && "max-h-[70vh]")}>
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-semibold text-white">
          <ShoppingCart className="h-4 w-4" aria-hidden /> Cart
        </h3>
        {mobile && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-lab-accent"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className={cn("mt-4 flex-1 overflow-y-auto", mobile && "min-h-0")}>
        {empty ? (
          <p className="text-sm text-white/40">Empty — add something fire.</p>
        ) : (
          <ul className="space-y-3" aria-live="polite">
            {lines.map((line) => (
              <li key={line.product.id} className="flex items-start justify-between gap-2 text-sm">
                <div className="min-w-0">
                  <span className="block truncate text-white/80">{line.product.name}</span>
                  {line.qty > 1 && (
                    <span className="text-xs text-white/40">× {line.qty}</span>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="font-mono text-lab-green">{formatLineTotal(line)}</span>
                  <button
                    type="button"
                    onClick={() => onRemove(line.product.id)}
                    className="rounded p-1.5 text-white/30 transition-colors hover:bg-white/10 hover:text-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lab-accent"
                    aria-label={`Remove ${line.product.name}`}
                  >
                    {line.qty > 1 ? <Minus className="h-3.5 w-3.5" /> : <Trash2 className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 border-t border-white/10 pt-4">
        <p className="flex justify-between text-sm">
          <span className="text-white/50">Total</span>
          <span className="font-mono font-semibold text-white">{formatTotals(usd, kes)}</span>
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => onPayMethod("card")}
          className={cn(
            "flex min-h-[44px] flex-1 items-center justify-center gap-1 rounded-lg border py-2 text-xs transition-colors",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lab-accent",
            payMethod === "card"
              ? "border-lab-accent bg-lab-accent/10 text-lab-accent"
              : "border-white/10 text-white/50 hover:border-white/20"
          )}
        >
          <CreditCard className="h-3.5 w-3.5" /> Card
        </button>
        <button
          type="button"
          onClick={() => onPayMethod("mpesa")}
          className={cn(
            "flex min-h-[44px] flex-1 items-center justify-center gap-1 rounded-lg border py-2 text-xs transition-colors",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lab-accent",
            payMethod === "mpesa"
              ? "border-lab-green bg-lab-green/10 text-lab-green"
              : "border-white/10 text-white/50 hover:border-white/20"
          )}
        >
          <Smartphone className="h-3.5 w-3.5" /> M-Pesa
        </button>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        disabled={empty || checkingOut}
        className="mt-4 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-lab-green py-3 text-sm font-semibold text-lab-dark transition-opacity disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lab-green"
      >
        <Zap className="h-4 w-4" />
        {checkingOut ? "Processing…" : "Checkout"}
      </button>

      {checkoutMsg && <p className="mt-3 text-xs text-lab-accent">{checkoutMsg}</p>}
      <p className="mt-4 text-[10px] leading-relaxed text-white/30">
        {shop.stripe.note}. {shop.mpesa.note}
      </p>
    </div>
  );
}
