import { Chat, ServiceHandler } from "../../types";
import ChatModel from "./chat.model";

const getChatList: ServiceHandler<"chatList"> = async ({
    senderId,
    receiverId,
}) => {
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
        console.error("[Error] getChatList: ", error);
    }
    return [];
};

const createNewChat: ServiceHandler<"sendChat"> = async ({
    message,
    senderId,
    receiverId,
}) => {
    try {
        const docChat = new ChatModel({ message, senderId, receiverId });
        if (docChat) await docChat.save();
        return docChat as any as Chat;
    } catch (error) {
        console.error("[Error] createNewChat: ", error);
    }

    return null;
};

export { getChatList, createNewChat };
