"use client";
import { useState } from "react";
import { FaHeart, FaShoppingCart, FaTrashAlt } from "react-icons/fa";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: "Banner Stand",
      price: 1999,
      image:
        "http://localhost:3000/_next/image?url=%2Fuploads%2Fthumb3-1761907555724.jpeg&w=384&q=75",
      status: "In Stock",
    },
    {
      id: 2,
      name: "Banner Stand",
      price: 2999,
      image:
        "http://localhost:3000/_next/image?url=%2Fuploads%2Fthumb3-1761907555724.jpeg&w=384&q=75",
      status: "In Stock",
    },
    {
      id: 3,
      name: "Banner Stand",
      price: 1599,
      image:
        "http://localhost:3000/_next/image?url=%2Fuploads%2Fthumb3-1761907555724.jpeg&w=384&q=75",
      status: "Out of Stock",
    },
  ]);

  const handleRemove = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-left justify-left mb-6">
        {/* <FaHeart className="text-3xl text-pink-500 mr-2" /> */}
        <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-10">
          <FaHeart className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-600">
            Your wishlist is empty!
          </h2>
          <p className="text-gray-500">
            Add some products to your wishlist to keep track of what you love.
          </p>
          <button className="mt-4 bg-pink-500 text-white px-5 py-2 rounded hover:bg-pink-600">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow">
          <table className="min-w-full">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Product</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((item) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <span className="font-medium text-gray-800">
                      {item.name}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {item.status === "In Stock" ? (
                      <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                        In Stock
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-700 font-medium">
                    ${item.price.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <button className="text-black bg-gray-300 py-1 px-3 rounded-full hover:text-blue-700 text-sm font-medium">
                      <FaShoppingCart className="inline mr-1" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-white py-1 px-3 rounded-full bg-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      <FaTrashAlt className="inline mr-1" />
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
