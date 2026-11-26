import { Contact } from './contact.module';
import { generateMailOptions, sendContactEmail } from './emailSender';

type ContactInput = {
  firstName: string;
  lastName?: string;
  email: string;
  phone: number | string;
  category?: string;
  message: string;
};

export async function createContactService(data: ContactInput) {
  const normalizedData = {
    ...data,
    firstName: data.firstName.trim(),
    lastName: data.lastName?.trim() || '',
    email: data.email.trim(),
    category: data.category?.trim() || 'General inquiry',
    message: data.message.trim(),
  };
  const contact = new Contact(normalizedData);
  await contact.validate();
  await sendContactEmail(generateMailOptions(normalizedData));
  return contact.save();
}

export const getContactsService = () => Contact.find().sort({ createdAt: -1 });
export const deleteContactService = (id: string) => Contact.findByIdAndDelete(id);
