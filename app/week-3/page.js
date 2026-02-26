import GroceryItemList from "./GroceryItemList.js";

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto w-full max-w-xl">
        <h1 className="text-3xl font-bold tracking-tight">Shopping List</h1>
        <p className="mt-2 text-slate-600">
          A quick list of groceries to grab.
        </p>

        <GroceryItemList />
      </div>
    </main>
  );
}
