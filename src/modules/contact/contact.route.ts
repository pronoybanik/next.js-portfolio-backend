import express from "express";
import { createContact, deleteContact, getContact } from "./contact.controller";

const router = express.Router();
router.post("/", createContact);
router.get("/", getContact);
router.delete("/:id", deleteContact);

module.exports= router;
