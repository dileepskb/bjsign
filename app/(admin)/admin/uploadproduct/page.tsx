"use client";

import { useState } from "react";

export default function ProductExcelUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (
      !selectedFile.name.endsWith(".xlsx") &&
      !selectedFile.name.endsWith(".xls")
    ) {
      setMessage("❌ Please upload a valid Excel file (.xlsx or .xls)");
      return;
    }

    setFile(selectedFile);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("❌ Please select an Excel file");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/product/bulk-upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setMessage("✅ Products uploaded successfully");
      setFile(null);
    } catch (error: any) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
 
<div className="min-h-screen">
      <div className="max-w-3xl border bg-white p-6 rounded-2xl shadow-sm space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
           Upload Products via Excel
        </h2>
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-600
          file:mr-4 file:py-2 file:px-4
          file:rounded file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />

      {file && (
        <p className="text-xs text-gray-500 mt-2">
          Selected: {file.name}
        </p>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded
          hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload Excel"}
      </button>

      {message && (
        <p className="mt-3 text-sm text-center">{message}</p>
      )}
    </div>
    </div>
  );
}
