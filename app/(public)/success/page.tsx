"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "@/context/SessionContext";
import { InvoceItems } from "@/types/invoice";

const Page = () => {
const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      fetchSessionData(sessionId);
    }
  }, [sessionId]);

  const fetchSessionData = async (id: string) => {
    try {
      const res = await axios.get(`/api/payment/session?session_id=${id}`);
      setInvoice(res.data);
    } catch (error) {
      console.error('Error fetching session data:', error);
    } finally {
      setLoading(false);
    }
  };



  if (loading) return <p>Loading...</p>;

    return(
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-xl">
              <div className="bg-green-600 px-6 py-4">
                  <div className="flex items-center justify-between gap-2">
                      <h2 className="text-lg font-semibold text-white">Order Confirmation</h2>
                      <span className="bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-full">Paid</span>
                  </div>
                  <p className="text-slate-200 text-sm mt-2">Thank you for your order!</p>
              </div>

              <div className="p-6">
                  <div className="flex flex-wrap justify-between items-center gap-4">
                      <div>
                          <p className="text-slate-500 text-sm font-medium">Order Number</p>
                          <p className="text-slate-900 text-sm font-medium mt-2">#ORD-78945</p>
                      </div>
                      <div>
                          <p className="text-slate-500 text-sm font-medium">Date</p>
                          <p className="text-slate-900 text-sm font-medium mt-2">June 15, 2025</p>
                      </div>
                      <div>
                          <p className="text-slate-500 text-sm font-medium">Total</p>
                          <p className="text-sm font-medium text-indigo-700 mt-2">$367.00</p>
                      </div>
                  </div>

                  <div className="bg-gray-100 rounded-xl p-4 mt-8">
                      <h3 className="text-base font-medium text-slate-900 mb-6">Shipping Information</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                              <p className="text-slate-500 text-sm font-medium">Customer</p>
                              <p className="text-slate-900 text-sm font-medium mt-2">{invoice?.invoice?.name}</p>
                          </div>
                          <div>
                              <p className="text-slate-500 text-sm font-medium">Shipping Method</p>
                              <p className="text-slate-900 text-sm font-medium mt-2">{invoice?.invoice?.paymentMethod}</p>
                          </div>
                          <div>
                              <p className="text-slate-500 text-sm font-medium">Address</p>
                              <p className="text-slate-900 text-sm font-medium mt-2">{ 
                              invoice?.invoice?.customerAddress?.line1},
                              { 
                              invoice?.invoice?.customerAddress?.city},{invoice?.invoice?.customerAddress?.state}</p>
                          </div>
                          <div>
                              <p className="text-slate-500 text-sm font-medium">Phone</p>
                              <p className="text-slate-900 text-sm font-medium mt-2">(555) 123-4567</p>
                          </div>
                      </div>
                  </div>

                  <div className="mt-8">
                      <h3 className="text-base font-medium text-slate-900 mb-6">Order Items ({invoice?.invoice?.items?.length})</h3>
                      <div className="space-y-4">
                        {invoice?.invoice?.items?.map((product:InvoceItems, index:number) => (
                         <div className="flex items-start gap-4 max-sm:flex-col" key={index}>
                              {/* <div className="w-[70px] h-[70px] bg-gray-200 rounded-lg flex items-center justify-center shrink-0">
                                  <img src="https://readymadeui.com/images/watch1.webp" alt="Product" className="w-14 h-14 object-contain rounded-sm" />
                              </div> */}
                              <div className="flex-1">
                                  {/* <h4 className="text-sm font-medium text-slate-900">{product?.name}</h4> */}
                                  <h4 className="text-sm font-medium text-slate-900">{product?.description}</h4>
                                  {/* <p className="text-slate-500 text-xs font-medium mt-2">Color: Golden</p> */}
                                  {/* <p className="text-slate-500 text-xs font-medium mt-1">Qty: {product?.quantity}</p> */}
                              </div>
                              <div className="text-right">
                                  <p className="text-slate-900 text-sm font-semibold">${product?.price?.unit_amount}</p>
                              </div>
                          </div>
                        ))}
                          

                      </div>
                  </div>

                  <div className="bg-gray-100 rounded-xl p-4 mt-8">
                      <h3 className="text-base font-medium text-slate-900 mb-6">Order Summary</h3>
                      <div className="space-y-4">
                          <div className="flex justify-between">
                              <p className="text-sm text-slate-500 font-medium">Subtotal</p>
                              <p className="text-slate-900 text-sm font-semibold">$367.00</p>
                          </div>
                          <div className="flex justify-between">
                              <p className="text-sm text-slate-500 font-medium">Shipping</p>
                              <p className="text-slate-900 text-sm font-semibold">$0.00</p>
                          </div>
                          <div className="flex justify-between">
                              <p className="text-sm text-slate-500 font-medium">Tax</p>
                              <p className="text-slate-900 text-sm font-semibold">$29.36</p>
                          </div>
                          <div className="flex justify-between pt-3 border-t border-gray-300">
                              <p className="text-[15px] font-semibold text-slate-900">Total</p>
                              <p className="text-[15px] font-semibold text-indigo-700">$396.36</p>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="bg-gray-100 px-6 py-4">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                      <p className="text-slate-500 text-sm font-medium">Need help? <a href="javascript:void(0)" className="text-indigo-700 hover:underline">Contact us</a></p>
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-[15px] py-2 px-4 rounded-lg max-sm:-order-1 cursor-pointer transition duration-200">
                          Download Invoice
                      </button>
                  </div>
              </div>
          </div>
      </div>
    )
}

export default Page