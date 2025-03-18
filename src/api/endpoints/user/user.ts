import { MFATokenRequest, MFATokenResponse, RequestUser, RequestUserLogin, RequestUserRegister, ResponseUser, ResponseUserLogin, ResponseUserRegister } from '../../../types/apiModels/UserModel';

import bcrypt from 'bcryptjs';

import API from "../../api";

const api = new API();

export const apiGetUserByID = async (request: RequestUser): Promise<ResponseUser> => {
    try {
        const response = await api.axios.get<ResponseUser>('/getUserByID', { params: { ...request } });
        return response.data;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiGetUserByUsername = async (request: RequestUser): Promise<ResponseUser> => {
    try {
        const response = await api.axios.get<ResponseUser>('/getUserByUsername', { params: { ...request } });
        return response.data;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiSetUser = async (request: RequestUser): Promise<ResponseUser> => {
    try {
        const response = await api.axios.put<ResponseUser>('/putUser', request);
        return response.data;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
}

export const apiAuthMFA = async (request: MFATokenRequest): Promise<MFATokenResponse> => {
    try {
        const hashedMFAToken: MFATokenRequest = {
            ...request,
            token: bcrypt.hashSync(request.token, 10),
        }

        const response = await api.axios.post('/auth/mfa', hashedMFAToken);
        return response.data;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiAuthUser = async (request: RequestUserLogin): Promise<ResponseUserLogin> => {
    try {
        const hashedUserLogin: RequestUserLogin = {
            ...request,
            password: bcrypt.hashSync(request.password, 10),
        }

        const response = await api.axios.post<ResponseUserLogin>('/login', hashedUserLogin);
        return response.data;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiRegisterUser = async (request: RequestUserRegister): Promise<ResponseUserRegister> => {
    try {
        const hashedRequest: RequestUserRegister = {
            ...request,
            password: bcrypt.hashSync(request.password, 10),
        };

        const response = await api.axios.put<ResponseUserRegister>('/register', hashedRequest);
        return response.data;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
}