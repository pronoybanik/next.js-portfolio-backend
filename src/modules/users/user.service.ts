import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { User } from './user.module';

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const email = data.email.trim().toLowerCase();
  if (await User.exists({ email })) {
    const error = new Error('User already exists');
    Object.assign(error, { statusCode: 409 });
    throw error;
  }
  const password = await bcrypt.hash(data.password, 10);
  return User.create({ name: data.name.trim(), email, password });
}

export async function authenticateUser(emailInput: string, password: string) {
  const user = await User.findOne({ email: emailInput.trim().toLowerCase() });
  if (!user || !(await bcrypt.compare(password, user.password))) return null;
  if (!config.jwt_access_secret)
    throw new Error('JWT_ACCESS_SECRET is not configured');
  const token = jwt.sign(
    { id: String(user._id), role: user.role },
    config.jwt_access_secret,
    {
      expiresIn: config.jwt_access_expires_in as jwt.SignOptions['expiresIn'],
    },
  );
  return { token, user };
}

export function getUserById(id: string) {
  return User.findById(id).select('-password');
}
