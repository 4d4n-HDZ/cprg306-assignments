"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

export default function Week8Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  function handleItemSelect(item) {
    // Clean up the item name for the API:
    // 1. Take only the text before the first comma (e.g. "chicken breast, 1 kg" → "chicken breast")
    // 2. Remove any emoji characters
    // 3. Trim whitespace
    const cleaned = item.name
      .split(",")[0]
      .replace(/[\p{Emoji}]/gu, "")
      .trim();

    setSelectedItemName(cleaned);
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight">🛒 Shopping List</h1>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Left column — form + list */}
          <div className="flex flex-col gap-6 flex-1 min-w-0">
            <NewItem onAddItem={handleAddItem} />
            <p className="text-sm text-gray-400">
              {items.length} item{items.length !== 1 ? "s" : ""} — click one to see meal ideas
            </p>
            <ItemList items={items} onItemSelect={handleItemSelect} />
          </div>

          {/* Right column — meal ideas */}
          <div className="w-full md:w-80 shrink-0">
            <MealIdeas ingredient={selectedItemName} />
          </div>
        </div>
      </div>
    </main>
  );
}
