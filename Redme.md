Frontend live link: https://next-js-portfolio-frontend-murex.vercel.app/
Backend live link: https://nextjs-portfolio-backend-pink.vercel.app/

That is portfolio project using Express

Backend
✅ Tech Stack: Node.js, Express.js
✅ Features: API to manage blogs, projects, and contact messages
✅ Accessibility: Backend API is publicly accessible
Database
✅ MongoDB for data storage

project start: npm run start:dev
project build: npm run build

Contact email delivery
----------------------
The backend sends contact messages through the Resend HTTPS API so it works on
Render services where outbound SMTP ports are blocked. Configure these backend
environment variables in Render (and in `.env` for local development):

- `RESEND_API_KEY`: an API key from Resend.
- `EMAIL_FROM`: a sender address on a domain verified in Resend, for example
  `Portfolio Contact <contact@your-verified-domain.com>`.
- `RECEIVER_EMAIL`: optional destination inbox; defaults to
  `pronoybanik82@gmail.com`.

Verify the sending domain in Resend before using it as `EMAIL_FROM`. The
visitor's address is used as the reply-to address.
