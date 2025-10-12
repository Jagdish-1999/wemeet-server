import { Request, Response } from "express";
import ChatModel from "../../modules/chat/chat.model";

const deleteChat = async (req: Request, res: Response) => {
    try {
        const { chatId, isCurrentUser } = req.body;
        console.log("Delete chat", chatId, isCurrentUser);
        if (isCurrentUser) {
            const deleteRes = await ChatModel.findOneAndDelete({ _id: chatId });
            console.log(deleteRes);
        } else {
            const updatedDelStatus = await ChatModel.findOneAndUpdate(
                { _id: chatId },
                { deletedFrom: "SENDER" }
            );
        }
        res.status(200).json({ message: "success!", success: true });
    } catch (err) {
        console.log(err);
    }
};

export { deleteChat };
