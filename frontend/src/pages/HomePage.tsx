import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen, FaPlusCircle } from "react-icons/fa"; // Importing icons

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-12 mb-8">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Inventory Management
        </h1>
        <p className="text-lg mb-6">
          Organize your inventory efficiently and track stock levels in real
          time.
        </p>
        <Button
          className="bg-white text-blue-600 hover:bg-gray-200 px-6 py-3 rounded-md text-lg"
          onClick={() => navigate("/inventory")}
        >
          Get Started
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
        <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex items-center">
            <FaBoxOpen className="text-blue-600 text-3xl mr-3" />
            <CardTitle className="text-2xl font-semibold">
              Manage Inventory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              View, update, and track your inventory with ease.
            </p>
            <Button
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg"
              onClick={() => navigate("/inventory")}
            >
              Go to Inventory
            </Button>
          </CardContent>
        </Card>

        <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex items-center">
            <FaPlusCircle className="text-blue-600 text-3xl mr-3" />
            <CardTitle className="text-2xl font-semibold">
              Add New Item
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Quickly add new products and manage stock levels.
            </p>
            <Button
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg"
              onClick={() => navigate("/add-item")}
            >
              Add Item
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
