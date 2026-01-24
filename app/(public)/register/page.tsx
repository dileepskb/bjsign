"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";

type RegisterFormData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // ✅ Register API call
      const res = await axios.post("/api/auth/signup", {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
      });
      console.log(res)

      setMessage("✅ Registration successful! Redirecting to login...");
      
      setTimeout(() => router.push("/users"), 200);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string } } };
      console.error("Registration failed:", error);
      setMessage(error.response?.data?.error || "Registration failed");
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
            Register
          </h2>

          {message && (
            <p className="text-center text-sm mb-4 text-green-600">{message}</p>
          )}

          <div className="mb-3">
            <input
              type="text"
              {...register("first_name", { required: "Name is required" })}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="First Name"
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm">{errors.first_name.message}</p>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              {...register("last_name", { required: "Name is required" })}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Last Name"
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm">{errors.last_name.message}</p>
            )}
          </div>

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

          <div className="mb-3">
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) => value === watch("password") || "Passwords do not match",
              })}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-2 px-4 text-sm font-bold rounded-md text-white bg-orange-600 hover:bg-orange-700"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <div className="text-center">
            <Link href="/login" className="text-black hover:underline">
              Already have an account? Login.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
