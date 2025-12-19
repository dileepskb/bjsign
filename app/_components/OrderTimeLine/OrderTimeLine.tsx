"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";

type Props = {
  orderId: number;
};

type StatusForm = {
  status: string;
  comment: string;
};

type TimelineItem = {
  id: number;
  status: string;
  comment: string | null;
  createdAt: string;
};

export default function OrderTimeLine({ orderId }: Props) {
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { register, handleSubmit, reset } = useForm<StatusForm>();

  // 🔹 Fetch timeline
  const fetchTimeline = async () => {
    const res = await axios.get(
      `/api/protected/orderStatus?orderId=${orderId}`
    );
    setTimeline(res.data);
  };

  useEffect(() => {
    fetchTimeline();
  }, [orderId]);

  // 🔹 Submit new status
  const onSubmit = async (data: StatusForm) => {
    try {
      setLoading(true);
      await axios.post("/api/protected/orderStatus", {
        ...data,
        orderId,
      });

      setMessage("✅ Status updated");
      reset();
      fetchTimeline(); // refresh timeline instantly
    } catch (error: any) {
      setMessage(error.response?.data?.message || "❌ Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white rounded-lg shadow border">
      <div className="p-4 border-b">
        <h2 className="text-sm font-medium">Order Timeline</h2>
      </div>

      <div className="p-4 space-y-6">
        {/* 🔹 Timeline */}
        <div className="pb-5 space-y-6">
        {timeline.map((item) => (
          <div key={item.id} className="flex gap-x-3">
            <div className="relative">
              <div className="size-7 flex justify-center items-center">
                <div className="size-2 rounded-full bg-indigo-600"></div>
              </div>
              <div className="absolute h-full bg-gray-200 w-1 left-2.5" />
            </div>

            <div className="pb-6">
              <h3 className="font-semibold text-sm text-gray-800">
                {item.status}
              </h3>
              {item.comment && (
                <p className="text-sm text-gray-600 mt-1">
                  {item.comment}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-1">
                {moment(item.createdAt).fromNow()}
              </p>
            </div>
          </div>
        ))}
</div>
          <div className="flex items-center gap-2 mt-10">
              <span className="h-7 w-7 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-semibold">
                A
              </span>
              <span className="text-sm text-gray-800">Admin</span>
            </div>

        {/* 🔹 Status Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <select
            className="w-full border rounded p-2 text-sm"
            {...register("status", { required: true })}
          >
            <option value="">-- Select Status --</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="out_for_delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
          </select>

          <textarea
            className="w-full border rounded p-2 text-sm"
            rows={3}
            placeholder="Leave a comment..."
            {...register("comment")}
          />

          <button
            disabled={loading}
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded text-sm"
          >
            {loading ? "Saving..." : "Update Status"}
          </button>

          {message && (
            <p className="text-xs mt-2 text-gray-600">{message}</p>
          )}
        </form>
      </div>
    </section>
  );
}
