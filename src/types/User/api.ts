import { AxiosResponse } from "axios";
import API from '../../utils/api';
const api = new API();

import bcrypt from 'bcryptjs';

import User from "../User/dto";
import Address from "../Address/dto";
import Vehicle from "../Vehicle/dto";

// User
/**
 * Represents a user request model.
 * 
 * @interface RequestUser
 * 
 * @property {string} [username] - The username of the user. This field is optional.
 * @property {string} [email] - The email address of the user. This field is optional.
 * @property {User} [user] - The user object containing additional user details. This field is optional.
 */
export interface RequestUser {
    username?: string;
    email?: string;
    user?: User;
    userID?: number;
}

/**
 * Represents the response object for a user API call.
 * 
 * This type is a wrapper around the AxiosResponse object, 
 * where the response data is expected to conform to the `User` type.
 * 
 * @template User - The type of the user data contained in the response.
 */
export type ResponseUser = AxiosResponse<User>;


// Login
/**
 * Represents the data required for a user login request.
 * 
 * @interface RequestUserLogin
 * 
 * @property {string} username - The username of the user attempting to log in.
 * @property {string} email - The email address of the user attempting to log in.
 * @property {string} password - The password of the user attempting to log in.
 */
export interface RequestUserLogin {
    username: string;
    email: string;
    password: string;
}

/**
 * Represents the response type for a user login API call.
 * 
 * This type is an alias for `AxiosResponse`, which contains the HTTP response
 * details such as status, headers, and data returned from the server.
 * 
 * @see AxiosResponse
 */
export type ResponseUserLogin = AxiosResponse;


// Registration
/**
 * Represents the data required to register a new user.
 *
 * @property user - The user information to be registered.
 * @property password - The password chosen by the user.
 * @property confirmPassword - The confirmation of the chosen password to ensure it matches.
 */
export interface RequestUserRegister {
    user: User;
    address: Address;
    vehicle: Vehicle;
    password: string;
}

/**
 * Represents the response type for a user registration API call.
 * This type is based on the AxiosResponse object, which contains
 * the HTTP response details such as status, headers, and data.
 */
export type ResponseUserRegister = AxiosResponse;


// MFA Token
/**
 * Represents a request for an MFA (Multi-Factor Authentication) token.
 * This interface is used to provide the necessary information for
 * verifying or generating an MFA token.
 *
 * @property token - The MFA token provided by the user.
 * @property username - The username associated with the account.
 * @property email - The email address associated with the account.
 */
export interface MFATokenRequest {
    token: string;
    username: string;
    email: string;
}

/**
 * Represents the response from an API call that retrieves a user object
 * after Multi-Factor Authentication (MFA) token validation.
 *
 * This type is a wrapper around the `AxiosResponse` object, where the
 * response data contains a `User` object.
 */
export type MFATokenResponse = AxiosResponse<User>;


export const apiGetUser = async (request: RequestUser): Promise<ResponseUser> => {
    try {
        const response = await api.axios.get<ResponseUser>('/getUserByID', { params: { ...request } });
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