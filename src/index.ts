// import { createServer } from "http";
// import { Server } from "socket.io";

import { createServer } from "http";
import { createSocketServer } from "./core/socket";
import app from "./core/server";
import { connectToMongoDB } from "./config/db.config";

// import { SocketReservedEventsMap } from "socket.io/dist/socket-types";
// import { connectToMongoDB } from "./config/db.config";
// import callbackHandler from "./utils/callback-handler";
// import { getUserList } from "./modules/user/controller";
// import { EventMap } from "./types";

// //? Creating http server.
// const httpServer = createServer();

// //? Creating Socket server.
// const io = new Server<EventMap & SocketReservedEventsMap>(httpServer, {
//     cors: { origin: process.env.CLIENT_URL, credentials: true },
// });

// //? Connecting socket.
// io.on("connect", (socket) => {
//     socket.on("user:list", callbackHandler<"user:list">(getUserList));
// });

// //? Server listening.
// httpServer.listen(process.env.PORT, () => {
//     connectToMongoDB();
//     console.log(`%c[Server is up]`, "color:green; font-weight:bold;");
// });

const server = createServer(app);
createSocketServer(server);

server.listen(process.env.PORT || 8080, () => {
    connectToMongoDB();
    console.log(`Server running on port ${process.env.PORT || 8080}`);
});
