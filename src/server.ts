import express from 'express';
import cors from 'cors';
import dns from 'node:dns';
import mongoose from 'mongoose';
import config from './config';
import projectRoute from './modules/projects/project.route';
import authRoutes from './modules/users/user.route';
import blogRoutes from './modules/blogs/blog.route';
import contactRoutes from './modules/contact/contact.route';
import portfolioRoutes from './modules/portfolio/portfolio.route';

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://www.pronoybanik.me",
      "https://nextjs-portfolio-dashboard.vercel.app"
    ],
    credentials: true,
  })
);

let databaseConnection: Promise<typeof mongoose> | null = null;

const connectDatabase = async (): Promise<typeof mongoose> => {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (!databaseConnection) {
    databaseConnection = mongoose
      .connect(config.dataBase_url, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
        bufferCommands: false,
      })
      .catch((error) => {
        databaseConnection = null;
        throw error;
      });
  }

  return databaseConnection;
};

if (process.env.VERCEL) {
  app.use(async (_req, _res, next) => {
    try {
      await connectDatabase();
      next();
    } catch (error) {
      next(error);
    }
  });
}

app.use('/api/project', projectRoute);
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/portfolio', portfolioRoutes);

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Welcome to the portfolio server 5000' });
});

export async function startServer() {
  try {
    if (!process.env.VERCEL && config.mongodb_dns_servers.length > 0) {
      dns.setServers(config.mongodb_dns_servers);
    }

    await connectDatabase();
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
