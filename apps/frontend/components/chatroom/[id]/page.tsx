"use client";

import { Hash, SendHorizonal } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

interface PageProps {
  id: string;
  name: string;
}

export default function Page({ id, name }: PageProps) {
  const { getToken, userId } = useAuth();

  const [content, setContent] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  // Fetch old messages
  useEffect(() => {
    if (!id) return;

    const fetchMessages = async () => {
      try {
        const token = await getToken();

        const res = await axios.get(
          `http://localhost:5050/roomchat/${id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Fetched messages:", res.data.messages);
        setMessages(res.data.messages || []);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, [id, getToken]);

  // WebSocket Connection
  useEffect(() => {
  if (!id) return;

  let socket: WebSocket;

  const connect = async () => {
    const token = await getToken();

    socket = new WebSocket(
      `ws://localhost:8080?token=${token}`
    );

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: "join",
          roomId: id,
        })
      );

      setWs(socket);
    };

    socket.onmessage = (event) => {
      console.log("WS MESSAGE RECEIVED:", event.data);
      const data = JSON.parse(event.data);

      setMessages((prev) => [...prev, data]);
    };
  };

  connect();

  return () => {
    socket?.close();
  };
}, [id]);

  const sendMessage = () => {
    if (!content.trim()) return;

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          type: "chat",
          roomId: id,
          content,
        })
      );

      setContent("");
    }
  };

  if (!id) {
    return (
      <div className="flex h-[85vh] w-[75vw] items-center justify-center text-slate-400">
        Select a room to start chatting
      </div>
    );
  }

  return (
    <div
      className="
        h-[85vh]
        w-[75vw]
        rounded-[32px]
        border
        border-white/10
        bg-black/20
        backdrop-blur-2xl
        overflow-hidden
        flex
        flex-col
      "
    >
      {/* Header */}
      <div
        className="
          h-20
          border-b
          border-white/10
          px-6
          flex
          items-center
          justify-between
        "
      >
        <div className="flex items-center gap-4">
          <div
            className="
              h-12
              w-12
              rounded-2xl
              bg-gradient-to-br
              from-violet-600
              to-cyan-500
              flex
              items-center
              justify-center
            "
          >
            <Hash className="h-6 w-6 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              {name}
            </h1>

            <p className="text-xs text-slate-500">
              Room ID: {id}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
          <span className="text-sm text-green-400">
            Active
          </span>
        </div>
      </div>

      {/* Messages */}
      <div
        className="
          flex-1
          overflow-y-auto
          px-6
          py-5
          space-y-4
        "
      >
        {messages.length === 0 ? (
          <div className="text-center text-slate-500">
            No messages yet
          </div>
        ) : (
          messages.map((message: any) => {
            const isMine =
              message.user?.clerkId === userId;

            return (
              <div
                key={message.id}
                className={`flex ${
                  isMine
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-md px-4 py-3 text-white ${
                    isMine
                      ? `
                        rounded-3xl
                        rounded-br-md
                        bg-gradient-to-r
                        from-violet-600
                        to-cyan-500
                      `
                      : `
                        rounded-3xl
                        rounded-bl-md
                        border
                        border-white/10
                        bg-white/[0.04]
                      `
                  }`}
                >
                  {!isMine && (
                    <p className="mb-1 text-xs text-cyan-400">
                      {message.user?.name || "User"}
                    </p>
                  )}

                  <p>{message.content}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input */}
      <div
        className="
          border-t
          border-white/10
          p-4
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            px-3
            py-2
          "
        >
          <input
            type="text"
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Type a message..."
            className="
              flex-1
              bg-transparent
              text-white
              outline-none
              placeholder:text-slate-500
            "
          />

          <button
            onClick={() => sendMessage()}
            className="
              h-11
              w-11
              rounded-xl
              bg-gradient-to-r
              from-violet-600
              to-cyan-500
              flex
              items-center
              justify-center
              hover:scale-105
              transition
            "
          >
            <SendHorizonal className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}