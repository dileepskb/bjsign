"use client"
import { useCart } from "@/context/CartContext";
import Image from "next/image"
import { useState } from "react";
import axios from "axios"
// import { useSession } from '@/context/SessionContext';

export default function CheckoutSideBar() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false)
    
    const Checkout = async (itmeData:any) => {
        //  const { setSessionId, sessionId } = useSession();

           setLoading(true)
          try{
              const response =  await axios.post('/api/payment', itmeData)
              window.location.href = response?.data?.url
          }
          catch(err){
              setLoading(false)
             console.error('Error fetching data:', err);
          }
      }
  return (
    <div className="bg-gray-100 md:h-screen md:sticky md:top-[55px] md:min-w-[370px]">
      <div className="relative h-full">
        <div className="px-6 py-8 md:overflow-auto md:h-screen">
          <div className="space-y-4">
             {cart.map((product) => 
                          {
                          
                           return(
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 flex p-3 shrink-0 bg-white rounded-md">
                <Image
                  src={product?.img?.thumbnails[0]}
                  alt=""
                  className="w-full object-contain"
                  width={100}
                  height={100}
                />
              </div>
              <div className="w-full">
                <h3 className="text-sm text-slate-900 font-semibold">
                  {product.name}
                </h3>
                <ul className="text-xs text-slate-900 space-y-2 mt-3">
                  <li className="flex flex-wrap gap-4">
                    Quantity <span className="ml-auto">{product.quantity}</span>
                  </li>
                  <li className="flex flex-wrap gap-4">
                    Total Price{" "}
                    <span className="ml-auto font-semibold">${product.price}</span>
                  </li>
                </ul>
              </div>
            </div>
                           
                           
        )})}
            
          </div>
          {/* <hr className="border-gray-300 my-8" /> */}
          <div>
            <ul className="text-slate-500 font-medium space-y-4">
              {/* <li className="flex flex-wrap gap-4 text-sm">
                Subtotal{" "}
                <span className="ml-auto font-semibold text-slate-900">
                  $102.00
                </span>
              </li> */}
              {/* <li className="flex flex-wrap gap-4 text-sm">
                Shipping{" "}
                <span className="ml-auto font-semibold text-slate-900">
                  $6.00
                </span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm">
                Tax{" "}
                <span className="ml-auto font-semibold text-slate-900">
                  $5.00
                </span>
              </li> */}
              <hr className="border-slate-300" />
              <li className="flex flex-wrap gap-4 text-[15px] font-semibold text-slate-900">
                Total <span className="ml-auto">${cart.reduce((sum, item) => sum + item.price, 0)}</span>
              </li>
            </ul>

            <div className="mt-8">
              <button
                type="button"
                className="rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                onClick={() => Checkout(cart)}
                disabled={loading}
              >
                 {loading ? "Buying..." : "Buy Now"} 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
