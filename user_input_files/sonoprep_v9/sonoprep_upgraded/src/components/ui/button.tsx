import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded font-mono text-sm font-medium tracking-wide uppercase transition-all duration-300 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-teal text-obsidian hover:bg-teal-glow hover:shadow-glow active:scale-[0.98]",
        amber:
          "bg-amber text-obsidian hover:bg-amber-dim hover:shadow-lg active:scale-[0.98]",
        ghost:
          "border border-border text-cream hover:bg-mist hover:border-cream-dim",
        outline:
          "border border-teal text-teal hover:bg-teal hover:text-obsidian",
        destructive:
          "bg-error text-white hover:bg-red-600",
        link: "text-teal underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
