# SonoPrep — Deployment Guide (Vercel + Hostinger Domain)

> **Total time:** ~30 minutes. Copy-paste every command below.

---

## Prerequisites You Need

| Item | Where to Get It |
|------|----------------|
| GitHub account | github.com |
| Vercel account (free) | vercel.com (sign in with GitHub) |
| Supabase account (free) | supabase.com |
| Stripe account | stripe.com |
| Hostinger domain (sonoprep.com) | hpanel.hostinger.com |

---

## Step 1 — Push Code to GitHub (~3 min)

```bash
# Create a new PRIVATE repo on GitHub called "sonoprep"
# Then in your terminal:
cd sonoprep-final
git init
git add .
git commit -m "Initial SonoPrep deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sonoprep.git
git push -u origin main
```

---

## Step 2 — Create PostgreSQL Database on Supabase (~5 min)

1. Go to **supabase.com** → New Project
2. Name: `sonoprep` | Region: closest to your users | Set a strong DB password
3. Wait for project to provision (~60 seconds)
4. Go to **Settings → Database → Connection string → URI**
5. Copy the URI — it looks like:
   ```
   postgresql://postgres.[ref]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
   ```
6. **Save this — you'll need it as `DATABASE_URL`**

---

## Step 3 — Create Stripe Products (~5 min)

1. Go to **stripe.com/dashboard** → Products → Add Product (repeat 5 times):

| Product | Price | Type |
|---------|-------|------|
| SPI Flashcards | $29.00 | One-time |
| Physics Pearls | $9.00 | One-time |
| Exam Simulator | $49.00 | One-time |
| Study Notes | $39.00 | One-time |
| Premium Bundle — $99.00 | One-time |

2. After creating each, click into it → copy the **Price ID** (starts with `price_...`)
3. Go to **Developers → API Keys** → copy:
   - Publishable key (`pk_live_...`)
   - Secret key (`sk_live_...`)
4. Go to **Developers → Webhooks → Add endpoint**:
   - URL: `https://sonoprep.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`
   - Copy the **Webhook signing secret** (`whsec_...`)

---

## Step 4 — Deploy to Vercel (~5 min)

1. Go to **vercel.com** → Add New Project → Import `sonoprep` from GitHub
2. Framework: **Next.js** (auto-detected)
3. **Environment Variables** — add ALL of these:

```
DATABASE_URL=postgresql://postgres.[ref]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
NEXTAUTH_SECRET=<run: openssl rand -base64 32>
NEXTAUTH_URL=https://sonoprep.com
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_FLASHCARDS=price_1SOSPwItoc9MxAbzIIsmWTZ1
STRIPE_PRICE_PHYSICS_PEARLS=price_1SOSEHItoc9MxAbzvq901JpV
STRIPE_PRICE_EXAM_SIMULATOR=price_1SOSDPItoc9MxAbzEc3CnpdP
STRIPE_PRICE_STUDY_NOTES=price_1SOSCQItoc9MxAbzCPRJ1IzS
STRIPE_PRICE_PREMIUM_BUNDLE=price_1SOSRaItoc9MxAbzJhtQaa9F
NEXT_PUBLIC_APP_URL=https://sonoprep.com
```

4. Click **Deploy** — wait for build to complete

---

## Step 5 — Initialize Database (~2 min)

After first deploy, run in your local terminal:

```bash
# In your sonoprep-final directory:
# Create .env.local with your DATABASE_URL
echo 'DATABASE_URL="your-supabase-url-here"' > .env.local

# Push schema to database
npx prisma db push

# Seed products
npx prisma db seed
```

---

## Step 6 — Connect Hostinger Domain (~5 min)

1. In **Vercel** → Project Settings → Domains → Add `sonoprep.com`
2. Vercel will show you DNS records to add
3. In **Hostinger hPanel** → DNS Zone Editor:
   - Delete any existing A records for `@`
   - Add: `A` record → `@` → `76.76.21.21`
   - Add: `CNAME` record → `www` → `cname.vercel-dns.com`
4. Wait 5-15 minutes for DNS propagation
5. Vercel will auto-provision SSL

---

## Step 7 — Verify Everything Works (~5 min)

- [ ] Visit `https://sonoprep.com` — homepage loads with waveform animation
- [ ] Click "Try Free Demo" — demo page works
- [ ] Click "Get Started" → sign up with email/password
- [ ] After login, check `/app/dashboard`
- [ ] Test Stripe checkout (use Stripe test mode first if preferred)
- [ ] Check `/llms.txt` and `/index.md` load correctly
- [ ] Check `/sitemap.xml` and `/robots.txt`

---

## Optional: Google OAuth

1. Go to **console.cloud.google.com** → Create OAuth 2.0 credentials
2. Authorized redirect URI: `https://sonoprep.com/api/auth/callback/google`
3. Add to Vercel env vars:
   ```
   GOOGLE_CLIENT_ID=...
   GOOGLE_CLIENT_SECRET=...
   ```
4. Redeploy

---

## Pricing Summary (Verified)

| Product | Price | Access |
|---------|-------|--------|
| SPI Flashcards | $29 | 90 days |
| Physics Pearls | $9 | 90 days |
| Exam Simulator | $49 | 90 days |
| Study Notes | $39 | 90 days |
| Premium Bundle — $99 | 90 days (saves $27) |
| Free Demo | $0 | Unlimited |

---

## Tech Stack

- **Framework:** Next.js 15 + React 19 + TypeScript
- **Styling:** Tailwind CSS 3 + Framer Motion
- **Auth:** NextAuth 4 (credentials + Google OAuth)
- **Database:** PostgreSQL via Prisma ORM
- **Payments:** Stripe (one-time checkout)
- **Hosting:** Vercel (recommended) or any Node.js host
- **Domain:** Hostinger (sonoprep.com)
