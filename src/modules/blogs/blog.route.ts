import express from "express";
import { createBlog, deleteBlogs, getBlogs } from "./blog.controller";

const router = express.Router();

router.post("/", createBlog);
router.get("/", getBlogs);
router.delete("/:id", deleteBlogs);

module.exports = router;
