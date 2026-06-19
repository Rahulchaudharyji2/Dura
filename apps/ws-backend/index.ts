import WebSocket, { WebSocketServer } from "ws";
import { verifyToken } from "@clerk/backend";
import dotenv from "dotenv";
import { prisma } from "@repo/db";

dotenv.config();

const wss = new WebSocketServer({ port: 8080 });

interface ConnectedUser {
  ws: WebSocket;
  userId: string; // Clerk ID
  roomId: string;
}

const users: ConnectedUser[] = [];
const rooms: Record<string, Set<WebSocket>> = {};

wss.on("connection", async (ws, req) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      ws.close(1008, "No token found");
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      ws.close(1008, "Invalid token format");
      return;
    }

    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    });

    const clerkId = payload.sub;

    if (!clerkId) {
      ws.close(1008, "Invalid user");
      return;
    }

    console.log("User connected:", clerkId);

    users.push({
      ws,
      userId: clerkId,
      roomId: "",
    });

    ws.on("message", async (msg) => {
      try {
        const data = JSON.parse(msg.toString());

        const dbUser = await prisma.user.findUnique({
          where: {
            clerkId,
          },
        });

        if (!dbUser) {
          ws.send(
            JSON.stringify({
              type: "error",
              message: "User not found in database",
            })
          );
          return;
        }

        // JOIN ROOM
        if (data.type === "join") {
          const { roomId } = data;

          const currentUser = users.find(
            (u) => u.ws === ws
          );

          if (currentUser) {
            currentUser.roomId = roomId;
          }

          // Create room if not exists
          await prisma.room.upsert({
            where: {
              id: roomId,
            },
            update: {},
            create: {
              id: roomId,
              name: `Room ${roomId}`,
            },
          });

          // Connect user to room
          await prisma.room.update({
            where: {
              id: roomId,
            },
            data: {
              users: {
                connect: {
                  id: dbUser.id,
                },
              },
            },
          });

          if (!rooms[roomId]) {
            rooms[roomId] = new Set();
          }

          rooms[roomId].add(ws);

          console.log(
            `User ${dbUser.id} joined room ${roomId}`
          );

          ws.send(
            JSON.stringify({
              type: "joined",
              roomId,
            })
          );
        }

        // SEND MESSAGE
        if (data.type === "message") {
          const { roomId, content } = data;

          const roomUsers = rooms[roomId];

          if (!roomUsers) {
            return;
          }

          const savedMessage = await prisma.message.create({
            data: {
              content,
              roomId,
              userId: dbUser.id,
            },
          });

          roomUsers.forEach((client) => {
            if (
              client.readyState === WebSocket.OPEN &&
              client !== ws
            ) {
              client.send(
                JSON.stringify({
                  type: "message",
                  roomId,
                  content,
                  userId: dbUser.id,
                  messageId: savedMessage.id,
                })
              );
            }
          });

          console.log(
            `Message saved: ${content} | Room: ${roomId}`
          );
        }
      } catch (err) {
        console.error("Message Error:", err);

        ws.send(
          JSON.stringify({
            type: "error",
            message: "Failed to process message",
          })
        );
      }
    });

    ws.on("close", () => {
      const user = users.find((u) => u.ws === ws);

      if (user?.roomId && rooms[user.roomId]) {
        rooms[user.roomId].delete(ws);

        if (rooms[user.roomId].size === 0) {
          delete rooms[user.roomId];
        }
      }

      const index = users.findIndex((u) => u.ws === ws);

      if (index !== -1) {
        users.splice(index, 1);
      }

      console.log("User disconnected:", clerkId);
    });

    ws.on("error", (err) => {
      console.error("WebSocket Error:", err);
    });
  } catch (err) {
    console.error("Connection Error:", err);
    ws.close();
  }
});

console.log("WebSocket server running on port 8080");