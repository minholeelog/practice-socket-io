const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const logger = require("morgan");

const PORT = 3030;

app.use(logger("dev"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

http.listen(PORT, () => console.log(`Listening on: http://localhost:${PORT}`));
