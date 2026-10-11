
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import { createContactService, deleteContactService, getContactsService } from './contact.service';

// Create a new contact
export const createContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contact = await createContactService(req.body);

    res.status(201).json({
      success: true,
      message: 'Contact submitted and email sent successfully!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// Get all contacts
export const getContact = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const contacts = await getContactsService();
    res.status(200).json({
      success: true,
      message: 'Contacts retrieved successfully',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a contact by ID

export const deleteContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const contact = await deleteContactService(id);
        if (!contact) { res.status(404).json({ message: 'Contact not found' }); return; }
        res.status(200).json({ message: "Contact deleted successfully", data: contact });
    } catch (error) { next(error);
    }
};
