import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        image: String,
    },
    { timestamps: true }
);
//! @TODO
userSchema.methods.getUser = function () {
    return {
        _id: this._id.toString(),
        name: this.name,
        image: this.image,
        createdAt: this.createdAt,
    };
};

const UserModel = model("User", userSchema);

export { UserModel };
