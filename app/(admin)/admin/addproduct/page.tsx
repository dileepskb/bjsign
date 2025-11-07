/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  useForm,
  useFieldArray,
  useFormContext,
  FormProvider,
  Control,
  UseFormRegister,
} from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

type ProductFormData = {
  categoryId: string;
  title: string;
  description: string;
  reviews?: number;
  price: number;
  discountedPrice?: string;
  additionalDescriptions: { name: string; value: string }[];
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

type Category = { id: string; name: string };

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

export default function FormElementsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [categorylist, setCategorylist] = useState<Category[]>([]);

  const methods = useForm<ProductFormData>({
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

  const { register, control, handleSubmit, reset } = methods;

  // field arrays
  const addDesc = useFieldArray({ control, name: "additionalDescriptions" });
  const thumbs = useFieldArray({ control, name: "imgs.thumbnails" });
  const previews = useFieldArray({ control, name: "imgs.previews" });
  const options = useFieldArray({ control, name: "productOptions" });

  // submit handler
  const onSubmit = async (data: ProductFormData) => {
    try {
      setLoading(true);
      setMessage("");

      if (productId) {
        await axios.put(`/api/protected/product/${productId}`, data);
        setMessage("✅ Product updated successfully!");
      } else {
        await axios.post("/api/protected/addproduct", data);
        setMessage("✅ Product added successfully!");
      }

      setTimeout(() => router.push("/admin/allproducts"), 500);
      reset();
    } catch (error: any) {
      console.error(error);
      setMessage(error.response?.data?.message || "❌ Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  // load categories
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/protected/categories");
        setCategorylist(res.data.categories ?? []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    })();
  }, []);

  // load product if editing
useEffect(() => {
  if (!productId) return;
  (async () => {
    try {
      const res = await axios.get(`/api/protected/product/${productId}`);
      const data = res.data;

      // Normalize image structure if backend sends arrays of paths
      const normalizeImages = (arr: any) => {
        if (!Array.isArray(arr)) return [];
        return arr.map((item) =>
          typeof item === "string" ? { value: item } : item
        );
      };

      reset({
        ...data,
        imgs: {
          thumbnails: normalizeImages(data.imgs?.thumbnails),
          previews: normalizeImages(data.imgs?.previews),
        },
      });

      console.log("✅ Product loaded", data);
    } catch (error) {
      console.error("Error loading product:", error);
    }
  })();
}, [productId, reset]);

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl border bg-white p-6 rounded-2xl shadow-sm space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {productId ? "Edit Product" : "Add Product"}
        </h2>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Category */}
            <div>
              <label className="block font-medium mb-1">Select Category</label>
              <select
                {...register("categoryId", { required: true })}
                className="border w-full py-2 px-3 rounded"
              >
                <option value="">-- Select Category --</option>
                {categorylist.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
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

            {/* Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Price ($)</label>
                <input
                  type="number"
                  {...register("price")}
                  className="border w-full py-2 px-3 rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Discounted Price</label>
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
              {addDesc.fields.map((field, i) => (
                <div key={field.id} className="flex gap-2 mb-2">
                  <input
                    {...register(`additionalDescriptions.${i}.name`)}
                    className="border w-1/2 py-2 px-3 rounded"
                    placeholder="Name"
                  />
                  <input
                    {...register(`additionalDescriptions.${i}.value`)}
                    className="border w-1/2 py-2 px-3 rounded"
                    placeholder="Value"
                  />
                  <button
                    type="button"
                    onClick={() => addDesc.remove(i)}
                    className="bg-red-600 text-white rounded px-3"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addDesc.append({ name: "", value: "" })}
                className="bg-blue-600 text-white py-2 px-3 rounded"
              >
                + Add Description
              </button>
            </section>

            <hr />

            {/* Images */}
            <section>
              <h3 className="font-semibold mb-2">Images</h3>
              <ImageUploader
                title="Thumbnails"
                name="imgs.thumbnails"
                fields={thumbs.fields}
                append={thumbs.append}
                remove={thumbs.remove}
              />
              <ImageUploader
                title="Previews"
                name="imgs.previews"
                fields={previews.fields}
                append={previews.append}
                remove={previews.remove}
              />
            </section>

            <hr />

            {/* Product Options */}
            <section>
              <h3 className="font-semibold mb-3">Product Options</h3>
              {options.fields.map((option, optIndex) => (
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
                      onClick={() => options.remove(optIndex)}
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
                  options.append({
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
        </FormProvider>
      </div>
    </div>
  );
}

/* 🔹 ImageUploader */
function ImageUploader({ title, name, fields, append, remove }: any) {
  const { watch } = useFormContext();
  const values = watch(name) || [];
  console.log(fields)
  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{title}</label>
      <div className="flex flex-wrap gap-3">
        {fields.map((field: any, i: number) => {
          const image = values[i]?.value;
          console.log(image)
          return (
            <div
              key={field.id}
              className="relative w-24 h-24 border rounded overflow-hidden"
            >
              {image && (
                <Image src={image} alt={title} fill className="object-cover" />
              )}
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1"
              >
                ✕
              </button>
            </div>
          );
        })}
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
                append({ value: base64 });
              }
            }}
          />
        </label>
      </div>
    </div>
  );
}

/* 🔹 ProductOptionValues */
function ProductOptionValues({
  control,
  optionIndex,
  register,
}: {
  control: Control<ProductFormData>;
  optionIndex: number;
  register: UseFormRegister<ProductFormData>;
}) {
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
