import { ChatFromServer, ServiceHandler } from "../../types";
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

            return chats as any as ChatFromServer[];
        } catch (error) {
            console.log("Error", error);
        }
        return [];
    }
);

// const createNewChat = async ({ message, senderId, receiverId }) => {
//     const chat = new ChatModel({ message, senderId, receiverId });
//     await chat.save();
//     return chat.getChat();
// };

export { getChatList };
