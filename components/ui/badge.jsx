import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        text: 
          "border-transparent bg-transparent",
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
      size: {
        small: "px-2 py-0.25 text-xs",
        default: "px-2.5 py-0.5 text-xs",
        large: "px-3 py-1 text-xl",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant,
  size,
  hash=true,
  children,
  ...props
}) {
  return (<div className={cn(badgeVariants({ variant, size }), className)} {...props}>{hash ? '#' : ''}{children}</div>);
}

export { Badge, badgeVariants }
