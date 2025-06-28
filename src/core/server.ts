import express from "express";
import registerLoginRoutes from "./login";
import { errorHandler } from "../middlewares/route.middleware";

const app = express();
app.use(express.json());

const router = express.Router();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL || "");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
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
app.use(router);

router.route("/login-user").post(async (req, res, next) => {
    console.log("Post", req.body);
    try {
        await registerLoginRoutes(req, res);
    } catch (err) {
        next(err);
    }
});

app.use(errorHandler);

export default app;
