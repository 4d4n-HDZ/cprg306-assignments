"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";

export default function Week7Page() {
  // Master state — lives here so both sibling components can share it
  const [items, setItems] = useState(itemsData);

  // Event handler passed down to NewItem via the onAddItem prop
  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-xl mx-auto px-4 py-10 flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight">🛒 Shopping List</h1>

        {/* Form — sends new items up via onAddItem */}
        <NewItem onAddItem={handleAddItem} />

        {/* Item count */}
        <p className="text-sm text-gray-400">
          {items.length} item{items.length !== 1 ? "s" : ""} in your list
        </p>

        {/* List — receives the items array as a prop */}
        <ItemList items={items} />
      </div>
    </main>
  );
}
