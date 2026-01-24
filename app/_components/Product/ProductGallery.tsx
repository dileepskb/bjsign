// components/ProductGallery.tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from "swiper";
import 'swiper/css';
import 'swiper/css/thumbs';
import { useEffect, useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';

import Image from 'next/image';
import { Product } from '@/types/ProductTypes';

interface ProductClientProps {
  product: Product | null;
  slug?: string;
}

export default function ProductGallery({ product, slug }:ProductClientProps) {
  const [, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [tagImages, setTagImages] = useState<string[]>([]);

  

const fetchTagImages = async (tag: string) => {
 
  const res = await fetch(`/api/protected/tagimage/${product?.id}/${tag}`);
  console.log(res)
  if (!res.ok) return [];
    console.log(res.json)
    const data = await res.json();
    // collect thumbnails or previews
  const images =
    data?.flatMap((item: any) => item.thumbnails || []);

  setTagImages(images);
};

useEffect(() => {
   if(slug){
        fetchTagImages(slug);
   }
}, []);

  const productImages = product?.imgs?.thumbnails || [];

const allImages =
  tagImages.length > 0
    ? [...tagImages, ...productImages]
    : productImages;




const activeImage =
  allImages[activeIndex] || "/placeholder.jpg";
  return (
    <div>
    {/*  Main image with zoom */}
       <div className="main-image">
        <ReactImageMagnify
  {...{
    smallImage: {
      alt: "Product image",
      isFluidWidth: true,
      src: activeImage, // ✅ string
    },
    largeImage: {
      src: activeImage, // ✅ string
      width: 1200,
      height: 1200,
    },
    lensStyle: { backgroundColor: "rgba(0,0,0,0.2)" },
  }}
/>
      </div>

     <div className='mt-3'>
     
      <Swiper
        onSwiper={setThumbsSwiper} // ✅ Type-safe now
        slidesPerView={4}
        spaceBetween={10}
        watchSlidesProgress={true}
        className="thumbs-swiper"
      >
        {allImages.map((img:string, idx:number) => (
          <SwiperSlide key={idx} onClick={() => setActiveIndex(idx)}>
            <Image src={img} alt={img} width={140} height={120} className={`border ${activeIndex === idx ? 'active' : ''}`}/>
          </SwiperSlide>
        ))}
      </Swiper>
    
      </div>
    </div>
  );
}
