import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 shadow-sm transition focus:border-[#2563EB] focus:bg-blue-50 focus:ring-2 focus:ring-[#93C5FD] focus-visible:outline-none ${className ?? ""}`.trim()}
      {...props}
    />
  )
);

Input.displayName = "Input";
