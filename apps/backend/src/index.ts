import express from "express";
import { prisma } from "@repo/db";
const app = express();
const PORT = process.env.PORT || 5050;
import dotenv from "dotenv";
import cors from "cors";
import { Request, Response } from "express";
dotenv.config();
app.use(cors());
import { authMiddleware } from "./middleware/authMiddleware";
app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});
app.use(express.json());

app.post("/sync", authMiddleware, async (req: any, res: any) => {
  const clerkId = req.userId;

  const user = await prisma.user.upsert({
    where: { clerkId },
    update: {},
    //@ts-ignore
    create: {
      clerkId,
      name: `User ${clerkId}`,
      email: `${clerkId}@example.com`,
    },
  });

  return res.status(200).json({
    success: true,
    user,
  });
});

app.post("/joinroom/:roomId", authMiddleware, async (req: any, res: any) => {
  const { roomId } = req.params;
  const clerkId = req.userId;
  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });
  const userExist = await prisma.user.findUnique({
    where: {
      clerkId: clerkId,
    },
  });
  if (!userExist) {
    return res.status(400).json({ message: "User does not exist" });
  }
  try {
    if (!room) {
      await prisma.room.create({
        data: {
          id: roomId,
          name: `Room ${roomId}`,
          users: {
            connect: {
              id: userExist.id,
            },
          },
        },
      });

      return res
        .status(201)
        .json({ message: "Room created and joined successfully" });
    }
    const roomWithUsers = await prisma.room.findUnique({
      where: { id: roomId },
      include: { users: true },
    });

    const alreadyJoined = roomWithUsers?.users.some(
      (u) => u.id === userExist.id,
    );

    if (alreadyJoined) {
      return res.status(200).json({
        message: "Already joined this room",
      });
    }
    await prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        users: {
          connect: {
            id: userExist.id,
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

//Create a Room
app.post("/createroom", authMiddleware, async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.userId;
  const { name, typeofRoom } = req.body;
  const roomExist = await prisma.room.findMany({
    //@ts-ignore
    where: {
      name,
    },
  });
  console.log("Room exist:", roomExist.length > 0);
  console.log("Room name:", name);
  console.log("Type of Room:", typeofRoom);
  if (roomExist.length > 0) {
    return res.status(400).json({ message: "Room already exists" });
  }
  const userExist = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });
  console.log("User exist:" + userExist);
  if (!userExist) {
    return res.status(400).json({ message: "User does not exist" });
  }
  const room = await prisma.room.create({
    data: {
      name,
      typeofRoom,
      users: {
        connect: {
          id: userExist.id,
        },
      },
    },
  });
  console.log("Room created:", room);
  return res.status(201).json({ message: "Room created successfully", room });
});

app.get("/rooms", authMiddleware, async (req: Request, res: Response) => {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        users: true,
      },
    });
    return res.status(200).json({ rooms });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
