import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma"; // make sure you have this

// ✅ CREATE a new category
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, slug, parentId, description, isActive } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        parentId: parentId || null,
        description,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ✅ GET all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      include: { children: true, parent: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
