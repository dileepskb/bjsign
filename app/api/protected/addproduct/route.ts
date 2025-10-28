/* eslint-disable  @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

import fs from "fs";
import path from "path";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const {
    title,
    description,
    reviews = 0,
    price,
    discountedPrice,
    additionalDescriptions = [],
    imgs = { thumbnails: [], previews: [] },
    productOptions = [],
  } = body;

  try {
    // folder to save images
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    // helper to save base64 image
    const saveBase64Image = (base64Str: string, prefix: string) => {
      const matches = base64Str.match(/^data:(image\/\w+);base64,(.+)$/);
      if (!matches) return null;
      const ext = matches[1].split("/")[1];
      const data = matches[2];
      const fileName = `${prefix}-${Date.now()}.${ext}`;
      const filePath = path.join(uploadDir, fileName);
      const bytes = Uint8Array.from(atob(data), c => c.charCodeAt(0));
      fs.writeFileSync(filePath, bytes);
      return `/uploads/${fileName}`; // relative URL to serve
    };

    const thumbnails = imgs.thumbnails.map((img: any, i: number) =>
      saveBase64Image(img.value, `thumb${i}`)
    );
    const previews = imgs.previews.map((img: any, i: number) =>
      saveBase64Image(img.value, `preview${i}`)
    );

    const product = await prisma.product.create({
      data: {
        title,
        description,
        reviews: Number(reviews),
        price: Number(price),
        discountedPrice,
        imgs: {
          create: {
            thumbnails: thumbnails.filter(Boolean), // only valid strings
            previews: previews.filter(Boolean),
          },
        },
        additionalDescriptions: {
          create: additionalDescriptions.map((desc: any) => ({
            name: desc.name ?? "",
            value: desc.value ?? "",
          })),
        },
        productOptions: {
          create: productOptions.map((opt: any) => ({
            name: opt.name ?? "",
            type: opt.type ?? "select",
            optionValues: {
              create: (opt.optionValues ?? []).map((val: any) => ({
                label: val.label ?? "",
                value: Number(val.value) || 0,
                discount: Number(val.discount) || 0,
              })),
            },
          })),
        },
      },
    });

    return NextResponse.json({ message: "Added Successfully", product });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
