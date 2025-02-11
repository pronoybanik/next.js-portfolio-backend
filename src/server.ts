import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import { Server } from 'http';


// Import router using named import
// eslint-disable-next-line @typescript-eslint/no-require-imports
const projectRoute = require('./modules/projects/project.route');  // Adjust path as necessary


const app = express();

// Parsers
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api/project', projectRoute);  

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the portfolio server 5000',
  });
});

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.dataBase_url as string);
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log('Main server down', error);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log(`😈 unhandledRejection detected, shutting down...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException detected, shutting down...`);
  process.exit(1);
});

export default app;
