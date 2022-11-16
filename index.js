const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const PORT = process.env.PORT || 8080;
const router = require("./router");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

app.use(router);

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, cb) => {
    const user = addUser(socket.id, name, room);

    // kirim welcome message
    socket.emit("message", {
      user: "Admin",
      message: `Welcome ${user.name} to the ${user.room} room`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "Admin", message: `${user.name} has joined` });

    // user join ke room
    socket.join(user.room);
  });

  socket.on("sendMessage", (message) => {
    const user = getUser(socket.id);
    console.log(user);
    console.log(socket.id);
    io.to(user.room).emit("message", {
      user: user.name,
      message: message,
    });
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

server.listen(PORT, () => console.log(`App running on port ${PORT}`));
