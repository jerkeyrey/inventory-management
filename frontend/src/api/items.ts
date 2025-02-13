import axios from "axios";

const API_URL = "http://localhost:3500/api/items"; 

// Get all items with pagination and optional search
export const getItems = async (page = 1, search = "") => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}&search=${search}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

// Get a single item by ID
export const getItemById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching item:", error);
    throw error;
  }
};

// Create a new item (requires auth)
export const createItem = async (itemData: { name: string; description?: string; quantity: number }, token: string) => {
  try {
    const response = await axios.post(API_URL, itemData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};

// Update an existing item (requires auth)
export const updateItem = async (id: string, updatedData: { name?: string; description?: string; quantity?: number }, token: string) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

// Delete an item (requires auth)
export const deleteItem = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};