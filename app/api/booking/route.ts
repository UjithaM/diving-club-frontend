import { NextResponse } from "next/server";
import { validateBookingPayload } from "@/lib/booking-schema";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";

export async function POST(req: Request) {
  const body = await req.json();

  // Same rules the browser ran, from the same module — the email pattern used to be a third
  // copy here, and a copy that drifts means a visitor passes client validation and then eats
  // a 400 with nothing on screen to act on.
  //
  // The original `body` is what gets forwarded: it also carries `people`, `nationality`,
  // `notes`, `certificationLevel` and `attribution`, which the backend reads.
  //
  // NOTE: `date` is optional here, but the Laravel backend still has it `required`, so a
  // blank one comes back 400 with a field error until that rule becomes `nullable`.
  const fields = validateBookingPayload(body);
  if (Object.keys(fields).length > 0) {
    return NextResponse.json(
      { success: false, error: "Validation failed", fields },
      { status: 400 }
    );
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
