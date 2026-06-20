import { WebSocketServer, WebSocket } from "ws";
import { prisma } from "@repo/db";
import { verifyToken } from "@clerk/backend";
import dotenv from "dotenv";
dotenv.config();

const wss = new WebSocketServer({ port: 8080 });

//console.log("websocket server is "+ WebSocketServer);

//console.log( WebSocket.OPEN);
interface roomUser {
  ws: WebSocket;
  roomId: string;
  userId: string;
}
const roomUsers: roomUser[] = [];

wss.on("connection", async function connection(ws, req) {
  const token = req.url?.split("?token=")[1];

  if (!token) {
    ws.close(1008, "Token is required");
    return;
  }
  const payload = await verifyToken(token, {
    secretKey: process.env.CLERK_SECRET_KEY,
  });
  const userId = payload.sub;

  roomUsers.push({ ws, roomId: "", userId });
  ws.on("error", console.error);

  ws.on("message", async function message(data) {
    let parsedData;
    if (typeof data !== "string") {
      parsedData = JSON.parse(data.toString());
    } else {
      parsedData = JSON.parse(data); // {type: "join-room", roomId: 1}
    }

    console.log(`Received message from user ${userId}:`, parsedData);
    if (parsedData.type === "join") {
      const { roomId } = parsedData;
      const user = roomUsers.find((u) => u.userId === userId);
      if (user) {
        user.roomId = roomId;
      }
      await prisma.room.upsert({
        where:{id: roomId},
        update:{},
        create:{
          id: roomId,
          name: `Room ${roomId}`,
        }
      })
      .then(()=> console.log(`Room ${roomId} created or already exists`));
    
      
      console.log(`User ${userId} joined room ${roomId}`);
    }

    if (parsedData.type === "chat") {
      const user = roomUsers.find((u) => u.userId === userId);
      if (!user) {
        console.error(`User ${userId} not found in roomUsers`);
        return;
      }
      const roomId = user.roomId;
      if (!roomId) {
        console.error(`User ${userId} has not joined a room`);
        return;
      }
      // Broadcast the message to all clients in the same room
      roomUsers.forEach((u) => {
        if (u.roomId === roomId && u.ws.readyState === WebSocket.OPEN) {
          u.ws.send(
            JSON.stringify({
              type: "chat",
             userId,
              message: parsedData.content,
            }),
          );
        }
      });
      const chatMessage = await prisma.message.create({
        data: {
          //@ts-ignore
         clerkId: userId,
          roomId,
          content: parsedData.content,
        },
      });
      console.log(`chat message saved to database: ${chatMessage.id}`);
    }
  });
});
