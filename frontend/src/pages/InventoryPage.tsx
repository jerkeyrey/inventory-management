import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItems, createItem, updateItem, deleteItem } from "../api/items";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";
import AddItemForm from "../components/AddItemForm";
import SearchBar from "../components/SearchBar";

interface Item {
  _id: string;
  name: string;
  description?: string;
  quantity: number;
}

const InventoryPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchItems(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const fetchItems = async (page: number, search: string) => {
    setLoading(true);
    try {
      const data = await getItems(page, search);
      setItems(data.items);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (item: {
    name: string;
    description?: string;
    quantity: number;
  }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await createItem(item, token);
      fetchItems(currentPage, searchQuery);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!editItem) return;
    setEditItem({ ...editItem, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await updateItem(editItem._id, editItem, token);
      setEditItem(null);
      fetchItems(currentPage, searchQuery);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 text-gray-900 px-8 py-12">
      <div className="w-full max-w-5xl space-y-8">
        {/* Search Bar */}
        <div className="w-full">
          <SearchBar onSearch={setSearchQuery} />
        </div>

        {/* Add Item Form */}
        <div className="w-full">
          <AddItemForm onAdd={handleAddItem} />
        </div>

        {/* Inventory List */}
        <Card className="p-8 bg-white shadow-lg w-full rounded-lg">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold">
              Inventory Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center mt-8">
                <Loader2 className="animate-spin w-10 h-10 text-gray-500" />
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item._id}>
                      {editItem?._id === item._id ? (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              name="name"
                              value={editItem.name}
                              onChange={handleEditInputChange}
                              className="w-full border p-2 rounded"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              name="quantity"
                              value={editItem.quantity}
                              onChange={handleEditInputChange}
                              className="w-full border p-2 rounded"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <textarea
                              name="description"
                              value={editItem.description}
                              onChange={handleEditInputChange}
                              className="w-full border p-2 rounded"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            <Button
                              type="submit"
                              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md text-lg"
                              onClick={handleEditSubmit}
                            >
                              Save
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setEditItem(null)}
                              className="px-6 py-3 text-lg"
                            >
                              Cancel
                            </Button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">
                              {item.name}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">
                              {item.quantity}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">
                              {item.description}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            <Button
                              variant="outline"
                              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-lg"
                              onClick={() => setEditItem(item)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md text-lg"
                              onClick={() => handleDelete(item._id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>

        {/* Pagination Controls */}
        <div className="flex justify-center space-x-2 mt-4">
          <Button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2"
          >
            Previous
          </Button>
          <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
