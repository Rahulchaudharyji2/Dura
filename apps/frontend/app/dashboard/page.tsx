"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import ComboboxBasic from "@/components/RoomType";
import { Input } from "@/components/ui/input";
import { Mic, MessageSquare, Video, Gamepad2 } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import Chatroom from "@/components/chatroom/[id]/page";
import VideoRoom from "@/components/Videoroom/[id]/page";
import VoiceRoom from "@/components/voiceroom/[id]/page";
import GamingRoom from "@/components/gamingroom/[id]/page";
import {
  MessageCircleMore,
  Sparkles,
  Users,
  ArrowLeft,
} from "lucide-react";

export default function Page() {
  const { getToken, userId } = useAuth();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  type RoomType = "voice" | "chat" | "VideoRoom" | "gamingRoom";

  interface Room {
    id: string;
    name: string;
    typeofRoom: RoomType;
    users: {
      id: string;
      clerkId: string;
      name: string;
      email: string;
    }[];
  }

  const [roomsData, setRoomsData] = useState<Room[]>([]);
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [selectedRoomName, setSelectedRoomName] = useState<string | null>(null);
  const [selectedRoomType, setSelectedRoomType] = useState<string | null>(null);
  const fetchRooms = async () => {
    const token = await getToken();

    const response = await axios.get("http://localhost:5050/rooms", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setRoomsData(response.data.rooms);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleCreateRoom = async () => {
    // Implementation for creating room
    try {
      const response = await axios.post(
        "http://localhost:5050/createroom",
        {
          name: roomName,
         typeofRoom: roomType,
        },
        {
          headers: {
            authorization: "Bearer " + (await getToken()),
          },
        },
      );
      await fetchRooms();
      console.log("Room created:", response.data);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };
  const handleJoinRoom = async (roomId: string) => {
    try {
      const response = await axios.post(
        `http://localhost:5050/joinroom/${roomId}`,
        {},
        {
          headers: {
            authorization: "Bearer " + (await getToken()),
          },
        },
      );
      console.log("Joined room:", response.data);
      fetchRooms();
    } catch (error) {
      console.error("Error joining room:", error);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col lg:flex-row bg-[#09090B]">
      {" "}
      {/* Background Glow */}{" "}
      <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />{" "}
      <div className="absolute right-20 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />{" "}
      <div className="absolute bottom-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-pink-500/10 blur-3xl" />
      {/* Left Sidebar */}
<div
  className="
    relative
    z-10
    flex
    h-screen
    w-full
    lg:w-[340px]
    shrink-0
    flex-col
    border-white/10
    bg-black/30
    backdrop-blur-3xl
    p-4
    md:p-5
    overflow-hidden
  "
>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="
        w-full
        rounded-2xl
        bg-gradient-to-r
        from-violet-600
        via-purple-500
        to-cyan-500
        px-5
        py-4
        font-bold
        text-white
        shadow-lg
        shadow-violet-500/20
        transition-all
        hover:-translate-y-1
      "
            >
              + Create Room
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-bold">
                Create your Room
              </AlertDialogTitle>

              <AlertDialogDescription>
                Select the type of room you want to create.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="space-y-2">
              <div className="text-sm text-slate-400">
                Room Name{" "}
                <Input
                  type="text"
                  placeholder="Enter room name"
                  style={{ border: "2px solid grey" }}
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />
              </div>
              <label className="text-sm text-slate-400">Room Type</label>

              <ComboboxBasic roomType={roomType} setRoomType={setRoomType} />
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <AlertDialogAction onClick={handleCreateRoom}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="mt-8 flex-1 overflow-y-auto">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Active Rooms
            </p>

            <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-1 text-xs text-cyan-400">
              {roomsData.length} Rooms
            </span>
          </div>

          <div className="mt-8 flex-1 overflow-y-auto pb-23">
            {roomsData.map((room) => {
              console.log("Room:", room);
              const isMember = room.users?.some(
                (user) => user.clerkId === userId,
              );
              console.log("Is member:", isMember);
              const Icon =
                room.typeofRoom === "voice"
                  ? Mic
                  : room.typeofRoom === "chat"
                    ? MessageSquare
                    : room.typeofRoom === "VideoRoom"
                      ? Video
                      : Gamepad2;
              return (
                <Button
                  key={room.name}
                  variant="ghost"
                  className="
             h-auto
  w-full
  min-h-[72px]
            justify-between
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            p-4
            hover:bg-white/[0.06]
            hover:border-violet-500/30
            transition-all
            duration-300

          "
                  onClick={() => {
                    setSelectedRoomId(room.id);
                    setSelectedRoomName(room.name);
                    setSelectedRoomType(room.typeofRoom);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-violet-600/20
                to-cyan-500/20
              "
                    >
                      <Icon className="h-5 w-5 text-cyan-400" />
                    </div>

                    <div className="text-left">
                      <p className="font-medium text-white">{room.name}</p>

                      <p className="text-xs text-slate-500">
                        {room.users?.length || 0} members online
                      </p>
                    </div>
                  </div>

                  <span
                    className="
              rounded-full
              bg-green-500/15
              px-2
              py-1
              text-xs
              text-green-400
            "
                  >
                    Live
                  </span>
                  
                  {!isMember && (
                    <Button
                      className="
              rounded-full
              bg-blue-500/15
              px-2
              py-1
              text-xs
              text-blue-400
            "
                      onClick={() => handleJoinRoom(room.id)}
                    >
                      Join Now
                    </Button>
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
      {/* Main Area */}
      <div>
        <div>
  {
  selectedRoomId &&
  selectedRoomName &&
  selectedRoomType ? (
    selectedRoomType === "chat" ? (
      <Chatroom
        id={selectedRoomId}
        name={selectedRoomName}
      />
    ) : selectedRoomType === "VideoRoom" ? (
      <VideoRoom
        id={selectedRoomId}
        name={selectedRoomName}
      />
    ) : selectedRoomType === "voice" ? (
      <VoiceRoom
        id={selectedRoomId}
        name={selectedRoomName}
      />
    ) : selectedRoomType === "gamingRoom" ? (
      <GamingRoom
        id={selectedRoomId}
        name={selectedRoomName}
      />
    ) : null
  )
 : (
    <div
  className="
    relative
    flex
    h-[85vh]
    w-[75vw]
    flex-col
    items-center
    justify-center
    overflow-hidden
    rounded-[32px]
    border
    border-white/10
    bg-black/20
    backdrop-blur-2xl
  "
>
  {/* Glow Effects */}
  <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-violet-600/10 blur-3xl" />
  <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

  {/* Main Icon */}
  <div
    className="
      relative
      mb-8
      flex
      h-32
      w-32
      items-center
      justify-center
      rounded-[32px]
      bg-gradient-to-br
      from-violet-600
      via-purple-500
      to-cyan-500
      shadow-[0_0_80px_rgba(139,92,246,0.35)]
    "
  >
    <MessageCircleMore className="h-16 w-16 text-white" />
  </div>

  {/* Heading */}
  <h1
    className="
      bg-gradient-to-r
      from-white
      via-slate-200
      to-slate-400
      bg-clip-text
      text-5xl
      font-black
      text-transparent
      
    "
    style={{margin:"15px"}}
  >
    Welcome to DURA
  </h1>

  {/* Description */}
  <p
    className="
      mt-4
      max-w-xl
      text-center
      text-lg
      leading-relaxed
      text-slate-400

    "
    style={{margin:"10px"}}
  >
    Create rooms, collaborate with your team,
    video call, sketch ideas together,
    and chat in real time.
  </p>

  {/* Features */}
  <div className="mt-10 flex gap-5">
    <div
      className="
        flex
        items-center
        gap-2
        rounded-2xl
        border
        border-white/10
        bg-white/[0.04]
        px-4
        py-3
      "
      style={{margin:"10px"}}
    >
      <Users className="h-5 w-5 text-cyan-400" />
      <span className="text-sm text-slate-300">
        Team Rooms
      </span>
    </div>

    <div
      className="
        flex
        items-center
        gap-2
        rounded-2xl
        border
        border-white/10
        bg-white/[0.04]
        px-4
        py-3
      "
    >
      <MessageCircleMore className="h-5 w-5 text-violet-400" />
      <span className="text-sm text-slate-300">
        Real-Time Chat
      </span>
    </div>

    <div
      className="
        flex
        items-center
        gap-2
        rounded-2xl
        border
        border-white/10
        bg-white/[0.04]
        px-4
        py-3
        m-5
      "
    >
      <Sparkles className="h-5 w-5 text-pink-400" />
      <span className="text-sm text-slate-300">
        Collaborative Space
      </span>
    </div>
  </div>

  {/* Bottom Hint */}
  <div className="mt-12 flex items-center gap-3 text-slate-500" style={{margin:"8px"}}>
    <ArrowLeft className="h-4 w-4" />
    <span>Select a room from the sidebar to start chatting</span>
  </div>
</div>
  )}
</div>
      </div>
    </div>
  );
}
