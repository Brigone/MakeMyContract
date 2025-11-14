import { env } from "@/lib/env";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const getFirebaseClientApp = () => {
  if (!getApps().length) {
    const config = env.firebase;
    if (!config.apiKey || !config.authDomain || !config.projectId) {
      throw new Error(
        "Missing NEXT_PUBLIC_FIREBASE_* variables. Check .env.example for guidance."
      );
    }
    initializeApp(config);
  }
  return getApp();
};

export const getFirebaseAuth = () => getAuth(getFirebaseClientApp());
export const getFirebaseClientFirestore = () =>
  getFirestore(getFirebaseClientApp());
