import mongoose from "mongoose";
import loadEnv from "./env.config";

loadEnv();

let instance: mongoose.Mongoose | null = null;

const connectToMongoDB = async (): Promise<mongoose.Mongoose | null> => {
    try {
        if (!instance) {
            const URL = process.env.MONGODB_URI;
            instance = await mongoose.connect(URL || "");
            console.log(
                "%c[Mongodb Connected]",
                "color:green; font-weight:bold;"
            );
        }
    } catch (error) {
        console.log(
            "%c[Error] Mongodb connection failed!",
            "color:red; font-weight:bold;"
        );
    }

    return instance;
};

export { connectToMongoDB };
