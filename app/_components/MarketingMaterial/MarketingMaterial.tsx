"use client";
import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";
//import { ProductsDummy } from "../dummydata/DummyData";
// import ProductItem from "@/app/components/Common/ProductItem";
// import shopData from "@/app/components/Shop/shopData";
// import { ProductsDummy } from "@/app/components/Shop/ProductsDummy";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import axios from "axios";
import { Product } from "@/types/ProductTypes";
import MarketingSingleProduct from "@/components/SingleProduct/MarketingSingleProduct";

const MarketingMaterial = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [, setLoading] = useState(true);
  // const [reload, setReload] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await axios.get("/api/protected/getproduct");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  console.log(products);

  return (
    <>
      <section className="overflow-hidden py-10">
        <div className="container mx-auto px-4">
          {/* <!-- section title --> */}
          <div className="mb-7  text-center">
            <div>
              <h2 className="font-bold text-4xl  text-dark relative pb-10">
                Marketing Materials for Businesses
                <br />{" "}
                <span className="text-base">
                  Large and small businesses benefit from professional,
                  high-quality personalised printing.
                </span>
                <div className="absolute w-20 h-2 bg-orange-400 left-0 right-0 mx-auto bottom-2 " />
              </h2>
            </div>
          </div>
          <div className="newarrival">
            <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4">
              {products.map((item, key) => (
                <div key={key}>
                  {" "}
                  <MarketingSingleProduct product={item} />{" "}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MarketingMaterial;
