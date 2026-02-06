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

import axios from "axios";
import { Product } from "@/types/ProductTypes";
import TruckAndStickerProduct from "@/components/truckAndStickerProduct/TruckAndStickerProduct";


const Data = [
  {
    id:1,
    title:"Truck Sticker",
    offer:"Up to 40% Off",
    image:"Trucktrailerstickers-12-e1698868038570-400x400-1.webp",
    path:"comming-soon"
  },
   {
    id:2,
    title:"Car Wrap and Car Stickers",
    offer:"Up to 40% Off",
    image:"Car-wrap-by-Truck-Trailer-Stickers-.webp",
    path:"comming-soon"
  },
   {
    id:3,
    title:"Trailer Logo Sticker",
    offer:"Up to 40% Off",
    image:"trailer-banner-e1698870762516.jpg",
    path:"comming-soon"
  },
   {
    id:4,
    title:"Truck Logo Sticker",
    offer:"Up to 40% Off",
    image:"trucktrailersticker-logo-size-400x400-1.webp",
    path:"comming-soon"
  },
   {
    id:5,
    title:"USDOT Number with",
    offer:"Up to 40% Off",
    image:"dot-400x400-1.webp",
    path:"comming-soon"
  },
   {
    id:6,
    title:"Design Complete Stickers",
    offer:"Up to 40% Off",
    image:"IMG_0743-400x400-1.webp",
    path:"comming-soon"
   }
]


const TruckAndStickerHome = () => {
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



  return (
    <>
      <section className="overflow-hidden py-10">
        <div className="container mx-auto px-4">
          {/* <!-- section title --> */}
          <div className="mb-7  text-center">
            <div>
              <h2 className="font-bold text-4xl  text-dark relative pb-10">
               Truck Trailer Sticker
                <br />{" "}
                <span className="text-base">
                 Truck trailer stickers are a great way to showcase personal style or promote business
                </span>
                <div className="absolute w-20 h-2 bg-orange-400 left-0 right-0 mx-auto bottom-2 " />
              </h2>
            </div>
          </div>
          <div className="newarrival">
            <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4">
              {Data.map((item, key) => (
                <div key={key}>
                  {" "}
                  <TruckAndStickerProduct product={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TruckAndStickerHome;
