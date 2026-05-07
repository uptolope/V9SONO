# SonoPrep — AI Assistant Rules

## PROTECTED FILES — NEVER EDIT THESE

The following files contain **licensed, proprietary exam content**. They must NEVER be modified,
rewritten, summarized, moved, duplicated, or referenced for content changes under any circumstance.

```
src/lib/content/exam-data.ts
src/lib/content/flashcard-data.ts
src/lib/content/physics-pearls-data.ts
src/lib/content/study-notes-data.ts
```

**If any task requires touching these files: STOP and ask the user explicitly before proceeding.**

These files are read-only. Treat them like a sealed vault.

## Safe to edit
- All `src/components/` files (UI only)
- All `src/app/` page files (layout, metadata, copy)
- All `src/components/marketing/` files
- `tailwind.config.ts`, `globals.css`
- `src/app/layout.tsx`, `next.config.ts`

## Tech stack
- Next.js 14 App Router + TypeScript
- Tailwind CSS with custom design tokens
- Prisma + PostgreSQL
- NextAuth v4
- Stripe payments
- Vercel deployment (auto-deploy on push to main)

## Git workflow
```bash
cd ~/Downloads/sonoprep
git add .
git commit -m "describe change"
git push origin main
```
