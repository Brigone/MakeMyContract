import { forwardRef } from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 shadow-sm transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#93C5FD] focus-visible:outline-none ${className ?? ""}`.trim()}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";
