import API from '@/api/api';
import Address from '@/types/objects/Address/dto';
const api = new API();

import User from '@/types/objects/User/dto';
import Vehicle from '@/types/objects/Vehicle/dto';
import axios from 'axios';

const hashString = async (string: string): Promise<string> => {
    const buffer = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(string));
    return Array.from(new Uint8Array(buffer))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
};

export const apiGetUser = async (request: { username?: string; email?: string; user?: User; userID?: number }) => {
    try {
        return await api.axios.get<User>('/User/GetUser', { params: { ...request } });
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiSetUser = async (request: { user: User; password?: string }) => {
    try {
        // Sets the picture equal to a random cat picture if no picture is set
        if (request.user.profilePicture === undefined) {
            request.user.profilePicture = await apiGetCatPicture();
        }
        const hashedRequest = {
            ...request,
            password: request.password ? await hashString(request.password) : '',
        };

        const response = await api.axios.post<User>('/User/EditUser', hashedRequest);
        return response;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiAuthMFA = async (request: { token: string; userID: number }) => {
    try {
        const hashedMFAToken = {
            userID: request.userID,
            token: await hashString(request.token),
        };

        const response = await api.axios.post<User>('/MfA/MfAInput', hashedMFAToken);
        return response;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiAuthUser = async (request: { username: string; email: string; password: string }) => {
    try {
        const hashedUserLogin = {
            ...request,
            password: await hashString(request.password),
        };

        return await api.axios.post<number>('/Login/LoginUser', hashedUserLogin);
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiRegisterUser = async (request: {
    user: {
        userId?: number;
        firstname?: string;
        name?: string;
        additionalDescription?: string;
        licenseVerified?: boolean;
        telephone?: string;
        address?: Address;
        jwt?: string;
        username: string;
        email: string;
    };
    vehicleList?: Vehicle[];
    password: string;
}) => {
    try {
        // Sets the picture equal to a random cat picture if no picture is set
        /* if (request.user.profilePicture === undefined) {
            request.user.profilePicture = await apiGetCatPicture();
        } */

        const hashedRequest = {
            ...request,
            password: await hashString(request.password),
        };
        return await api.axios.post('/Register/NewUser', hashedRequest);
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiGetUsernameList = async () => {
    try {
        return await api.axios.get<User[]>('/Event/GetUserToInvite');
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiForgotPassword = async (input: string, inputType: 'email' | 'username') => {
    try {
        return await api.axios.post('/Login/ForgotPassword', { [inputType]: input });
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiChangePassword = async (hash: string, password: string) => {
    try {
        return await api.axios.post('/Login/ChangePassword', {
            hashedUsername: hash,
            password: await hashString(password),
        });
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiGetCatPicture = async (size?: number): Promise<Blob> => {
    try {
        return await axios.get('https://api.ai-cats.net/v1/cat', {
            params: { size: size ? size.toString() : '512', theme: 'all' },
        });
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiGetUserRating = async (request: { userId: number }) => {
    try {
        return await api.axios.get<number>('/User/GetUserRating', { params: { ...request } });
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiRateUser = async (request: {
    userWhoRatedId: number;
    ratedUserId: number;
    ratingValue: number;
    ratingText?: string;
}) => {
    try {
        return await api.axios.post('/User/RateUser', { ...request });
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};
