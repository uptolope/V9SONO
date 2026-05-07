"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/marketing/hero";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { ProductGrid } from "@/components/marketing/product-card";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { DomainCoverage } from "@/components/marketing/domain-coverage";
import { FreeDemo } from "@/components/marketing/free-demo";
import { Testimonials } from "@/components/marketing/testimonials";
import { FounderSection } from "@/components/marketing/founder-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaSection } from "@/components/marketing/cta-section";
import { CredentialUrgency } from "@/components/marketing/credential-urgency";

export function HomePageClient() {
  const handlePurchase = (productKey: string) => {
    window.location.href = `/auth/signup?redirect=/billing&product=${productKey}`;
  };

  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <TrustStrip />
        <CredentialUrgency />
        <HowItWorks />
        <DomainCoverage />
        <ProductGrid onPurchase={handlePurchase} />
        <FreeDemo />
        <Testimonials />
        <FounderSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
