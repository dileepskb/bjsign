// app/api/protected/product/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";

const saveBase64Image = (base64Str: string, prefix: string) => {
  const matches = base64Str.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!matches) return null;
  const ext = matches[1].split("/")[1];
  const data = matches[2];
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  const fileName = `${prefix}-${Date.now()}.${ext}`;
  const filePath = path.join(uploadDir, fileName);
  const bytes = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
  fs.writeFileSync(filePath, bytes);
  return `/uploads/${fileName}`;
};

// ✅ GET one product
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> } // ✅ params is a Promise now
) {
  try {
    const { id } = await context.params; // ✅ await params

    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        imgs: true,
        additionalDescriptions: true,
        productOptions: {
          include: {
            optionValues: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// ✅ PUT (Update Product)
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      price,
      discountedPrice,
      categoryId,
      imgs,
      additionalDescriptions,
      productOptions,
    } = body;

    // Convert & save base64 images (if any new ones)
    let thumbnails = [];
    let previews = [];

    if (imgs) {
      thumbnails = imgs.thumbnails
        ?.map((img: any, i: number) =>
          img.value?.startsWith("data:image")
            ? saveBase64Image(img.value, `thumb${i}`)
            : img.value // already stored path
        )
        .filter(Boolean);

      previews = imgs.previews
        ?.map((img: any, i: number) =>
          img.value?.startsWith("data:image")
            ? saveBase64Image(img.value, `preview${i}`)
            : img.value
        )
        .filter(Boolean);
    }

    const updated = await prisma.product.update({
      where: { id: Number(params.id) },
      data: {
        title,
        description,
        price: Number(price),
        discountedPrice,
        categoryId: Number(categoryId),
        imgs: {
          update: {
            thumbnails,
            previews,
          },
        },
        additionalDescriptions: {
          deleteMany: {}, // remove old
          create: (additionalDescriptions ?? []).map((d: any) => ({
            name: d.name,
            value: d.value,
          })),
        },
        productOptions: {
          deleteMany: {}, // remove old options
          create: (productOptions ?? []).map((opt: any) => ({
            name: opt.name,
            type: opt.type,
            optionValues: {
              create: (opt.optionValues ?? []).map((v: any) => ({
                label: v.label,
                value: Number(v.value),
                discount: Number(v.discount),
              })),
            },
          })),
        },
      },
      include: {
        imgs: true,
        additionalDescriptions: true,
        productOptions: { include: { optionValues: true } },
      },
    });

    return NextResponse.json({ message: "Updated Successfully", product: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error updating product" }, { status: 500 });
  }
}

// ✅ DELETE
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({ where: { id: Number(params.id) } });
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
