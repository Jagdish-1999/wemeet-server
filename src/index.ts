import { createServer } from "http";
import { createSocketServer } from "./core/socket";
import app from "./core/server";
import { connectToMongoDB } from "./config/db.config";

const server = createServer(app);
createSocketServer(server);

server.listen(process.env.PORT || 8080, () => {
    connectToMongoDB();
    console.log(`Server running on port ${process.env.PORT || 8080}`);
});
