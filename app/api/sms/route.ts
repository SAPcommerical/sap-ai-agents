import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    // Twilio sends data as x-www-form-urlencoded
    const body = await req.text();
    const params = new URLSearchParams(body);

    const from = params.get("From") ?? "";
    const message = params.get("Body") ?? "";

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are SAP Commercial Cleaning's SMS assistant. Be professional, helpful, and brief. Ask for the business name, building type, and cleaning needs.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply =
      completion.choices[0]?.message?.content ??
      "Thanks for contacting SAP Commercial Cleaning. We’ll follow up shortly.";

    // Twilio expects XML (TwiML) in response
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
