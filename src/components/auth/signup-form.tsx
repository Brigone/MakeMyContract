"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getDraft } from "@/lib/draft-storage";

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
  const [showRequirementsModal, setShowRequirementsModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupValues>({
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
    return "We could not create your account. Please verify your details.";
  };

  const createSession = async (idToken: string) => {
    const response = await fetch("/api/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });
    if (!response.ok) {
      throw new Error("Unable to create authenticated session.");
    }
  };

  const onSubmit = (values: SignupValues) => {
    startTransition(async () => {
      try {
        const auth = getFirebaseAuth();
        const result = await createUserWithEmailAndPassword(auth, values.email, values.password);
        const idToken = await result.user.getIdToken();
        await createSession(idToken);
        const pendingDraft = getDraft();
        router.push(pendingDraft?.path ?? "/pricing");
        router.refresh();
      } catch (error) {
        setError("email", {
          message: getAuthErrorMessage(error),
        });
      }
    });
  };

  const handleGoogleSignup = () => {
    setShowRequirementsModal(false);
    startTransition(async () => {
      try {
        const auth = getFirebaseAuth();
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        const result = await signInWithPopup(auth, provider);
        const idToken = await result.user.getIdToken();
        await createSession(idToken);
        const pendingDraft = getDraft();
        router.push(pendingDraft?.path ?? "/pricing");
        router.refresh();
      } catch (error) {
        setError("email", {
          message: getAuthErrorMessage(error),
        });
      }
    });
  };

  const handleInvalidSubmit = () => {
    setShowRequirementsModal(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, handleInvalidSubmit)} className="space-y-5">
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
          {isPending ? "Creating account..." : "Create account and continue"}
        </Button>
      </form>
      <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
        <span className="h-px flex-1 bg-slate-200" aria-hidden="true" />
        or
        <span className="h-px flex-1 bg-slate-200" aria-hidden="true" />
      </div>
      <Button
        type="button"
        variant="secondary"
        className="mt-2 w-full"
        disabled={isPending}
        onClick={handleGoogleSignup}
      >
        Continue with Google
      </Button>
      {showRequirementsModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-slate-800 shadow-2xl">
            <h2 className="text-xl font-semibold text-slate-900">Complete the signup form</h2>
            <p className="mt-2 text-sm text-slate-600">
              To create your Make My Contract account we need a valid email address, an 8+ character password, and the
              confirmation field filled out. Please complete every field before clicking &quot;Create account&quot;.
            </p>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
                <span className="h-px flex-1 bg-slate-200" aria-hidden="true" />
                or
                <span className="h-px flex-1 bg-slate-200" aria-hidden="true" />
              </div>
              <Button
                type="button"
                variant="secondary"
                className="w-full"
                disabled={isPending}
                onClick={handleGoogleSignup}
              >
                Continue with Google
              </Button>
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowRequirementsModal(false)}
                >
                  Got it
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
