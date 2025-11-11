'use client';
import React from "react";
import Image from "next/image";

//import { ProductsDummy } from "../dummydata/DummyData";
// import ProductItem from "@/app/components/Common/ProductItem";
// import shopData from "@/app/components/Shop/shopData";
// import { ProductsDummy } from "@/app/components/Shop/ProductsDummy";

import { Product } from "../Product/Product";

export interface ProductImage {
  id: number;
  thumbnails: string[];
  previews: string[];
  productId: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountedPrice?: string | null;
  imgs: ProductImage;
  tagImage: any[];
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parentId: number | null;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  products: Product[];
}

interface ProductItemBoxProps {
  catList: Product[];
}

const ProductItemBox: React.FC<ProductItemBoxProps> = ({ catList }) => {
  

  return (
    <section className="overflow-hidden py-5">
      <div className="container mx-auto">
        {/* <!-- section title --> */}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {catList?.products.map((product) => (
        <div
          key={product.id}
          className="border rounded-xl p-4 shadow hover:shadow-lg transition-all duration-200"
        >
          <div className="relative w-full h-60">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL || ""}${product.imgs.thumbnails[0] || null}`}
              alt={product.title}
              fill
              className="object-cover rounded-md"
            />
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-600 line-clamp-2">
              {product.description}
            </p>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-primary font-semibold">
                ${product.price}
              </span>
              {product.discountedPrice && (
                <span className="text-sm text-gray-500">
                  {product.discountedPrice}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
      </div>
    </section>
  );
};

export default ProductItemBox;
