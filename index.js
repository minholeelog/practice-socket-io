import express from "express";
import http from "http";
import socketIo from "socket.io";
import logger from "morgan";

const PORT = 3030;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(logger("dev"));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(PORT, () => console.log(`Listening on: http://localhost:${PORT}`));
