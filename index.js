const express = require("express");
const app = express();
const socketIo = require("socket.io");
// const fs = require("fs");
app.use(express.static("public"));

const server = app.listen(8080, () => {
  console.log("app running");
});
const io = socketIo(server);
var connections = [];
var usersOnline = 0;

io.on("connection", socket => {
  usersOnline++;
  connections.push(socket);
  console.log("user connected");
  io.sockets.emit("userCount", { users: usersOnline });
  //   console.log(connections.length);

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
  //   console.log(usersOnline);
});
