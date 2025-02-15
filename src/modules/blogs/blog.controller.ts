/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { Blogs } from "./blog.module";

export const createBlog = async (req: Request, res: Response) => {
    try {
        const blog = await Blogs.create(req.body);

        res.status(201).json({ message: "Blog created", blog });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await Blogs.find();
        res.json({ blogs });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
