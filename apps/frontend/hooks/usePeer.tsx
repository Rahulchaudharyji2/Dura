// "use client";
// import React from "react";
// import useCamers from "./useCamers";
// import useWebsocket from "./useWebsocket";

// function usePeer({ id, name }: { id: string; name: string }) {
//   const { socketRef } = useWebsocket({ id, name });
//   const { stream: localStream, videoRef } = useCamers();
//   const peerRef = React.useRef<RTCPeerConnection | null>(null);

//   const config = {
//     iceServers: [
//       {
//         urls: "stun:stun.l.google.com:19302",
//       },
//     ],
//   };

//   React.useEffect(() => {
//     const peer = new RTCPeerConnection(config);
//     peerRef.current = peer;
//     //Add media tracks or data channel
//     if (localStream) {
//       localStream.getTracks().forEach((track) => {
//         peer.addTrack(track, localStream);
//       });
//     }
//     const startCall = async () => {
//       const offer = await peer.createOffer();
//       await peer.setLocalDescription(offer);
//       console.log("Sending offer:", offer);
//       socketRef.current?.send(
//         JSON.stringify({ type: "offer", roomId: id, offer }),
//       );
//     };
    
// if(socketRef.current?.readyState === WebSocket.OPEN && socketRef.current?.onmessage){
//    onmessage = (event: MessageEvent) => {
//       const data = JSON.parse(event.data);
//     if(data.type === "offer"){
//         console.log("Received offer:", data.offer);
//         startCall();
//     }}
// }

//     // startCall();
//     // Listen for answer from the remote peer
//     // const handleAnswer = async (event: MessageEvent) => {
//     //   const answer = await peerRef.current?.createAnswer();
//     //   await peerRef.current?.setLocalDescription(answer);
//     //   console.log("Sending answer:", answer);
//     // };
//     // handleAnswer(event);
//     //receive answer from the remote peer
//     socketRef.current?.addEventListener("message", async (event) => {
//       const data = JSON.parse(event.data);
//       if (data.type === "answer") {
//         console.log("Received answer:", data.sdp);
//         await peerRef.current?.setRemoteDescription(
//           new RTCSessionDescription(data.sdp),
//         );
//       }
//     });
//     // socketRef.current?.send(
//     //   JSON.stringify({ type: "answer", roomId: id, sdp: handleAnswer }),
//     // );
//     peer.onicecandidate = (event) => {
//       if (event.candidate) {
//         console.log("Sending ICE candidate:", event.candidate);
//         socketRef.current?.send(
//           JSON.stringify({ type: "ice-candidate", candidate: event.candidate }),
//         );
//       }
//     };
//   }, [localStream]);
//   return {
//     peerRef,
//   };
// }

// export default usePeer;

"use client";

import React from "react";
import useCamers from "./useCamers";
import useWebsocket from "./useWebsocket";
import { useUser } from "@clerk/nextjs";

function usePeer({ id, name }: { id: string; name: string }) {
    const { isLoaded, isSignedIn, user } = useUser();
  const { socketRef } = useWebsocket({ id, name });
  const { stream: localStream } = useCamers();

  const peerRef = React.useRef<RTCPeerConnection | null>(null);

  const config = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };

  React.useEffect(() => {
    if (!localStream || !socketRef.current) return;

    const peer = new RTCPeerConnection(config);
    peerRef.current = peer;

    // Add local tracks
    localStream.getTracks().forEach((track) => {
      peer.addTrack(track, localStream);
    });

    // Create Offer
    const startCall = async () => {
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);

      console.log("Sending Offer", offer);

      socketRef.current?.send(
        JSON.stringify({
          type: "offer",
          roomId: id,
          userId: user?.id,
          offer,
        })
      );
    };

    // Handle Offer
    const handleOffer = async (offer: RTCSessionDescriptionInit) => {
      console.log("Received Offer");

      // 👇 Next step me ye implement karenge
      // await peer.setRemoteDescription(new RTCSessionDescription(offer));
      // const answer = await peer.createAnswer();
      // await peer.setLocalDescription(answer);

      // socketRef.current?.send(
      //   JSON.stringify({
      //     type: "answer",
      //     roomId: id,
      //     answer,
      //   })
      // );
    };

    socketRef.current.onmessage = async (event) => {
  console.log("RAW SOCKET:", event.data);

  const data = JSON.parse(event.data);

  console.log("TYPE:", data.type);

  switch (data.type) {
    case "create-offer":
      console.log("Received create-offer");
      await startCall();
      break;

    case "offer":
      console.log("Received offer");
      await handleOffer(data.offer);
      break;

    case "answer":
      console.log("Received answer");
      break;
  }
};

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current?.send(
          JSON.stringify({
            type: "ice-candidate",
            roomId: id,
            candidate: event.candidate,
          })
        );
      }
    };

    return () => {
      peer.close();
    };
  }, [localStream]);

  return {
    peerRef,
  };
}

export default usePeer;
