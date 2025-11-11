import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe"
const stripe = new Stripe(process.env.SECRET_KEY || "sk_test_51PeKFs2NCE5zPV5uSmtA6JMbWNvcoVHgutIvhxJoetFdS56dtSboEVCHYmY8f2XKQaemr59YgWGS3V6HaO0ZaYLA00sP8lomQG")



 interface BodyData{
    name:string;
    price:number;
 }

export const POST = async (request:NextRequest) => {
    try{
       const data:BodyData = await request.json()


       
       const customer = await stripe.customers.create({
            name:"dileep",
            address:{
                line1:"100",
                postal_code:"123456",
                city:"san fransco",
                state:"CA",
                country:"US"
            },
            email:"dileepskb350@gmil.com",
        })
        
        const checkOutSession = await stripe.checkout.sessions.create(
            {
                payment_method_types:['card'],
                customer:customer.id,
                mode:'payment',
                success_url:'http://localhost:3000/success?token='+ customer.id,
                cancel_url:'http://localhost:3000/cancel?token='+ customer.id,
                line_items:[
                    {
                       quantity:1,
                       price_data:{
                          product_data:{
                            name:data.name,
                          },
                          currency:'usd',
                          unit_amount:data.price*100
                       }
                    }
                ]
            }
        )

        console.log(checkOutSession)

       return NextResponse.json({checkOutSession, url:checkOutSession.url}, {status:200})
    }
    catch(error:any){
      return NextResponse.json({error:error.message}, {status:500})
    }
}