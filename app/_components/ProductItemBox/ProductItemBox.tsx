'use client';
import React from "react";
import Image from "next/image";

//import { ProductsDummy } from "../dummydata/DummyData";
// import ProductItem from "@/app/components/Common/ProductItem";
// import shopData from "@/app/components/Shop/shopData";
// import { ProductsDummy } from "@/app/components/Shop/ProductsDummy";


import Link from "next/link";
import { Product } from "@/types/ProductTypes";


interface ProductItemBoxProps {
  catList:  Product[];
  cat:string
}

const ProductItemBox: React.FC<ProductItemBoxProps> = ({ catList, cat }) => {
  

  return (
    <section className="overflow-hidden py-5">
      <div className="container mx-auto">
        {/* <!-- section title --> */}
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {catList?.map((product) => (
        <div
          key={product.id}
          className="border rounded-xl p-4 shadow hover:shadow-lg transition-all duration-200"
        >
          <div className="relative w-full h-60 border">
            <Image
  src={
    product.imgs?.thumbnails?.[0]
      ? `${process.env.NEXT_PUBLIC_API_URL}${product.imgs.thumbnails[0]}`
      : "/images/placeholder.png"
  }
  alt={product.title}
  fill
  className="object-cover rounded-md"
/>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold"><Link href={`${cat}/${product.title}`}>{product.title}</Link></h2>
            {/* <p className="text-sm text-gray-600 line-clamp-2" dangerouslySetInnerHTML={{ __html: product.description }} /> */}
             
       

            <div className="mt-2 flex items-center justify-between">
              <span className="text-primary font-bold text-xl">
               ${product.price}/<span className="text-xs text-gray-800">Unit</span>
              </span>
              {product.discountedPrice && (
                <span className="text-sm text-green-600 font-bold">
                  {product.discountedPrice}
                </span>
              )}
            </div>
            <Link className="block mt-3 w-full text-custom-sm py-[7px] px-5 rounded-[5px] shadow bg-orange-400 text-white ease-out duration-200 hover:bg-blue-dark text-center font-bold" href={`${cat}/${product.title}`}>Order Now</Link>
          </div>
        </div>
      ))}
    </div>
      </div>
    </section>
  );
};

export default ProductItemBox;
