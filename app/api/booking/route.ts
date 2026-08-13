import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";

export async function POST(req: Request) {
  const body = await req.json();

  const { name, email, phone, country_code, date, items, discount_code } = body;

  const missing: Record<string, string> = {};
  if (!name?.trim()) missing.name = "Required";
  if (!email?.trim()) missing.email = "Required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) missing.email = "Invalid email address";
  if (!phone?.trim()) missing.phone = "Required";
  if (!country_code?.trim()) missing.country_code = "Required";
  // Optional — plenty of enquiries arrive before dates are fixed. Only the value is
  // checked. NOTE: the Laravel backend still has `date` as required, so a blank one
  // comes back 400 with a field error until that rule becomes `nullable`.
  if (date && new Date(date) < new Date(new Date().toDateString()))
    missing.date = "Must be a future date";
  // One booking can hold several items. Only presence is checked here — the backend owns
  // the catalogue, the per-item quantity caps and the one-currency-per-booking rule.
  if (!Array.isArray(items) || items.length === 0) missing.items = "Required";
  else
    items.forEach((line, i) => {
      if (!line?.item?.trim()) missing[`items.${i}.item`] = "Required";
      if (!line?.bookingFor) missing[`items.${i}.bookingFor`] = "Required";
    });
  // Optional. Validity is the backend's call — it owns redemption state, expiry and the
  // item lock, and deliberately hard-errors rather than silently charging full price.
  if (discount_code && String(discount_code).length > 16)
    missing.discount_code = "This discount code is not valid.";

  if (Object.keys(missing).length > 0) {
    return NextResponse.json({ success: false, error: "Validation failed", fields: missing }, { status: 400 });
  }

  try {
    const backendRes = await fetch(`${API_BASE}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to send. Please call us on 0743 945 010." },
      { status: 500 }
    );
  }
}
