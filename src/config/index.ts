import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const dataBaseUrl = process.env.DATABASE_URL?.trim();
if (!dataBaseUrl) {
  throw new Error(
    'DATABASE_URL is missing. Add a valid MongoDB connection string to the backend .env file.',
  );
}

const mongodbDnsServers = (process.env.MONGODB_DNS_SERVERS || '')
  .split(',')
  .map((server) => server.trim())
  .filter(Boolean);

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: Number(process.env.PORT) || 5000,
  dataBase_url: dataBaseUrl,
  mongodb_dns_servers: mongodbDnsServers,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || '1d',
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
};
