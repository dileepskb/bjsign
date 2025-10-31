import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ UPDATE PRODUCT
export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // must await
    const data = await req.json();

    const updated = await prisma.product.update({
      where: { id: Number(id) },
      data,
    });

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error("UPDATE product error:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// ✅ DELETE PRODUCT
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> } // 👈 must match Next.js 15 spec
) {
  try {
    const { id } = await context.params; // 👈 must await
    console.log("Deleting product with ID:", id);

    await prisma.product.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("DELETE product error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete product" },
      { status: 500 }
    );
  }
}
