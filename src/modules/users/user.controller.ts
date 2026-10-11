/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { authenticateUser, getUserById, registerUser } from './user.service';


export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, email, password } = req.body;
        if (![name, email, password].every((value) => typeof value === 'string' && value.trim())) {
            res.status(400).json({ message: 'Name, email, and password are required' });
            return;
        }
        const user = await registerUser({ name, email, password });
        res.status(201).json({ message: 'User registered successfully', user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        next(error); // Pass error to Express error handler
    }
};


export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (typeof email !== 'string' || typeof password !== 'string') {
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }
        const result = await authenticateUser(email, password);
        if (!result) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        res.status(200).json({ message: 'Login successful', token: result.token });
    } catch (error) {
        next(error);
    }
};

export const singleUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        const user = await getUserById(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({ message: "Got User Info Data", data: user });
    } catch (error) {
        next(error);
    }
};
