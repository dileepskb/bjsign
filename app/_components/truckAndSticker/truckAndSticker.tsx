'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
//import { ProductsDummy } from "../dummydata/DummyData";
// import ProductItem from "@/app/components/Common/ProductItem";
// import shopData from "@/app/components/Shop/shopData";
// import { ProductsDummy } from "@/app/components/Shop/ProductsDummy";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
import axios from "axios";
import { Product } from "@/types/ProductTypes";
import SingleProduct from "@/components/SingleProduct/SingleProduct";


const TruckAndSticker = () => {
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

  console.log(products)



  return (
    <>
    <section className="overflow-hidden py-10">
      <div className="container mx-auto px-4">
        {/* <!-- section title --> */}
        <div className="mb-7  text-center">
          <div>
    
            <h2 className="font-bold text-4xl  text-dark relative pb-10">
              Truck Trailer Stickers
              <div className="absolute w-20 h-2 bg-orange-400 left-0 right-0 mx-auto bottom-2 " />
            </h2>
          </div>

          {/* <Link
            href="/shop-with-sidebar"
            className="inline-flex font-medium text-custom-sm py-2.5 px-7 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark hover:text-orange-400 hover:border-orange-400"
          >
            View All
          </Link> */}
        </div>

        <div className="newarrival">
           <Swiper
      modules={[Navigation, Autoplay]}
  navigation={false}
  autoplay={
    {delay:5000}
  }
  loop={true}
  spaceBetween={20}
  slidesPerView={4}
  className="h-100 w-full"
            breakpoints={{
              // when window width is >= 640px
              0: {
                slidesPerView: 2,
                spaceBetween: 5,
              },
              1000: {
                slidesPerView: 4,
                // spaceBetween: 4,
              }
            }}
    >
          {/* <!-- New Arrivals item --> */}
          {products.map((item, key) => (
           
                     <SwiperSlide  key={key}>  <SingleProduct product={item} /> </SwiperSlide>
          ))}
          </Swiper>
        </div>
      </div>
    </section>
</>

  );
};

export default TruckAndSticker;
