export default function Item({ name, quantity, category }) {
  return (
    <li className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <p className="font-medium text-slate-900">{name}</p>
        <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-sm text-slate-700">
          x{quantity}
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-600">
        Category: <span className="font-medium text-slate-700">{category}</span>
      </p>
    </li>
  );
}
