'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image"
import { CaseUpper } from "lucide-react";

const Orders = () => {

    const [products, setProducts] = useState<any[]>([]);
  const [, setLoading] = useState(true);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await axios.get("/api/protected/allorders");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [reload]);



  const handleDelete = async (id: string) => {
  const confirmed = confirm(`Are you sure you want to delete this product? id ${id}`);
  if (!confirmed) return;



  try {
    const res = await fetch(`/api/protected/product/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (res.ok) {
      setReload(res.ok)
      alert("Product deleted successfully!");
      // Optionally refetch product list or remove from state
    } else {
      alert(data.message || "Failed to delete product");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    alert("Something went wrong.");
  }
};





  const getStatusBadge = (status: string) => {
    switch (status) {
      
      case "Delivered":
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
      case "Pending":
        return (
          <span className="px-3 py-1 text-sm font-medium text-yellow-700 bg-yellow-100 rounded-full">
            Pending
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



    return(
        <>
          <Breadcrumb pageName="All Orders" />

      <div className="relative overflow-x-auto border border-gray-300 rounded p-3 bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 ">
          {/* <div className="flex gap-2">
            <Link
              href={"/admin/addproduct"}
              className="w-[120px] py-2 font-bold text-center text-sm text-white border border-gray-300 rounded  bg-green-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              + Add Product
            </Link>
            <select className="block w-[150px] py-2 px-2 text-sm text-gray-900 border border-gray-300 rounded  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option>Action</option>
              <option>Activate Product</option>
              <option>Delete Product</option>
            </select>
          </div> */}
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
              {/* <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th> */}
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
            //   const { imgs } = items;
            //   const { previews } = imgs;
              return (
                <tr
                  key={index}
                  className="bg-white  border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  {/* <td className="w-4 px-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td> */}
                  <td
                    scope="row"
                    className="flex py-2 items-center  text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {/* <Image
                      className="w-20 h-16 shadow border"
                      src={`${previews[0] || '/images/empty.jpg'}`}
                      alt="Jese image"
                      width={60}
                      height={60}
                    /> */}
                    <div className="ps-3">
                      <div className="text-base font-semibold">
                       <Link  href={`/admin/orders/${items.id}`} className="text-sky-600 hover:underline"> {items?.orderNumber}</Link>
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
                          <Link  
                       href={`/admin/orders/${items.id}`}
                        type="button"
                        data-modal-target="editUserModal"
                        data-modal-show="editUserModal"
                        className="bg-indigo-600 text-white py-1 px-3 rounded dark:text-blue-500 hover:underline"
                      >
                        View
                      </Link>
                      <a
                       href={`/admin/addproduct?id=${items.id}`}
                        type="button"
                        data-modal-target="editUserModal"
                        data-modal-show="editUserModal"
                        className="bg-green-600 text-white py-1 px-3 rounded dark:text-blue-500 hover:underline"
                      >
                        Edit{" "}
                      </a>
                      {/* <button
                        type="button"
                        data-modal-target="editUserModal"
                        data-modal-show="editUserModal"
                        className="bg-red-600 text-white py-1 px-3 rounded font-medium text-red-600 dark:text-blue-500 hover:underline"
                        onClick={() => handleDelete(items.id)}
                      >
                        Delete
                      </button> */}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
        </>
    )
}

export default Orders