import { Resend } from 'resend';

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[character];
  });

export const generateMailOptions = ({
  firstName,
  lastName,
  email,
  phone,
  category,
  message,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phone: number | string;
  category: string;
  message: string;
}) => {
  const fullName = `${firstName} ${lastName}`.trim();
  const safeName = escapeHtml(fullName);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(String(phone));
  const safeCategory = escapeHtml(category || 'General inquiry');
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, '<br/>');

  return {
    to: process.env.RECEIVER_EMAIL || 'pronoybanik82@gmail.com',
    replyTo: email,
    subject: `New Contact Request - ${category || 'General inquiry'}`,
    text: [
      'New Contact Message',
      `Name: ${fullName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Category: ${category || 'General inquiry'}`,
      '',
      'Message:',
      message,
    ].join('\n'),
    html: `
      <h3>New Contact Message</h3>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Phone:</strong> ${safePhone}</p>
      <p><strong>Category:</strong> ${safeCategory}</p>
      <p><strong>Message:</strong><br/>${safeMessage}</p>
    `,
  };
};

export const sendContactEmail = async (
  mailOptions: ReturnType<typeof generateMailOptions>,
) => {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim();

  if (!apiKey || !from) {
    throw new Error('Email delivery is not configured. Set RESEND_API_KEY and EMAIL_FROM.');
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({ ...mailOptions, from });

  if (error) {
    throw new Error(`Resend rejected the contact email: ${error.message}`);
  }
};
