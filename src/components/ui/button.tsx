import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-[#2563EB] !text-white shadow-sm hover:bg-[#1D4ED8] focus-visible:ring-[#2563EB]",
        secondary:
          "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 focus-visible:ring-slate-300",
        ghost:
          "text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-200",
      },
      size: {
        sm: "px-4 py-1.5",
        md: "px-5 py-2.5",
        lg: "px-6 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        ref={ref}
        className={`${buttonVariants({ variant, size })} ${className ?? ""}`.trim()}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
