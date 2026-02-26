export default function Item({ name, quantity, category }) {
  return (
    <li className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white/80 p-3 shadow-sm">
      <div className="min-w-0">
        <p className="truncate font-medium text-slate-900">{name}</p>
        <p className="text-sm text-slate-500 capitalize">{category}</p>
      </div>

      <span className="shrink-0 rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-white">
        x{quantity}
      </span>
    </li>
  );
}
