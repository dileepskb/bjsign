import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as XLSX from "xlsx";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = XLSX.read(buffer, { type: "buffer" });

    const products = XLSX.utils.sheet_to_json<any>(
      workbook.Sheets["Products"]
    );
    const descriptions = XLSX.utils.sheet_to_json<any>(
      workbook.Sheets["AdditionalDescriptions"]
    );
    const images = XLSX.utils.sheet_to_json<any>(
      workbook.Sheets["ProductImages"]
    );
    const options = XLSX.utils.sheet_to_json<any>(
      workbook.Sheets["ProductOptions"]
    );
    const optionValues = XLSX.utils.sheet_to_json<any>(
      workbook.Sheets["ProductOptionValues"]
    );

    for (const p of products) {
      const product = await prisma.product.create({
        data: {
          title: p.title,
          description: p.description,
          price: Number(p.price),
          discountedPrice: p.discountedPrice,
          reviews: Number(p.reviews || 0),
          categoryId: Number(p.categoryId),

          additionalDescriptions: {
            create: descriptions
              .filter(d => d.productRef === p.productRef)
              .map(d => ({
                name: d.name,
                value: d.value,
              })),
          },

          imgs: {
            create: (() => {
              const img = images.find(i => i.productRef === p.productRef);
              if (!img) return undefined;
              return {
                thumbnails: img.thumbnails.split(","),
                previews: img.previews.split(","),
              };
            })(),
          },

          productOptions: {
            create: options
              .filter(o => o.productRef === p.productRef)
              .map(o => ({
                name: o.name,
                type: o.type,
                optionValues: {
                  create: optionValues
                    .filter(v => v.optionRef === o.optionRef)
                    .map(v => ({
                      label: v.label,
                      value: Number(v.value),
                      discount: Number(v.discount || 0),
                    })),
                },
              })),
          },
        },
      });

      console.log("✅ Created product:", product.id);
    }

    return NextResponse.json({ message: "Bulk upload successful" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Bulk upload failed" },
      { status: 500 }
    );
  }
}
