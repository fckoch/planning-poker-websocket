import express from "express";
import { Server } from "socket.io";
import http from "http";
import { ChangePositionMessage, Player } from "./player";

const PORT = process.env.PORT || 8899;
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

let players: Player[]  = [];

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("select place", (changePositionMessageStr: string) => {

    const changePositionMessage: ChangePositionMessage = JSON.parse(changePositionMessageStr);

    const playerIndex = players.findIndex(p => p.uuid === changePositionMessage.player.uuid);

    if (playerIndex >= 0) {
        players[playerIndex] = {...changePositionMessage.player, position: changePositionMessage.targetPosition};
    } else {
        players = [...players, {...changePositionMessage.player, position: changePositionMessage.targetPosition}];
    }

    players = players.sort((a, b) => a.position - b.position);

    io.emit("select place", players)

  });

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });

});

httpServer.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
