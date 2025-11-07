"use client";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function ReviewTable() {
  const reviews = [
    {
      id: 1,
      productName: "Door Hangers",
      productImg:
        "http://localhost:3000/_next/image?url=%2Fuploads%2Fthumb0-1761907555710.jpeg&w=384&q=75",
      userName: "John Doe",
      rating: 4,
      comment: "Great sound quality and very comfortable to wear!",
      date: "2025-10-20",
      status: "Approved",
    },
    {
      id: 2,
      productName: "Door Hangers",
      productImg:
        "http://localhost:3000/_next/image?url=%2Fuploads%2Fthumb0-1761907555710.jpeg&w=384&q=75",
      userName: "Sarah Smith",
      rating: 5,
      comment: "Amazing features, worth every penny!",
      date: "2025-10-25",
      status: "Pending",
    },
    {
      id: 3,
      productName: "Door Hangers",
      productImg:
        "http://localhost:3000/_next/image?url=%2Fuploads%2Fthumb0-1761907555710.jpeg&w=384&q=75",
      userName: "Michael Lee",
      rating: 2,
      comment: "Battery life is too short and sound is average.",
      date: "2025-10-28",
      status: "Rejected",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return (
          <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full font-medium">
            Approved
          </span>
        );
      case "Pending":
        return (
          <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-full font-medium">
            Pending
          </span>
        );
      case "Rejected":
        return (
          <span className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full font-medium">
            Rejected
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full font-medium">
            Unknown
          </span>
        );
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) =>
          i < rating ? (
            <FaStar key={i} className="text-yellow-500" />
          ) : (
            <FaRegStar key={i} className="text-gray-300" />
          )
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-left">
        Product Reviews
      </h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Product</th>
              <th className="py-3 px-4 text-left">Reviewer</th>
              <th className="py-3 px-4 text-left">Rating</th>
              <th className="py-3 px-4 text-left">Comment</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr
                key={review.id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Product */}
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    src={review.productImg}
                    alt={review.productName}
                    className="w-14 h-14 object-cover rounded-md border"
                  />
                  <span className="font-medium text-gray-800">
                    {review.productName}
                  </span>
                </td>

                {/* Reviewer */}
                <td className="py-3 px-4 text-gray-700">{review.userName}</td>

                {/* Rating */}
                <td className="py-3 px-4">{renderStars(review.rating)}</td>

                {/* Comment */}
                <td className="py-3 px-4 text-gray-600 max-w-xs truncate">
                  {review.comment}
                </td>

                {/* Date */}
                <td className="py-3 px-4 text-gray-500">{review.date}</td>

                {/* Status */}
                <td className="py-3 px-4 text-center">
                  {getStatusBadge(review.status)}
                </td>

                {/* Actions */}
                <td className="py-3 px-4 text-center space-x-2">
                  <button className="text-black bg-gray-300 py-1 px-3 rounded-full  hover:text-blue-700 text-sm font-medium">
                    View
                  </button>
                  {/* <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                    Approve
                  </button> */}
                  <button className="text-white py-1 px-3 rounded-full bg-red-500 hover:text-red-700 text-sm font-medium">
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
