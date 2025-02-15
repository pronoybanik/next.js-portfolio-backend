import mongoose, { Schema } from "mongoose";
import { IUser } from "./user.interface";

const UserSchema = new Schema<IUser>({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

export const User = mongoose.model<IUser>("User", UserSchema);