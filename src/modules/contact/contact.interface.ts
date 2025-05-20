import { Document } from "mongoose";

export interface IContact extends Document {
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    category: string
    message: string;
}

