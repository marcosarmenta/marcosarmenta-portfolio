This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Inquiry form backend setup

The `/api/inquiry` route sends email via Resend and verifies submissions with
Cloudflare Turnstile. Copy `.env.example` to `.env.local` and fill in the
values below before testing the route.

### Resend (transactional email)

1. Create an account at [resend.com](https://resend.com) and go to **API Keys**
   → **Create API Key**. Give it "Sending access" only. Copy it into
   `RESEND_API_KEY`.
2. Go to **Domains** → **Add Domain** and add the subdomain you'll send from
   (e.g. `send.marcosarmenta.com` — using a subdomain instead of the root
   domain keeps deliverability issues isolated from your main mail).
3. Add the DNS records Resend shows you (SPF, DKIM, and optionally DMARC) at
   your DNS provider, then click **Verify** in the Resend dashboard. Verification
   can take a few minutes to a few hours depending on DNS propagation.
4. Once verified, set `RESEND_FROM_EMAIL` to an address on that subdomain,
   e.g. `hi@send.marcosarmenta.com`.

### Cloudflare Turnstile (bot protection)

1. In the [Cloudflare dashboard](https://dash.cloudflare.com), go to
   **Turnstile** → **Add site**.
2. Add your domain, choose the **Managed** widget mode, and create it.
3. Copy the **Site Key** into `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (safe to expose
   client-side) and the **Secret Key** into `TURNSTILE_SECRET_KEY` (server-side
   only — never exposed to the client).
4. Set `TURNSTILE_HOSTNAMES` to the comma-separated hostname(s) the widget is
   allowed to be served from — `siteverify`'s `hostname` field must match one
   of these. Include `localhost` for local dev; use only the real production
   domain(s) in production.

`verifyTurnstileToken` (`src/lib/turnstile.ts`) checks `success`, `action`,
and `hostname` on the `siteverify` response, not just `success` — this stops
a token minted for one form from being replayed on another. Each form's
widget `data-action` must match what its route passes as `expectedAction`:

| Page | Route | `data-action` |
| --- | --- | --- |
| `/start-a-project` | `/api/inquiry` | `inquiry` |
| `/contact` | `/api/contact` | `contact` |

```html
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
<div class="cf-turnstile" data-sitekey="<NEXT_PUBLIC_TURNSTILE_SITE_KEY>" data-action="inquiry"></div>
```

### Cal.com

Set `NEXT_PUBLIC_CAL_URL` to the booking link used in the confirmation email,
e.g. `https://cal.com/marcosarmenta/intro`.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
