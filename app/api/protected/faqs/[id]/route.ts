import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const data = await req.json();

  try {
    const updatedFAQ = await prisma.fAQ.update({
      where: { id: Number(id) },
      data,
    });
    return NextResponse.json({ success: true, faq: updatedFAQ });
  } catch (error) {
    console.error("PUT FAQ error:", error);
    return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    await prisma.fAQ.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true, message: "FAQ deleted successfully" });
  } catch (error) {
    console.error("DELETE FAQ error:", error);
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
  }
}
