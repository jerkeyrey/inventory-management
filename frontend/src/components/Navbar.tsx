import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button } from "./ui/button"; // Importing from shadcn


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation(); // Get current page path

  return (
    <nav className="bg-background border-b border-border p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/" className="text-primary hover:underline">
          invmanager
        </Link>
      </h1>

      <div className="flex items-center gap-4">
        <Button asChild variant="outline">
          <Link to="/">Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/inventory">Inventory</Link>
        </Button>

        {user ? (
          <>
            <span className="text-muted-foreground font-semibold">
              {user.name} 
            </span>
            <Button variant="destructive" onClick={logout}>
              Logout
            </Button>
          </>
        ) : location.pathname === "/login" ? (
          <Button asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
