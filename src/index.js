const mongoose = require("mongoose");
const http = require("http");
const dotenv = require("dotenv");
const app = require("./app");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "config", ".env") });

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

function startServer() {
  if (!server.listening) {
    server.listen(process.env.PORT);
  }
}

server.on("listening", () => {
  console.log(`Chat App start on http://localhost:${PORT}`);
});
