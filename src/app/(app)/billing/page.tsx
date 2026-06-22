"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { trackCheckoutStarted } from "@/lib/analytics";
import {
  CreditCard,
  CheckCircle2,
  Shield,
  Loader2,
  Calendar,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PRODUCTS } from "@/components/marketing/product-card";
import { formatCurrency } from "@/lib/utils";

interface Purchase {
  id: string;
  productName: string;
  productKey: string;
  amount: number;
  purchasedAt: string;
  expiresAt: string;
  accessExpiresAt: string;
  status: string;
}

export default function BillingPage() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const preselected = searchParams.get("product");
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [purchasesLoading, setPurchasesLoading] = useState(true);

  // Fetch real purchases
  useEffect(() => {
    async function fetchPurchases() {
      try {
        const res = await fetch("/api/user/purchases");
        if (res.ok) {
          const data = await res.json();
          setPurchases(data.purchases || []);
        }
      } catch {
        // Graceful degradation
      } finally {
        setPurchasesLoading(false);
      }
    }
    fetchPurchases();
  }, []);

  const handleCheckout = async (productKey: string) => {
    setLoadingProduct(productKey);
    trackCheckoutStarted(productKey, 0);
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

  // Check if user already owns a product
  const ownedKeys = new Set(purchases.map((p) => p.productKey));
  const hasBundle = ownedKeys.has("PREMIUM_BUNDLE");

  function getDaysRemaining(expiresAt: string) {
    const now = new Date();
    const exp = new Date(expiresAt);
    return Math.max(0, Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  }

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
          Purchase study materials or manage your access.
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

      {/* Active purchases — real data */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Active Purchases</CardTitle>
        </CardHeader>
        <CardContent>
          {purchasesLoading ? (
            <div className="py-6 text-center">
              <Loader2 className="h-5 w-5 mx-auto animate-spin text-cream-dim/40" />
              <p className="text-sm text-cream-dim/40 mt-2">Loading purchases...</p>
            </div>
          ) : purchases.length === 0 ? (
            <p className="py-6 text-center text-sm text-cream-dim">
              No active purchases. Browse products below to get started.
            </p>
          ) : (
            <div className="space-y-3">
              {purchases.map((purchase) => {
                const daysLeft = getDaysRemaining(purchase.accessExpiresAt || purchase.expiresAt);
                return (
                  <div
                    key={purchase.id}
                    className="flex items-center justify-between rounded-lg border border-border/40 bg-white/[0.02] p-4"
                  >
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-teal" />
                      <div>
                        <p className="text-sm font-medium text-cream">
                          {purchase.productName}
                        </p>
                        <p className="font-mono text-[0.65rem] text-cream-dim/50">
                          Purchased {new Date(purchase.purchasedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3 w-3 text-cream-dim/40" />
                          <span className={`text-xs font-mono ${daysLeft <= 7 ? "text-amber" : "text-cream-dim/60"}`}>
                            {daysLeft} day{daysLeft !== 1 ? "s" : ""} left
                          </span>
                        </div>
                      </div>
                      <Badge variant={daysLeft > 0 ? "default" : "error"}>
                        {daysLeft > 0 ? "Active" : "Expired"}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
            const isOwned =
              ownedKeys.has(product.key) ||
              (hasBundle && product.key !== "PREMIUM_BUNDLE");

            return (
              <Card
                key={product.key}
                className={
                  isOwned
                    ? "border-success/30 bg-success/[0.02]"
                    : isPreselected || isBundle
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
                    {isOwned && <Badge variant="default">✓ Owned</Badge>}
                    {!isOwned && product.popular && <Badge>Popular</Badge>}
                    {!isOwned && product.savingsLabel && (
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
                    disabled={isLoading || isOwned}
                    onClick={() => handleCheckout(product.key)}
                  >
                    {isOwned ? (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Already Purchased
                      </>
                    ) : isLoading ? (
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
export const dynamic = "force-dynamic";
