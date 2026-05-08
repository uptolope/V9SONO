"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  CreditCard,
  CheckCircle2,
  Package,
  Shield,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PRODUCTS } from "@/components/marketing/product-card";
import { formatCurrency } from "@/lib/utils";

export default function BillingPage() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const preselected = searchParams.get("product");
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null);

  const handleCheckout = async (productKey: string) => {
    setLoadingProduct(productKey);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productKey }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout failed:", data.error);
        setLoadingProduct(null);
      }
    } catch {
      console.error("Checkout error");
      setLoadingProduct(null);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-2xl font-bold text-cream">
          Billing & Products
        </h1>
        <p className="mt-1 text-sm text-cream-dim">
          Purchase study materials or manage your subscriptions.
        </p>
      </motion.div>

      {/* Success banner */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded border border-success/50 bg-success/10 p-4"
        >
          <CheckCircle2 className="h-5 w-5 text-success" />
          <div>
            <p className="font-display font-semibold text-success">
              Purchase Successful!
            </p>
            <p className="text-sm text-cream-dim">
              Your access has been activated. Start studying from the Dashboard.
            </p>
          </div>
        </motion.div>
      )}

      {/* Active purchases */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Active Purchases</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="py-6 text-center text-sm text-cream-dim">
            No active purchases. Browse products below to get started.
          </p>
        </CardContent>
      </Card>

      {/* Available products */}
      <div>
        <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-cream-dim">
          Available Products
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {PRODUCTS.map((product) => {
            const isLoading = loadingProduct === product.key;
            const isPreselected = preselected === product.key;
            const isBundle = product.key === "PREMIUM_BUNDLE";

            return (
              <Card
                key={product.key}
                className={
                  isPreselected || isBundle
                    ? "border-teal/50 shadow-glow"
                    : "hover:border-teal/30 transition-colors"
                }
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mist">
                        <product.icon className="h-5 w-5 text-teal" />
                      </div>
                      <div>
                        <h3 className="font-display text-sm font-semibold text-cream">
                          {product.name}
                        </h3>
                        <p className="font-mono text-xs text-cream-dim">
                          {formatCurrency(product.price)} / 90-day access
                        </p>
                      </div>
                    </div>
                    {product.popular && <Badge>Popular</Badge>}
                    {product.savingsLabel && (
                      <Badge variant="amber">{product.savingsLabel}</Badge>
                    )}
                  </div>

                  <p className="mt-3 text-xs text-cream-dim">
                    {product.description}
                  </p>

                  <Button
                    className="mt-4 w-full"
                    size="sm"
                    variant={isBundle ? "amber" : "default"}
                    disabled={isLoading}
                    onClick={() => handleCheckout(product.key)}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Purchase {formatCurrency(product.price)}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Guarantee */}
      <div className="flex items-center justify-center gap-2 text-sm text-cream-dim">
        <Shield className="h-4 w-4 text-teal" />
        <span>90-day full access • Secure payment via Stripe</span>
      </div>
    </div>
  );
}
export const dynamic = 'force-dynamic';
