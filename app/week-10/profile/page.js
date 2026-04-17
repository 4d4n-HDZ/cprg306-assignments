"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUserAuth } from "../../contexts/AuthContext";

export default function ProfilePage() {
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  async function handleSignOut() {
    try {
      await firebaseSignOut();
      router.push("/week-9");
    } catch (e) {
      console.error(e);
    }
  }

  // ── Auth guard ─────────────────────────────────────────────────
  if (!user) {
    return (
      <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
        <div className="bg-gray-800 rounded-2xl shadow-lg p-10 flex flex-col items-center gap-4 w-full max-w-sm text-center">
          <p className="text-xl font-semibold">You are not logged in.</p>
          <Link
            href="/week-9"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-xl transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

  // Determine which provider was used to sign in
  const provider = user.providerData?.[0]?.providerId ?? "unknown";
  const providerLabel =
    provider === "github.com"
      ? "GitHub"
      : provider === "google.com"
      ? "Google"
      : provider;

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-lg mx-auto px-4 py-10 flex flex-col gap-6">

        {/* Top nav */}
        <div className="flex items-center justify-between">
          <Link
            href="/week-9/shopping-list"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Shopping List
          </Link>
          <button
            onClick={handleSignOut}
            className="bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm font-semibold py-1.5 px-4 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Profile card */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6">
          <h1 className="text-2xl font-bold">My Profile</h1>

          {/* Avatar */}
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt="Profile photo"
              width={96}
              height={96}
              className="rounded-full ring-4 ring-blue-500"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center text-4xl">
              👤
            </div>
          )}

          {/* Info rows */}
          <div className="w-full flex flex-col gap-3">
            <InfoRow label="Display Name" value={user.displayName ?? "—"} />
            <InfoRow label="Email" value={user.email ?? "—"} />
            <InfoRow label="User ID" value={user.uid} mono />
            <InfoRow label="Signed in with" value={providerLabel} />
            <InfoRow
              label="Email verified"
              value={user.emailVerified ? "✅ Yes" : "❌ No"}
            />
            <InfoRow
              label="Account created"
              value={
                user.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString(
                      "en-CA",
                      { year: "numeric", month: "long", day: "numeric" }
                    )
                  : "—"
              }
            />
            <InfoRow
              label="Last sign-in"
              value={
                user.metadata?.lastSignInTime
                  ? new Date(user.metadata.lastSignInTime).toLocaleDateString(
                      "en-CA",
                      { year: "numeric", month: "long", day: "numeric" }
                    )
                  : "—"
              }
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoRow({ label, value, mono = false }) {
  return (
    <div className="flex justify-between items-start gap-4 py-2 border-b border-gray-700 last:border-0">
      <span className="text-gray-400 text-sm shrink-0">{label}</span>
      <span
        className={`text-white text-sm text-right break-all ${
          mono ? "font-mono text-xs text-gray-300" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}