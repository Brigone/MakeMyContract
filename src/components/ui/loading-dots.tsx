"use client";

export function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 1, 2].map((dot) => (
        <span
          key={dot}
          className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent)]"
          style={{ animationDelay: `${dot * 150}ms` }}
        />
      ))}
    </span>
  );
}
