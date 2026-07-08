"use client";
import { useEffect, useState,useRef } from "react";
import { useUser } from '@clerk/nextjs';

function useWebsocket({id,name}:{id:string,name:string}) {
  const { isLoaded, isSignedIn, user } = useUser();
    const socketRef=useRef<WebSocket|null>(null);
    useEffect(()=>{
        const ws=new WebSocket("ws://localhost:8000");
        socketRef.current=ws;
        ws.onopen=()=>{
            console.log("Websocket connection established");
            ws.send(JSON.stringify({type:"join",roomId:"id",userId:user?.id}));
        }
       return () => {
        ws.close();
    };

    },[])
  return (
    {
      socketRef,id,name
    }
  )
}

export default useWebsocket