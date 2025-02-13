import React, { useEffect, useState } from "react";
import { InventoryItem } from "../types";

const InventoryList: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:3500/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data.items))
      .catch((error) => console.error("Error fetching inventory:", error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Inventory</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="p-3 bg-gray-200 rounded">
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryList;