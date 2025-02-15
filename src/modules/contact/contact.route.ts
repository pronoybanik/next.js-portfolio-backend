import express from "express";
import { createContact, getContact } from "./contact.controller";

const router = express.Router();
router.post("/", createContact);
router.get("/", getContact);

module.exports= router;
