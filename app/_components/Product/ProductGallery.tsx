// components/ProductGallery.tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from "swiper";
import 'swiper/css';
import 'swiper/css/thumbs';
import { useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import { Product } from './Product';
import Image from 'next/image';

interface ProductClientProps {
  product: Product | null;
}

export default function ProductGallery({ product }:ProductClientProps) {
  const [, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  
  const imageSrc =
    product?.imgs?.thumbnails?.[activeIndex] || "/placeholder.jpg"; // fallback

  return (
    <div>
    {/*  Main image with zoom */}
       <div className="main-image">
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: imageSrc,
              isFluidWidth: true,
              src: imageSrc, // ✅ Always a string now
            },
            largeImage: {
              src: imageSrc, // ✅ Always a string now
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
        {product?.imgs?.thumbnails.map((img:string, idx:number) => (
          <SwiperSlide key={idx} onClick={() => setActiveIndex(idx)}>
            <Image src={img} alt={img} className={`border ${activeIndex === idx ? 'active' : ''}`}/>
          </SwiperSlide>
        ))}
      </Swiper>
    
      </div>
    </div>
  );
}
