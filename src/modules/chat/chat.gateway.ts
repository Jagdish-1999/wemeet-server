import { Chat } from "../../types";
import { ClientToServerEventMap } from "../../types/types/event.map";
import Response from "../../utils/response";
import { createNewChat, getChatList } from "./chat.service";

const chatList: ClientToServerEventMap["chatList"] = async (payload, cb) => {
    const mList = await getChatList(payload);
    const res = new Response({
        data: mList,
        message: "Message list loaded!",
    });
    cb(res);
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

    socket.broadcast.emit("chatReceived", res, (r) => {
        //! @TODO - Need to implement if message is not delivered to other user's.
        console.log("Message delivered successfully!: ");
    });

    cb(res);
};

export { chatList, sendChat };
