import { ServiceHandler, User } from "@jagdish-1999/socket-contracts";
import { UserModel } from "./user.model";

const getUserList: ServiceHandler<"userList"> = async (payload) => {
    try {
        const userList = await UserModel.find()
            .select("-__v -updatedAt")
            .lean();

        return userList as any as User[];
    } catch (error) {
        console.log("[Error] getUserList!");
    }

    return [] as User[];
};

export { getUserList };
