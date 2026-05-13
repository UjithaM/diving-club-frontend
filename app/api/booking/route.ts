import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";

export async function POST(req: Request) {
  const body = await req.json();

  const { name, email, phone, date, bookingFor, item } = body;

  const missing: Record<string, string> = {};
  if (!name?.trim()) missing.name = "Required";
  if (!email?.trim()) missing.email = "Required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) missing.email = "Invalid email address";
  if (!phone?.trim()) missing.phone = "Required";
  if (!date) missing.date = "Required";
  else if (new Date(date) < new Date(new Date().toDateString())) missing.date = "Must be a future date";
  if (!bookingFor) missing.bookingFor = "Required";
  if (!item?.trim()) missing.item = "Required";

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
