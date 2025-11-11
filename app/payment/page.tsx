"use client"
import { useState } from "react";
import { Product } from "./product"
import axios from "axios"
export default function PaymentProducts() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap">
            {Product.map((items, i) => (
            <ProductItem key={i} data={items} />
            ))}
        </div>
      </div>
    </section>
  );
}


const ProductItem = ({data}:any) => {

    const [loading, setLoading] = useState(false)
    
    const Checkout = async (itmeData:any) => {
         setLoading(true)
        try{
            setLoading(false)
            const response =  await axios.post('/api/payment', {
                    name:itmeData.title,
                    price:itmeData.price
                })

                 console.log(response)
            window.location.href = response?.data?.url   
           

        }
        catch(err){
            setLoading(false)
           console.error('Error fetching data:', err);
        }
     

    }



    return(
         <div className="lg:w-1/4 md:w-1/2 p-4 w-full border">
            <a className="block relative h-48 rounded overflow-hidden">
              <img
                alt="ecommerce"
                className="object-cover object-center w-full h-full block"
                src={data.image}
              />
            </a>
            <div className="mt-4">
              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                CATEGORY
              </h3>
              <h2 className="text-gray-900 title-font text-lg font-medium">
                {data.title}
              </h2>
              <p className="mt-1">{data.price}</p>
              <button className="bg-orange-500 text-white rounded py-2 px-3 mt-2"
              onClick={() => Checkout(data)}
              disabled={loading}
              >
               {loading ? "Buying" : "Buy Now"} 
                </button>
            </div>
          </div>
    )
}