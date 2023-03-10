const ws = require("ws");

const { SOCKET_EVENTS } = require("./constants");

const socketServer = () => {
  const wsServer = new ws.Server({ noServer: true });

  wsServer.on("connection", (socket) => {
    const djangoSocket = new ws( process.env.DJANGO_IP);

    djangoSocket.on("message", (data) => {
      socket.send(`From Django-> ${data}`);
    });
    socket.on(SOCKET_EVENTS.MESSAGE_RECEIVED, (message) => {
      //Forward to django
      console.log("sending", { message }, "To django");
      djangoSocket.send(message);
    });
  });
  return wsServer;
};
module.exports = { socketServer };
