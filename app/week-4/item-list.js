import Item from "./item";
import items from "./items.json";

function titleCaseCategory(value) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export default function ItemList() {
  // Optional challenge: group items by category (no state needed)
  const grouped = items.reduce((acc, item) => {
    const key = item.category;
    acc[key] ??= [];
    acc[key].push(item);
    return acc;
  }, {});

  const categories = Object.keys(grouped).sort((a, b) => a.localeCompare(b));

  return (
    <div className="space-y-6">
      {categories.map((category) => {
        const categoryItems = [...grouped[category]].sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        return (
          <section key={category}>
            <h2 className="mb-3 text-lg font-semibold text-slate-100">
              {titleCaseCategory(category)}
            </h2>

            <ul className="grid gap-3 sm:grid-cols-2">
              {categoryItems.map((item) => (
                <Item
                  key={item.id}
                  name={item.name}
                  quantity={item.quantity}
                  category={item.category}
                />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
