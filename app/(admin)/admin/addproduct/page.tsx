/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Image from "next/image";


type ProductFormData = {
  categoryId: number;
  title: string;
  description: string;
  reviews?: number;
  price: number;
  discountedPrice?: string;
  additionalDescriptions: { name?: string; value?: string }[];
  imgs: {
    thumbnails: { value: string }[];
    previews: { value: string }[];
  };
  productOptions: {
    name: string;
    type: string;
    optionValues: { label: string; value: number; discount?: number }[];
  }[];
};

type Category = {
  id: string;
  name: string;
};

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

export default function FormElementsPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [categorylist, setCategorylist] = useState<{ categories: Category[] }>({
    categories: [],
  });

  const { register, control, handleSubmit, reset } = useForm<ProductFormData>({
    defaultValues: {
      additionalDescriptions: [{ name: "", value: "" }],
      imgs: { thumbnails: [], previews: [] },
      productOptions: [
        {
          name: "",
          type: "select",
          optionValues: [{ label: "", value: 0, discount: 0 }],
        },
      ],
    },
  });

  // ✅ Field arrays
  const {
    fields: addDescFields,
    append: addDescAppend,
    remove: addDescRemove,
  } = useFieldArray({ control, name: "additionalDescriptions" });

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

  const {
    fields: optionFields,
    append: optionAppend,
    remove: optionRemove,
  } = useFieldArray({ control, name: "productOptions" });

  // ✅ Submit handler
  const onSubmit = async (data: ProductFormData) => {
    try {
      setLoading(true);
      setMessage("");

      await axios.post("/api/protected/addproduct", data, {
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
        const res = await axios.get("/api/protected/categories");
        setCategorylist(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <>
      <div className="min-h-screen">
        {/* <Breadcrumb pageName="Add Products" /> */}
        <div className="max-w-3xl border bg-white p-6 rounded-2xl shadow-sm space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Add / Edit Category
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-3xl mx-auto"
          >
            {/* Title */}
            {/* http://localhost:3000/api/protected/categories */}
            <div>
              <label className="block font-medium mb-1">Select Category</label>
              <select
                {...register("categoryId", { required: true })}
                className="border w-full py-2 px-3 rounded"
              >
                <option>-- Select Category --</option>
                {categorylist?.categories?.map((items, index) => {
                  return (
                    <option key={index} value={items?.id}>
                      {items?.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Title</label>
              <input
                {...register("title", { required: true })}
                className="border w-full py-2 px-3 rounded"
                placeholder="Product title"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium mb-1">Description</label>
              <textarea
                {...register("description")}
                className="border w-full py-2 px-3 rounded"
                rows={3}
              />
            </div>

            {/* Price fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Price ($)</label>
                <input
                  type="number"
                  {...register("price", { required: true })}
                  className="border w-full py-2 px-3 rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Discounted Price
                </label>
                <input
                  {...register("discountedPrice")}
                  className="border w-full py-2 px-3 rounded"
                  placeholder="Upto 40% Off"
                />
              </div>
            </div>

            {/* Additional Descriptions */}
            <section>
              <h3 className="font-semibold mb-1">Additional Descriptions</h3>
              {addDescFields.map((field, i) => (
                <div key={field.id} className="flex gap-2 mb-2">
                  <input
                    {...register(`additionalDescriptions.${i}.name`)}
                    className="border w-[50%] py-2 px-3 rounded"
                    placeholder="Name"
                  />
                  <input
                    {...register(`additionalDescriptions.${i}.value`)}
                    className="border w-[42%] py-2 px-3 rounded"
                    placeholder="Value"
                  />
                  <button
                    type="button"
                    onClick={() => addDescRemove(i)}
                    className="bg-red-600 text-white rounded px-3"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addDescAppend({ name: "", value: "" })}
                className="bg-blue-600 text-white py-2 px-3 rounded"
              >
                + Add Description
              </button>
            </section>

            <hr />

            {/* ✅ Images Section */}
            <section>
              <h3 className="font-semibold mb-2">Images</h3>

              {/* Thumbnails */}
              <div className="mb-4">
                <label className="block font-medium mb-1">Thumbnails</label>
                <div className="flex flex-wrap gap-3">
                  {thumbFields.map((field, i) => (
                    <div
                      key={field.id}
                      className="relative w-24 h-24 border rounded overflow-hidden"
                    >
                      {field.value && (
                        <Image
                          src={field.value}
                          alt="Thumbnail"
                          fill
                          className="object-cover"
                        />
                      )}
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
                          thumbAppend({ value: base64 });
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Previews */}
              <div>
                <label className="block font-medium mb-1">Previews</label>
                <div className="flex flex-wrap gap-3">
                  {previewFields.map((field, i) => (
                    <div
                      key={field.id}
                      className="relative w-24 h-24 border rounded overflow-hidden"
                    >
                      {field.value && (
                        <Image
                          src={field.value}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      )}
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
                          previewAppend({ value: base64 });
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </section>

            <hr />

            {/* ✅ Product Options */}
            <section>
              <h3 className="font-semibold mb-3">Product Options</h3>
              {optionFields.map((option, optIndex) => (
                <div key={option.id} className="border p-3 rounded mb-3">
                  <div className="flex gap-2 mb-2">
                    <input
                      {...register(`productOptions.${optIndex}.name`)}
                      className="border p-3 w-[40%] rounded"
                      placeholder="Option name (e.g. Size)"
                    />
                    <select
                      {...register(`productOptions.${optIndex}.type`)}
                      className="border p-3 w-[40%] rounded"
                    >
                      <option value="select">Select</option>
                      <option value="radio">Radio</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => optionRemove(optIndex)}
                      className="bg-red-500 text-white px-3 rounded"
                    >
                      ✕
                    </button>
                  </div>
                  <ProductOptionValues
                    control={control}
                    optionIndex={optIndex}
                    register={register}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  optionAppend({
                    name: "",
                    type: "select",
                    optionValues: [],
                  })
                }
                className="bg-green-600 text-white py-2 px-3 rounded"
              >
                + Add Option
              </button>
            </section>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-700 text-white py-3 w-full rounded"
            >
              {loading ? "Saving..." : "Save Product"}
            </button>

            {message && <p className="text-center mt-3">{message}</p>}
          </form>
        </div>
      </div>
    </>
  );
}

function ProductOptionValues({ control, optionIndex, register }: any) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `productOptions.${optionIndex}.optionValues`,
  });

  return (
    <div className="ml-4">
      {fields.map((field, i) => (
        <div key={field.id} className="flex gap-2 mb-2">
          <input
            {...register(
              `productOptions.${optionIndex}.optionValues.${i}.label`
            )}
            className="border p-2 rounded"
            placeholder="Label"
          />
          <input
            type="number"
            {...register(
              `productOptions.${optionIndex}.optionValues.${i}.value`
            )}
            className="border p-2 rounded"
            placeholder="Price"
          />
          <input
            type="number"
            {...register(
              `productOptions.${optionIndex}.optionValues.${i}.discount`
            )}
            className="border p-2 rounded"
            placeholder="Discount %"
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="bg-red-500 text-white px-2 rounded"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ label: "", value: 0, discount: 0 })}
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        + Add Value
      </button>
    </div>
  );
}
