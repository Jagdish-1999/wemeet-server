import { Chat } from "../../types";
import { createGatewayHandler } from "../../utils/callback-handlers";
import Response from "../../utils/response";
import { createNewChat, getChatList } from "./chat.service";

const chatList = createGatewayHandler<"chat:list">(
    "chat:list",
    async (payload) => {
        const mList = await getChatList(payload);
        return new Response({ data: mList, message: "Message list loaded." });
    }
);

const sendChat = createGatewayHandler("chat:send", async (payload) => {
    const chat = await createNewChat(payload);
    const res = new Response({
        data: chat,
        message: "Message send.",
        eventName: "chat:receive",
    });

    return res;
});

export { chatList, sendChat };
