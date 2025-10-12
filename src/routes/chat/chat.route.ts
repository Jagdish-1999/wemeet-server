import { Router } from "express";
import { deleteChat } from "../../controllers/chat/chat.controller";

const router = Router();

router.route("/delete/:id").delete(async (req, res, next) => {
    try {
        await deleteChat(req, res);
    } catch (err) {
        next(err);
    }
});

export default router;
