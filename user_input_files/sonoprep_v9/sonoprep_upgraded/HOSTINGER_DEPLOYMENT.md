# SonoPrep — Deploying with Hostinger + sonoprep.com

Step-by-step guide to get SonoPrep live on your Hostinger domain.

---

## ⚠️ Important: Why This Matters

SonoPrep is a **full-stack Next.js app** — it has server-side API routes (auth, Stripe webhooks, exam submissions, etc.), not just static HTML. This means it needs a **Node.js server** running 24/7.

Hostinger's **shared hosting and cloud hosting plans** do NOT support Node.js server apps. They run PHP/Apache/LiteSpeed — they can't run Next.js with API routes.

You have **two paths** (both use your sonoprep.com domain):

| Path | Cost | Difficulty | Best For |
|------|------|------------|----------|
| **A. Vercel + Hostinger domain** | Free (Vercel hobby) | Easy (15 min) | ✅ Recommended |
| **B. Hostinger VPS** | $5-13/mo VPS plan | Advanced (1-2 hrs) | If you already have a VPS |

---

# Path A — Deploy on Vercel, Point Domain from Hostinger (Recommended)

Vercel is built by the creators of Next.js. It's free for personal/small projects, handles SSL, CDN, and auto-deploys. You keep sonoprep.com — just point it to Vercel.

## Step 1: Push Code to GitHub

```bash
# In your sonoprep-nextjs folder
cd sonoprep-nextjs

# Initialize and push
git init
git add .
git commit -m "Initial SonoPrep build"

# Create a repo on GitHub (private recommended), then:
git remote add origin https://github.com/YOUR_USERNAME/sonoprep-site.git
git branch -M main
git push -u origin main
```

## Step 2: Create a PostgreSQL Database

You need a PostgreSQL database. Free options:

### Option A: Supabase (Recommended — free tier)
1. Go to [supabase.com](https://supabase.com) → New Project
2. Name it `sonoprep`, set a database password, choose a region close to your users
3. Once created: Settings → Database → Connection string → URI
4. Copy it — it looks like: `postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`

### Option B: Neon (also free)
1. Go to [neon.tech](https://neon.tech) → New Project
2. Copy the connection string from the dashboard

## Step 3: Set Up Stripe Products

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com) → Products
2. Create 5 products (use **one-time** payment type):

| Product | Price |
|---------|-------|
| SPI Flashcards | $29.00 |
| Physics Pearls | $9.00 |
| Exam Simulator | $49.00 |
| Study Notes | $39.00 |
| Premium Bundle — $99.00 |

3. After creating each, click into it and copy the **Price ID** (starts with `price_`)
4. Go to Developers → API Keys → copy your `sk_live_...` and `pk_live_...` keys

> 💡 Use **test mode** first (`sk_test_...`, `pk_test_...`) to verify everything works before going live.

## Step 4: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **"Add New Project"** → Import your `sonoprep-site` repo
3. Framework Preset: **Next.js** (auto-detected)
4. Open **"Environment Variables"** and add ALL of these:

```
DATABASE_URL              = postgresql://... (from Step 2)
NEXTAUTH_SECRET           = (run: openssl rand -base64 32)
NEXTAUTH_URL              = https://sonoprep.com
STRIPE_SECRET_KEY         = sk_live_...
STRIPE_PUBLISHABLE_KEY    = pk_live_...
STRIPE_WEBHOOK_SECRET     = whsec_... (you'll add this after Step 6)
STRIPE_PRICE_FLASHCARDS   = price_...
STRIPE_PRICE_PEARLS       = price_...
STRIPE_PRICE_SIMULATOR    = price_...
STRIPE_PRICE_NOTES        = price_...
STRIPE_PRICE_BUNDLE       = price_...
NEXT_PUBLIC_APP_URL        = https://sonoprep.com
```

5. Override the Build Command to: `npx prisma generate && next build`
6. Click **Deploy**

After it deploys, Vercel gives you a URL like `sonoprep-site-xxx.vercel.app`. Verify it loads.

## Step 5: Point sonoprep.com from Hostinger to Vercel

1. In **Vercel**: Go to your project → Settings → Domains → Add `sonoprep.com`
2. Vercel will show you the DNS records you need. Typically:
   - `sonoprep.com` → A record → `76.76.21.21`
   - `www.sonoprep.com` → CNAME → `cname.vercel-dns.com`

3. In **Hostinger**: Log in → hPanel → Domains → sonoprep.com → DNS / DNS Zone
4. Edit/Add these records:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | `76.76.21.21` | 3600 |
| CNAME | www | `cname.vercel-dns.com` | 3600 |

5. **Delete** any existing A records for `@` pointing to Hostinger's IP (like `185.xxx.xxx.xxx`)
6. **Delete** any existing CNAME records for `www` pointing to Hostinger

> ⏱ DNS propagation takes 5 minutes to 48 hours (usually under 1 hour).

7. Back in Vercel, the domain status will show ✅ once DNS propagates. SSL is automatic.

## Step 6: Set Up Stripe Webhook

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click **"Add endpoint"**
3. Endpoint URL: `https://sonoprep.com/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `charge.refunded`
5. Click "Add endpoint"
6. Reveal the **Signing secret** (starts with `whsec_`)
7. Go back to Vercel → Settings → Environment Variables
8. Add: `STRIPE_WEBHOOK_SECRET` = `whsec_...`
9. **Redeploy** (Deployments → Redeploy on the latest)

## Step 7: Initialize the Database

```bash
# Locally, with your DATABASE_URL set in .env
npm install
npx prisma db push
```

This creates all the tables (users, products, purchases, etc.) in your PostgreSQL database.

## Step 8: Verify Everything Works

- [ ] `https://sonoprep.com` loads the homepage
- [ ] Sign up with a test email → should redirect to dashboard
- [ ] Sign in → should redirect to dashboard
- [ ] Click "Purchase" on any product → should open Stripe Checkout
- [ ] Complete a test purchase (use Stripe test card `4242 4242 4242 4242`) → check billing page
- [ ] Try the free demo (exam + flashcards)
- [ ] Test on mobile
- [ ] Check security headers at [securityheaders.com](https://securityheaders.com/?q=sonoprep.com)

---

# Path B — Deploy on Hostinger VPS (Advanced)

Only use this if you have a Hostinger VPS plan (KVM VPS or Cloud VPS). Shared hosting will NOT work.

## Step 1: Access Your VPS

```bash
ssh root@YOUR_VPS_IP
```

## Step 2: Install Node.js 20

```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc

# Install Node 20
nvm install 20
nvm use 20
node --version  # Should show v20.x.x
```

## Step 3: Install PostgreSQL

```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql
CREATE DATABASE sonoprep;
CREATE USER sonoprep_user WITH ENCRYPTED PASSWORD 'YOUR_STRONG_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE sonoprep TO sonoprep_user;
\q
```

Your DATABASE_URL will be: `postgresql://sonoprep_user:YOUR_STRONG_PASSWORD@localhost:5432/sonoprep`

## Step 4: Install PM2 (Process Manager)

```bash
npm install -g pm2
```

## Step 5: Clone and Build

```bash
# Create app directory
mkdir -p /var/www
cd /var/www

# Clone your repo (or upload the zip)
git clone https://github.com/YOUR_USERNAME/sonoprep-site.git
cd sonoprep-site

# Install dependencies
npm install

# Create .env file
nano .env
# Paste all your environment variables (DATABASE_URL, NEXTAUTH_SECRET, etc.)
# Set NEXTAUTH_URL=https://sonoprep.com
# Save and exit (Ctrl+X, Y, Enter)

# Generate Prisma client and push schema
npx prisma generate
npx prisma db push

# Build the app
npm run build
```

## Step 6: Start with PM2

```bash
# Start the app
pm2 start npm --name "sonoprep" -- start

# Save the process list (auto-restart on reboot)
pm2 save
pm2 startup

# Check it's running
pm2 status
pm2 logs sonoprep
```

The app runs on port 3000 by default.

## Step 7: Install Nginx (Reverse Proxy)

```bash
sudo apt install -y nginx

# Create config
sudo nano /etc/nginx/sites-available/sonoprep.com
```

Paste this Nginx config:

```nginx
server {
    listen 80;
    server_name sonoprep.com www.sonoprep.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/sonoprep.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Step 8: SSL with Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d sonoprep.com -d www.sonoprep.com

# Auto-renewal
sudo certbot renew --dry-run
```

## Step 9: Point Domain to VPS

In **Hostinger** → hPanel → Domains → sonoprep.com → DNS Zone:

| Type | Name | Value |
|------|------|-------|
| A | @ | `YOUR_VPS_IP_ADDRESS` |
| A | www | `YOUR_VPS_IP_ADDRESS` |

## Step 10: Set Up Firewall

```bash
sudo ufw allow 22      # SSH
sudo ufw allow 80      # HTTP
sudo ufw allow 443     # HTTPS
sudo ufw enable
```

## Step 11: Updating the Site

When you push new code:

```bash
cd /var/www/sonoprep-site
git pull
npm install
npx prisma generate
npm run build
pm2 restart sonoprep
```

---

# Which Path Should You Choose?

| Factor | Vercel (Path A) | VPS (Path B) |
|--------|----------------|--------------|
| Setup time | 15 minutes | 1-2 hours |
| Server maintenance | None (managed) | You manage updates, security patches |
| SSL | Automatic | Manual (Let's Encrypt) |
| CDN | Global edge network included | No CDN (add Cloudflare if needed) |
| Auto-deploy on git push | ✅ Yes | ❌ Manual |
| Cost | Free (hobby) / $20/mo (pro) | $5-13/mo VPS |
| Node.js optimization | Built for Next.js | Generic Node hosting |
| Uptime | 99.99% SLA | Depends on your VPS |
| Scaling | Automatic | Manual |

*Path A is recommended unless you have a specific reason to self-host.*

---

*Both paths use your Hostinger-purchased sonoprep.com domain. The domain stays yours regardless of where the app runs.*
