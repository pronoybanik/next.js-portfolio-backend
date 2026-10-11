/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { createBlogService, deleteBlogService, getBlogByIdService, getBlogsService, updateBlogService } from './blog.service';

export const createBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blog = await createBlogService(req.body);
        res.status(201).json({ message: "Blog created", blog });
    } catch (error) {
        next(error);
    }
};

export const getBlogs = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const blogs = await getBlogsService();
        res.json({ message: "Get All Blogs", data: blogs });
    } catch (error) {
        next(error);
    }
};

export const deleteBlogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const blog = await deleteBlogService(id);
        if (!blog) { res.status(404).json({ message: 'Blog not found' }); return; }
        res.status(200).json({ message: "Blog deleted successfully", data: blog });
    } catch (error) {
        next(error);
    }
};

export const singleBlogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const blog = await getBlogByIdService(id);
        if (!blog) { res.status(404).json({ message: 'Blog not found' }); return; }
        res.status(200).json({ message: "Single blog retrieved successfully", data: blog });
    } catch (error) {
        next(error);
    }
};



export const updateBlog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ status: "fail", error: "Blog ID is required" });
            return;
        }

        const blog = await updateBlogService(id, req.body);

        if (!blog) {
            res.status(404).json({
                status: "fail",
                error: "Couldn't update blog, blog not found"
            });
            return;
        }

        res.status(200).json({
            status: "success",
            message: "Blog updated successfully",
            data: blog,
        });
    } catch (error) {
        next(error);
    }
};
