"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z
  .object({
    email: z.string().email("Enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Confirm your password."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type SignupValues = z.infer<typeof schema>;

export function SignupForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: SignupValues) => {
    startTransition(async () => {
      try {
        const auth = getFirebaseAuth();
        const result = await createUserWithEmailAndPassword(auth, values.email, values.password);
        const idToken = await result.user.getIdToken();
        const response = await fetch("/api/auth/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        });
        if (!response.ok) {
          throw new Error("Unable to create authenticated session.");
        }
        router.push("/pricing");
        router.refresh();
      } catch (error) {
        setError("email", {
          message:
            error instanceof Error
              ? error.message
              : "We could not create your account. Please verify your details.",
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
      <div>
        <label className="text-sm font-medium text-slate-600">Confirm password</label>
        <Input
          type="password"
          placeholder="••••••••"
          className="mt-2"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
