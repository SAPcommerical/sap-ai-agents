import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">
    Thank you for calling SAP Commercial Cleaning.
    Our AI phone system is being set up.
    For now, please text this number to chat with Emily, our virtual assistant.
  </Say>
</Response>`;

  return new NextResponse(twiml, {
    status: 200,
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}

export async function GET() {
  return NextResponse.text('Voice route is alive.');
}
