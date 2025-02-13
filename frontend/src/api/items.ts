import axios from "axios";

const API_URL = "http://localhost:3500/api/items";

// Create the Axios instance first
const api = axios.create({
  baseURL: API_URL,
});

// Attach the interceptor after `api` is declared
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Keep all functions intact

// Get all items with pagination and optional search
export const getItems = async (page = 1, search = "") => {
  try {
    const response = await api.get("/", { params: { page, search } });
    return response.data;
  } catch (error: any) {  // <-- Add `: any` here
    console.error("Error fetching items:", error.response?.data || error.message);
    throw error;
  }
};

// Get a single item by ID
export const getItemById = async (id: string) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching item:", error.response?.data || error.message);
    throw error;
  }
};

// Create a new item (requires auth)
export const createItem = async (itemData: { name: string; description?: string; quantity: number }, token: string) => {
  try {
    const response = await api.post("/", itemData);
    return response.data;
  } catch (error: any) {
    console.error("Error creating item:", error.response?.data || error.message);
    throw error;
  }
};

// Update an existing item (requires auth)
export const updateItem = async (id: string, updatedData: Partial<{ name: string; description: string; quantity: number }>, token: string) => {
  try {
    const response = await api.put(`/${id}`, updatedData);
    return response.data;
  } catch (error:any) {
    console.error("Error updating item:", error.response?.data || error.message);
    throw error;
  }
};

// Delete an item (requires auth)
export const deleteItem = async (id: string) => {
  try {
    const token = localStorage.getItem("token");
    console.log("Sending Token:", token); // Debug log

    const response = await api.delete(`/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error deleting item:", error.response?.data || error.message);
    throw error;
  }
};