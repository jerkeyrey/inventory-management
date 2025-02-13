import { useEffect, useState } from "react";
import { getItems, createItem } from "../api/items";

// Define the expected item structure
interface Item {
  _id: string;
  name: string;
  description?: string;
  quantity: number;
}

const InventoryPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({ name: "", description: "", quantity: 1 });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getItems(1, "");
      setItems(data.items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createItem(newItem, "your-auth-token"); // Replace with actual auth token
      setNewItem({ name: "", description: "", quantity: 1 }); // Reset form
      fetchItems(); // Refresh the list
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory Items</h1>

      {/* Add Item Form */}
      <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded">
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={newItem.name}
          onChange={handleInputChange}
          required
          className="border p-2 mr-2"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={handleInputChange}
          required
          className="border p-2 mr-2"
        />
        <textarea
          name="description"
          placeholder="Description (Optional)"
          value={newItem.description}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Item
        </button>
      </form>

      {/* Item List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list-disc pl-6">
          {items.map((item) => (
            <li key={item._id}>
              {item.name} - {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InventoryPage;