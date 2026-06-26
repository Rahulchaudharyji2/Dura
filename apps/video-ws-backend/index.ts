
import {WebSocketServer} from "ws";
const wss = new WebSocketServer({ port: 8000 })
const rooms:any={}
wss.on('connection', function connection(ws) {
  ws.on('error', console.error);
  

  ws.on('message', function message(data) {
    const message = JSON.parse(data.toString());
    console.log('received: %s', message);
    const userId = message.userId;
    const tyepe = message.type;
    const roomId = message.roomId;
     switch(message.type){
        case "join":
           if(!rooms[roomId]){
            rooms[roomId]=[];
              }
              const alreadyJoined= rooms[roomId].some((user:any)=>user.userId===userId);
              console.log("alreadyJoined",alreadyJoined);
              if(!alreadyJoined){
                rooms[roomId].push({userId,ws});
                console.log(`User ${userId} joined room ${roomId} and total users in room: ${rooms[roomId].length}`);
              }else{
                console.log(`User ${userId} already joined room ${roomId}`);
              }
              break;
              default:
                console.log(`Unknown message type: ${message.type}`);
     }
  });

  
});


