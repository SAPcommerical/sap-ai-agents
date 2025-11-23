import { NextResponse } from "next/server";

export async function POST() {
  // Basic greeting until we add full AI voice
  const twiml = `
    <Response>
      <Say voice="Polly.Joanna">
        Thank you for calling SAP Commercial Cleaning. 
        Please text us at this number for faster service, or leave your name and facility size after the tone.
      </Say>
      <Record maxLength="20" action="/api/voice/record" />
    </Response>
  `;

  return new NextResponse(twiml, {
    headers: { "Content-Type": "text/xml" },
  });
}
