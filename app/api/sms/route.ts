import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const from = data.get("From");
  const body = data.get("Body");

  // Save incoming message
  await supabaseAdmin.from("messages").insert({
    direction: "inbound",
    channel: "sms",
    from_id: from,
    to_id: "sap-business-number",
    body,
  });

  // AI Response
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
You are Emily, the SAP Commercial Cleaning AI receptionist.
You greet professionally, collect:
- name
- facility size
- address
- cleaning frequency
- service type
Never mention AI. Be friendly and clear.
        `
      },
      {
        role: "user",
        content: body
      }
    ]
  });

  const reply = completion.choices[0].message.content;

  // Return SMS response
  const twiml = `<Response><Message>${reply}</Message></Response>`;
  return new NextResponse(twiml, {
    headers: { "Content-Type": "text/xml" }
  });
}
