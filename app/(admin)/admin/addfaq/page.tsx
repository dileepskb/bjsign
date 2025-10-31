/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
// import CategoryForm from "@/app/_components/CategoryForm/CategoryForm";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface FAQFormData {
  question: string;
  answer: string;
  productId?: string;
}


interface productList {
  id:number
  title:string
}

export default function AddCategoryPage() {
  const { register, handleSubmit, reset } = useForm<FAQFormData>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const [productsList, setProductsList] = useState([])

  const onSubmit = async (data: FAQFormData) => {
    try {
      setLoading(true);
      setMessage("");

      await axios.post("/api/protected/faqs", data, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage("✅ FAQ added successfully!");
      reset();

      setTimeout(() => router.push("/admin/faqs"), 100);
    } catch (error) {
      console.error("FAQ submit error:", error);
      setMessage("❌ Failed to add FAQ");
    } finally {
      setLoading(false);
    }
  };



    useEffect(() => {
    async function loadProducts() {
      try {
        const res = await axios.get("/api/protected/getproduct");
        setProductsList(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen">
        <div className="max-w-2xl p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Add FAQ&apos;s</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
           <div>
          <label className="block text-sm font-medium mb-1">Products</label>
          <select
            {...register("productId")}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          >
            <option>--Select Product--</option>
            {productsList?.map((items:productList, index:number) => (
 <option key={index} value={items.id}>{items.title}</option>
            ))}
           
            </select>

        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Question</label>
          <input
            {...register("question", { required: true })}
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter FAQ question"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Answer</label>
          <textarea
            {...register("answer", { required: true })}
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter FAQ answer"
          />
        </div>

     
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Saving..." : "Save FAQ"}
        </button>

        {message && (
          <p className="text-center mt-3 text-sm text-gray-600">{message}</p>
        )}
      </form>
    </div>
    </div>

  );
}
