"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import axios from "axios";
// import Link from "next/link";
import { useEffect, useState } from "react";
// import Image from "next/image";
// import { CaseUpper } from "lucide-react";
import moment from "moment";
import OrderTrack from "@/app/_components/OrderTrack/OrderTrack";

type Props = {
  id: string;
};

type OrderItem = {
  quantity: number;
  amount_total: number;
  description: string;
};

type Order = {
  orderNumber: string;
  createdAt: string | Date;
  paymentStatus: string;
  totalAmount: number;
  items: OrderItem[];
};


const SingleOrder = ({ id }: Props) => {
  const [products, setProducts] = useState<Order | null>(null);
  const [, setLoading] = useState(true);
  // const [reload, setReload] = useState(true);


 

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await axios.get(`/api/protected/allorders?id=${id}`);
        setProducts(res?.data);
   
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [id]);

  const getStatusBadge = (status: string) => {
  
    switch (status) {
      case "paid":
        return (
          <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
            Payment Paid
          </span>
        );
      case "processing":
        return (
          <span className="px-3 py-1 text-sm font-medium text-orange-700 bg-orange-100 rounded-full">
            Payment Processing
          </span>
        );
      case "pending":
        return (
          <span className="px-3 py-1 text-sm font-medium text-yellow-700 bg-yellow-100 rounded-full">
            Payment Pending
          </span>
        );
      case "cancelled":
        return (
          <span className="px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-full">
            Payment Cancelled
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
            Payment Unknown
          </span>
        );
    }
  };

  return (
    <>
      <Breadcrumb pageName="Order Details" />

      <div className="relative overflow-x-auto border border-gray-300 rounded p-3 bg-white dark:bg-gray-900">
        <div className="bg-gray-50 text-gray-900">
          <div className="min-h-screen p-6">
            <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-semibold">
                  Order ID: {products?.orderNumber}
                </h1>
                <p className="text-sm text-gray-500">
                  {}
                  {moment(products?.createdAt).format(
                    "MMMM D, YYYY [at] h:mm a"
                  )}{" "}
                  from Draft Orders
                  {/* January 8, 2024 at 9:48 pm  */}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span>{getStatusBadge(products?.paymentStatus || "")}</span>
                
              </div>
            </header>

            <div className="grid ">
              <div className="space-y-6">
                <OrderTrack orderId={id} />
                <section className="bg-white rounded-lg shadow-sm border">
                  <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="text-sm font-medium">Order Items</h2>
                    {/* <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
              Unfulfilled
            </span> */}
                  </div>

                  <div className="p-4 space-y-4">
                    <p className="text-xs text-gray-500">
                      Use this personalized guide to get your store up and
                      running.
                    </p>
                    {products?.items?.map((pItems, index) => {
                      const q = pItems?.quantity;
                      const a = pItems?.amount_total;
                      const total = q * a;
                      return (
                        <div key={index} className="flex items-center gap-4">
                          <div className="h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                            <span className="text-xs text-gray-400">Image</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              {pItems?.description}
                            </p>
                            {/* <p className="text-sm text-gray-800">Macbook Air</p>
                <p className="text-xs text-gray-500">Medium · Black</p> */}
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center border rounded-md overflow-hidden text-sm">
                              <span className="px-3 py-1 border-r bg-gray-50">
                                {pItems?.quantity} x ${pItems?.amount_total}
                              </span>
                              <span className="px-3 py-1">${total}</span>
                            </div>
                            {/* <button className="text-xs text-red-500 hover:underline">
                  Remove
                </button> */}
                          </div>
                        </div>
                      );
                    })}

                    {/* <div className="flex flex-wrap gap-3 pt-2">
              <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Fulfill item
              </button>
              <button className="px-4 py-2 text-sm border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50">
                Create shipping label
              </button>
            </div> */}
                  </div>
                </section>

                <section className="bg-white rounded-lg shadow-sm border">
                  <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="text-sm font-medium">Order Summary</h2>
                    {/* <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
              Payment pending
            </span> */}
                  </div>

                  <div className="p-4 space-y-4">
                    <p className="text-xs text-gray-500">
                      Use this personalized guide to get your store up and
                      running.
                    </p>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="text-gray-800">
                          {products?.items?.length} item &nbsp; $
                          {products?.totalAmount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Discount</span>
                        <span className="text-green-700">
                          New customer &nbsp; −$00
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="text-gray-800">
                          Free shipping (0.0 lb) &nbsp; $0.00
                        </span>
                      </div>
                      <div className="border-t pt-2 flex justify-between text-base font-semibold">
                        <span>Total</span>
                        <span>${products?.totalAmount}</span>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>Paid by customer</span>
                        {/* <span>$0.00</span> */}
                      </div>
                      {/* <div className="flex justify-between">
                <span>Payment due when invoice is sent</span>
                <button className="text-indigo-600 text-xs hover:underline">Edit</button>
              </div> */}
                    </div>

                    {/* <p className="text-xs text-gray-500">
              Review your order at a glance on the Order Summary page.
            </p> */}

                    {/* <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 text-sm border rounded-md bg-white hover:bg-gray-50">
                Send invoice
              </button>
              <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Collect payment
              </button>
            </div> */}
                  </div>
                </section>

                
              </div>

            </div>
          </div>
        </div>
       
      </div>
    </>
  );
};

export default SingleOrder;