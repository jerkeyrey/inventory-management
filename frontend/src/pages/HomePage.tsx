import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome to Inventory Management</h1>
      <p className="text-center text-muted-foreground mb-6 max-w-md">
        Organize your inventory efficiently and track stock levels in real time.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Manage Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View, update, and track your inventory with ease.</p>
            <Button className="mt-3 w-full" onClick={() => navigate("/inventory")}>
              Go to Inventory
            </Button>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader>
            <CardTitle>Add New Item</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Quickly add new products and manage stock levels.</p>
            <Button className="mt-3 w-full" variant="outline" onClick={() => navigate("/add-item")}>
              Add Item
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}