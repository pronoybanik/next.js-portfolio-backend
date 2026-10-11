import { Document } from "mongoose";

export interface IContact extends Document {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    category: string
    message: string;
}

