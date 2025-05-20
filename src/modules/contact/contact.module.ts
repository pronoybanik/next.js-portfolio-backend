import mongoose, { Schema } from "mongoose";
import { IContact } from "./contact.interface";


const ContactSchema = new Schema<IContact>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    category: {
        type: String, 
        required: true,
    },
    message: { type: String, required: true },
}, { timestamps: true });

export const Contact = mongoose.model<IContact>("Contact", ContactSchema);
