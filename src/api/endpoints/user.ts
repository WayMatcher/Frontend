import API from '@/api/api';
const api = new API();

import bcrypt from 'bcryptjs';

import User from '@/types/objects/User/dto';
import Vehicle from '@/types/objects/Vehicle/dto';

export const apiGetUser = async (request: { username?: string; email?: string; user?: User; userID?: number }) => {
    try {
        const response = await api.axios.get<User>('/getUserByID', { params: { ...request } });
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
        const hashedMFAToken: {
            token: string;
            userID: number;
        } = {
            userID: request.userID,
            //token: bcrypt.hashSync(request.token, 10),
            token: request.token,
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
            //password: bcrypt.hashSync(request.password, 10),
            password: request.password,
        };

        return await api.axios.post<number>('/login/loginuser', hashedUserLogin);
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiRegisterUser = async (request: { user: User; vehicle: Vehicle; password: string }) => {
    try {
        const hashedRequest = {
            ...request,
            password: bcrypt.hashSync(request.password, 10),
        };

        const response = await api.axios.put('/register', hashedRequest);
        return response;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};
