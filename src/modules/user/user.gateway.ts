import {
    ClientToServerEventMap,
    User,
} from "@jagdish-1999/wemeet-socket-contracts";
import Response from "../../utils/response";
import { getUserList } from "./user.service";

const userList: ClientToServerEventMap["userList"] = async (payload, cb) => {
    const uList = await getUserList(payload);
    const res = new Response({
        data: uList,
        message: "User list loaded!",
    });
    cb?.(res);
};

export { userList };
