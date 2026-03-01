"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import LoginImage from "@/components/Auth/LoginImage/LoginImage";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>();

  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    setLoading(false);

    if (!res.ok) {
      // FIELD LEVEL ERRORS
      if (result.email) {
        setError("email", { message: result.email });
      }

      if (result.password) {
        setError("password", { message: result.password });
      }

      // GENERAL ERROR
      if (result.error) {
        setMessage(result.error);
      }

      return;
    }

    // SUCCESS
    router.push("/users");
  };

  const googleLogin = () => {
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      redirect_uri: "http://localhost:3000/api/auth/google/callback",
      response_type: "code",
      scope: "openid email profile",
      prompt: "select_account",
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  };



  return (
    <div className="flex justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 pt-[80] pb-[40px]">
      <div className="max-w-3xl w-full flex mt-5 border shadow-sm">
        <div className="w-[40%] bg-gray-100  p-8">
          <LoginImage />
        </div>
        <div className="w-[60%] bg-white p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-center flex justify-center">
              {" "}
              <Image
                src="/images/logo/logo.png"
                width={60}
                height={60}
                alt="bjsignworld"
              />
            </div>
            <h2 className=" text-center text-2xl font-bold text-black py-4">
              Login in to your account
            </h2>

            {message && (
              <p className="text-center text-sm mb-4 text-green-600">
                {message}
              </p>
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
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full py-2 px-4 shadow font-bold rounded-md text-white bg-orange-600 hover:bg-orange-700"
            >
              {/* Login */}
              {loading ? "Logging in..." : "Login"}
            </button>

            <button
              type="button"
              onClick={googleLogin}
              className="w-full mt-3 py-2 bg-white text-black border shadow gap-3 rounded-md  flex justify-center"
            >
              <FcGoogle size={20} /> <span> Login with Google</span>
            </button>

            <div className="text-center flex justify-between mt-5">
              <Link
                href="/register"
                className="text-orange-500 hover:underline"
              >
                No account? Register.
              </Link>
              <Link href="/register" className="text-black hover:underline">
                Forgot Password
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
