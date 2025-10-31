
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ POST (Update)
export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> } // 👈 Correct type for Next.js 15
) {
  try {
    const { id } = await context.params;
    const data = await req.json();

    const updated = await prisma.category.update({
      where: { id: Number(id) },
      data,
    });

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

// ✅ DELETE
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.category.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
