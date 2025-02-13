import { createContext, useState, ReactNode, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Define User type
interface User {
  id: string;
  username: string;
  email: string;
  token?: string; // Add token support
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Create AuthContext with a default value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

// AuthProvider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  console.log("AuthProvider Mounted");
  const navigate = useNavigate(); // For navigation
  const [user, setUser] = useState<User | null>(() => {
    // Retrieve user data from localStorage on initial load
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Update localStorage whenever the user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if (user.token) {
        localStorage.setItem("token", user.token); // Store token separately
      }
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user]);

  // Login function to set the user
  const login = (userData: User) => {
    setUser(userData);
  };

  // Logout function to clear the user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};