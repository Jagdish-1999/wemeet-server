import { Router } from "express";
import { registerLogin } from "../../controllers/user/user.controller";

const router = Router();

router.route("/login").post(async (req, res, next) => {
    try {
        await registerLogin(req, res);
    } catch (err) {
        next(err);
    }
});

export default router;
