"use client";

import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  Monitor,
  PhoneOff,
  Users,
  Settings,
} from "lucide-react";

export default function VideoRoom({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  return (
    <div className="flex h-screen w-[75vw] flex-col bg-[#09090B] text-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-sm text-slate-400">
            Video Collaboration Room
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-cyan-400">
          <Users className="h-4 w-4" />
          <span>12 Online</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 gap-4 p-4">
        {/* Video Grid */}
        <div className="grid flex-1 grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((user) => (
            <div
              key={user}
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-[#111827]
              "
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-cyan-500/10" />

              {/* User Placeholder */}
              <div className="flex h-full min-h-[260px] items-center justify-center">
                <div
                  className="
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-violet-600
                    to-cyan-500
                    text-2xl
                    font-bold
                  "
                >
                  U{user}
                </div>
              </div>

              <div className="absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1 text-sm">
                User {user}
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div
          className="
            hidden
            w-[300px]
            rounded-3xl
            border
            border-white/10
            bg-[#111827]
            p-4
            lg:block
          "
        >
          <h2 className="mb-4 text-lg font-bold">
            Participants
          </h2>

          <div className="space-y-3">
            {[1, 2, 3, 4].map((user) => (
              <div
                key={user}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-3
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      h-10
                      w-10
                      rounded-full
                      bg-gradient-to-br
                      from-violet-600
                      to-cyan-500
                    "
                  />
                  <span>User {user}</span>
                </div>

                <Mic className="h-4 w-4 text-green-400" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div
        className="
          flex
          items-center
          justify-center
          gap-4
          border-t
          border-white/10
          py-5
        "
      >
        <button
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-white/10
            transition
            hover:bg-white/20
          "
        >
          <Mic className="h-6 w-6" />
        </button>

        <button
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-white/10
            transition
            hover:bg-white/20
          "
        >
          <Video className="h-6 w-6" />
        </button>

        <button
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-white/10
            transition
            hover:bg-white/20
          "
        >
          <Monitor className="h-6 w-6" />
        </button>

        <button
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-white/10
            transition
            hover:bg-white/20
          "
        >
          <Settings className="h-6 w-6" />
        </button>

        <button
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-red-500
            transition
            hover:bg-red-600
          "
        >
          <PhoneOff className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}