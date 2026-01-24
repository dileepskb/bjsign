"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image"

type Blog = {
  id: number;
  title: string;
  slug: string;
  image:string;
  status: "DRAFT" | "PUBLISHED";
  createdAt: string;
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
    });

    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  if (loading) {
    return <div className="p-6">Loading blogs...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blogs</h1>

        <Link
          href="/admin/blogs/create"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add New
        </Link>
      </div>

      <div className="overflow-x-auto border rounded bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Status</th>
              <th className="p-3">Created</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No blogs found
                </td>
              </tr>
            )}

            {blogs.map((blog) => (
              <tr
                key={blog.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-3">
  {blog.image ? (
    <Image
      src={blog.image}
      className="w-16 h-12 object-cover rounded"
      height={100}
      width={100}
      alt={blog.image}
    />
  ) : (
    <span className="text-gray-400">—</span>
  )}
</td>
                <td className="p-3 font-medium">
                  {blog.title}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      blog.status === "PUBLISHED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {blog.status}
                  </span>
                </td>

                <td className="p-3 text-gray-600">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>

                <td className="p-3 text-right space-x-3">
                  <Link
                    href={`/admin/blogs/${blog.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteBlog(blog.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
