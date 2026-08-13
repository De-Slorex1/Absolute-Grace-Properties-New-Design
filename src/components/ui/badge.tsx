import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2.5 py-1 font-mono text-[10px] tracking-wider transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-indigo text-white",
        outline: "border-line text-ink/70 bg-white",
        clay: "border-clay/30 text-clay bg-clay/5",
        dark: "border-white/20 text-clay-light bg-transparent",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
