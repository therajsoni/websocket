const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "", // frontend
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket);
  // socket is newUsers
  socket.on("message", (message) => {
    console.log(message);
    // broudCost msg to all Client
    io.emit("message", message);
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

server.listen(8080, () => {
  console.log("run");
});
