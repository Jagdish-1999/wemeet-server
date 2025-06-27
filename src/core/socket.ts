import { Server } from "socket.io";
import type { Server as HTTPServer } from "http";
import { SocketReservedEventsMap } from "socket.io/dist/socket-types";
import { EventMap } from "../types";

import * as eventListener from "../modules";
import { eventHandler } from "../utils/callback-handlers";

export const createSocketServer = (server: HTTPServer) => {
    const io = new Server<EventMap & SocketReservedEventsMap>(server, {
        cors: { origin: process.env.CLIENT_URL, credentials: true },
    });

    io.on("connection", (socket) => {
        console.log("%c[Connection on]", "color:green;font-weight:bold;");

        //? Registering all Event Listeners
        Object.values(eventListener).forEach((handler) => {
            if (typeof handler === "function" && "eventName" in handler) {
                const eventName = handler.eventName;
                socket.on(eventName, eventHandler<typeof eventName>(handler));
            }
        });
    });
};
