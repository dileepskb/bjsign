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
    <div className="bg-gray-300 py-3">
    <div className="container mx-auto">
      <div className="flex flex-wrap items-center gap-7.5 xl:gap-12.5 w-full">
        {featureData.map((item, key) => (
          <div className="flex flex-1 items-center gap-4" key={key}>
            <Image src={item.img} alt="icons" width={40} height={41} />

            <div>
              <h3 className="font-medium text-lg text-dark">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default HeroFeature;
