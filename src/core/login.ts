import type { Request, Response } from "express";
import { UserModel } from "../modules/user/user.model";

const registerLoginRoutes = async (req: Request, res: Response) => {
    try {
        const { id, name, image } = req.body;

        let user;

        if (!id) {
            user = await UserModel.findOne({ name }).select("-__v -updatedAt");
        } else {
            user = await UserModel.findById(id).select("-__v -updatedAt");
        }

        if (!user) {
            user = new UserModel({ name, image });
            await user.save();
        }

        return res.status(200).json({
            user: user,
            error: false,
        });
    } catch (error: any) {
        return res.status(400).json({
            error: true,
            message: error.message,
        });
    }
};

export default registerLoginRoutes;
