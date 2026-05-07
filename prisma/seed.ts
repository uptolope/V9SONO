/**
 * SonoPrep — Prisma Seed Script
 * Seeds the Product table with the 5 SonoPrep products.
 * Run with: npx prisma db seed
 */

 import { PrismaClient } from "@prisma/client";

 const prisma = new PrismaClient();
 
 const PRODUCTS = [
   {
     type: "FLASHCARDS",
     name: "SPI Flashcards",
     description:
       "200+ clinically focused flashcards with SM-2 spaced repetition for ARDMS SPI exam preparation.",
     priceInCents: 2900,
     active: true,
   },
   {
     type: "PHYSICS_PEARLS",
     name: "Physics Pearls",
     description:
       "50 high-yield physics pearls with concise explanations of critical SPI concepts and clinical applications.",
     priceInCents: 900,
     active: true,
   },
   {
     type: "EXAM_SIMULATOR",
     name: "Exam Simulator",
     description:
       "110 ARDMS-weighted practice questions with detailed explanations, timed sessions, and score analytics.",
     priceInCents: 4900,
     active: true,
   },
   {
     type: "STUDY_NOTES",
     name: "Study Notes",
     description:
       "159-page comprehensive guide covering every ARDMS SPI domain with reading progress tracking.",
     priceInCents: 3900,
     active: true,
   },
   {
     type: "PREMIUM_BUNDLE",
     name: "Premium Bundle",
     description:
       "Complete SPI exam preparation toolkit — all four products at a discount. Save \$27.",
     priceInCents: 9900,
     active: true,
   },
 ] as const;
 
 async function main() {
   console.log("🌱 Seeding SonoPrep database...\n");
 
   for (const product of PRODUCTS) {
     const result = await prisma.product.upsert({
       where: { type: product.type },
       update: {
         name: product.name,
         description: product.description,
         priceInCents: product.priceInCents,
         active: product.active,
       },
       create: {
         type: product.type,
         name: product.name,
         description: product.description,
         priceInCents: product.priceInCents,
         active: product.active,
       },
     });
 
     console.log(
       `  ✓ \${result.name} (\${result.type}) — \$\${(result.priceInCents / 100).toFixed(2)}`
     );
   }
 
   console.log("\n✅ Seed complete. 5 products created/updated.");
 }
 
 main()
   .catch((e) => {
     console.error("❌ Seed error:", e);
     process.exit(1);
   })
   .finally(async () => {
     await prisma.\$disconnect();
   });