import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>
    Thank you for calling S A P Commercial Cleaning.
    Please send us a text message with your building size and cleaning needs,
    and a specialist will follow up shortly.
  </Say>
</Response>`;

  return new NextResponse(twiml, {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
}

export async function GET() {
  // Simple health check route
  return NextResponse.json({ ok: true, route: "voice" });
}
