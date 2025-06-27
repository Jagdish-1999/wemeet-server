import { Schema, model } from "mongoose";

const chatSchema = new Schema(
    {
        senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        receiverId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        image: { type: String, required: false, default: "" },
        message: { type: String, required: true },
    },
    { timestamps: true }
);

chatSchema.methods.getChat = function () {
    return {
        _id: this._id.toString(),
        message: this.message,
        senderId: this.senderId,
        receiverId: this.receiverId,
        createdAt: this.createdAt,
    };
};
const ChatModel = model("Chat", chatSchema);

export default ChatModel;
