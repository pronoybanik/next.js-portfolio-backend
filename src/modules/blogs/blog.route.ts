import express from "express";
import { createBlog, getBlogs } from "./blog.controller";

const router = express.Router();

router.post("/", createBlog);
router.get("/", getBlogs);

module.exports = router;
