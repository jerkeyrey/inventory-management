import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <h1 className="text-lg font-bold">Inventory System</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/inventory" className="hover:text-gray-300">Inventory</Link>
      </div>
    </nav>
  );
}