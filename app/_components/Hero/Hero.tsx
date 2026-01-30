"use client"
// import Link from "next/link";
import HeroFeature from "./HeroFeature";
// import  Image  from "next/image"
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const isDesktop = useMediaQuery({ minWidth: 640 });
  return (
    <>
    <section className={`w-full 
    ${isDesktop ? "min-h-[600px]" : "min-h-[350]"}
    
    `}
    style={{
      background:"url(/bannerbg.jpg)",
      backgroundSize:"cover",
      backgroundPosition:"right center"
    }}
    >
  <div className={`container mx-auto px-4 ${isDesktop ? "min-h-[600px]" : "min-h-[350]"}`}>
    <div className={`flex flex-col md:flex-row 
${isDesktop ? "min-h-[600px]" : "min-h-[350]"}
    `}>
           {isDesktop && (
      <div className="flex-1 flex items-center justify-center text-center md:text-left ">
        <div className="max-w-lg bg-black/70 p-5 py-10 rounded">
         <h1 className="text-white text-[44px]/[1.2] font-extrabold">
        <span className="font-light">Your</span> One Stop Solution <br />
        <span className="font-light">for</span> Printing Service
      </h1>

      <p className="text-white text-[16px] font-light mt-3">
        High-Quality Printing For All Your brand. Your style. Your print.
      </p>
        </div>
      </div>
           )}

      <div className="flex-1 flex items-end justify-center overflow-hidden">
        <img 
          src="/bannerimage.png" 
          alt="Descriptive Alt Text" 
          className="w-full max-w-md object-contain"
        />
      </div>

    </div>
  </div>
</section>

{!isDesktop && (
  
        <div className="max-w-lg bg-orange-400 p-5 py-5 rounded">
         <h1 className="text-white text-[30px]/[1.2] font-extrabold" style={{
          textShadow:"0 1px 2px rgba(0,0,0,0.2)"
         }}>
        <span className="font-light">Your</span> One Stop Solution <br />
        <span className="font-light">for</span> Printing Service
      </h1>

      <p className="text-white text-[18px] font-light mt-3"
      style={{
          textShadow:"0 1px 2px rgba(0,0,0,0.2)"
         }}>
        High-Quality Printing For All Your brand. Your style. Your print.
      </p>
        </div>

           )}

    {/* <div className="relative h-[600px] overflow-hidden"
     style={{
      background:"url(/bannerbg.jpg)",
      backgroundSize:"cover",
      backgroundPosition:"right center"
    }}>
  

  <div className="container mx-auto h-full px-4 flex items-center">
    <div className="max-w-xl z-10">
      <h1 className="text-white text-[50px]/[1.2] font-extrabold">
        <span className="font-light">Your</span> One Stop Solution <br />
        <span className="font-light">for</span> Printing Service
      </h1>

      <p className="text-white text-[18px] font-light mt-3">
        High-Quality Printing For All Your brand. Your style. Your print.
      </p>

      <div className="flex gap-2 mt-5">
        <Link
          href="/"
          className="bg-white text-black px-10 py-3 rounded uppercase"
        >
          Explore
        </Link>

        <Link
          href="/"
          className="bg-orange-400 text-white px-10 py-3 rounded uppercase"
        >
          View Products
        </Link>
      </div>
    </div>
  </div>


  <div className="absolute bottom-0 right-0 w-[40%] h-full pointer-events-none">
    <Image
      src="/bannerimage.png"
      alt="Banner"
      fill
      className="object-contain object-bottom-right"
      priority
    />
  </div>

</div> */}

    {/* <div
     className="relative w-full" 
     style={{
      background:"url(/banner3.webp)",
      backgroundSize:"cover",
      backgroundPosition:"right center"
    }}
    >
      <Image
        src="/banner2.png"
        alt="headphone"
         fill
        className="object-cover w-[100%]"
        priority
      />

<div style={{
  height:"550px",
  backgroundImage:"url(/bannerbg.jpg)",
  backgroundPosition:"center bottom",
  backgroundSize:"100%"
}}>

</div> */}
{/* 
<div className="absolute inset-0 flex items-center">
  <div className="mx-auto flex w-full items-center px-4 container">
    <div className="w-[60%]">
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

   <div className="w-[40%]"><Image src={"/bannerimage.png"} 
          className="" alt="" width={'1004'} height={'446'} /></div>
  </div>
</div> */}


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
    {/* </div> */}
     <HeroFeature />
     </>
  );
};

export default Hero
