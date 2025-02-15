import express from "express";
import { createUser, loginUser } from "./user.controller";
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);

module.exports= router;
