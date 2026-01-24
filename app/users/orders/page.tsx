"use client"

import H2 from "@/app/_components/H2/H2";
import { Tooltip } from "@/app/_components/Tooltip/Tooltip";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { MdFileDownload } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import CancelOrderModal from "@/app/_components/cancelOrderModel/CancelOrderModel";
import Link from "next/link";


// interface CancelOrderModalProps {
//   orderId: number;
//   open: boolean;
//   onClose: () => void;
//   onSuccess?: () => void;
// }

export interface InvoiceData {
  id: string;
  amountTotal: number;
  status: string;
  currency: string;
  createdAt: string; // ISO Date string
}

export interface OrderItem {
  name: string;
  quantity: number;
  unit_amount: number;
  total: number;
}

export interface OrderData {
  id: number;
  orderNumber: string;
  status: string; // e.g. 'processing' | 'shipped' | 'cancelled'
  paymentStatus: string; // e.g. 'paid' | 'unpaid' | 'failed'
  totalAmount: number;
  currency: string;
  createdAt: string; // ISO Date string
  items: OrderItem[];
  invoice: InvoiceData | null;
}

export interface OrdersResponse {
  success: boolean;
  orders: OrderData[];
}

export default function OrdersTable() {
  // const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);


  
  const getStatusBadge = (status: string) => {
    console.log(status)
    switch (status) {
      
      case "delivered":
        return (
          <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
            Delivered
          </span>
        );
      case "processing":
        return (
          <span className="px-3 py-1 text-sm font-medium text-orange-700 bg-orange-100 rounded-full">
            Processing
          </span>
        );
      case "out_for_delivery":
        return (
          <span className="px-3 py-1 text-sm font-medium text-yellow-700 bg-yellow-100 rounded-full">
           Out for Delivery
          </span>
        );
       case "shipped":
        return (
          <span className="px-3 py-1 text-sm font-medium text-white bg-sky-600 rounded-full">
           Shipped
          </span>
        );
      case "Cancelled":
        return (
          <span className="px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-full">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
            Unknown
          </span>
        );
    }
  };


    const getApi = async () => {
        const response = await axios.get("/api/user/orders/")
        setOrders(response?.data?.orders)
    }
    useEffect(() => {
      getApi();
    },[])








  const handleCancelClick = (orderId: number) => {
    setSelectedOrderId(orderId);
    setModalOpen(true);
  };




// async function cancelOrder(sessionId: string) {
//   try {
//     const res = await axios.post("/api/payment/cancel", { session_id: sessionId });
//     alert(res.data.message);
//   } catch (err: any) {
//     alert(err.response?.data?.error || "Failed to cancel order");
//   }
// }

// Example usage:




  return (
    <div className="max-w-5xl mx-auto p-4 bg-white min-h-screen rounded border">
      <H2 className="mb-3">
        My Orders
      </H2>

      {/* <button onClick={() => cancelOrder("cs_test_123")}>Cancel Order</button> */}

      <div className="overflow-x-auto bg-neutral-primary-soft   rounded-lg">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-2 px-4 text-left">Order ID</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Total</th>
              <th className="py-2 px-4 text-left">Payment</th>
              <th className="py-2 px-4 text-center">Status</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <>
              <tr
                key={order.id}
                className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-t hover:bg-gray-50 transition"
              >
                <td className="py-2 px-4 font-medium text-gray-800">
                  <Link href={`/users/orders/${order.id}`} className="text-sky-600 font-bold hover:underline">{order.orderNumber}</Link>
                </td>
                <td className="py-2 px-4 text-gray-600">{order.createdAt}</td>
                <td className="py-2 px-4 text-gray-600">{order.totalAmount}</td>
                <td className="py-2 px-4 text-gray-600">{order.paymentStatus}</td>
                <td className="py-2 px-4 text-center">
                  {getStatusBadge(order.status)}
                </td>
                <td className="py-2 px-4 text-center space-x-2 flex">
                  <Tooltip text="View" position="top">
                  <button className="text-black bg-gray-300 items-center px-1.5 py-1.5 text-center rounded-full hover:text-white text-sm font-medium">
                    <FiExternalLink />
                  </button>
                  </Tooltip>
                  <Tooltip text="Download" position="top">
                  <button className="text-white  bg-green-500 items-center px-1.5 py-1.5 text-center rounded-full   hover:text-white text-sm font-medium">
                    <MdFileDownload />
                  </button>
                  </Tooltip>
                    <Tooltip text="Cencel Order" position="top">
                   <button 
                   onClick={() => handleCancelClick(order.id)}

                   className="text-white   bg-red-500 items-center px-1.5 py-1.5 text-center rounded-full  hover:text-white text-sm font-medium">
                    <MdOutlineCancel />
                  </button>
                  </Tooltip>
                </td>
              </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
      {selectedOrderId && (
        <CancelOrderModal
          orderId={selectedOrderId}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
         onSuccess={() => getApi()}
        />
      )}
    </div>
  );
}
