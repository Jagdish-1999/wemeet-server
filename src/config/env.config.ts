import dotenv from "dotenv";

const loadEnv = (): void => {
    dotenv.config({
        path: [".env.local", ".env"],
    });
};

export default loadEnv;
