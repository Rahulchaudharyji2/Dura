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

//Create a Room
app.post("/createroom",authMiddleware,async (req:Request,res:Response)=>{
  //@ts-ignore
  const userId = req.userId;
  const {name,typeofRoom} = req.body;
  const roomExist = await prisma.room.findUnique({
    //@ts-ignore
    where:{
      name
    },
    
  })
  if(roomExist){
    return res.status(400).json({message:"Room already exists"})
  }
  const room=await prisma.room.create({
    data:{
      name,
      typeofRoom,
      users:{
        connect:{
          id:userId
        }
      } 
    }
  })
  return res.status(201).json({message:"Room created successfully",room})


})



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
