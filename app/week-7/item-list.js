"use client";

import { useState } from "react";
import Item from "./item";

export default function ItemList({ items }) {
  // sortBy: "name" | "category" | "grouped"
  const [sortBy, setSortBy] = useState("name");

  // Never mutate the prop — always spread first
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name" || sortBy === "grouped") {
      return a.name.localeCompare(b.name);
    }
    // category: sort by category, then by name within the same category
    const catDiff = a.category.localeCompare(b.category);
    return catDiff !== 0 ? catDiff : a.name.localeCompare(b.name);
  });

  // Helper: active vs inactive button styles
  const btnClass = (mode) =>
    `px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
      sortBy === mode
        ? "bg-blue-600 text-white shadow"
        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
    }`;

  // ── Group by Category view ─────────────────────────────────────
  if (sortBy === "grouped") {
    // Build category → items map from the sorted (by name) copy
    const grouped = sortedItems.reduce((acc, item) => {
      if (!acc.has(item.category)) acc.set(item.category, []);
      acc.get(item.category).push(item);
      return acc;
    }, new Map());

    const categories = [...grouped.keys()].sort();

    return (
      <section className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="flex gap-2 p-4 border-b border-gray-700">
          <button className={btnClass("name")} onClick={() => setSortBy("name")}>
            Sort by Name
          </button>
          <button className={btnClass("category")} onClick={() => setSortBy("category")}>
            Sort by Category
          </button>
          <button className={btnClass("grouped")} onClick={() => setSortBy("grouped")}>
            Group by Category
          </button>
        </div>

        {categories.length === 0 ? (
          <p className="p-6 text-gray-400 text-center">No items yet — add some above!</p>
        ) : (
          categories.map((cat) => (
            <div key={cat}>
              <h3 className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-400 border-b border-gray-700">
                {cat}
              </h3>
              <ul>
                {grouped.get(cat).map((item) => (
                  <Item
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    category={item.category}
                  />
                ))}
              </ul>
            </div>
          ))
        )}
      </section>
    );
  }

  // ── Flat (name / category) view ────────────────────────────────
  return (
    <section className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      <div className="flex gap-2 p-4 border-b border-gray-700">
        <button className={btnClass("name")} onClick={() => setSortBy("name")}>
          Sort by Name
        </button>
        <button className={btnClass("category")} onClick={() => setSortBy("category")}>
          Sort by Category
        </button>
        <button className={btnClass("grouped")} onClick={() => setSortBy("grouped")}>
          Group by Category
        </button>
      </div>

      {sortedItems.length === 0 ? (
        <p className="p-6 text-gray-400 text-center">No items yet — add some above!</p>
      ) : (
        <ul>
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
