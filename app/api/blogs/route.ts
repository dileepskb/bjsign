
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function GET() {
  const blogs = await prisma.blog.findMany({
    // where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(blogs);
}

export async function POST(req: Request) {
  const body = await req.json();

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      slug: slugify(body.title, { lower: true }),
      content: body.content,
      excerpt: body.excerpt,
      image: body.image,
      status: body.status,
    },
  });

  return NextResponse.json(blog);
}
