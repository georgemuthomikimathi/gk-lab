import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { items, method } = body as { items: { id: string; name: string; price: number }[]; method: string };

  if (!items?.length) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const total = items.reduce((s, i) => s + i.price, 0);

  if (method === "mpesa") {
    const shortcode = process.env.MPESA_SHORTCODE;
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    if (!shortcode || !consumerKey) {
      return NextResponse.json({
        status: "scaffold",
        method: "mpesa",
        message: `M-Pesa scaffold ready. Add MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET, MPESA_SHORTCODE to .env. Total: KES ${total * 130}`,
        items: items.map((i) => i.name),
      });
    }
    return NextResponse.json({
      status: "pending",
      method: "mpesa",
      message: "STK Push would initiate here via Safaricom Daraja API.",
      total,
    });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json({
      status: "scaffold",
      method: "card",
      message: `Stripe scaffold ready. Add STRIPE_SECRET_KEY to .env. Total: $${total}`,
      items: items.map((i) => i.name),
    });
  }

  return NextResponse.json({
    status: "pending",
    method: "card",
    message: "Stripe Checkout session would redirect here.",
    total,
  });
}
