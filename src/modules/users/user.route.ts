import express from "express";
import { createUser, loginUser, singleUser } from "./user.controller";
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/:id", singleUser);

module.exports = router;
