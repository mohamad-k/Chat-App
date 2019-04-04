const express = require("express");
const app = express();
const socketIo = require("socket.io");
// const fs = require("fs");
app.use(express.static("public"));
var port = process.env.PORT || 8001;

const server = app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
const io = socketIo(server);
var connections = [];
var usersOnline = 0;

io.on("connection", socket => {
  usersOnline++;
  connections.push(socket);
  console.log("user connected");
  io.sockets.emit("userCount", { users: usersOnline });

  socket.on("chat", data => {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });

  socket.on("disconnect", () => {
    usersOnline--;
    connections.splice(connections.indexOf(socket), 1);
    io.sockets.emit("userCount", { users: usersOnline });
  });
});
