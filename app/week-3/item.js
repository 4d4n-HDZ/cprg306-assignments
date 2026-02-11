export default function Item({ name, quantity, category }) {
  return (
    <li className="border p-2 m-2 rounded bg-gray-100">
      <h3 className="font-bold">{name}</h3>
      <p>Quantity: {quantity}</p>
      <p>Category: {category}</p>
    </li>
  );
}
