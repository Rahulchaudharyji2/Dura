"use client";
import  UseCamera from "@/hooks/useCamers";
import UseWebsocket from "@/hooks/useWebsocket";


function page( { id,
  name,
}: {
  id: string;
  name: string;
}) {

    const { stream, videoRef } = UseCamera();
  UseWebsocket({ id, name });
  return (
    <>
    <h1 className="text-2xl font-bold text-white align-center">Video Room</h1>
    <video ref={videoRef} autoPlay muted className="w-full h-full object-cover rounded-lg" />
  
    </>
  )
}

export default page