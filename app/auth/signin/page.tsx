"use client";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "@/app/providers/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ROUTES from "@/app/utils/routes";

export default function SignInPage() {  // Renommé pour plus de clarté
  const router = useRouter();
  // ... reste du code ...

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-black text-slate-900 dark:text-blue-100 flex flex-col items-center justify-center p-8 font-sans transition-colors duration-300">
      {/* ... reste du JSX ... */}
    </div>
  );
} 