import { getUserFromToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe"
const stripe = new Stripe(process.env.SECRET_KEY || "sk_test_51PeKFs2NCE5zPV5uSmtA6JMbWNvcoVHgutIvhxJoetFdS56dtSboEVCHYmY8f2XKQaemr59YgWGS3V6HaO0ZaYLA00sP8lomQG")




 interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

  interface UserData{
    id:string;
    first_name:string;
    last_name:string;
    email:string;
 }

export const POST = async (request:NextRequest) => {
    try{
        const user = (await getUserFromToken() as UserData);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }


        const getAddress = await prisma?.userAddress?.findFirst({
            where:{
                default:true,
                userId:user.id
            } 
        })


       const data:CartItem[] = await request.json()

       if (!Array.isArray(data) || data.length === 0) {
            return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
        
        }

        const customer = await stripe.customers.create({
            name:`${user?.first_name + " " + user?.last_name}`,
            address:{
                 line1: getAddress?.street || "",
                 postal_code: getAddress?.postalCode || "",
                 city: getAddress?.city || "",
                 state: getAddress?.state || "",
                 country: "US",
            },
            email:user?.email,
        })


        const line_items = data.map((item) => ({
            quantity: item.quantity,
            price_data: {
                currency: "usd",
                unit_amount: Math.round(item.price * 100), // Convert to cents
                product_data: {
                name: item.name,
                },
            },
            }));


        const totalAmount = data.reduce((acc, item) => {
            return acc + item.price * (item.quantity || 1);
            }, 0);
       
       
        
        const checkOutSession = await stripe.checkout.sessions.create(
            {
                payment_method_types:['card'],
                customer:customer.id,
                mode:'payment',
                success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
                cancel_url:'http://localhost:3000/cancel?token='+ customer.id,
                line_items,
            }
        )


        console.log(checkOutSession)


       return NextResponse.json({checkOutSession, url:checkOutSession.url}, {status:200})
    }
    catch(error:unknown){
      return NextResponse.json({error:error}, {status:500})
    }
}