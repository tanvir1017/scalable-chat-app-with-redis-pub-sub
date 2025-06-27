import { Redis } from "ioredis";
import { Server } from "socket.io";

const pub = new Redis({
  host: "localhost", // or container IP / Docker network alias
  port: 6379, // default Redis port
});

const sub = new Redis({
  host: "localhost",
  port: 6379,
});

class SocketServices {
  private _io: Server;

  constructor() {
    console.log("Init socket server ✨");

    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });

    sub.subscribe("PUB:MESSAGES");
  }

  public initListeners() {
    console.log("Init socket listeners...🦻");
    const io = this.io;
    io.on("connect", (socket) => {
      console.log("🔩 New socket connected ", socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("📩 New message received", message);

        // publish the message to redis
        await pub.publish("PUB:MESSAGES", JSON.stringify({ message }));
      });
    });

    sub.on("message", async (channel, messages) => {
      if (channel === "PUB:MESSAGES") {
        io.emit("message", { messages });
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketServices;
