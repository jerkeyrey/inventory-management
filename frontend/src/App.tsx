import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InventoryPage from "./pages/InventoryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inventory" element={<InventoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;