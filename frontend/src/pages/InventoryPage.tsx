import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getItems, createItem, updateItem, deleteItem } from "../api/items";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";

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
  const [editItem, setEditItem] = useState<Item | null>(null);

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if no token
      return;
    }
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

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, user might not be logged in");
      return;
    }

    try {
      await deleteItem(id, token);
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await updateItem(editItem._id, editItem, token);
      setEditItem(null);
      fetchItems();
    } catch (error) {
      console.error("Error updating item:", error);
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

          {editItem && (
            <form onSubmit={handleEditSubmit} className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
              <h3 className="font-bold">Edit Item</h3>
              <Input
                type="text"
                name="name"
                placeholder="Item Name"
                value={editItem.name}
                onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                required
              />
              <Input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={editItem.quantity}
                onChange={(e) => setEditItem({ ...editItem, quantity: Number(e.target.value) })}
                required
              />
              <Textarea
                name="description"
                placeholder="Description (Optional)"
                value={editItem.description || ""}
                onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
              />
              <div className="flex justify-between mt-2">
                <Button type="submit">Update</Button>
                <Button variant="outline" onClick={() => setEditItem(null)}>Cancel</Button>
              </div>
            </form>
          )}

          {loading ? (
            <div className="flex justify-center mt-6">
              <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {items.map((item) => (
                <Card key={item._id} className="p-4 shadow-md bg-white">
                  <CardTitle className="font-semibold">{item.name}</CardTitle>
                  <p>Quantity: {item.quantity}</p>
                  {item.description && <p>Description: {item.description}</p>}

                  <div className="flex justify-end space-x-2 mt-2">
                    <Button variant="outline" onClick={() => setEditItem(item)}>Edit</Button>
                    <Button variant="destructive" onClick={() => handleDelete(item._id)}>Delete</Button>
                  </div>
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