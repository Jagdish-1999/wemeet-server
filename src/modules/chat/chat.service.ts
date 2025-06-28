import { ChatPayload, Chat } from "../../types";
import { createServiceHandler } from "../../utils/callback-handlers";
import ChatModel from "./chat.model";

const getChatList = createServiceHandler(
    "chat:list",
    async ({ senderId, receiverId }) => {
        try {
            const chats = await ChatModel.find({
                $or: [
                    { senderId: senderId, receiverId: receiverId },
                    { senderId: receiverId, receiverId: senderId },
                ],
            })
                .select("-__v -updatedAt")
                .lean();

            return chats as any as Chat[];
        } catch (error) {
            console.error("Error", error);
        }
        return [];
    }
);

const createNewChat = createServiceHandler(
    "chat:new",
    async ({ message, senderId, receiverId }) => {
        let chat: Chat | null = null;
        try {
            const docChat = new ChatModel({ message, senderId, receiverId });
            if (docChat) await docChat.save();
            chat = docChat as any as Chat;
        } catch (error) {
            console.error("[Error]", error);
        }

        return chat;
    }
);

export { getChatList, createNewChat };
