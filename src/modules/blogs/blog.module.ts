import mongoose, { Schema } from "mongoose";
import { IBlog } from "./blog.interface";

const BlogSchema = new Schema<IBlog>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
}, { timestamps: true });

export const Blogs = mongoose.model<IBlog>("Blog", BlogSchema);
