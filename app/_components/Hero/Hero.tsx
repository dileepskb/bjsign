import Image from "next/image"
import Link from "next/link";
import HeroFeature from "./HeroFeature";

const Hero = () => {
  return (
    <>
    <div className="relative w-full h-[500px]">
      <Image
        src="/banner.jpeg"
        alt="headphone"
         fill
        className="object-cover w-[100%]"
        priority
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-3">
        <div className="mx-auto flex items-center px-4 xl:container">
          <div>
            <h1 className="text-white text-[30px] italic font-bold">
              Custom prints that speak professionalism.
            </h1>
            <p className="text-orange-400 text-[22px]">
              Your brand. Your style. Your print.
            </p>
          </div>
          <div className="ml-auto">
            <Link
              href="/"
              className="bg-orange-400 text-white px-4 py-3 inline-block rounded mt-3"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
     <HeroFeature />
     </>
  );
};

export default Hero
