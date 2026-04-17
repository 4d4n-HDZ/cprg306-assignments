"use client";

import { useState } from "react";
import NewItem from "./NewItem";
import ItemList from "./ItemList";
import itemsData from "./items.json";

export default function Week6Page() {
  // ── Master state lives here (Lifting State Up) ─────────────────
  const [items, setItems] = useState(itemsData);

  // ── Event handler passed down to NewItem ───────────────────────
  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-xl mx-auto px-4 py-10 flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight">🛒 Shopping List</h1>

        {/* NewItem form — receives the handler as a prop */}
        <NewItem onAddItem={handleAddItem} />

        {/* Item count badge */}
        <p className="text-sm text-gray-400">
          {items.length} item{items.length !== 1 ? "s" : ""} in your list
        </p>

        {/* ItemList — receives the items array as a prop */}
        <ItemList items={items} />
      </div>
    </main>
  );
}
