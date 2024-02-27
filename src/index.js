const mongoose = require("mongoose");
const http = require("http");
const dotenv = require("dotenv");
const app = require("./app");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "config", ".env") });
const { Server } = require("socket.io");
const SocketController = require("./socket/SocketController");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("connected", () => {
  console.log("mongodb connection successful");
  startServer();
});
mongoose.connection.on("disconnect", () => {
  console.log("MongoDb  connected rejected");
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const socketController = new SocketController(io);

io.on("connection", (socket) => {
  console.log(`Socket connection succesfully ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Socket disconnect ${socket.id}`);
  });
});

app.socketController = socketController;

function startServer() {
  if (!server.listening) {
    server.listen(process.env.PORT);
  }
}

server.on("listening", () => {
  console.log(`Chat App start on http://localhost:${PORT}`);
});
