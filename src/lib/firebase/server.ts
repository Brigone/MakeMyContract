import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { env } from "@/lib/env";

// 🔥 Inicialização segura e compatível com SSR (Firebase Hosting / Next.js 14)
const createAdminApp = () => {
  const { projectId, clientEmail, privateKey } = env.firebaseAdmin;

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey: privateKey,
    }),
  });
};

// Apenas UMA instância, sem globalThis, sem race conditions
const adminApp = getApps().length === 0 ? createAdminApp() : getApps()[0];

export const getFirebaseAdminAuth = () => {
  return getAuth(adminApp);
};

export const getServerFirestore = () => {
  return getFirestore(adminApp);
};
