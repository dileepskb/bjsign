"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaAddressBook } from "react-icons/fa";

interface Address {
  id: string;
  name?: string;
  address_mobile?: string;
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  default?: boolean;
}

interface AddressFormValues {
  name: string;
  address_mobile: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  default: boolean;
}

export default function UserAddress() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const { register, handleSubmit, reset } = useForm<AddressFormValues>({
    defaultValues: {
      name: "",
      address_mobile: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      default: false,
    },
  });

  // 🔹 Fetch user addresses
  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/user/address");
      setAddresses(res.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // 🔹 Handle add or update
  const onSubmit = async (data: AddressFormValues) => {
    setLoading(true);
    try {
      if (editingAddress) {
        // ✏️ Update existing address
        await axios.put(`/api/user/address/${editingAddress.id}`, data);
        alert("Address updated successfully!");
      } else {
        // ➕ Add new address
        await axios.post("/api/user/address", data);
        alert("Address added successfully!");
      }

      reset();
      setShowForm(false);
      setEditingAddress(null);
      await fetchAddresses();
    } catch (error) {
      console.error(error);
      alert("Error saving address");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    try {
      await axios.delete(`/api/user/address/${id}`);
      alert("Address deleted successfully!");
      await fetchAddresses();
    } catch (error) {
      console.error(error);
      alert("Error deleting address");
    }
  };

  // 🔹 Handle edit
  const handleEditClick = (address: Address) => {
    setEditingAddress(address);
    reset(address); // Prefill form
    setShowForm(true);
  };

  // 🔹 Cancel edit
  const handleCancel = () => {
    reset();
    setEditingAddress(null);
    setShowForm(false);
  };

  return (
    <>
      <div className="p-6 px-0">
        {addresses.length > 0 ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-semibold text-gray-800 text-left">
                Saved Addresses
              </h2>
              <button
                onClick={() => {
                  setEditingAddress(null);
                  reset();
                  setShowForm((prev) => !prev);
                }}
                className="bg-orange-500 text-white py-2 px-3 rounded"
              >
                {showForm ? "Close" : "+ Add Address"}
              </button>
            </div>

            {/* 🏠 Address Table */}
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
                        {addr.street}, {addr.city}, {addr.state} -{" "}
                        {addr.postalCode}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {addr.address_mobile}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {addr.default ? (
                          <span className="text-green-600 font-semibold">✔</span>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="py-3 px-4 text-center space-x-2">
                        <button
                          onClick={() => handleEditClick(addr)}
                          className="text-black bg-gray-300 hover:text-blue-700 text-sm font-medium rounded-full py-1 px-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(addr.id)}
                          className="text-white bg-red-500 rounded-full py-1 px-3 hover:bg-red-600 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ✏️ Add / Edit Form */}
            {showForm && (
              <div className="bg-white p-6 rounded shadow mt-6">
                <h2 className="text-left text-2xl font-bold text-orange-600 mb-6">
                  {editingAddress ? "Edit Address" : "Add New Address"}
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                  <input
                    {...register("name", { required: true })}
                    placeholder="Address Name"
                    className="w-full border p-2 rounded"
                  />
                  <input
                    {...register("address_mobile", { required: true })}
                    placeholder="Address Mobile"
                    className="w-full border p-2 rounded"
                  />
                  <input
                    {...register("street", { required: true })}
                    placeholder="Street"
                    className="w-full border p-2 rounded"
                  />
                  <input
                    {...register("city", { required: true })}
                    placeholder="City"
                    className="w-full border p-2 rounded"
                  />
                  <input
                    {...register("state", { required: true })}
                    placeholder="State"
                    className="w-full border p-2 rounded"
                  />
                  <input
                    {...register("postalCode", { required: true })}
                    placeholder="Postal Code"
                    className="w-full border p-2 rounded"
                  />
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register("default")}
                      className="w-4 h-4"
                    />
                    <span>Set as default address</span>
                  </label>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-gray-300 text-black px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      {loading
                        ? "Saving..."
                        : editingAddress
                        ? "Update"
                        : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ) : (
          // 🟢 No addresses yet
          <div className="max-w-md mx-auto text-center p-3">
            <div className="inline-block text-5xl text-green-500">
              <FaAddressBook />
            </div>
            <h2 className="font-bold text-xl">
              No Addresses found in your account!
            </h2>
            <p>Add a delivery address.</p>
            <button
              className="bg-green-500 text-white p-3 py-2 rounded mt-3"
              onClick={() => setShowForm(true)}
            >
              Add Address
            </button>
          </div>
        )}
      </div>
       <div className="py-4 mt-2">
        <h2 className="font-bold mb-4 text-xl">Update Delivery Address</h2>
        <p className="mb-3">
          Keep your delivery information up to date so your orders reach you on
          time.
          <br />
          Please review and edit your address details below.
          <br />
        </p>
        <ul>
          <li>
            <strong>Full Name -</strong> Enter the name for delivery
          </li>

          <li>
            <strong>Phone Number -</strong> Your active contact number
          </li>

          <li>
            <strong>Street Address -</strong> House number, building name,
            street
          </li>

          <li>
            <strong>City -</strong> Enter your city
          </li>

          <li>
            <strong>State / Province -</strong> Enter your state or province
          </li>

          <li>
            <strong>Postal Code -</strong> Enter a valid ZIP or PIN code
          </li>

          <li>
            <strong>Landmark (optional) -</strong> Nearby landmark for easy
            delivery reference
          </li>
        </ul>
      </div>
    </>
  );
}
