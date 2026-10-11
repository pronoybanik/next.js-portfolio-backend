import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import projectRoute from './modules/projects/project.route';
import authRoutes from './modules/users/user.route';
import blogRoutes from './modules/blogs/blog.route';
import contactRoutes from './modules/contact/contact.route';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/project', projectRoute);
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contact', contactRoutes);

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Welcome to the portfolio server 5000' });
});

export async function startServer() {
  try {
    await mongoose.connect(config.dataBase_url, {
      serverSelectionTimeoutMS: 15000,
      bufferCommands: false,
    });
    console.log('MongoDB connected');

    return app.listen(config.port, () => {
      console.log(`Portfolio API listening on port ${config.port}`);
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('MongoDB connection failed:', message);

    if (message.includes('querySrv') || message.includes('_mongodb._tcp')) {
      console.error(
        'Atlas SRV DNS lookup failed. Check DNS, VPN, and firewall access. If SRV DNS is unavailable, copy Atlas\'s current standard connection string into DATABASE_URL.',
      );
    }

    process.exitCode = 1;
    return undefined;
  }
}

if (require.main === module) {
  void startServer();
}

export default app;
