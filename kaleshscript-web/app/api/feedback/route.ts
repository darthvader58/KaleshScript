import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { feedback, email } = await request.json();

    if (!feedback || !feedback.trim()) {
      return NextResponse.json(
        { error: 'Feedback is required' },
        { status: 400 }
      );
    }

    // Using Resend API for email delivery
    // You'll need to set RESEND_API_KEY in your environment variables
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      // Still return success to user, but log the error
      return NextResponse.json({ success: true });
    }

    const emailBody = {
      from: 'KaleshScript Feedback <onboarding@resend.dev>',
      to: ['rajayshashwat@gmail.com'],
      subject: 'New KaleshScript Feedback',
      html: `
        <h2>New Feedback Submission</h2>
        <p><strong>From:</strong> ${email || 'Anonymous'}</p>
        <p><strong>Feedback:</strong></p>
        <p>${feedback.replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">Submitted at: ${new Date().toLocaleString()}</p>
      `,
    };

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify(emailBody),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Resend API error:', error);
      // Still return success to user
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing feedback:', error);
    // Return success to user even if email fails
    return NextResponse.json({ success: true });
  }
}
