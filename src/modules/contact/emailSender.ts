import nodemailer from 'nodemailer';

export const createTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  const port = Number(SMTP_PORT || 587);

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !Number.isInteger(port)) {
    throw new Error('Email delivery is not configured. Check the SMTP environment variables.');
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
};

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
    from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
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
