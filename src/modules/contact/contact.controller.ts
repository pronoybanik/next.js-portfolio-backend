/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { Contact } from "./contact.module";

export const createContact = async (req: Request, res: Response) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json({ message: "Message sent successfully", contact });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getContact = async (req: Request, res: Response) => {
    try {
        const contact = await Contact.find();
        res.status(201).json({ message: "All Contact Get Successfully", contact });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
