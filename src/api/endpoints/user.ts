import API from '@/api/api';
const api = new API();

import User from '@/types/objects/User/dto';
import Vehicle from '@/types/objects/Vehicle/dto';

const hashString = async (string: string): Promise<string> => {
    const buffer = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(string));
    return Array.from(new Uint8Array(buffer))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
};

export const apiGetUser = async (request: { username?: string; email?: string; user?: User; userID?: number }) => {
    try {
        const response = await api.axios.get<User>('/User/GetUser', { params: { ...request } });
        return response;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiSetUser = async (request: { username?: string; email?: string; user?: User; userID?: number }) => {
    try {
        const response = await api.axios.put<User>('/putUser', request);
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

export const apiRegisterUser = async (request: { user: User; vehicleList?: Vehicle[]; password: string }) => {
    try {
        const hashedRequest = {
            ...request,
            password: await hashString(request.password),
        };

        console.log(hashedRequest);
        return await api.axios.post('/Register/NewUser', hashedRequest);
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiGetUsernameList = async () => {
    try {
        return await api.axios.get<string[]>('/User/GetUsernameList');
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiRequestPasswordReset = async (input: string, inputType: 'email' | 'username') => {
    try {
        return await api.axios.post('/User/RequestPasswordReset', { [inputType]: input });
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiSetPassword = async (userId: string, password: string) => {
    try {
        return await api.axios.post('/User/RequestPasswordReset', { userId: userId, password: hashString(password) });
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};
