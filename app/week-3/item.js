import GroceryItemList from "./GroceryItemList.js";

export default function Item({ name, quantity, category }) {
  return (
    <li className="border p-2 m-2 rounded bg-gray-100 text-black">
      <p>Name: {name}</p>
      <p>Quantity: {quantity}</p>
      <p>Category: {category}</p>
    </li>
  );
}
