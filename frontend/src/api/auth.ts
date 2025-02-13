import axios from "axios";

const API_URL = "http://localhost:3500/api/auth"; 

// Login user function
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Should return token & user data
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Signup user function (optional)
export const signupUser = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { name, email, password });
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};