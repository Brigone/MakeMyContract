import { forwardRef } from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={`w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#93C5FD] focus-visible:outline-none ${className ?? ""}`.trim()}
      {...props}
    >
      {children}
    </select>
  )
);

Select.displayName = "Select";
