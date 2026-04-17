const CATEGORY_EMOJI = {
  Dairy: "🥛",
  Bakery: "🍞",
  Meat: "🥩",
  Produce: "🥦",
  Beverages: "🧃",
  Pantry: "🥫",
  Frozen: "🧊",
  Snacks: "🍿",
  Other: "🛒",
};

export default function Item({ name, quantity, category, onSelect }) {
  const emoji = CATEGORY_EMOJI[category] ?? "🛒";

  return (
    <li
      onClick={onSelect}
      className="flex items-center justify-between px-4 py-3 border-b border-gray-700 last:border-0 hover:bg-gray-700 transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl" role="img" aria-label={category}>
          {emoji}
        </span>
        <span className="font-medium text-white capitalize">{name}</span>
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-400">
        <span>{quantity}</span>
        <span className="px-2 py-0.5 rounded-full bg-gray-600 text-gray-200 text-xs">
          {category}
        </span>
      </div>
    </li>
  );
}
