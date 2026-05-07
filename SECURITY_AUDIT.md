# SonoPrep — Security Audit & Red-Team Review

A comprehensive security review of the SonoPrep architecture covering auth, payments, data access, and web application risks.

---

## 1. Threat Model

| Attack Surface | Risk Level | Mitigation Status |
|---------------|-----------|-------------------|
| Authentication bypass | 🔴 Critical | ✅ Mitigated |
| Stripe webhook forgery | 🔴 Critical | ✅ Mitigated |
| IDOR (Insecure Direct Object Reference) | 🟠 High | ✅ Mitigated |
| XSS (Cross-Site Scripting) | 🟠 High | ✅ Mitigated |
| CSRF (Cross-Site Request Forgery) | 🟡 Medium | ✅ Mitigated |
| Brute-force login | 🟡 Medium | ✅ Mitigated |
| Data exposure in errors | 🟡 Medium | ✅ Mitigated |
| Cookie misconfig | 🟡 Medium | ✅ Mitigated |
| Clickjacking | 🟢 Low | ✅ Mitigated |
| MIME sniffing | 🟢 Low | ✅ Mitigated |

---

## 2. Authentication Security

### 2.1 Password Handling
**File**: `src/lib/auth.ts`

✅ **bcrypt with 12 rounds** — Passwords are hashed using `bcryptjs` with a cost factor of 12. This provides ~300ms hash time, making brute-force impractical.

✅ **No plaintext storage** — Only bcrypt hashes are stored in the database.

✅ **Timing-safe comparison** — bcrypt.compare is used (constant-time comparison).

### 2.2 Rate Limiting
**File**: `src/lib/auth.ts`

✅ **5 failed attempts → 15-minute lockout** — The `loginAttempts` and `lockedUntil` fields on the User model track failed auth attempts.

⚠️ **Recommendation**: Add IP-based rate limiting at the edge (Vercel Edge Middleware or Cloudflare) to prevent distributed brute-force attacks from multiple accounts.

### 2.3 Session Security
✅ **JWT strategy** — No server-side session storage needed, reducing attack surface.

✅ **httpOnly cookies** — NextAuth defaults to httpOnly, preventing JavaScript access.

✅ **secure flag** — Set automatically in production (HTTPS only).

✅ **sameSite=lax** — NextAuth default prevents most CSRF vectors.

### 2.4 Registration
**File**: `src/app/api/auth/signup/route.ts`

✅ **Zod validation** — Email format and password minimum length enforced server-side.

✅ **Duplicate check** — Existing email check before creation with generic error message ("Email already registered") to prevent user enumeration.

⚠️ **Recommendation**: Consider adding CAPTCHA (hCaptcha or Turnstile) to prevent automated account creation.

---

## 3. Payment Security (Stripe)

### 3.1 Checkout
**File**: `src/app/api/checkout/route.ts`

✅ **Server-side session creation** — Checkout sessions are created server-side, preventing price manipulation.

✅ **Authenticated-only** — Session check before creating checkout.

✅ **No card data touches our server** — All card handling is done by Stripe Checkout.

### 3.2 Webhook Handler
**File**: `src/app/api/webhooks/stripe/route.ts`

✅ **Signature verification** — `stripe.webhooks.constructEvent()` verifies the webhook signature using `STRIPE_WEBHOOK_SECRET`.

✅ **Raw body parsing** — The raw request body is used for signature verification (not JSON-parsed).

✅ **Idempotent processing** — Purchases are created with unique constraints to prevent duplicate grants.

⚠️ **Recommendation**: Log all webhook events to an audit table for forensic analysis. Add alerting for unusual patterns (e.g., many refunds in short period).

### 3.3 Access Control
✅ **90-day access windows** — Each purchase has explicit `startDate` and `endDate` fields.

✅ **Bundle expansion** — Premium Bundle webhook grants individual product access for all 4 products.

✅ **Refund handling** — Webhook handles `charge.refunded` events to revoke access.

---

## 4. Data Access (IDOR Prevention)

### 4.1 Query Scoping
**Files**: All API routes in `src/app/api/`

✅ **User-scoped queries** — Every database query includes `userId: session.user.id` in the WHERE clause.

✅ **No direct ID exposure** — Users cannot access other users' exam sessions, flashcard progress, or purchases.

### 4.2 Admin Guard
**File**: `src/middleware.ts`

✅ **Role check** — Admin routes require `role === 'ADMIN'` in the JWT token.

✅ **Middleware-level protection** — Checked before the route handler executes.

---

## 5. Web Application Security

### 5.1 HTTP Security Headers
**File**: `next.config.ts`

| Header | Value | Purpose |
|--------|-------|---------|
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' js.stripe.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; ...` | Prevents XSS, data injection |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Forces HTTPS for 2 years |
| `X-Frame-Options` | `DENY` | Prevents clickjacking |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Controls referrer leakage |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Disables unnecessary APIs |

### 5.2 XSS Prevention
✅ **React auto-escaping** — All JSX output is escaped by default.

✅ **No `dangerouslySetInnerHTML`** — Not used anywhere in the codebase.

✅ **CSP header** — Restricts script sources to `'self'` and Stripe.

### 5.3 CSRF Protection
✅ **SameSite cookies** — NextAuth sets `SameSite=Lax` by default.

✅ **POST-only mutations** — All state-changing operations use POST/PATCH methods.

✅ **NextAuth CSRF token** — Built-in CSRF protection for auth endpoints.

### 5.4 Input Validation
**File**: `src/lib/validations.ts`

✅ **Zod schemas for all inputs**:
- `signupSchema` — email, name, password (min 8 chars)
- `signinSchema` — email, password
- `checkoutSchema` — productKey (enum validation)
- `examAnswerSchema` — questionId, answerId
- `flashcardReviewSchema` — flashcardId, quality (0-5)
- `accountUpdateSchema` — name, examDate

✅ **Server-side validation** — All API routes validate with Zod before processing.

✅ **Safe error messages** — Validation errors return field-level details without exposing internals.

---

## 6. Infrastructure Security

### 6.1 Environment Variables
**File**: `.env.example`

✅ **All secrets documented** — DATABASE_URL, NEXTAUTH_SECRET, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET.

✅ **No secrets in source code** — All sensitive values loaded from environment.

✅ **Public vs private separation** — Only `NEXT_PUBLIC_APP_URL` is client-exposed.

### 6.2 Database
✅ **Prisma ORM** — Parameterized queries prevent SQL injection.

✅ **Connection pooling** — Prisma singleton pattern prevents connection exhaustion.

✅ **SSL required** — `?sslmode=require` in connection string.

### 6.3 Audit Logging
**File**: `prisma/schema.prisma` — `AuditLog` model

✅ **Logged events**: Sign-in, sign-up, account changes, purchases.

✅ **Fields**: userId, action, metadata (JSON), IP address, timestamp.

⚠️ **Recommendation**: Add log rotation and retention policy (e.g., 90 days for detailed logs, 1 year for summaries).

---

## 7. Identified Risks & Recommendations

### High Priority
1. **Add IP-based rate limiting** — Current rate limiting is per-account only. Add Vercel Edge or Cloudflare rate limiting for distributed attacks.
2. **Add CAPTCHA to signup** — Prevent automated account creation with hCaptcha or Cloudflare Turnstile.
3. **Webhook event logging** — Store all Stripe webhook payloads for forensic analysis.

### Medium Priority
4. **Add account lockout notifications** — Email the user when their account is locked due to failed attempts.
5. **Implement refresh token rotation** — Rotate JWT tokens periodically for long-lived sessions.
6. **Add Content-Security-Policy reporting** — Set `report-uri` to catch CSP violations in production.
7. **Database connection encryption** — Ensure the PostgreSQL connection uses TLS.

### Low Priority
8. **Implement Subresource Integrity (SRI)** — Add SRI hashes for any external scripts (Stripe).
9. **Add security.txt** — Create `/.well-known/security.txt` with contact info for responsible disclosure.
10. **Dependency auditing** — Run `npm audit` weekly and update vulnerable packages.

---

## 8. Compliance Notes

| Requirement | Status |
|-------------|--------|
| PCI DSS (payments) | ✅ Card data never touches server (Stripe Checkout) |
| Password storage | ✅ bcrypt hashing (NIST SP 800-63B compliant) |
| HTTPS enforcement | ✅ HSTS header with preload |
| Data minimization | ✅ Only essential user data stored |
| Session security | ✅ httpOnly, secure, sameSite cookies |
| Input validation | ✅ Zod schemas on all endpoints |
| Error handling | ✅ Generic errors, no stack traces to client |

---

## 9. Key Rotation Procedure

If any secret is compromised:

### NextAuth Secret
```bash
# Generate new secret
openssl rand -base64 32
# Update in Vercel: Settings → Environment Variables → NEXTAUTH_SECRET
# All existing sessions will be invalidated (users must re-login)
```

### Stripe Keys
```bash
# 1. Roll the key in Stripe Dashboard → Developers → API Keys
# 2. Update STRIPE_SECRET_KEY in Vercel
# 3. If webhook secret compromised: create new endpoint, delete old one
# 4. Update STRIPE_WEBHOOK_SECRET in Vercel
```

### Database URL
```bash
# 1. Change password in database provider (Supabase/Neon)
# 2. Update DATABASE_URL in Vercel
# 3. Redeploy
```

---

*Audit performed as part of SonoPrep project build. Review and update quarterly.*
