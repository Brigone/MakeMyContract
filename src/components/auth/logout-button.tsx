"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { signOut } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { Button } from "@/components/ui/button";

interface LogoutButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function LogoutButton({ variant = "ghost", size = "md" }: LogoutButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      try {
        const auth = getFirebaseAuth();
        await signOut(auth);
      } catch {
        // Ignore client auth errors during logout
      }

      await fetch("/logout", {
        method: "POST",
        credentials: "include",
      }).catch(() => {
        // ignore network errors, still redirect user
      });

      if (typeof window !== "undefined") {
        window.location.href = "/pricing";
      } else {
        router.push("/pricing");
        router.refresh();
      }
    });
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleLogout}
      disabled={isPending}
    >
      {isPending ? "Signing out..." : "Sign out"}
    </Button>
  );
}
