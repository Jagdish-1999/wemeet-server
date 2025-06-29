import { UserModel } from "./user.model";
import { ServiceHandler, User } from "../../types";

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
