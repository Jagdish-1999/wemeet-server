import { Server } from "socket.io";
import type { Server as HTTPServer } from "http";
import { SocketReservedEventsMap } from "socket.io/dist/socket-types";
import { EventMap, GatewayHandler } from "../types";

import * as eventListener from "../modules";
import { eventHandler } from "../utils/callback-handlers";

/**
 * Initializes and configures a Socket.IO server instance on the provided HTTP server.
 *
 * This function:
 * - Creates a typed Socket.IO server using your custom `EventMap` merged with Socket.IO's reserved events.
 * - Enables CORS using the `CLIENT_URL` environment variable.
 * - Listens for incoming socket connections.
 * - On connection, it registers all event listeners defined in the `eventListener` object.
 *
 * Each event handler must be a function with an `_eventName` property, which is used
 * to dynamically bind the appropriate `socket.on(...)` listener using the `eventHandler` wrapper.
 *
 * @param {HTTPServer} server - The HTTP server instance to attach the Socket.IO server to.
 *
 * @example
 * import http from "http";
 * import { createSocketServer } from "./socket";
 *
 * const server = http.createServer(app);
 * createSocketServer(server);
 * server.listen(3000);
 *
 * @returns void
 */
export const createSocketServer = (server: HTTPServer) => {
    const io = new Server<EventMap & SocketReservedEventsMap>(server, {
        cors: { origin: process.env.CLIENT_URL, credentials: true },
    });

    type Listeners = { [key: string]: GatewayHandler<keyof EventMap> };
    const listeners: Listeners = {};

    for (const [_, fun] of Object.entries(eventListener)) {
        if (typeof fun === "function" && "_eventName" in fun) {
            listeners[fun._eventName] = fun;
        }
    }

    io.on("connection", (socket) => {
        console.log("%c[Connection on]", "color:green;font-weight:bold;");

        //? Registering all Event Listeners
        Object.keys(listeners).forEach((key) => {
            const typedKey = key as keyof EventMap;
            const handler = listeners[typedKey];

            socket.on(typedKey, eventHandler<typeof typedKey>(socket, handler));
        });

        // //? Registering all Event Listeners
        // Object.values(eventListener).forEach((handler) => {
        //     if (typeof handler === "function" && "eventName" in handler) {
        //         socket.on(handler._eventName, eventHandler(socket, handler));
        //     }
        // });
    });
};
