"use client";

import { useState } from "react";
import Item from "./Item";

export default function ItemList({ items }) {
  // sortBy can be "name", "category", or "grouped"
  const [sortBy, setSortBy] = useState("name");

  // ── Sorting logic ──────────────────────────────────────────────
  // Never mutate the prop — spread first, then sort
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name" || sortBy === "grouped") {
      return a.name.localeCompare(b.name);
    }
    // sort by category, then by name within the same category
    const catCompare = a.category.localeCompare(b.category);
    return catCompare !== 0 ? catCompare : a.name.localeCompare(b.name);
  });

  // ── Sort button helper ─────────────────────────────────────────
  const btnClass = (mode) =>
    `px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
      sortBy === mode
        ? "bg-blue-600 text-white shadow"
        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
    }`;

  // ── Grouped render (Part 4 bonus) ──────────────────────────────
  if (sortBy === "grouped") {
    // Build a Map: category → sorted items
    const grouped = sortedItems.reduce((acc, item) => {
      if (!acc.has(item.category)) acc.set(item.category, []);
      acc.get(item.category).push(item);
      return acc;
    }, new Map());

    // Sort categories alphabetically
    const categories = [...grouped.keys()].sort();

    return (
      <section className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        {/* Sort controls */}
        <div className="flex gap-2 p-4 border-b border-gray-700">
          <button className={btnClass("name")} onClick={() => setSortBy("name")}>
            Sort by Name
          </button>
          <button
            className={btnClass("category")}
            onClick={() => setSortBy("category")}
          >
            Sort by Category
          </button>
          <button
            className={btnClass("grouped")}
            onClick={() => setSortBy("grouped")}
          >
            Group by Category
          </button>
        </div>

        {/* Grouped list */}
        {categories.length === 0 ? (
          <p className="p-6 text-gray-400 text-center">
            No items yet — add some above!
          </p>
        ) : (
          categories.map((cat) => (
            <div key={cat}>
              <h3 className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-400 bg-gray-750 border-b border-gray-700">
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

  // ── Flat (name / category) render ──────────────────────────────
  return (
    <section className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      {/* Sort controls */}
      <div className="flex gap-2 p-4 border-b border-gray-700">
        <button className={btnClass("name")} onClick={() => setSortBy("name")}>
          Sort by Name
        </button>
        <button
          className={btnClass("category")}
          onClick={() => setSortBy("category")}
        >
          Sort by Category
        </button>
        <button
          className={btnClass("grouped")}
          onClick={() => setSortBy("grouped")}
        >
          Group by Category
        </button>
      </div>

      {sortedItems.length === 0 ? (
        <p className="p-6 text-gray-400 text-center">
          No items yet — add some above!
        </p>
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
