"use client";
import  UseCamera from "@/hooks/useCamers";
import UseWebsocket from "@/hooks/useWebsocket";
import UsePeer from "@/hooks/usePeer";
import { useEffect } from "react";


function page( { id,
  name,
}: {
  id: string;
  name: string;
}) {

    const { stream, videoRef } = UseCamera();
  UseWebsocket({ id, name });
  const { peerRef } = UsePeer({ id, name });
  
  useEffect(()=>{
    // if(peerRef.current && stream){
    //   stream.getTracks().forEach((track)=>{
    //     peerRef.current?.addTrack(track,stream);
    //   })
    // }
    console.log("peerRef.current",peerRef.current)
  },[stream])
  return (
    <>
    <h1 className="text-2xl font-bold text-white align-center">Video Room</h1>
    <video ref={videoRef} autoPlay muted className="w-full h-full object-cover rounded-lg" />
  
    </>
  )
}

export default page