import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";

/** Same-origin hop to Laravel, like /api/contact — the form never needs the backend's CORS. */
export async function POST(req: Request) {
  const { email, source } = await req.json().catch(() => ({}));

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ success: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    const res = await fetch(`${API_BASE}/subscribers`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email: email.trim(), source }),
    });
    return NextResponse.json(await res.json(), { status: res.status });
  } catch {
    return NextResponse.json({ success: false, error: "Couldn't save that. Please try again." }, { status: 500 });
  }
}
