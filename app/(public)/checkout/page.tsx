"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import UserAddress from "@/app/_components/UserAddress/UserAddress";

type CheckoutFormData = {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
};

const Checkout = () => {
 const [showLogin, setShowLogin] = useState(false);
  const [showPasswordCreate, setShowPasswordCreate] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [, setLoading] = useState(false);

  const {  handleSubmit } = useForm<CheckoutFormData>();
  // const emailValue = watch("email");

  // ✅ Check email when user finishes typing
  // const handleEmailBlur = async () => {
  //   if (!emailValue) return;
  //   const res = await fetch("/api/user/check-email", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email: emailValue }),
  //   });
  //   const data = await res.json();
  //   if (data.exists) {
  //     setShowLogin(true);
  //     setUserEmail(emailValue);
  //   }
  // };

  // ✅ Checkout handler
  const onSubmit = async (data: CheckoutFormData) => {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setLoading(false);

    if (result.success) {
      alert("Order placed successfully!");
      setUserEmail(data?.email);
      setShowPasswordCreate(true);
    }
  };



  return (
    <div className="bg-white container mx-auto">
      <div className="flex max-md:flex-col gap-12 max-lg:gap-4 h-full">
        <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 max-md:-order-1">
          <form onSubmit={handleSubmit(onSubmit)}>
              <UserAddress />
            {/* <div>
              <h2 className="text-xl text-slate-900 font-semibold mb-6">
                Delivery Details
              </h2>
              <div className="grid lg:grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <label className="text-sm text-slate-900 font-medium block mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    {...register("first_name", {
                      required: "First name is required",
                    })}
                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-900 font-medium block mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    {...register("last_name", {
                      required: "Last name is required",
                    })}
                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-900 font-medium block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    {...register("email", { required: "Email is required" })}
                    onBlur={handleEmailBlur}
                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-900 font-medium block mb-2">
                    Phone No.
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Phone No."
                    {...register("mobile", {
                      required: "Phone number is required",
                    })}
                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-900 font-medium block mb-2">
                    Address Line
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Address Line"
                    {...register("street", { required: "Address is required" })}
                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-900 font-medium block mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Enter City"
                    {...register("city", { required: "City is required" })}
                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                  />
                 
                </div>
                <div>
                  <label className="text-sm text-slate-900 font-medium block mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    placeholder="Enter State"
                    {...register("state", { required: "State is required" })}
                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                  />
              
                </div>
                <div>
                  <label className="text-sm text-slate-900 font-medium block mb-2">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Zip Code"
                    {...register("postalCode", {
                      required: "Zip code is required",
                    })}
                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                  />
                </div>
              </div>
            </div>
            <div className="mt-5">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 w-full text-white px-6 py-2.5 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save & Continue"}
              </button>
            </div> */}

            <div className="mt-12">
              <h2 className="text-xl text-slate-900 font-semibold mb-6">
                Payment
              </h2>
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="bg-gray-100 p-4 rounded-md border border-gray-300 max-w-sm">
                  <div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="method"
                        className="w-5 h-5 cursor-pointer"
                        id="card"
                        // checked
                      />
                      <label
                        htmlFor="card"
                        className="ml-4 flex gap-2 cursor-pointer"
                      >
                        <Image
                          src="/images/cart/visa.webp"
                          className="w-12"
                          alt="cart1"
                          width={100}
                          height={100}
                        />
                        <Image
                          src="/images/cart/american-express.webp"
                          className="w-12"
                          alt="card2"
                          width={100}
                          height={100}
                        />
                        <Image
                          src="/images/cart/master.webp"
                          className="w-12"
                          alt="card3"
                          width={100}
                          height={100}
                        />
                      </label>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-500 font-medium">
                    Pay with your debit or credit card
                  </p>
                </div>
                <div className="bg-gray-100 p-4 rounded-md border border-gray-300 max-w-sm">
                  <div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="method"
                        className="w-5 h-5 cursor-pointer"
                        id="paypal"
                      />
                      <label
                        htmlFor="paypal"
                        className="ml-4 flex gap-2 cursor-pointer"
                      >
                        <Image
                          src="/images/cart/master2.webp"
                          className="w-12"
                          alt="paypalCard"
                          width={100}
                          height={100}
                        />
                      </label>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-500 font-medium">
                    Pay with your paypal account
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 max-w-md">
              <p className="text-slate-900 text-sm font-medium mb-2">
                Do you have a promo code?
              </p>
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Promo code"
                  className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                />
                <button
                  type="button"
                  className="flex items-center justify-center font-medium tracking-wide bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-md text-sm text-white cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="bg-gray-100 md:h-screen md:sticky md:top-0 md:min-w-[370px]">
          <div className="relative h-full">
            <div className="px-6 py-8 md:overflow-auto md:h-screen">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 flex p-3 shrink-0 bg-white rounded-md">
                    <Image
                      src="https://bjsignworld.com/wp-content/uploads/2025/02/Automative-Brochure.jpg"
                      alt=""
                      className="w-full object-contain"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="w-full">
                    <h3 className="text-sm text-slate-900 font-semibold">
                      brochures
                    </h3>
                    <ul className="text-xs text-slate-900 space-y-2 mt-3">
                      <li className="flex flex-wrap gap-4">
                        Quantity <span className="ml-auto">25</span>
                      </li>
                      <li className="flex flex-wrap gap-4">
                        Total Price{" "}
                        <span className="ml-auto font-semibold">$40</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <hr className="border-gray-300 my-8" />
              <div>
                <ul className="text-slate-500 font-medium space-y-4">
                  <li className="flex flex-wrap gap-4 text-sm">
                    Subtotal{" "}
                    <span className="ml-auto font-semibold text-slate-900">
                      $102.00
                    </span>
                  </li>
                  <li className="flex flex-wrap gap-4 text-sm">
                    Shipping{" "}
                    <span className="ml-auto font-semibold text-slate-900">
                      $6.00
                    </span>
                  </li>
                  <li className="flex flex-wrap gap-4 text-sm">
                    Tax{" "}
                    <span className="ml-auto font-semibold text-slate-900">
                      $5.00
                    </span>
                  </li>
                  <hr className="border-slate-300" />
                  <li className="flex flex-wrap gap-4 text-[15px] font-semibold text-slate-900">
                    Total <span className="ml-auto">$113.00</span>
                  </li>
                </ul>

                <div className="mt-8">
                  <button
                    type="button"
                    className="rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  >
                    Complete Purchase
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

{/* 🔒 Login Popup */}
      {showLogin && (
        <div className="fixed inset-0  z-[1000] flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h3 className="text-lg font-semibold mb-4">Welcome back</h3>
            <LoginPopup email={userEmail} onClose={() => setShowLogin(false)} />
          </div>
        </div>
      )}

      {/* 🔑 Create Password Popup */}
      {showPasswordCreate && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h3 className="text-lg font-semibold mb-4">Create a Password</h3>
            <PasswordPopup email={userEmail} onClose={() => setShowPasswordCreate(false)} />
          </div>
        </div>
      )}


    </div>
  );
};

export default Checkout;



function LoginPopup({ email, onClose }: { email: string; onClose: () => void }) {
  const { register, handleSubmit } = useForm<{ password: string }>();

  const onSubmit = async (data: { password: string }) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: data.password }),
    });
    const result = await res.json();
    if (result.success) {
      alert("Login successful!");
      onClose();
    } else {
      alert(result.error || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <p className="text-sm text-gray-600">Email: {email}</p>
      <input
        {...register("password")}
        type="password"
        placeholder="Enter your password"
        className="border px-4 py-2 rounded w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Login
      </button>
      <button onClick={onClose} className="text-gray-500 text-sm mt-2 w-full">
        Cancel
      </button>
    </form>
  );
}

function PasswordPopup({ email, onClose }: { email: string; onClose: () => void }) {
  const { register, handleSubmit } = useForm<{ password: string }>();

  const onSubmit = async (data: { password: string }) => {
    console.log(data)
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const result = await res.json();
    if (result.success) {
      alert("Account created successfully!");
      onClose();
    } else {
      alert(result.error || "Failed to create account");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <p className="text-sm text-gray-600">Email: {email}</p>
      <input
        {...register("password")}
        type="password"
        placeholder="Create a password"
        className="border px-4 py-2 rounded w-full"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">
        Save Password
      </button>
      <button onClick={onClose} className="text-gray-500 text-sm mt-2 w-full">
        Cancel
      </button>
    </form>
  );
}