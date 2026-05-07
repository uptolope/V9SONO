# SonoPrep — Deployment Guide

Complete step-by-step guide to deploy the SonoPrep platform to production.

---

## 1. Prerequisites

- **Node.js 18+** (recommended: 20 LTS)
- **PostgreSQL 14+** database (Supabase, Neon, Railway, or self-hosted)
- **Stripe account** with API keys
- **Vercel account** (recommended) or any Node.js hosting
- **Domain**: sonoprep.com (or your own)

---

## 2. Database Setup

### Option A: Supabase (Recommended)
1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings → Database → Connection string
3. Copy the connection string (use the pooler URL for serverless)

### Option B: Neon
1. Create a project at [neon.tech](https://neon.tech)
2. Copy the connection string from the dashboard

### Run Migrations
```bash
# Set DATABASE_URL in .env
DATABASE_URL="postgresql://user:pass@host:5432/sonoprep?sslmode=require"

# Push schema
npx prisma db push

# Generate client
npx prisma generate
```

---

## 3. Stripe Setup

### Create Products
1. Go to [Stripe Dashboard](https://dashboard.stripe.com) → Products
2. Create each product with the matching price:
   - SPI Flashcards — $29.00 (one-time)
   - Physics Pearls — $9.00 (one-time)
   - Exam Simulator — $49.00 (one-time)
   - Study Notes — $39.00 (one-time)
   - Premium Bundle — $99.00 (one-time)
3. Copy each Price ID (starts with `price_`)

### Set API Keys
```env
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Price IDs
STRIPE_PRICE_FLASHCARDS=price_...
STRIPE_PRICE_PEARLS=price_...
STRIPE_PRICE_SIMULATOR=price_...
STRIPE_PRICE_NOTES=price_...
STRIPE_PRICE_BUNDLE=price_...
```

### Configure Webhook
1. Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://sonoprep.com/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `charge.refunded`
4. Copy the signing secret → `STRIPE_WEBHOOK_SECRET`

---

## 4. Authentication Setup

### NextAuth Secret
```bash
# Generate a random secret
openssl rand -base64 32
```

```env
NEXTAUTH_SECRET=your-generated-secret
NEXTAUTH_URL=https://sonoprep.com
```

### Optional: Google OAuth
1. [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Credentials
2. Create OAuth 2.0 Client ID
3. Authorized redirect URI: `https://sonoprep.com/api/auth/callback/google`

```env
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

---

## 5. Environment Variables (Complete)

```env
# ── Database ──────────────────────────────────
DATABASE_URL="postgresql://..."

# ── NextAuth ──────────────────────────────────
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="https://sonoprep.com"

# ── Google OAuth (optional) ───────────────────
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# ── Stripe ────────────────────────────────────
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRICE_FLASHCARDS="price_..."
STRIPE_PRICE_PEARLS="price_..."
STRIPE_PRICE_SIMULATOR="price_..."
STRIPE_PRICE_NOTES="price_..."
STRIPE_PRICE_BUNDLE="price_..."

# ── App ───────────────────────────────────────
NEXT_PUBLIC_APP_URL="https://sonoprep.com"
```

---

## 6. Deploy to Vercel (Recommended)

### Via CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add STRIPE_SECRET_KEY production
# ... (add all env vars)

# Deploy to production
vercel --prod
```

### Via Dashboard
1. Import the repo at [vercel.com/new](https://vercel.com/new)
2. Framework Preset: **Next.js**
3. Add all environment variables in Settings → Environment Variables
4. Deploy

### Build Settings
- Build Command: `npx prisma generate && next build`
- Output Directory: `.next`
- Node.js Version: 20.x

### Post-Deploy
```bash
# Generate Prisma client in build (add to package.json scripts)
"build": "prisma generate && next build"
```

---

## 7. Custom Domain

1. Vercel Dashboard → Settings → Domains
2. Add `sonoprep.com`
3. Update DNS records as instructed:
   - `A` record → `76.76.21.21`
   - `CNAME` for `www` → `cname.vercel-dns.com`
4. SSL is automatic

---

## 8. Post-Deployment Checklist

- [ ] Verify homepage loads at https://sonoprep.com
- [ ] Test sign-up flow → check database for new user
- [ ] Test sign-in flow → verify redirect to dashboard
- [ ] Test Stripe checkout → complete a test purchase
- [ ] Verify Stripe webhook → check purchase appears in billing
- [ ] Test exam simulator → complete and submit
- [ ] Test flashcard review → verify SM-2 progress
- [ ] Test protected routes → unauthenticated users redirected
- [ ] Test mobile responsiveness on real devices
- [ ] Verify security headers (use securityheaders.com)
- [ ] Check OpenGraph tags (use opengraph.xyz)
- [ ] Monitor error logs in Vercel dashboard

---

## 9. Monitoring & Maintenance

### Vercel Analytics
Enable in Vercel Dashboard → Analytics for:
- Page views, unique visitors
- Core Web Vitals (LCP, FID, CLS)
- Function execution times

### Database Backups
- Supabase: automatic daily backups
- Neon: point-in-time recovery
- Self-hosted: set up `pg_dump` cron

### Stripe
- Monitor failed payments in Stripe Dashboard
- Set up email notifications for disputes
- Review webhook delivery logs regularly

---

## 10. Scaling Notes

| Concern | Solution |
|---------|----------|
| Database connections | Use connection pooling (PgBouncer / Supabase pooler) |
| Image optimization | Next.js Image component handles this automatically |
| API rate limiting | Middleware already includes auth rate limiting |
| Static pages | Marketing pages can be statically generated |
| Edge caching | Vercel Edge Network handles CDN caching |

---

## Troubleshooting

### "NEXTAUTH_URL mismatch"
Ensure `NEXTAUTH_URL` exactly matches your deployed domain (including https://).

### Stripe webhook 400 errors
- Verify `STRIPE_WEBHOOK_SECRET` matches the endpoint secret
- Check the raw body is passed (not JSON-parsed) to `constructEvent()`

### Prisma connection errors
- Check `DATABASE_URL` includes `?sslmode=require` for hosted DBs
- Ensure IP allowlisting if using a firewall

### Build fails on Vercel
- Add `"postinstall": "prisma generate"` to `package.json` scripts

---

Built with Next.js 15 · Deployed on Vercel · Database on PostgreSQL
