"use client";

import { useState } from "react";

const CATEGORIES = [
  "Bakery",
  "Beverages",
  "Dairy",
  "Frozen",
  "Meat",
  "Pantry",
  "Produce",
  "Snacks",
  "Other",
];

export default function NewItem({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("Produce");

  function handleSubmit(e) {
    e.preventDefault();

    // Build item object with a random id
    const item = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      quantity,
      category,
    };

    // Pass the new item up to the parent — no alert()
    onAddItem(item);

    // Reset the form
    setName("");
    setQuantity(1);
    setCategory("Produce");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 rounded-2xl p-6 shadow-lg flex flex-col gap-4"
    >
      <h2 className="text-lg font-semibold text-white">Add New Item</h2>

      {/* Item Name */}
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm text-gray-400">
          Item Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. almond milk"
          required
          className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
        />
      </div>

      {/* Quantity */}
      <div className="flex flex-col gap-1">
        <label htmlFor="quantity" className="text-sm text-gray-400">
          Quantity
        </label>
        <input
          id="quantity"
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-28"
        />
      </div>

      {/* Category */}
      <div className="flex flex-col gap-1">
        <label htmlFor="category" className="text-sm text-gray-400">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="mt-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold py-2 rounded-xl transition-colors"
      >
        + Add Item
      </button>
    </form>
  );
}
