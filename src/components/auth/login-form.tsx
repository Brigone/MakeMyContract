"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type LoginValues = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: LoginValues) => {
    startTransition(async () => {
      try {
        const auth = getFirebaseAuth();
        const result = await signInWithEmailAndPassword(auth, values.email, values.password);
        const idToken = await result.user.getIdToken();

        const response = await fetch("/api/auth/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
          credentials: "include",
        });


        const debugText = await response.text().catch(() => "<no text>");

        // Recreate Response for normal flow
        const recreatedResponse = new Response(debugText, { status: response.status });

        if (!recreatedResponse.ok) {
          throw new Error("Unable to create session.");
        }
        router.push("/dashboard");
        router.refresh();
      } catch (error) {
        setError("email", {
          message:
            error instanceof Error
              ? error.message
              : "We could not verify those credentials. Please try again.",
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="text-sm font-medium text-slate-600">Email</label>
        <Input type="email" placeholder="you@company.com" className="mt-2" {...register("email")} />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label className="text-sm font-medium text-slate-600">Password</label>
        <Input type="password" placeholder="••••••••" className="mt-2" {...register("password")} />
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
