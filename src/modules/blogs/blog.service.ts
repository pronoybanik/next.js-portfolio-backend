import { Blogs } from './blog.module';
import { IBlog } from './blog.interface';

export const createBlogService = (data: unknown) => Blogs.create(data);
export const getBlogsService = () => Blogs.find().sort({ createdAt: -1 });
export const getBlogByIdService = (id: string) => Blogs.findById(id);
export const deleteBlogService = (id: string) => Blogs.findByIdAndDelete(id);
export const updateBlogService = (id: string, data: Partial<IBlog>) =>
  Blogs.findByIdAndUpdate(id, data, { new: true, runValidators: true });
