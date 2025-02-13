import React, { useEffect, useState } from "react";
import { InventoryItem } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton"; // Add loading effect

const InventoryList: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[] | null>(null);

  useEffect(() => {
    fetch("http://localhost:3500/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data.items))
      .catch((error) => console.error("Error fetching inventory:", error));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-primary">Inventory</h2>
      
      {items === null ? (
        // Loading state
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow bg-card">
              <CardHeader>
                <CardTitle className="text-lg">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <Badge variant="secondary">Qty: {item.quantity}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default InventoryList;