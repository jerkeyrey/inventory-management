import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation(); // Get current page path

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
    <h1 className="text-xl font-bold">
      <Link to="/">Inventory App</Link>
    </h1>
  
    <div className="flex items-center gap-4">
      <Link to="/" className="px-3 py-1 rounded bg-gray-700">Home</Link>
      <Link to="/inventory" className="px-3 py-1 rounded bg-gray-700">Inventory</Link>
  
      {user ? (
        <>
          <span className="text-gray-300">Welcome, {user.username} 👋</span>
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        </>
      ) : location.pathname === "/login" ? (
        <Link to="/signup" className="bg-green-500 px-3 py-1 rounded">Sign Up</Link>
      ) : (
        <Link to="/login" className="bg-blue-500 px-3 py-1 rounded">Login</Link>
      )}
    </div>
  </nav>
  );
};

export default Navbar;