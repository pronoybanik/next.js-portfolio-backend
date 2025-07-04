
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response } from 'express';
import { Contact } from './contact.module';
import { createTransporter, generateMailOptions } from './emailSender';

// Create a new contact
export const createContact = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, category, message } = req.body;

    const transporter = createTransporter();
    const mailOptions = generateMailOptions({
      firstName,
      lastName,
      email,
      phone,
      category,
      message,
    });

    await transporter.sendMail(mailOptions);
    const contact = await Contact.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Contact submitted and email sent successfully!',
      data: contact,
    });
  } catch (error) {
    console.error('Email send failed:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email or save contact',
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Get all contacts
export const getContact = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      success: true,
      message: 'Contacts retrieved successfully',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Delete a contact by ID

export const deleteContact = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByIdAndDelete(id);
        res.status(201).json({ message: "Blog deleted successfully", data: contact });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
