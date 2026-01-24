/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import prisma from "@/lib/prisma";

/* -------------------------- POST -------------------------- */

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { product_id, tag, imgs = { thumbnails: [], previews: [] } } = body;

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

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
      .map((img: any, i: number) =>
        img?.value ? saveBase64Image(img.value, `thumb-${i}`) : null
      )
      .filter(Boolean) as string[];

    const previews = (imgs.previews || [])
      .map((img: any, i: number) =>
        img?.value ? saveBase64Image(img.value, `preview-${i}`) : null
      )
      .filter(Boolean) as string[];

    const tagImage = await prisma.tagImage.create({
      data: {
        productId: Number(product_id),
        tag,
        thumbnails,
        previews,
      },
    });

    return NextResponse.json(
      { message: "✅ Tag image added successfully", tagImage },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ POST tagimage error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

/* -------------------------- GET -------------------------- */

export async function GET(req: Request, context: any) {
  try {
    const { productId, tag } = context.params || {};

    const pid = Number(productId);

    if (!pid || !tag) {
      return NextResponse.json(
        { message: "Invalid productId or tag" },
        { status: 400 }
      );
    }

    const tagImages = await prisma.tagImage.findMany({
      where: {
        productId: pid,
        tag,
      },
      select: {
        id: true,
        tag: true,
        thumbnails: true,
        previews: true,
      },
    });

    if (tagImages.length === 0) {
      return NextResponse.json(
        { message: "No images found for this tag" },
        { status: 404 }
      );
    }

    return NextResponse.json(tagImages, { status: 200 });
  } catch (error: any) {
    console.error("❌ GET tagimage error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch tag images" },
      { status: 500 }
    );
  }
}
