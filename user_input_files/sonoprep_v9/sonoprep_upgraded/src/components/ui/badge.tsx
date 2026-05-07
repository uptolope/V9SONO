import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded px-2 py-0.5 font-mono text-[0.65rem] font-semibold uppercase tracking-widest transition-colors",
  {
    variants: {
      variant: {
        default: "bg-teal/20 text-teal-glow",
        amber: "bg-amber/20 text-amber",
        success: "bg-success/20 text-success",
        error: "bg-error/20 text-error",
        outline: "border border-border text-cream-dim",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
