import { Chat, ServiceHandler } from "@jagdish-1999/wemeet-socket-contracts";
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

const getDeleteChat: ServiceHandler<"deleteChat"> = async ({
    id,
    isCurrentUser,
}) => {
    let deletedChat: Chat | null = null;

    try {
        console.log("Delete chat", id, isCurrentUser);
        if (isCurrentUser) {
            deletedChat = await ChatModel.findOneAndDelete({ _id: id });
            console.log("isCurrentUser", deletedChat);
        } else {
            deletedChat = await ChatModel.findOneAndUpdate(
                { _id: id },
                { deletedFrom: "SENDER" }
            );
            console.log("!isCurrentUser", deletedChat);
        }
    } catch (error) {
        console.log("[Error] getDeleteChat: ", error);
    }

    return deletedChat as any as Chat;
};

export { getChatList, createNewChat, getDeleteChat };
