import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { Server } from 'http';
import config from './config';

const app = express();

// Parsers
app.use(express.json());
app.use(cors());

// Application routes
// app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'welcome to the server 5000',
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
  console.log(`😈 unhandledRejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});

export default app;
