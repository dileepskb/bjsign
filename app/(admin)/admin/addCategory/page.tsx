/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import axios from "axios";
import CategoryForm from "@/app/_components/CategoryForm/CategoryForm";

export default function AddCategoryPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const categories = [
    { id: "1", name: "Electronics" },
    { id: "2", name: "Clothing" },
  ];

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true);
      setMessage("");

      // 🟢 Send POST request to backend API
      const res = await axios.post("/api/protected/categories", data);

      setMessage("✅ Category added successfully!");
      console.log("✅ Response:", res.data);
    } catch (error: any) {
      console.error("❌ Error submitting category:", error);
      setMessage(error.response?.data?.message || "Error adding category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
        <CategoryForm categories={categories} onSubmit={handleSubmit} />
        {loading && <p className="text-blue-500 mt-4">Submitting...</p>}
        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>

  );
}
