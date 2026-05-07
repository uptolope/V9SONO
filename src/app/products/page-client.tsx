"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductGrid } from "@/components/marketing/product-card";
import { CtaSection } from "@/components/marketing/cta-section";
import { FaqSection } from "@/components/marketing/faq-section";

export function ProductsPageClient() {
  const handlePurchase = (productKey: string) => {
    window.location.href = `/auth/signup?redirect=/billing&product=${productKey}`;
  };

  return (
    <>
      <Header />
      <main id="main-content" className="pt-24">
        <ProductGrid onPurchase={handlePurchase} />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
