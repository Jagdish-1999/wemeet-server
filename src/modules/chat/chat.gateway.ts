import { ClientToServerEventMap } from "@jagdish-1999/wemeet-socket-contracts";
import Response from "../../utils/response";
import { createNewChat, getChatList, getDeleteChat } from "./chat.service";

/**
 * `Note-` function name should be same as event name.
 * This is because the event name is used to register the event listener in the socket server.
 * If the function name does not match the event name, it will not be registered correctly.
 *  Function receive three params payload cb & socket.
 * @param payload data received from client
 * @param cb acknowledge callback from client
 * @param socket socket instance
 */

const chatList: ClientToServerEventMap["chatList"] = async (payload, cb) => {
    const mList = await getChatList(payload);
    const res = new Response({
        data: mList,
        message: "Message list loaded!",
    });
    cb?.(res);
};

const sendChat: ClientToServerEventMap["sendChat"] = async (
    payload,
    cb,
    socket
) => {
    const chat = await createNewChat(payload);
    const res = new Response({
        data: chat,
        message: "Chat send!",
    });

    socket!.broadcast.emit("chatReceived", res, (r) => {
        //! @TODO - Need to implement if message is not delivered to other user's.
        console.log("Message delivered successfully!: ");
    });

    cb?.(res);
};

const deleteChat: ClientToServerEventMap["deleteChat"] = async (
    payload,
    cb,
    socket,
    io
) => {
    try {
        const deletedChat = await getDeleteChat(payload);
        const chat = new Response({
            data: deletedChat,
            message: "Chat deleted successfully!",
        });

        if (payload.isCurrentUser) {
            io!
                .to(socket!.onlineUsers[deletedChat.receiverId])
                .to(socket!.onlineUsers[deletedChat.senderId])
                .emit("deletedChat", chat, (r) => {
                    console.log("1.Message Deleted successfully!");
                });
            cb?.(chat);
        } else {
            io!
                .to(socket!.onlineUsers[deletedChat.receiverId])
                .emit("deletedChat", chat, (r) => {
                    console.log("2.Message Deleted successfully!");
                });
            cb?.(chat);
        }
    } catch (err) {
        console.log(err);
    }
};

export { chatList, sendChat, deleteChat };
