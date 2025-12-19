import { Server } from "socket.io";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

let io: Server | null = null;

export async function GET() {
  if (!io) {
    io = new Server({
      path: "/api/socket",
      cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
      console.log("Connected:", socket.id);

      socket.on("join", (userId: string) => {
        socket.join(userId);
      });

      // 🔥 mark notification as read
      socket.on("markAsRead", async ({ orderId, userId }) => {
        await prisma.order.update({
          where: { id: Number(orderId) },
          data: { isRead: "read" },
        });

        const unreadCount = await prisma.order.count({
          where: {
            isRead: "unread",
          },
        });


        io?.to(userId).emit("unreadCount", unreadCount);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected:", socket.id);
      });
    });
  }

  return NextResponse.json({ ok: true });
}

export { io };
