"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center text-slate-700">
      <h1 className="text-4xl font-semibold text-slate-900">Something went wrong</h1>
      <p className="mt-3 max-w-lg text-slate-800">
        We hit a snag processing your request. Please retry, and if the issue persists contact support.
      </p>
      <Button className="mt-6" onClick={reset}>
        Retry
      </Button>
    </div>
  );
}
