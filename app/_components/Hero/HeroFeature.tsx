import React from "react";
import Image from "next/image";

const featureData = [
  {
    img: "/images/icons/icon-01.svg",
    title: "Free Shipping",
    description: "For all orders $200",
  },
  {
    img: "/images/icons/icon-02.svg",
    title: "1 & 1 Returns",
    description: "Cancellation after 1 day",
  },
  {
    img: "/images/icons/icon-03.svg",
    title: "100% Secure Payments",
    description: "Gurantee secure payments",
  },
  {
    img: "/images/icons/icon-04.svg",
    title: "24/7 Dedicated Support",
    description: "Anywhere & anytime",
  },
];

const HeroFeature = () => {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto">
        <div className="grid  grid-cols-2 gap-7.5 xl:grid-cols-4 xl:gap-12.5 w-full ">
          {featureData.map((item, key) => (
            <div
              className="
    border p-2 xl:px-2 sm:py-2 md:py-2 xl:py-2
    flex flex-col items-center text-center
    sm:flex-row sm:items-center sm:text-left
    gap-2 xl:gap-4
  "
              key={key}
            >
              <Image src={item.img} alt={item.title} width={40} height={41} />
              <div>
                <h3 className="font-medium text-sm text-dark xl:text-lg">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroFeature;
