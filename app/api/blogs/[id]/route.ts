import prisma from "@/lib/prisma";

export async function PUT(req: Request, { params }: any) {
  const body = await req.json();

  const blog = await prisma.blog.update({
    where: { id: Number(params.id) },
    data: body,
  });

  return Response.json(blog);
}

export async function DELETE(_: Request, { params }: any) {
  await prisma.blog.delete({
    where: { id: Number(params.id) },
  });

  return Response.json({ success: true });
}
