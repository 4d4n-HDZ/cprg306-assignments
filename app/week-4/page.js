import ItemList from "./item-list";

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-10 text-3xl font-bold text-slate-100">Shopping List</h1>
      <ItemList />
    </main>
  );
}
