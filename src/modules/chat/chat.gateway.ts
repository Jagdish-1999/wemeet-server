import { createGatewayHandler } from "../../utils/callback-handlers";
import Response from "../../utils/response";
import { getChatList } from "./chat.service";

const chatList = createGatewayHandler("chat:list", async (payload) => {
    const mList = await getChatList(payload);
    return new Response(mList, "Message list loaded.");
});

export { chatList };
