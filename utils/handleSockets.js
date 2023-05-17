require("dotenv").config();
const ws = require("ws");

const { SOCKET_EVENTS } = require("./constants");

const socketServer = () => {
  try {
    const wsServer = new ws.Server({ noServer: true });

    wsServer.on("connection", (socket, req) => {
      let route = req.url.split("?")[0];
      let param = req.url.split("=")[1];
      console.log({ route, param });

      const djangoSocket = new ws(
        // `${process.env.DJANGO_SERVER_URL}${route}?$param=${param}`
        `ws://192.168.18.68:8000${route}?$param=${param}`
      );
      djangoSocket.on("message", (data) => {
        socket.send(`${data}`);
      });
      socket.on(SOCKET_EVENTS.MESSAGE_RECEIVED, (message) => {
        //Forward to django
        // console.log("sending", { message }, "To django");
        djangoSocket.send(message);
      });
    });

    return wsServer;
  } catch (error) {
    console.log({ error });
  }
};

module.exports = { socketServer };
