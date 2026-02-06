"use client";
// import { Product } from "@/types/ProductTypes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


interface Product{
    id: number;
    title: string;
    offer: string;
    image: string;
    path: string;
}

interface SingleProductProps {
  product: Product;
}

export default function TruckAndStickerProduct({
  product,
}: SingleProductProps) {
  const [open, setOpen] = useState(false);
  

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-1 xl:p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="h-[100px] xl:h-[200px] w-full">
        <Link href={`/${product?.path}`}>
          <Image
            src={`/website/${product?.image}`}
            alt=""
            width={250}
            height={200}
            className="mx-auto h-full   dark:hidden"
          />
        </Link>
      </div>
      <div className="pt-2 md:pt-2">
        <Link
          href={`/${product?.path}`}
          className="test-xs mt-3 text-center block xl:text-1xl font-semibold leading-tight text-gray-600 hover:underline dark:text-white"
        >
          {product?.title}
        </Link>
        <div className="mb-4  items-center text-center xl:gap-4">
          <span className="me-2 rounded  px-2.5 py-0.5 text-[10px] md:text-sm font-bold text-green-800 dark:bg-primary-900 dark:text-primary-300">
            {" "}
            Up to 40% off{" "}
          </span>
        </div>
      </div>
    </div>
  );
}
