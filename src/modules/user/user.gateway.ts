import { User } from "../../types";
import { ClientToServerEventMap } from "../../types/types/event.map";
import Response from "../../utils/response";
import { getUserList } from "./user.service";

const userList: ClientToServerEventMap["userList"] = async (payload, cb) => {
    const uList = await getUserList(payload);
    const res = new Response({
        data: uList,
        message: "User list loaded!",
    });
    cb(res);
};

export { userList };
