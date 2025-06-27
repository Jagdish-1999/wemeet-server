import { UserModel } from "./user.model";
import { User } from "../../types";
import { createServiceHandler } from "../../utils/callback-handlers";

const getUserList = createServiceHandler("user:list", async () => {
    let userList: User[] = [];
    try {
        userList = await UserModel.find().select("-__v -updatedAt");
    } catch (error) {
        console.log("[Error] failed user list!");
    } finally {
        return userList;
    }
});

export { getUserList };
