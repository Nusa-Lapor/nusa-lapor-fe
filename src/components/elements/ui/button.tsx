import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "bg-red-700 rounded-[100px] inline-flex flex-col justify-center items-center gap-2 overflow-hidden text-center justify-center text-Schemes-On-Primary font-medium font-['Roboto'] leading-tight tracking-tight",
  {
    variants: {
      variant: {
        primary:
          "bg-button-primary text-text-light-3 hover:bg-[#F93462] rounded-xl hover:shadow-lg active:bg-red-700 disabled:bg-[#B1B1B1] disabled:text-[#8B8B8B]",
        secondary:
          "bg-button-secondary text-text-light-3 hover:bg-[#B3D155] rounded-xl hover:shadow-lg active:bg-red-500 disabled:bg-[#B1B1B1] disabled:text-[#8B8B8B]",
        ghost:
          "border-2 border-button-primary text-white hover:border-[#F93462] rounded-xl active:bg-red-300 disabled:border-[#B1B1B1] disabled:text-[#8B8B8B]",
        tertiary:
          "text-white hover:bg-white/1 rounded-xl active:bg-red-700 disabled:text-[#8B8B8B]",
        link: "text-white hover:text-[#F93462] rounded-xl active:text-[#C51D44] disabled:text-[#8B8B8B]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
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
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };