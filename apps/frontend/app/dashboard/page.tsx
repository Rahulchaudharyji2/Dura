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
import { useEffect } from "react";
import ComboboxBasic from "@/components/RoomType";
import {Input} from "@/components/ui/input";
import { Mic, MessageSquare, Video, Gamepad2 } from "lucide-react";

export default function Page() {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
const rooms = [
  {
    name: "Design Discussion",
    icon: MessageSquare,
    members: 12,
  },
  {
    name: "Gaming Squad",
    icon: Gamepad2,
    members: 8,
  },
  {
    name: "Sketch Board",
    icon: MessageSquare,
    members: 5,
  },
  {
    name: "Voice Room",
    icon: Mic,
    members: 15,
  },
];
  return (
<div className="relative flex min-h-screen flex-col lg:flex-row bg-[#09090B]">      {/* Background Glow */}{" "}
      <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />{" "}
      <div className="absolute right-20 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />{" "}
      <div className="absolute bottom-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-pink-500/10 blur-3xl" />
      {/* Left Sidebar */}
     <div
  className="
    relative
    z-10
    flex
    w-full
    lg:w-[340px]
    shrink-0
    flex-col
    border-b
    lg:border-b-0
    lg:border-r
    border-white/10
    bg-black/30
    backdrop-blur-3xl
    p-4
    md:p-5
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
              Room Name <Input type="text" placeholder="Enter room name" style={{border:"2px solid grey"}} />
              </div>
              <label className="text-sm text-slate-400">Room Type</label>

              <ComboboxBasic />
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>




<div className="mt-8 flex-1 overflow-y-auto">
    <div className="mb-4 flex items-center justify-between">
    <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
      Active Rooms
    </p>

    <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-1 text-xs text-cyan-400">
      {rooms.length} Rooms
    </span>
  </div>

  <div className="space-y-3">
    {rooms.map((room) => {
      const Icon = room.icon;

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
              <p className="font-medium text-white">
                {room.name}
              </p>

              <p className="text-xs text-slate-500">
                {room.members} members online
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
        </Button>
      );
    })}
  </div>
</div>
      </div>
      {/* Main Area */}
     <div
  className="
    relative
    z-10
    flex
    flex-1
    items-center
    justify-center
    p-4
    md:p-6
  "
>
        <div
          className="
        flex
        h-[80vh]
        w-[85%]
        items-center
        justify-center
        rounded-[32px]
        border
        border-white/10
        bg-black/20
        backdrop-blur-2xl
      "
        >
          <h1 className="text-5xl font-black text-slate-700">Output Room</h1>
        </div>
      </div>
    </div>
  );
}
