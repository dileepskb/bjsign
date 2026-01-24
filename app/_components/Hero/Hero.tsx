import Link from "next/link";
import HeroFeature from "./HeroFeature";

const Hero = () => {
  return (
    <>
    <div className="relative w-full min-h-screen" style={{
      background:"url(/banner3.webp)",
      backgroundSize:"cover",
      backgroundPosition:"right center"
    }}>
      {/* <Image
        src="/banner2.png"
        alt="headphone"
         fill
        className="object-cover w-[100%]"
        priority
      /> */}


<div className="absolute inset-0 flex items-center">
  <div className="mx-auto flex w-full items-center px-4 container">
    <div>
      <h1 className="text-white text-[50px]/[1.2]  font-extrabold">
        <span className="font-light">Your</span> One Stop Solution<br /> <span className="font-light">for</span> Printing Service
      </h1>
      <p className="text-white text-[18px] font-light mt-3">
       High-Quality Printing For All Your brand. Your style. Your print.
      </p>
      <div className="flex gap-2 mt-5">
<Link
        href="/"
        className="bg-white text-black px-10 py-3 inline-block rounded uppercase mt-3"
      >
        Explore
      </Link>
      <Link
        href="/"
        className="bg-orange-400 text-white px-10 py-3 inline-block rounded uppercase mt-3"
      >
        View Products
      </Link>
      </div>
      
    </div>

  
  </div>
</div>


      {/* <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-3">
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
      </div> */}
    </div>
     <HeroFeature />
     </>
  );
};

export default Hero
