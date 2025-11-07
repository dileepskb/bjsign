import { useState } from "react";

export default function ReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, rating, comment }),
    });

    if (res.ok) {
      alert("Review submitted!");
      setComment("");
      setRating(5);
    } else {
      alert("Failed to post review");
    }
  };

  return (
    <div className="max-w-md mx-auto border rounded p-4">

      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border p-2 w-full mb-2"
        min={1}
        max={5}
      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border p-2 w-full mb-2"
        placeholder="Your comment..."
      />
      <button
        onClick={handleSubmit}
        className="bg-green-500 w-full text-white px-4 py-2 rounded"
      >
        Submit Review
      </button>
    </div>
  );
}
