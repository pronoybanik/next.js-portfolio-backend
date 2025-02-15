/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
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
        res.json({ message: "Get All Blogs", data: blogs });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};



export const deleteBlogs = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Blog ID is required" });
        }

        const blog = await Blogs.findByIdAndDelete(id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        return res.status(200).json({ message: "Blog deleted successfully", data: blog });
    } catch (error) {
        console.error("Error deleting blog:", error);
        return res.status(500).json({ message: "Internal Server Error" });
        next()
    }
};

