"use client";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import axios from "axios";
import ProductGallery from "./ProductGallery";
import Tabs from "../Tab/Index";
import PriceCalculator from "../PriceCalculator/PriceCalulator";
import { Star } from "lucide-react";
import { StarEmpty } from "../Star/Star";
import Image from "next/image";
import Faq from "../Faq/Faq";
import { useState } from "react";
import ReviewForm from "../addReview/AddReview";


export interface ProductImage {
  id: number;
  thumbnails: string[];
  previews: string[];
  productId: number;
}

export interface TagImage {
  id?: number;
  url?: string;
  altText?: string;
  productId?: number;
}

export interface AdditionalDescription {
  id: number;
  name: string;
  value: string;
  productId: number;
}

export interface OptionValue {
  id: number;
  value: string;
  label?: string;
  productOptionId: number;
}

export interface ProductOption {
  id: number;
  name: string;
  type: string; // e.g., 'select', 'text', etc.
  productId: number;
  optionValues: OptionValue[];
}

export interface Category{
 name:string;
 slug:string 
}

export interface FAQ{
  question:string;
  answer:string;
  id:number
}
export interface Product {
  id: number;
  title: string;
  description: string;
  reviews: number;
  price: number;
  discountedPrice?: string;
  categoryId: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  imgs: ProductImage | null;
  tagImage: TagImage[];
  additionalDescriptions: AdditionalDescription[];
  productOptions: ProductOption[];
 
  category?:Category
   faq?: FAQ[];
}



interface ProductClientProps {
  product: Product | null;
}

export default function ProductClient({product}:ProductClientProps) {
const [showModal, setShowModal] = useState(false);

  
//   const params = useParams();
//   const [id, tag] = params.id || [];
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function loadProduct() {
//       if (!id) return;

//       try {
//         const res = await axios.get(
//           `/api/protected/getproduct?id=${id}&tag=${tag || ""}`
//         );
//         setProduct(res.data);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadProduct();
//   }, [id, tag]); // ✅ refetch if id or tag changes

//   if (loading) return <p>Loading...</p>;
//   if (!product) return <p>No product found</p>;

  return (
    <div className="bg-gray-100 pt-8">
      <section>
        <div className="container mx-auto ">
          <div className="p-3 border border-gray-300 bg-white pt-5 rounded">
            <div className="lg:grid lg:grid-cols-2 gap-4">
              <div className="p-3 border border-gray-200 rounded">
                <ProductGallery product={product} />
              </div>

              <div className="mt-6 sm:mt-8 lg:mt-0">
                <h1 className="text-[2rem] font-bold text-gray-900  dark:text-white">
                  {product?.title}
                </h1>
                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                  {/* <p
              className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white"
            >
              $1,249.99
            </p> */}

                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                      (5.0)
                    </p>
                    <a
                      href="#"
                      className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                    >
                      345 Reviews
                    </a>
                  </div>
                </div>

                <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                  <a
                    href="#"
                    title=""
                    className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    role="button"
                  >
                    <svg
                      className="w-5 h-5 -ms-2 me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                      />
                    </svg>
                    Add to favorites
                  </a>

                  {/* <a
              href="#"
              title=""
              className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
              role="button"
            >
              <svg
                className="w-5 h-5 -ms-2 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                />
              </svg>

              Add to cart
            </a> */}
                </div>

                <hr className="mt-3 mb-3 border-gray-200 dark:border-gray-800" />
                <PriceCalculator product={product} />
                {/* <p className="mb-6 text-gray-500 dark:text-gray-400">
            Studio quality three mic array for crystal clear calls and voice
            recordings. Six-speaker sound system for a remarkably robust and
            high-quality audio experience. Up to 256GB of ultrafast SSD storage.
          </p>

          <p className="text-gray-500 dark:text-gray-400">
            Two Thunderbolt USB 4 ports and up to two USB 3 ports. Ultrafast
            Wi-Fi 6 and Bluetooth 5.0 wireless. Color matched Magic Mouse with
            Magic Keyboard or Magic Keyboard with Touch ID.
          </p> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container  mx-auto mt-3">
          <div className="p-3 border border-gray-300 bg-white pt-5 rounded">
            <Tabs products={product} />
          </div>
        </div>
      </section>
       <section>
        <div className="container  mx-auto mt-3">
          <div className="p-3 border border-gray-300 bg-white pt-5 rounded">
            <Faq products={product} />
          </div>
        </div>
      </section>
      <section>
        <div className="container  mx-auto mt-3">
          <div className="grid grid-cols-4 gap-4 border border-gray-300 bg-white pt-5 pb-5 rounded">
            <div className="col-span-1 p-3 border border-gray-200 ml-4">
              <h4 className="font-bold text-xl">4.5 (Overall)</h4>
              <hr className="mt-3 mb-3 border-gray-200 dark:border-gray-800" />
              <p className="flex gap-3">
                <span className="flex">5 Stars Rating - 38</span>{" "}
                <span className="flex">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </span>
              </p>
              <p className="flex gap-3">
                <span className="flex">4 Stars Rating - 30</span>{" "}
                <span className="flex">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <StarEmpty />
                </span>
              </p>
              <p className="flex gap-3">
                <span className="flex">3 Stars Rating - 25</span>{" "}
                <span className="flex">
                  <Star />
                  <Star />
                  <Star />
                     <StarEmpty />
                       <StarEmpty />
                </span>
              </p>
              <p className="flex gap-3">
                <span className="flex">2 Stars Rating - 20</span>{" "}
                <span className="flex">
                  <Star />
                  <Star />
                     <StarEmpty />
                       <StarEmpty />
                         <StarEmpty />
                </span>
              </p>
              <p className="flex gap-3">
                <span className="flex">1 Star Rating - 10</span>{" "}
                <span className="flex">
                  <Star />
                    <StarEmpty />
                      <StarEmpty />
                        <StarEmpty />
                          <StarEmpty />
                </span>
              </p>
            </div>
            <div className="col-span-3 p-3 border border-gray-200 ml-4">
              <div className="flex justify-between">
                  <h4 className="font-bold text-xl">Latest Reviews</h4>
                  <button
                  
                   onClick={() => setShowModal(true)}
                  className="bg-orange-500 text-white rounded px-3 py-1 hover:bg-orange-700">Add Review</button>
              </div>
             
              <div className="mt-3 flex items-start gap-3">
                {/* Image box (fixed size 60x60) */}
                <div className="w-[60px] h-[60px] shrink-0">
                  <Image
                    src="/images/comment1.jpg"
                    width={60}
                    height={60}
                    className="w-full h-full object-cover rounded-full"
                    alt="User avatar"
                  />
                </div>

                {/* Text box (takes remaining space) */}
                <div className="flex-1 border border-gray-200 rounded-lg p-3">
                  <h5 className="font-medium">Jacob Hammond</h5>
                  <span className="flex text-yellow-500">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </span>
                  <p className="text-gray-600 text-sm mt-1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor...
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-start gap-3">
                {/* Image box (fixed size 60x60) */}
                <div className="w-[60px] h-[60px] shrink-0">
                  <Image
                    src="/images/comment2.jpg"
                    width={60}
                    height={60}
                    className="w-full h-full object-cover rounded-full"
                    alt="User avatar"
                  />
                </div>

                {/* Text box (takes remaining space) */}
                <div className="flex-1 border border-gray-200 rounded-lg p-3">
                  <h5 className="font-medium">Jacob Hammond</h5>
                  <span className="flex text-yellow-500">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </span>
                  <p className="text-gray-600 text-sm mt-1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
                  <h3 className="font-semibold text-lg mb-2">Write a Review</h3>
         <ReviewForm productId={`${product?.id}`} />
          <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 w-full text-gray-800 rounded px-3 py-2 hover:bg-gray-400 mt-3"
              >
                Cancel
              </button>
         </div>
         </div>
      )}
    </div>
  );
}
