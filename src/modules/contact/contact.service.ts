import { Contact } from './contact.module';
import { createTransporter, generateMailOptions } from './emailSender';

type ContactInput = {
  firstName: string; lastName: string; email: string; phone: number; category: string; message: string;
};

export async function createContactService(data: ContactInput) {
  await createTransporter().sendMail(generateMailOptions(data));
  return Contact.create(data);
}

export const getContactsService = () => Contact.find().sort({ createdAt: -1 });
export const deleteContactService = (id: string) => Contact.findByIdAndDelete(id);
