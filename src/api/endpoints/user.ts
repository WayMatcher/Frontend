import API from '@/api/api';
const api = new API();

import bcrypt from 'bcryptjs';

import User from '@/types/User/dto';
import Address from '@/types/Address/dto';
import Vehicle from '@/types/Vehicle/dto';

export const apiGetUser = async (request: { username?: string; email?: string; user?: User; userID?: number }) => {
    try {
        const response = await api.axios.get<User>('/getUserByID', { params: { ...request } });
        return response.data;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiSetUser = async (request: { username?: string; email?: string; user?: User; userID?: number }) => {
    try {
        const response = await api.axios.put<User>('/putUser', request);
        return response.data;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiAuthMFA = async (request: { token: string; username: string; email: string }) => {
    try {
        const hashedMFAToken: {
            token: string;
            username: string;
            email: string;
        } = {
            ...request,
            token: bcrypt.hashSync(request.token, 10),
        };

        const response = await api.axios.post<{ jwt: string; user: User }>('/MfA/MfAInput', hashedMFAToken);
        return response.data;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiAuthUser = async (request: { username: string; email: string; password: string }) => {
    try {
        const hashedUserLogin = {
            ...request,
            password: bcrypt.hashSync(request.password, 10),
        };

        const response = await api.axios.post('/login', hashedUserLogin);
        return response;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiRegisterUser = async (request: {
    user: User;
    address: Address;
    vehicle: Vehicle;
    password: string;
}) => {
    try {
        const hashedRequest = {
            ...request,
            password: bcrypt.hashSync(request.password, 10),
        };

        const response = await api.axios.put('/register', hashedRequest);
        return response.data;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};
