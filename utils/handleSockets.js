const ws = require("ws");

const { SOCKET_EVENTS } = require("./constants");

const socketServer = () => {
  const wsServer = new ws.Server({ noServer: true });

  wsServer.on("connection", (socket, req) => {
    const _url = req?.url?.split("=")[1];
    console.log({ _url });

    const djangoSocket = new ws(
      `ws://192.168.18.68:8000/notification?token=${_url}`
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
};
module.exports = { socketServer };
