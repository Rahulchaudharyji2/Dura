import express from "express";
import { prisma } from "@repo/db";
const app = express();
const PORT = process.env.PORT || 5050;
import dotenv from "dotenv";
dotenv.config();

import { authMiddleware } from "./middleware/authMiddleware";
app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

app.post("/joinroom/:roomId", authMiddleware, async (req: any, res: any) => {
  const { roomId } = req.params;
  const userId = req.userId;
  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });
  try {
    if (!room) {
      await prisma.room.create({
        data: {
          id: roomId,
          name: `Room ${roomId}`,
          users: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return res
        .status(201)
        .json({ message: "Room created and joined successfully" });
    }

    return;
    await prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });

    res.status(200).json({ message: "Joined existing room successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: String(err) });
  }
});
app.get("/debug", authMiddleware, (req: any, res) => {
  res.json({
    userId: req.userId,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
