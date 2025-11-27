import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { supabaseAdmin } from '@/lib/supabase';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const bodyText = await req.text();
  const params = new URLSearchParams(bodyText);

  const from = params.get('From') ?? '';
  const message = params.get('Body') ?? '';

  const completion = await client.chat.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      {
        role: 'system',
        content:
          'You are Emily, the assistant for SAP Commercial Cleaning.',
      },
      {
        role: 'user',
        content: message,
      },
    ],
  });

  const reply =
    completion.choices?.[0]?.message?.content ||
    'Thanks for contacting SAP Commercial Cleaning!';

  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${reply}</Message>
</Response>`;

  return new NextResponse(twiml, {
    status: 200,
    headers: { 'Content-Type': 'text/xml' },
  });
}

export async function GET() {
  return NextResponse.json({ ok: true, route: 'sms' });
}
