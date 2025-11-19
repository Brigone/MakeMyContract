"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getDraft } from "@/lib/draft-storage";

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

  const getAuthErrorMessage = (error: unknown) => {
    if (error instanceof FirebaseError) {
      if (error.code === "auth/popup-blocked") {
        return "Your browser blocked the Google sign-in popup. Please allow popups or use email + password.";
      }
      return error.message;
    }
    if (error instanceof Error) {
      return error.message;
    }
    return "We could not verify those credentials. Please try again.";
  };

  const createSession = async (idToken: string) => {
    const response = await fetch("/api/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
      credentials: "include",
    });
    const debugText = await response.text().catch(() => "<no text>");
    const recreatedResponse = new Response(debugText, { status: response.status });
    if (!recreatedResponse.ok) {
      throw new Error("Unable to create session.");
    }
  };

  const onSubmit = (values: LoginValues) => {
    startTransition(async () => {
      try {
        const auth = getFirebaseAuth();
        const result = await signInWithEmailAndPassword(auth, values.email, values.password);
        const idToken = await result.user.getIdToken();
        await createSession(idToken);
        const pendingDraft = getDraft();
        router.push(pendingDraft?.path ?? "/dashboard");
        router.refresh();
      } catch (error) {
        setError("email", {
          message: getAuthErrorMessage(error),
        });
      }
    });
  };

  const handleGoogleSignIn = () => {
    startTransition(async () => {
      try {
        const auth = getFirebaseAuth();
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        const result = await signInWithPopup(auth, provider);
        const idToken = await result.user.getIdToken();
        await createSession(idToken);
        const pendingDraft = getDraft();
        router.push(pendingDraft?.path ?? "/dashboard");
        router.refresh();
      } catch (error) {
        setError("email", {
          message: getAuthErrorMessage(error),
        });
      }
    });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-[430px]:space-y-3.5 sm:space-y-5">
        <div>
          <label className="text-sm font-medium text-slate-600">Email</label>
          <Input type="email" placeholder="you@company.com" className="mt-1.5 max-[430px]:mt-1" {...register("email")} />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600">Password</label>
          <Input type="password" placeholder="••••••••" className="mt-1.5" {...register("password")} />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
        </div>
        <Button
          type="submit"
          className="w-full py-5 text-sm font-semibold max-[430px]:py-4 max-[430px]:text-[0.95rem] sm:py-6 sm:text-base"
          disabled={isPending}
        >
          {isPending ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-slate-400 sm:text-xs">
        <span className="h-px flex-1 bg-slate-200" aria-hidden="true" />
        or
        <span className="h-px flex-1 bg-slate-200" aria-hidden="true" />
      </div>
      <Button
        type="button"
        variant="secondary"
        className="w-full py-5 text-sm font-semibold max-[430px]:py-4 max-[430px]:text-[0.95rem] sm:py-6 sm:text-base"
        disabled={isPending}
        onClick={handleGoogleSignIn}
      >
        Continue with Google
      </Button>
    </div>
  );
}
