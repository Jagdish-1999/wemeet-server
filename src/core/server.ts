import express from "express";
import { errorHandler } from "../middlewares/route.middleware";

import userRoutes from "../routes/user/user.route";
import chatRoutes from "../routes/chat/chat.route";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL || "");
    res.setHeader("Access-Control-Allow-Methods", "POST, DELETE, OPTIONS");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.sendStatus(204);
    } else {
        next();
    }
});
// app.use(router);

//? User Routes
app.use("/user", userRoutes);

//? Chat routes
// app.use("/chat", chatRoutes);
app.use(errorHandler);

export default app;
