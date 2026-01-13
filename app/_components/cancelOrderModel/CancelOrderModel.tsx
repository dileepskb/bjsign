"use client";

import { useState } from "react";
import axios from "axios";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface CancelOrderModalProps {
  orderId: number;
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CancelOrderModal({
  orderId,
  open,
  onClose,
  onSuccess,
}: CancelOrderModalProps) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    if (!reason.trim()) {
      console.log("Please enter a reason for cancellation");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`/api/user/orders/${orderId}/cancel`, { reason });
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error("Cancel order failed:", error);
      console.log("Failed to cancel order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      {/* Modal content */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-2xl w-full max-w-md p-6 shadow-lg">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Cancel Order
          </DialogTitle>

          <p className="text-sm text-gray-500 mt-2">
            Please provide a reason for cancelling this order.
          </p>

          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Write your reason..."
            className="mt-4 w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
            rows={3}
          />

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-md"
            >
              Close
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className={`px-4 py-2 rounded-md text-white ${
                loading
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {loading ? "Cancelling..." : "Confirm Cancel"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
