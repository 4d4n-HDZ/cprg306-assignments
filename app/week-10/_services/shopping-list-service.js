import { db } from "../../utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

/**
 * Retrieves all items for a specific user from Firestore.
 * @param {string} userId - The authenticated user's UID
 * @returns {Promise<Array>} - Array of item objects with id and data fields
 */
export async function getItems(userId) {
  const items = [];

  const itemsQuery = query(
    collection(db, "users", userId, "items")
  );

  const querySnapshot = await getDocs(itemsQuery);

  querySnapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() });
  });

  return items;
}

/**
 * Adds a new item to a specific user's items subcollection in Firestore.
 * @param {string} userId - The authenticated user's UID
 * @param {Object} item - The item object to add { name, quantity, category }
 * @returns {Promise<string>} - The ID of the newly created document
 */
export async function addItem(userId, item) {
  const docRef = await addDoc(
    collection(db, "users", userId, "items"),
    {
      name: item.name,
      quantity: item.quantity,
      category: item.category,
    }
  );

  return docRef.id;
}