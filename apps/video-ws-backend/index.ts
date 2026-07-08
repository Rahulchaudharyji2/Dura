// import { WebSocketServer } from "ws";
// const wss = new WebSocketServer({ port: 8000 });
// const rooms: any = {};
// wss.on("connection", function connection(ws) {
//   ws.on("error", console.error);

//   ws.on("message", function message(data) {
//     const message = JSON.parse(data.toString());
//     console.log("received: %s", message);
//     const userId = message.userId;
//     const type = message.type;
//     const roomId = message.roomId;

//     if (type === "join") {
//       if (!rooms[roomId]) {
//         rooms[roomId] = [];
//       }
//       const alreadyJoined = rooms[roomId].some(
//         (user: any) => user.userId === userId,
//       );
//       console.log("alreadyJoined", alreadyJoined);
//       if (!alreadyJoined) {
//         rooms[roomId].push({ userId, ws });
//         if (rooms[roomId].length > 1) {
//           rooms[roomId][0].ws.send(
//             JSON.stringify({
//               type: "create-offer",
//             }),
//           );
//         }
//         console.log(
//           `User ${userId} joined room ${roomId} and total users in room: ${rooms[roomId].length}`,
//         );
//       } else {
//         console.log(`User ${userId} already joined room ${roomId}`);
//       }
//     }
//     if (type === "ice-candidate") {
//       const candiadte = message.candidate;
//       console.log("ice-candidate", candiadte);
//     }
//     if (type === "offer") {
//       const offer = message.offer;
//       console.log("offer", offer);
//       const roomUsers = rooms[roomId];
//       if (roomUsers) {
//         roomUsers.forEach((user: any) => {
//           if (user.userId !== userId) {
//             user.ws.send(
//               JSON.stringify({ type: "offer", offer, from: userId }),
//             );
//           }
//         });
//       }
//     }
//     if (type === "answer") {
//       const answer = message.answer;
//       console.log("answer", answer);
//       const roomUsers = rooms[roomId];
//       if (roomUsers) {
//         roomUsers.forEach((user: any) => {
//           if (user.userId !== userId) {
//             user.ws.send(
//               JSON.stringify({ type: "answer", answer, from: userId }),
//             );
//           }
//         });
//       }
//     }

//     console.log(`Unknown message type: ${message.type}`);
//   });
// });
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8000 });

const rooms: any = {};

wss.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("message", (data) => {
    const message = JSON.parse(data.toString());

    const { type, roomId, userId } = message;

    console.log("Received:", message);

    // ===========================
    // JOIN ROOM
    // ===========================
    if (type === "join") {
      if (!rooms[roomId]) {
        rooms[roomId] = [];
      }

      const alreadyJoined = rooms[roomId].some(
        (user: any) => user.userId === userId
      );

      if (!alreadyJoined) {
        rooms[roomId].push({ userId, ws });

        console.log(
          `User ${userId} joined ${roomId}. Total users: ${rooms[roomId].length}`
        );

        // Agar room me 2 users ho gaye
        // to first user ko offer create karne ko bolo
        if (rooms[roomId].length >1) {
            console.log("Sending create-offer");

          rooms[roomId][0].ws.send(
            JSON.stringify({
              type: "create-offer",
            })
          );
        }
      }

      return;
    }

    // ===========================
    // OFFER
    // ===========================
    if (type === "offer") {
      const roomUsers = rooms[roomId];

      if (!roomUsers) return;

      roomUsers.forEach((user: any) => {
        if (user.userId !== userId) {
          user.ws.send(
            JSON.stringify({
              type: "offer",
              roomId,
              offer: message.offer,
              from: userId,
            })
          );
        }
      });

      return;
    }

    // ===========================
    // ANSWER
    // ===========================
    if (type === "answer") {
      const roomUsers = rooms[roomId];

      if (!roomUsers) return;

      roomUsers.forEach((user: any) => {
        if (user.userId !== userId) {
          user.ws.send(
            JSON.stringify({
              type: "answer",
              roomId,
              answer: message.answer,
              from: userId,
            })
          );
        }
      });

      return;
    }

    // ===========================
    // ICE CANDIDATE
    // ===========================
    if (type === "ice-candidate") {
      const roomUsers = rooms[roomId];

      if (!roomUsers) return;

      roomUsers.forEach((user: any) => {
        if (user.userId !== userId) {
          user.ws.send(
            JSON.stringify({
              type: "ice-candidate",
              roomId,
              candidate: message.candidate,
              from: userId,
            })
          );
        }
      });

      return;
    }

    console.log("Unknown message type:", type);
  });

  // ===========================
  // USER DISCONNECT
  // ===========================
  ws.on("close", () => {
    Object.keys(rooms).forEach((roomId) => {
      rooms[roomId] = rooms[roomId].filter(
        (user: any) => user.ws !== ws
      );

      if (rooms[roomId].length === 0) {
        delete rooms[roomId];
      }
    });

    console.log("User disconnected");
  });
});