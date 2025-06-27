"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = require("ioredis");
const socket_io_1 = require("socket.io");
const pub = new ioredis_1.Redis({
    host: "localhost", // or container IP / Docker network alias
    port: 6379, // default Redis port
});
const sub = new ioredis_1.Redis({
    host: "localhost",
    port: 6379,
});
class SocketServices {
    constructor() {
        console.log("Init socket server ✨");
        this._io = new socket_io_1.Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*",
            },
        });
        sub.subscribe("PUB:MESSAGES");
    }
    initListeners() {
        console.log("Init socket listeners...🦻");
        const io = this.io;
        io.on("connect", (socket) => {
            console.log("🔩 New socket connected ", socket.id);
            socket.on("event:message", (_a) => __awaiter(this, [_a], void 0, function* ({ message }) {
                console.log("📩 New message received", message);
                // publish the message to redis
                yield pub.publish("PUB:MESSAGES", JSON.stringify({ message }));
            }));
        });
        sub.on("message", (channel, messages) => __awaiter(this, void 0, void 0, function* () {
            if (channel === "PUB:MESSAGES") {
                io.emit("message", { messages });
            }
        }));
    }
    get io() {
        return this._io;
    }
}
exports.default = SocketServices;
