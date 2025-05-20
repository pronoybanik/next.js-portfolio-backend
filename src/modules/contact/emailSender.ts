import nodemailer from 'nodemailer';

export const createTransporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
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
  phone: number;
  category: string;
  message: string;
}) => ({
  from: `"${firstName} ${lastName}" <${email}>`,
  to: process.env.RECEIVER_EMAIL,
  subject: `New Contact Request - ${category}`,
  html: `
    <h3>New Contact Message</h3>
    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Category:</strong> ${category}</p>
    <p><strong>Message:</strong><br/>${message}</p>
  `,
});
