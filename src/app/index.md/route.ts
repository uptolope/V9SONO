import { NextResponse } from "next/server";

const MD = `---
title: SonoPrep — ARDMS SPI Exam Preparation
description: Prepare for the ARDMS SPI — required for RDMS, RDCS, RVT, and RMSKS credentials. 200+ flashcards, 110-question simulator, and Physics Pearls built by RDMS sonographers.
url: https://sonoprep.com
last_updated: 2026-05-01
---

# SonoPrep — ARDMS SPI Exam Preparation

Built by practicing RDMS sonographers. Built around the exact ARDMS exam blueprint. Products from $9.

## What SonoPrep Offers

- **200+ Flashcards** — RDMS-written, spaced-repetition delivery, all six SPI domains
- **110-Question Exam Simulator** — calibrated to ARDMS format and difficulty, with clinical rationales
- **50 Physics Pearls** — high-yield physics concepts explained clinically, not academically
- **Domain Analytics** — track performance across all six SPI content areas
- **Free Tier** — 20 flashcards, 10-question quiz, 5 Physics Pearls, no credit card

## Pricing

- Free: $0 — no credit card
- SPI Flashcards: $24 (60-day access)
- Physics Pearls: $9 (60-day access)
- Exam Simulator: $49.99 — 3 attempts, 110 Qs from 167 bank (60-day access)
- Study Notes: $34 (60-day access)
- Premium Bundle: $99 — all 4 products, save $17 vs buying individually (60-day access)
- Program License: Custom pricing for DMS programs and hospitals

## SPI Exam Coverage

All six ARDMS SPI content domains:
1. Pulse-Echo Principles (~25%)
2. Doppler Physics & Instrumentation (~22%)
3. Transducer Mechanisms (~18%)
4. Image Formation & Optimization (~17%)
5. Artifact Recognition (~11%)
6. Bioeffects & Safety (~7%)

## Key Facts

- Built around the exact ARDMS exam blueprint
- Built by RDMS-credentialed, practicing sonographers
- Mobile-optimized, progress syncs across devices
- 60-day full access after purchase

## Contact

- Website: https://sonoprep.com
- Email: support@sonoprep.com
- Programs: support@sonoprep.com
`;

export function GET() {
  return new NextResponse(MD, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
