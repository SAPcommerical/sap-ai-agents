import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Twilio sends data as x-www-form-urlencoded
    const body = await req.text();
    const params = new URLSearchParams(body);

    const from = params.get("From") ?? "";
    const message = params.get("Body") ?? "";

    // For now, just echo the message back with a friendly reply.
    // (We’ll hook this to OpenAI later once the build is 100% clean.)
    const reply = `Thanks for contacting SAP Commercial Cleaning. You said: ${message}`;

    const twiml = `<Response><Message>${reply}</Message></Response>`;

    return new NextResponse(twiml, {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  } catch (err) {
    console.error("SMS route error:", err);
    return new NextResponse("Error", { status: 500 });
  }
}
