import { createGatewayHandler } from "../../utils/callback-handlers";
import Response from "../../utils/response";
import { getUserList } from "./user.service";

const userList = createGatewayHandler("user:list", async (payload) => {
    const uList = await getUserList(payload);
    return new Response({ data: uList, message: "User list loaded." });
});

export { userList };
