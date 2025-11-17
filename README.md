# MakeMyContract

MakeMyContract is a modern U.S.-focused contract generation SaaS built with Next.js 14 (App Router). It guides paying subscribers through deterministic intake flows, renders attorney-style PDFs with pdfmake, persists history in Firestore, and charges through Stripe Checkout.

## Key Capabilities
- Deterministic template engine covering Residential Lease, NDA, Freelance Agreement, Bill of Sale, Employment Offer Letter, and General Service Agreement.
- Firebase Auth + HTTP-only sessions enforced on every request; only authenticated + subscribed users can reach dashboards, forms, previews, or PDFs.
- Stripe billing: monthly ($19) and annual ($99) subscriptions via hosted Checkout + webhooks that keep Firestore `users/{userId}` plans in sync.
- pdfmake server renderer for signature-ready PDFs with headers, sections, and page numbers.
- Modern UI: Tailwind CSS v4, premium SaaS layouts, protected contract workspace, marketing landing, pricing, login, signup, and dedicated paywall screens.

## Tech Stack
- **Frontend:** Next.js 14 App Router, React 18 client components, Tailwind CSS v4, Radix Slot powered UI primitives, premium marketing + protected layouts.
- **Backend:** Next.js Route Handlers (`/app/api/*`) for contract generation, PDF rendering, Stripe checkout/session management, Stripe webhook processing.
- **Persistence:** Firebase Admin SDK → Firestore (users + contracts collections, no insecure fallbacks).
- **Integrations:** Firebase Auth (client SDK + Admin verification), Stripe Checkout/Subs, pdfmake.

## Getting Started
> Requires Node.js 20.9+ to satisfy Next.js and Firebase engine requirements (the repo may install under Node 18 but you’ll see warnings).

1. Install dependencies
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env.local` and fill in Firebase + Stripe credentials.
3. Run the dev server
   ```bash
   npm run dev
   ```
4. Visit http://localhost:3000 to browse marketing pages, then create an account, subscribe, and access the protected dashboard + contract flows.

### Environment Variables
Key vars from `.env.example`:
- `NEXT_PUBLIC_FIREBASE_*` – client-side Firebase SDK config.
- `FIREBASE_*` – Admin SDK credentials (service account).
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` – Stripe API + webhook secret.
- `NEXT_PUBLIC_STRIPE_PRICE_*` – Checkout price IDs for Weekly/Monthly/Annual subscriptions.
- `NEXT_PUBLIC_APP_URL` – used for Stripe return URLs in server routes.
- `NEXT_PUBLIC_CLARITY_ID` – Microsoft Clarity site ID (optional, omit to disable tracking).

Example:
```bash
NEXT_PUBLIC_CLARITY_ID="SUA_CHAVE_AQUI"
```

Stripe webhook endpoint: `/api/stripe/webhook` (remember to pass the signed raw body when configuring locally with `stripe listen`).

### NPM Scripts
- `npm run dev` – start Next.js dev server.
- `npm run build` – production build.
- `npm run start` – run production server.
- `npm run lint` – lint via ESLint 9.

## Architecture Overview
```
┌─────────────────────────────────────────────────────────┐
│ Next.js App Router                                       │
│  • /app/page.tsx – marketing landing                     │
│  • /app/pricing, /app/login, /app/signup                 │
│  • /(protected)/dashboard + /(protected)/contracts/*     │
│  • components – UI primitives, auth/paywall guards       │
└──────────────┬──────────────────────────────────────────┘
               │ Auth+plan enforced via Firebase Admin + Stripe metadata
               ▼
┌─────────────────────────────────────────────────────────┐
│ API Routes (/app/api)                                   │
│  • contracts/generate – deterministic template engine    │
│  • contracts/pdf – pdfmake renderer                      │
│  • stripe/checkout – hosted checkout session             │
│  • stripe/webhook – subscription lifecycle sync          │
└──────────────┬──────────────────────────────────────────┘
               │
      ┌────────┴─────────────┐
      │ Firebase Firestore   │
      │  • users plan/stripe │
      │  • contracts history │
      └────────┬─────────────┘
               │
      ┌────────┴─────────────┐
      │ Stripe Checkout      │
      └────────┬─────────────┘
               │
      ┌────────┴─────────────┐
      │ pdfmake PDF engine   │
      └──────────────────────┘
```

Every protected route executes on the server, verifying the HTTP-only Firebase session cookie, checking Firestore for plan status, and redirecting to `/pricing`, `/paywall/must-subscribe`, or `/paywall/expired` when rules are not met.

## Roadmap Ideas
1. AI-assisted clause writing (Claude/GPT) layered on top of deterministic templates.
2. Rich text editor prior to PDF generation for final edits.
3. DocuSign/SimpleSignatures integration for e-signature workflows.
4. Template marketplace + white-label admin.
5. CRM/webhook integrations (HubSpot/Salesforce) for automated intake.

## Notes
- Stripe + Firebase keys are optional during design time, but production deployments must supply them.
- When running `stripe listen`, forward events with `stripe listen --forward-to localhost:3000/api/stripe/webhook`.
- Update Node to v20+ to remove engine warnings and unlock the React Compiler prompt in `create-next-app`.
