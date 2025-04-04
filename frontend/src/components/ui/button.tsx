// src/components/ui/button.tsx

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
