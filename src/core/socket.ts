import { Server } from "socket.io";
import type { Server as HTTPServer } from "http";

import type {
    ClientToServerEventMap,
    ServerToClientEventMap,
} from "@jagdish-1999/socket-contracts";
import * as rawEventListener from "../modules";

const eventListener: Partial<
    Record<keyof ClientToServerEventMap, (...args: any[]) => void>
> = rawEventListener;

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
    const io = new Server<ClientToServerEventMap, ServerToClientEventMap>(
        server,
        {
            cors: { origin: process.env.CLIENT_URL, credentials: true },
        }
    );

    const onlineUsers: Record<string, string> = {};

    io.on("connection", (socket) => {
        console.log(
            "%c[Connection on]",
            "color:green;font-weight:bold;",
            socket.id
        );

        onlineUsers[`${socket.handshake.query.userId}`] = `${socket.id}`;
        socket.onlineUsers = onlineUsers;

        Object.keys(eventListener).forEach((key) => {
            const typedKey = key as keyof ClientToServerEventMap;
            const handler = eventListener[typedKey];
            if (typeof handler === "function") {
                socket.on(typedKey, (...args: any[]) => {
                    (handler as any)(...args, socket, io);
                });
            }
        });

        socket.on("disconnect", () => {
            delete onlineUsers[`${socket.handshake.query.userId}`];
            socket.onlineUsers = onlineUsers;
        });
    });
};
