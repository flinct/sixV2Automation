import { io } from "socket.io-client";

let socketInstance = null;

Cypress.Commands.add("connectSocket", (token) => {
  return new Cypress.Promise((resolve) => {
    socketInstance = io("https://dev-v2-api.satuinbox.com/conversations", {
      transports: ["websocket"],
      forceNew: true,
      auth: token ? { token } : undefined,
      extraHeaders: {
        Origin: "https://dev-v2.satuinbox.com",
      },
    });

    socketInstance.on("connect", () => {
      Cypress.log({ name: "SOCKET", message: "Connected" });
      resolve(socketInstance);
    });

    socketInstance.on("connect_error", (err) => {
      Cypress.log({ name: "SOCKET ERROR", message: err.message });
    });
  });
});

Cypress.Commands.add("listenNewMessage", (callback) => {
  if (!socketInstance) throw new Error("Socket not connected");

  socketInstance.on("notification.new.message", (data) => {
    Cypress.log({
      name: "NEW MESSAGE",
      message: JSON.stringify(data),
    });

    callback(data);
  });
});

Cypress.Commands.add("disconnectSocket", () => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
});

Cypress.Commands.add(
  "sendInboundMessage",
  ({ channelAccountId, clientContactId, content, type = "text" }) => {
    if (!socketInstance) {
      throw new Error("Socket not connected");
    }

    const payload = {
      channelAccountId,
      clientContactId,
      content,
      tempMessageId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      type,
    };

    socketInstance.emit("socket.inbound.message", payload);

    Cypress.log({
      name: "SOCKET EMIT",
      message: JSON.stringify(payload),
    });
  },
);
