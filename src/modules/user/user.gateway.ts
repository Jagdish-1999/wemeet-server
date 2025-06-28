import { createGatewayHandler } from "../../utils/callback-handlers";
import Response from "../../utils/response";
import { getUserList } from "./user.service";

const userList = createGatewayHandler("user:list", async (payload) => {
    const uList = await getUserList(payload);
    const result = new Response({ data: uList, message: "User list loaded." });
    return result;
});

export { userList };
