"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../contexts/AuthContext";

export default function Week9LoginPage() {
  const { user, gitHubSignIn, googleSignIn } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/week-9/shopping-list");
    }
  }, [user, router]);

  async function handleGitHubSignIn() {
    try {
      await gitHubSignIn();
    } catch (e) {
      console.error(e);
    }
  }

  async function handleGoogleSignIn() {
    try {
      await googleSignIn();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-10 flex flex-col items-center gap-6 w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold">🛒 Shopping List</h1>
        <p className="text-gray-400 text-sm">Sign in to manage your shopping list.</p>

        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-xl transition-colors"
        >
          Sign in with Google
        </button>

        <button
          onClick={handleGitHubSignIn}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-xl transition-colors"
        >
          Sign in with GitHub
        </button>
      </div>
    </main>
  );
}
