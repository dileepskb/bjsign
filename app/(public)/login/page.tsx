"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      setMessage("");

      // ✅ Important: allow cookies to be stored
      const res = await axios.post("/api/auth/login", data, { withCredentials: true });

      setMessage("✅ Login successful! Redirecting...");
      const role = res.data.user.role;

      // ✅ Redirect based on role
      setTimeout(() => {
        router.push(role === "admin" ? "/admin" : "/users");
      }, 100);
    } catch (err: any) {
      console.error("Login failed:", err);
      setMessage(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6 border p-3 px-6 rounded bg-white"
        >
          <h2 className="text-center text-3xl font-extrabold text-orange-500">
            Login
          </h2>

          {message && (
            <p className="text-center text-sm mb-4 text-green-600">{message}</p>
          )}

          <div className="mb-3">
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-3">
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-2 px-4 text-sm font-bold rounded-md text-white bg-orange-600 hover:bg-orange-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-center">
            <Link href="/register" className="text-black hover:underline">
              No account? Register.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
