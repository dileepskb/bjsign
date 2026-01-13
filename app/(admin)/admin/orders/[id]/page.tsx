"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CaseUpper } from "lucide-react";
import moment from "moment";
import OrderTimeLine from "@/app/_components/OrderTimeLine/OrderTimeLine";

type PageProps = {
  params: {
    id: string;
  };
};

const SingleOrder = ({ params }: PageProps) => {
  const [products, setProducts] = useState<object>({});
  const [, setLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const { id } = params;

 

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
  }, [reload]);

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
                <span>{getStatusBadge(products?.paymentStatus)}</span>
                {/* <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
          Unfulfilled
        </span> */}
                {/* <button className="ml-4 px-3 py-1 text-sm border rounded-md bg-white hover:bg-gray-100">
          Restock
        </button> */}
                <button className="px-3 py-1 text-sm border rounded-md bg-white hover:bg-gray-100">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm border rounded-md bg-white hover:bg-gray-100">
                  More actions
                </button>
              </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <div className="space-y-6">
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

                <OrderTimeLine orderId={id} />
              </div>

              <div className="space-y-6">
                <section className="bg-white rounded-lg shadow-sm border">
                  <div className="p-4 flex items-center justify-between">
                    <h2 className="text-sm font-medium">Notes</h2>
                    <button className="text-xs text-indigo-600 hover:underline">
                      Edit
                    </button>
                  </div>
                  <div className="px-4 pb-4">
                    <p className="text-sm text-gray-700">
                      First customer and order!
                    </p>
                  </div>
                </section>

                <section className="bg-white rounded-lg shadow-sm border">
                  <div className="p-4 flex items-center justify-between">
                    <h2 className="text-sm font-medium">Customers</h2>
                    <button className="text-xs text-indigo-600 hover:underline">
                      Edit
                    </button>
                  </div>
                  <div className="px-4 pb-4 space-y-1 text-sm">
                    <p className="font-medium">
                      {products?.user?.first_name} {products?.user?.last_name}
                    </p>
                    <p className="text-gray-600">1 order</p>
                    <p className="text-gray-600">Customer is tax-exempt</p>
                  </div>
                </section>

                <section className="bg-white rounded-lg shadow-sm border">
                  <div className="p-4 flex items-center justify-between">
                    <h2 className="text-sm font-medium">Contact Information</h2>
                    <button className="text-xs text-indigo-600 hover:underline">
                      Edit
                    </button>
                  </div>
                  <div className="px-4 pb-4 text-sm space-y-1">
                    <p>{products?.user?.email}</p>
                    <p>
                      {products?.user?.mobile
                        ? products?.user?.mobile
                        : "No phone number"}
                    </p>
                  </div>
                </section>

                <section className="bg-white rounded-lg shadow-sm border">
                  <div className="p-4 flex items-center justify-between">
                    <h2 className="text-sm font-medium">Shipping address</h2>
                    <button className="text-xs text-indigo-600 hover:underline">
                      Edit
                    </button>
                  </div>
                  <div className="px-4 pb-4 text-sm space-y-1">
                    <p className="font-medium">
                      {products?.user?.userAddress[0]?.name}
                    </p>
                    <p>{products?.user?.userAddress[0]?.street}</p>
                    <p>
                      {products?.user?.userAddress[0]?.city},{" "}
                      {products?.user?.userAddress[0]?.state},{" "}
                      {products?.user?.userAddress[0]?.postalCode}
                    </p>
                    <p>{products?.user?.userAddress[0]?.address_mobile}</p>
                    {/* <button className="text-xs text-indigo-600 hover:underline mt-1">
              View map
            </button> */}
                  </div>
                </section>
                <section className="bg-white rounded-lg shadow-sm border">
                  <div className="p-4 flex items-center justify-between">
                    <h2 className="text-sm font-medium">Billing address</h2>
                    <button className="text-xs text-indigo-600 hover:underline">
                      Edit
                    </button>
                  </div>
                  <div className="px-4 pb-4 text-sm">
                    <p className="text-gray-700">Same as shipping address</p>
                  </div>
                </section>

                <section className="bg-white rounded-lg shadow-sm border">
                  <div className="p-4 flex items-center justify-between">
                    <h2 className="text-sm font-medium">Conversion summary</h2>
                  </div>
                  <div className="px-4 pb-4 text-sm">
                    <p className="text-gray-600">
                      There aren’t any conversion details available for this
                      order.
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 ">
          
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search products"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-b">
            <tr>
              
              <th scope="col" className="px-3 py-3">
                Order Number
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Status
              </th>
               <th scope="col" className="px-6 py-3">
                Order Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((items, index) => {
            
              return (
                <tr
                  key={index}
                  className="bg-white  border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  
                  <td
                    scope="row"
                    className="flex py-2 items-center  text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    
                    <div className="ps-3">
                      <div className="text-base font-semibold">
                        {items?.orderNumber}
                      </div>
                     
                    </div>
                  </td>
                  <td className="px-6">${items.totalAmount}</td>
                  <td className="px-6">
                    <div className="flex items-center capitalize">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2 capitalize"></div>{" "}
                      {items?.paymentStatus}
                      
                    </div>
                  </td>
                   <td className="px-6">
                    <div className="flex items-center">
                       {getStatusBadge(items?.orderStatus)}
                    </div>
                  </td>
                  <td className="px-6 w-20">
                    <div className="flex h-full items-center-safe gap-2">
                         <a
                       href={`/admin/view?id=${items.id}`}
                        type="button"
                        data-modal-target="editUserModal"
                        data-modal-show="editUserModal"
                        className="bg-indigo-600 text-white py-1 px-3 rounded dark:text-blue-500 hover:underline"
                      >
                        View
                      </a>
                      <a
                       href={`/admin/addproduct?id=${items.id}`}
                        type="button"
                        data-modal-target="editUserModal"
                        data-modal-show="editUserModal"
                        className="bg-green-600 text-white py-1 px-3 rounded dark:text-blue-500 hover:underline"
                      >
                        Edit{" "}
                      </a>
                     
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table> */}
      </div>
    </>
  );
};

export default SingleOrder;
