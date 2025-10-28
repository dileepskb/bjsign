/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

import fs from "fs";
import path from "path";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { product_id, tag, imgs = { thumbnails: [], previews: [] } } = body;

  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const saveBase64Image = (base64Str: string, prefix: string) => {
      const matches = base64Str.match(/^data:(image\/\w+);base64,(.+)$/);
      if (!matches) return null;
      const ext = matches[1].split("/")[1];
      const data = matches[2];
      const fileName = `${prefix}-${Date.now()}.${ext}`;
      const filePath = path.join(uploadDir, fileName);
      const bytes = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
      fs.writeFileSync(filePath, bytes);
      return `/uploads/${fileName}`;
    };

    const thumbnails = (imgs.thumbnails || [])
      .map((img: any, i: number) => (img?.value ? saveBase64Image(img.value, `thumb${i}`) : null))
      .filter(Boolean) as string[];

    const previews = (imgs.previews || [])
      .map((img: any, i: number) => (img?.value ? saveBase64Image(img.value, `preview${i}`) : null))
      .filter(Boolean) as string[];

    const product = await prisma.tagImage.create({
      data: {
        productId: Number(product_id),
        tag,
        thumbnails,
        previews,
      },
    });

    return NextResponse.json({ message: "✅ Tag image added successfully", product });
  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}



export async function GET() {
  try {
 
    const tagImage = await prisma.tagImage.findMany({});

    return NextResponse.json(tagImage, { status: 200 });
  } catch (error: any) {
    console.error("❌ Error fetching products:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}
