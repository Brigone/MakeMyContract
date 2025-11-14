type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "outline";
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const base =
    "inline-flex items-center rounded-full px-3 py-0.5 text-xs font-semibold uppercase tracking-wide";
  const styles =
    variant === "outline"
      ? "border border-slate-200 text-slate-600"
      : "bg-blue-50 text-blue-700";

  return (
    <span className={`${base} ${styles} ${className ?? ""}`.trim()} {...props} />
  );
}
