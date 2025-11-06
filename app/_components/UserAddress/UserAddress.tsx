'use client'
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

import { FaAddressBook } from "react-icons/fa";


type ProfileForm = {
  name: string;
  gender: string;
  email: string;
  mobile: string;
};


const addresses = [
    {
      id: 1,
      name: "John Doe",
      phone: "+91 9876543210",
      street: "221B Baker Street",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400001",
      landmark: "Near Gateway of India",
      isDefault: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "+91 9123456789",
      street: "45 Green Avenue",
      city: "Delhi",
      state: "Delhi",
      postalCode: "110001",
      landmark: "Opposite City Mall",
      isDefault: false,
    },
  ];

export default function UserAddress() {
const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 👇 Replace with your actual API endpoint (e.g. /api/user/address)
      await axios.post("/api/user/address", formData);
      alert("Address added successfully!");
      setShowForm(false);
      setFormData({ street: "", city: "", state: "", postalCode: "" });
    } catch (error) {
      console.error(error);
      alert("Error adding address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {!showForm ? (
    <div className="max-w-md mx-auto items-center content-center  text-center p-3">
        <div className="inline-block text-5xl text-green-500"><FaAddressBook /></div>
        <h2 className="font-bold text-xl">No Addresses found in your account!</h2>
        <p>Add a delivery address.</p>
        <button className="bg-green-500 text-white p-3 py-2 rounded mt-3" onClick={() => setShowForm(true)}>Add Addresses</button>
    </div>
  

      ) : (
     <div className="flex bg-gray-50">
      <div className="max-w-5xl w-full bg-white p-6 rounded shadow">
        <h2 className="text-left text-2xl font-bold text-orange-600 mb-6">Address Information</h2>

       <form
          onSubmit={handleSubmit}
          className="text-left"
        >
          <input
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
            className="w-full border p-2 mb-2 rounded"
            required
          />
          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full border p-2 mb-2 rounded"
            required
          />
          <input
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="w-full border p-2 mb-2 rounded"
            required
          />
          <input
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full border p-2 mb-2 rounded"
            required
          />

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
    )}

    <div className="mt-5">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-left">
        Saved Addresses
      </h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Address</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-center">Default</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((addr) => (
              <tr
                key={addr.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 font-medium text-gray-800">
                  {addr.name}
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {addr.street}, {addr.city}, {addr.state} - {addr.postalCode}
                  <br />
                  <span className="text-sm text-gray-500">{addr.landmark}</span>
                </td>
                <td className="py-3 px-4 text-gray-600">{addr.phone}</td>
                <td className="py-3 px-4 text-center">
                  {addr.isDefault ? (
                    <span className="text-green-600 font-semibold">✔</span>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="py-3 px-4 text-center space-x-2">
                  <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                    Edit
                  </button>
                  <button className="text-red-500 hover:text-red-700 text-sm font-medium">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

         <div className="py-4 mt-4">
            <h2 className="font-bold mb-4 text-xl">Update Delivery Address</h2>
            <p className="mb-3">
Keep your delivery information up to date so your orders reach you on time.<br />
Please review and edit your address details below.<br />

</p>
<ul>
    <li><strong>Full Name -</strong> Enter the name for delivery</li>

    <li><strong>Phone Number -</strong> Your active contact number</li>

    <li><strong>Street Address -</strong> House number, building name, street</li>

    <li><strong>City -</strong> Enter your city</li>

    <li><strong>State / Province -</strong> Enter your state or province</li>

    <li><strong>Postal Code -</strong> Enter a valid ZIP or PIN code</li>

    <li><strong>Landmark (optional) -</strong> Nearby landmark for easy delivery reference</li>
</ul>
        </div>
    </>
  );
}
