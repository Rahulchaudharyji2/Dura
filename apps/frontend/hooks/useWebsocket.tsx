"use client";
import { useEffect, useState,useRef } from "react";

function useWebsocket({id,name}:{id:string,name:string}) {
    const socketRef=useRef<WebSocket|null>(null);
    useEffect(()=>{
        const ws=new WebSocket("ws://localhost:8000");
        socketRef.current=ws;
        ws.onopen=()=>{
            console.log("Websocket connection established");
            ws.send(JSON.stringify({type:"join",roomId:"room1",userId:id}));
        }

    })
  return (
    <div>useWebsocket</div>
  )
}

export default useWebsocket