"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserAuth } from "../../contexts/AuthContext";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";
import Image from "next/image";

export default function ShoppingListPage() {
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  async function handleSignOut() {
    try {
      await firebaseSignOut();
      router.push("/week-9");
    } catch (e) {
      console.error(e);
    }
  }

  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  function handleItemSelect(item) {
    const cleaned = item.name
      .split(",")[0]
      .replace(/[\p{Emoji}]/gu, "")
      .trim();
    setSelectedItemName(cleaned);
  }

  // ── Auth guard — don't render anything if not logged in ────────
  if (!user) {
    return (
      <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
        <div className="bg-gray-800 rounded-2xl shadow-lg p-10 flex flex-col items-center gap-4 w-full max-w-sm text-center">
          <p className="text-xl font-semibold">You are not logged in.</p>
          <p className="text-gray-400 text-sm">
            Please sign in to access the shopping list.
          </p>
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

  // ── Authenticated view ─────────────────────────────────────────
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col gap-6">

        {/* Header row */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">🛒 Shopping List</h1>
          <div className="flex items-center gap-3">
            <Link href="/week-9/profile" className="flex items-center gap-2 group">
              {user.photoURL && (
                <Image
                  src={user.photoURL}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full ring-2 ring-transparent group-hover:ring-blue-500 transition-all"
                />
              )}
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors hidden sm:block">
                {user.displayName}
              </span>
            </Link>
            <button
              onClick={handleSignOut}
              className="bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm font-semibold py-1.5 px-4 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row gap-6 items-start">

          {/* Left — form + list */}
          <div className="flex flex-col gap-6 flex-1 min-w-0">
            <NewItem onAddItem={handleAddItem} />
            <p className="text-sm text-gray-400">
              {items.length} item{items.length !== 1 ? "s" : ""} — click one to see meal ideas
            </p>
            <ItemList items={items} onItemSelect={handleItemSelect} />
          </div>

          {/* Right — meal ideas */}
          <div className="w-full md:w-80 shrink-0">
            <MealIdeas ingredient={selectedItemName} />
          </div>
        </div>
      </div>
    </main>
  );
}