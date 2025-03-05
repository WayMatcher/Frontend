import axios from 'axios';
import bcrypt from 'bcryptjs';

import { User } from '../types';

//const API_URL = 'https://example.com/api';


function hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
}

export async function loginUsername(username: string, password: string): Promise<User> {
    try {
        // const response = await axios.post(`${API_URL}/login`, {
        //     username,
        //     hashedPassword,
        // });
        //return response.data;

        //! Placeholder for the return of actual API call
        return {
            id: '1',
            username: username,
            email: 'test@email.com',
            password: hashPassword(password),
        };

    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error('Failed to login: ' + error.message);
        } else {
            throw new Error('Failed to login: ' + error);
        }
    }
};

export async function loginEmail(email: string, password: string): Promise<User> {
    try {
        //! Placeholder for the return of actual API call
        return {
            id: '1',
            username: 'test',
            email: email,
            password: hashPassword(password),
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error('Failed to login: ' + error.message);
        } else {
            throw new Error('Failed to login: ' + error);
        }
    }
}