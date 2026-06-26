"use client";
import { useEffect, useState, useRef } from "react";

function useCamers() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  useEffect(() => {
    async function startCamera() {
      try {
        console.log("Starting camera...");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error starting camera:", err);
      }

      
    }
    startCamera();
      return () => {
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
      };
  }, []);

  return {
    stream,
    videoRef,
  }
}

export default useCamers;
