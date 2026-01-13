import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

// ✅ Update Address
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = getUserFromToken();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    // ✅ If the address is set as default, unset all other defaults for this user
    if (data.default === true) {
      await prisma.userAddress.updateMany({
        where: {
          userId: user.id,
          NOT: { id: params.id },
          default: true,
        },
        data: { default: false },
      });
    }

    const updatedAddress = await prisma.userAddress.update({
      where: { id: params.id },
      data: {
        name: data.name,
        address_mobile: data.address_mobile,
        street: data.street,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        default: data.default ?? false,
      },
    });

    return NextResponse.json(updatedAddress);
  } catch (error) {
    console.error("Error updating address:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ✅ Delete Address
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = getUserFromToken();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const address = await prisma.userAddress.findUnique({
      where: { id: params.id },
    });

    if (!address || address.userId !== user.id) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 });
    }

    await prisma.userAddress.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error deleting address:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
