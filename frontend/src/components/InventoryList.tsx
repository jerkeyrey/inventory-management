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
  const [newItem, setNewItem] = useState({ name: "", description: "", quantity: 1 });
  const [editItem, setEditItem] = useState<Item | null>(null);

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editItem) return;
    setEditItem({ ...editItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

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
    if (!token) return;

    try {
      await deleteItem(id, token);
      fetchItems();
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-6 py-10">
      <Card className="w-full max-w-4xl p-8 shadow-xl bg-white rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">Inventory Management</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add Item Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="text" name="name" placeholder="Item Name" value={newItem.name} onChange={handleInputChange} required />
            <Input type="number" name="quantity" placeholder="Quantity" value={newItem.quantity} onChange={handleInputChange} required />
            <Textarea name="description" placeholder="Description (Optional)" value={newItem.description} onChange={handleInputChange} />
            <Button type="submit" className="w-full py-3 text-lg">Add Item</Button>
          </form>

          {/* Loading Spinner */}
          {loading ? (
            <div className="flex justify-center mt-6">
              <Loader2 className="animate-spin w-10 h-10 text-gray-500" />
            </div>
          ) : (
            <div className="mt-8 space-y-6">
              {items.map((item) => (
                <Card key={item._id} className="p-6 shadow-md bg-white rounded-lg border border-gray-300">
                  {editItem && editItem._id === item._id ? (
                    // Edit Form
                    <form onSubmit={handleEditSubmit} className="space-y-4">
                      <Input type="text" name="name" value={editItem.name} onChange={handleEditInputChange} />
                      <Input type="number" name="quantity" value={editItem.quantity} onChange={handleEditInputChange} />
                      <Textarea name="description" value={editItem.description} onChange={handleEditInputChange} />
                      <div className="flex justify-end space-x-3">
                        <Button type="submit" className="px-6 py-2 text-lg">Save</Button>
                        <Button variant="outline" onClick={() => setEditItem(null)} className="px-6 py-2 text-lg">Cancel</Button>
                      </div>
                    </form>
                  ) : (
                    // Normal Display
                    <>
                      <CardTitle className="text-xl font-semibold">{item.name}</CardTitle>
                      <p className="text-gray-700">Quantity: {item.quantity}</p>
                      {item.description && <p className="text-gray-600">{item.description}</p>}
                      <div className="flex justify-end space-x-3 mt-4">
                        <Button variant="outline" onClick={() => setEditItem(item)} className="px-6 py-2 text-lg">Edit</Button>
                        <Button variant="destructive" onClick={() => handleDelete(item._id)} className="px-6 py-2 text-lg">Delete</Button>
                      </div>
                    </>
                  )}
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