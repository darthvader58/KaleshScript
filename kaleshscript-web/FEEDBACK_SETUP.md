# Feedback Form Setup

The feedback form is configured to send submissions to `rajayshashwat@gmail.com`.

## Setup Instructions

1. **Sign up for Resend** (free tier available)
   - Go to https://resend.com
   - Create an account
   - Verify your email

2. **Get your API Key**
   - Go to https://resend.com/api-keys
   - Create a new API key
   - Copy the key

3. **Configure Environment Variable**
   - Create a `.env.local` file in the `kaleshscript-web` directory
   - Add: `RESEND_API_KEY=your_api_key_here`

4. **For Production (Vercel)**
   - Go to your Vercel project settings
   - Navigate to Environment Variables
   - Add `RESEND_API_KEY` with your API key value

## How It Works

- Users fill out the feedback form on the landing page or documentation page
- Form submissions are sent to `/api/feedback` endpoint
- The API route uses Resend to email the feedback to your email address
- Email includes the feedback text, optional user email, and timestamp

## Testing

To test locally:
```bash
cd kaleshscript-web
npm run dev
```

Visit http://localhost:3000 and submit feedback through the form at the bottom of the page.

## Note

The form will still work without the API key configured - it just won't send emails. This ensures a good user experience even if email delivery fails.
