import { useEffect, useState } from "react";
import { getItems, createItem } from "../api/items";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { ClimbingBoxLoader } from "react-spinners";  

interface Item {
  _id: string;
  name: string;
  description?: string;
  quantity: number;
}

const InventoryPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    quantity: 1,
  });

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, user might not be logged in");
      return;
    }

    try {
      await createItem(newItem, token);
      setNewItem({ name: "", description: "", quantity: 1 });
      fetchItems();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Inventory Items</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="name"
              placeholder="Item Name"
              value={newItem.name}
              onChange={handleInputChange}
              required
            />
            <Input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={handleInputChange}
              required
            />
            <Textarea
              name="description"
              placeholder="Description (Optional)"
              value={newItem.description}
              onChange={handleInputChange}
              className="resize-none"
            />
            <Button type="submit" className="w-full">
              Add Item
            </Button>
          </form>

          {/* Loading Spinner (Fallback) */}
          {loading ? (
            <div className="flex justify-center mt-6">
              <ClimbingBoxLoader color="#3498db" loading={loading} size={15} />
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {items.map((item) => (
                <Card key={item._id} className="p-4 shadow-md bg-white">
                  <CardTitle className="font-semibold">{item.name}</CardTitle>
                  <p>Quantity: {item.quantity}</p>
                  {item.description && <p>Description: {item.description}</p>}
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryPage;