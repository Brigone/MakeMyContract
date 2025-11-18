"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getDraft } from "@/lib/draft-storage";

interface DraftResumeWatcherProps {
  shouldResume: boolean;
}

export function DraftResumeWatcher({ shouldResume }: DraftResumeWatcherProps) {
  const router = useRouter();

  useEffect(() => {
    if (!shouldResume) return;
    const draft = getDraft();
    if (!draft?.path) return;
    const currentPath = window.location.pathname + window.location.search;
    if (currentPath === draft.path) {
      return;
    }
    router.push(draft.path);
  }, [shouldResume, router]);

  return null;
}
