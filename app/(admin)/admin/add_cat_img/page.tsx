"use client";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";

type ProductFormData = {
  product_id: number;
  tag: string;

  imgs: {
    thumbnails: string[];
    previews: string[];
  };
};

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

export default function AddCatImage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [products, setProducts] = useState<any[]>([]);
  const [listLoading, setListLoading] = useState(true);

  const { register, control, handleSubmit, reset } = useForm<ProductFormData>({
    defaultValues: {
      imgs: { thumbnails: [""], previews: [""] },
    },
  });

  // Field arrays

  const {
    fields: thumbFields,
    append: thumbAppend,
    remove: thumbRemove,
  } = useFieldArray({ control, name: "imgs.thumbnails" });
  const {
    fields: previewFields,
    append: previewAppend,
    remove: previewRemove,
  } = useFieldArray({ control, name: "imgs.previews" });

  // 🔥 Submit handler
  const onSubmit = async (data: ProductFormData) => {
    try {
      setLoading(true);
      setMessage("");

      const res = await axios.post("/api/protected/tagimage", data, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage("✅ Product added successfully!");
      reset();
    } catch (error: any) {
      console.error(error);
      setMessage(error.response?.data?.message || "❌ Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await axios.get("/api/protected/getproduct");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setListLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <>
   
   
    <div className="bg-white">
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-4 max-w-3xl mx-auto"
    >
      <h2 className="text-xl font-semibold">Product Details</h2>

      <div>
        <label className="block font-medium">Product</label>
        <select
          {...register("product_id", { required: true })}
          className="input border w-full py-2 px-3"
        >
          <option>---Select Cetegory--</option>
          {products?.map((item, index) => (
            <option key={index} value={item?.id}>
              {item?.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium">Category</label>
        <select
          {...register("tag", { required: true })}
          className="input border w-full py-2 px-3"
        >
          <option>---Select Cetegory--</option>
          <option value={"business-corporate-printing"}>Business & Corporate Printing</option>
          <option value={'real-estate-printing'}>Real Estate Printing</option>
          <option value={'education-school-printing'}>Education / School Printing</option>
          <option value={'retail-promotional-printing'}>Retail & Promotional Printing</option>
          <option value={'events-personal-printing'}>Events & Personal Printing</option>
          <option value={'vehicle-outdoor-printing'}>Vehicle & Outdoor Printing</option>
          <option value={'packaging-branding'}>Packaging & Branding</option>
          <option value={'creative-specialty-printing'}>Creative & Specialty Printing</option>
        </select>
      </div>

      {/* Images */}

      <h3 className="font-semibold">Images</h3>

      {/* --- Thumbnails --- */}
      <div>
        <label className="block font-medium">Thumbnails</label>
        <div className="flex flex-wrap gap-3">
          {thumbFields.map((field, i) => (
            <div
              key={field.id}
              className="relative w-24 h-24 border rounded overflow-hidden"
            >
              <img src={field.value || ""} alt="Thumbnail" className="object-cover w-full h-full" />
              <button
                type="button"
                onClick={() => thumbRemove(i)}
                className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1"
              >
                ✕
              </button>
            </div>
          ))}

          <label className="cursor-pointer border border-dashed rounded-lg w-24 h-24 flex items-center justify-center text-gray-500 text-sm hover:bg-gray-50">
            +
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const base64 = await toBase64(file);
                  thumbAppend({ value: base64 }); // 👈 append as object
                }
              }}
            />
          </label>
        </div>
      </div>

      {/* --- Previews --- */}
      <div className="mt-6">
        <label className="block font-medium">Previews</label>
        <div className="flex flex-wrap gap-3">
          {previewFields.map((field, i) => (
            <div
              key={field.id}
              className="relative w-24 h-24 border rounded overflow-hidden"
            >
              <img src={field.value || ""} alt="Thumbnail" className="object-cover w-full h-full" />
              <button
                type="button"
                onClick={() => previewRemove(i)}
                className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1"
              >
                ✕
              </button>
            </div>
          ))}

          <label className="cursor-pointer border border-dashed rounded-lg w-24 h-24 flex items-center justify-center text-gray-500 text-sm hover:bg-gray-50">
            +
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const base64 = await toBase64(file);
                  previewAppend({ value: base64 }); // 👈 append as object
                }
              }}
            />
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="btn-primary w-full mt-6 bg-blue-700 text-white py-3"
      >
        Save Product
      </button>
    </form>
    </div>
     </>
  );
}


