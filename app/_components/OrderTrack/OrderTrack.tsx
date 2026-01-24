"use client";

import axios from "axios";
import { useEffect, useState } from "react";


type Props = {
  orderId: string;
};

type TimelineItem = {
  id: number;
  status: string;
  comment: string | null;
  createdAt: string;
};

const steps = [
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

export default function OrderTrack({ orderId }: Props) {
  const [, setTimeline] = useState<TimelineItem[]>([]);
  const [currentStatus, setCurrentStatus] = useState("processing");

  const fetchTimeline = async () => {
    const res = await axios.get(
      `/api/protected/userOrderStatus?orderId=${orderId}`
    );

    setTimeline(res.data);

    if (res.data.length > 0) {
      setCurrentStatus(res.data[0].status); // latest first
    }
  };

  useEffect(() => {
    fetchTimeline();
  }, [orderId]);

  const currentIndex = steps.findIndex(
    (s) => s.key === currentStatus
  );

  return (
    <section className="bg-white rounded-lg shadow border p-4 space-y-6">
      {/* 🔹 STEPPER */}
      <div className="w-full flex items-center">
        {steps.map((step, index) => {
          const completed = index < currentIndex;
          const active = index === currentIndex;

          return (
            <div key={step.key} className="flex-1 flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold
                  ${
                    completed
                      ? "bg-green-500 text-white"
                      : active
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
              >
                {index + 1}
              </div>

              <span className="ml-2 text-xs font-medium">
                {step.label}
              </span>

              {index !== steps.length - 1 && (
                <div
                  className={`flex-1 h-[2px] mx-3
                    ${
                      completed
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* 🔹 TIMELINE */}
      {/* <div className="space-y-6">
        {timeline.map((item, index) => (
          <div key={item.id} className="flex gap-x-3">
            <div className="relative">
              <div className="size-7 flex justify-center items-center">
                <div className="size-2 rounded-full bg-indigo-600"></div>
              </div>

              {index !== timeline.length - 1 && (
                <div className="absolute top-7 left-3 h-full w-px bg-gray-200" />
              )}
            </div>

            <div className="pb-4">
              <h3 className="font-semibold text-sm text-gray-800 capitalize">
                {item.status.replace(/_/g, " ")}
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
      </div> */}
    </section>
  );
}
