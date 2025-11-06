'use client'
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";


type ProfileForm = {
  name: string;
  gender: string;
  email: string;
  mobile: string;
};

export default function UserAccount() {
const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data: ProfileForm) => {
    try {
      setLoading(true);
      setMessage("");
      const res = await axios.post("/api/user/update", data, { withCredentials: true });
      setMessage("✅ Profile updated successfully!");
    } catch (err: any) {
      setMessage(err.response?.data?.error || "❌ Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     

     <div className="flex bg-gray-50">
      <div className="max-w-5xl w-full bg-white p-6 rounded shadow">
        <h2 className="text-left text-2xl font-bold text-orange-600 mb-6">Personal Information</h2>

        {message && <p className="text-center text-sm text-green-600 mb-3">{message}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-bold">Full Name</label>
            <input
              {...register("name", { required: "Full name is required" })}
              className="w-full border bg-gray-100 p-2 rounded"
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-bold">Gender</label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className="w-full border  bg-gray-100 p-2 rounded"
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold">Email Address</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border p-2  bg-gray-100 rounded"
              placeholder="example@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-bold">Mobile No.</label>
            <input
              type="tel"
              {...register("mobile", { required: "Mobile number is required" })}
              className="w-full border p-2  bg-gray-100 rounded"
              placeholder="9876543210"
            />
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-md font-semibold"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>

        <div className="py-4">
            <h2 className="font-bold mb-4 text-xl">FAQs</h2>
            <p className="mb-3">
<strong>What happens when I update my email address (or mobile number)?</strong><br />
Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).
</p>
<p className="mb-3">
    <strong>
When will my BJ Signworld account be updated with the new email address (or mobile number)?</strong><br />
It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.
</p>
<p className="mb-3">
    <strong>
What happens to my existing BJ Signworld account when I update my email address (or mobile number)?</strong> <br  />
Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.
</p>
<p className="mb-3">
    <strong>
Does my Seller account get affected when I update my email address?</strong>
<br />
BJ Signworld has a 'single sign-on' policy. Any changes will reflect in your Seller account also.
</p>
<div className="mt-4">
<button className="rounded text-white bg-red-600 px-3 py-2 me-3">Deactivate Account</button>
<button  className="rounded text-white bg-orange-600 px-3 py-2">Delete Account</button>
</div>
        </div>
      </div>
    </div>
    </>
  );
}
