"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

import EditorMenuBar from "@/components/EditorMenuBar/EditorMenuBar";
import BlogEditor from "@/components/RichTextEditor/RichTextEditor";


export default function CreateBlog() {
  const { register, handleSubmit, setValue } = useForm();
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);


  const uploadImage = async (file: File) => {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setImage(data.url);
    setUploading(false);
  };

  const onSubmit = async (data: any) => {
    await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        image,
      }),
    });

    alert("Blog created");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl p-6 space-y-4"
    >
      <h1 className="text-xl font-bold">Create Blog</h1>

      <input
        {...register("title")}
        placeholder="Title"
        className="border p-2 w-full"
      />

      <textarea
        {...register("excerpt")}
        placeholder="Short description"
        className="border p-2 w-full"
      />

      {/* FEATURED IMAGE */}
      <div>
        <label className="block font-medium mb-1">Featured Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files && uploadImage(e.target.files[0])
          }
        />

        {uploading && <p className="text-sm">Uploading...</p>}

        {image && (
          <img
            src={image}
            alt="Featured"
            className="mt-2 w-48 rounded border"
          />
        )}
      </div>

      {/* <textarea
        {...register("content")}
        placeholder="Blog Content (HTML allowed)"
        className="border p-2 w-full h-60"
      /> */}

      <BlogEditor onChange={(html) => setValue("content", html)} />
    

      <select {...register("status")} className="border p-2">
        <option value="DRAFT">Draft</option>
        <option value="PUBLISHED">Publish</option>
      </select>

      <button className="bg-black text-white px-4 py-2 rounded">
        Save Blog
      </button>
    </form>
  );
}
