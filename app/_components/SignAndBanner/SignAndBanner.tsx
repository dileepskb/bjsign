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
    title:"A-Frame Signs",
    offer:"Up to 40% Off",
    image:"612GNvNdI-L._AC_SL1200_.jpg",
    path:"comming-soon"
  },
   {
    id:2,
    title:"Yard Signs",
    offer:"Up to 40% Off",
    image:"88204_3780243_571665_image.jpg",
    path:"comming-soon"
  },
   {
    id:3,
    title:"Banners",
    offer:"Up to 40% Off",
    image:"035b9ee9-7198-4e04-90f7-64a8f9307913.jpeg",
    path:"comming-soon"
  },
   {
    id:4,
    title:"Corrugated Boards",
    offer:"Up to 40% Off",
    image:"i-59.png",
    path:"comming-soon"
  },
   {
    id:5,
    title:"Car Magnets",
    offer:"Up to 40% Off",
    image:"86536968_VqwZ83_R6S0T-MgS19KwM0E6JEdL6W-rj958RvRMq_Y.jpg",
    path:"comming-soon"
  },
   {
    id:6,
    title:"Foam Boards",
    offer:"Up to 40% Off",
    image:"i-58.png",
    path:"comming-soon"
  },
   {
    id:7,
    title:"Aluminum Boards",
    offer:"Up to 40% Off",
    image:"photo.jpg",
    path:"comming-soon"
  },
   {
    id:8,
    title:"Floor Decals",
    offer:"Up to 40% Off",
    image:"maxresdefault-4.jpg",
    path:"comming-soon"
  },
   {
    id:9,
    title:"Feather Flags",
    offer:"Up to 40% Off",
    image:"three-feather-flag-small-banner-stand-display-mockup_509134-113.jpg",
    path:"comming-soon"
  },
   {
    id:10,
    title:"PVC Boards",
    offer:"Up to 40% Off",
    image:"deaa7856349149.5cb1e32ba6fd7.jpg",
    path:"comming-soon"
  },
   {
    id:11,
    title:"Bulk Posters",
    offer:"Up to 40% Off",
    image:"i-42.png",
    path:"comming-soon"
  },
   {
    id:12,
    title:"Pole Banner",
    offer:"Up to 40% Off",
    image:"preview10_23.jpg",
    path:"comming-soon"
  },
  {
    id:13,
    title:"Large Format Posters",
    offer:"Up to 40% Off",
    image:"6430_detail-1.jpg",
    path:"comming-soon"
  },
  {
    id:14,
    title:"Retractable Banners",
    offer:"Up to 40% Off",
    image:"Banner_Up_Mock-1-1.jpg",
    path:"comming-soon"
  },
]


const SignAndBanner = () => {
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
                Sign & Banner
                <br />{" "}
                <span className="text-base">
                  Products that will stand out at any promotion or event.
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
                  <TruckAndStickerProduct product={item} />{" "}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignAndBanner;
