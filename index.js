require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { socketServer } = require("./utils/handleSockets");
// server starts here

const app = express();
const PORT = process.env.PORT || 5000;
const http = require("http").createServer(app);

app.use(cors());
// app.use(morgan());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const SocketInstance = socketServer();
const server = http.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
server.on("upgrade", (request, socket, head) => {
  SocketInstance.handleUpgrade(request, socket, head, (socket) => {
    SocketInstance.emit("connection", socket, request);
  });
});
