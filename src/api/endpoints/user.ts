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

/**
 * Fetches user details based on the provided request parameters.
 *
 * @param request - The request object containing user details like username, email, or userID.
 * @returns A promise resolving to the user details.
 * @throws Will throw an error if the API call fails.
 */
export const apiGetUser = async (request: { username?: string; email?: string; user?: User; userID?: number }) => {
    try {
        return await api.axios.get<User>('/User/GetUser', { params: { ...request } });
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

/**
 * Updates user details and optionally hashes the password before sending the request.
 *
 * @param request - The request object containing user details and an optional password.
 * @returns A promise resolving to the updated user details.
 * @throws Will throw an error if the API call fails.
 */
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

/**
 * Authenticates a user using Multi-Factor Authentication (MFA).
 *
 * @param request - The request object containing the MFA token and user ID.
 * @returns A promise resolving to the authenticated user details.
 * @throws Will throw an error if the API call fails.
 */
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

/**
 * Authenticates a user using their username, email, and password.
 *
 * @param request - The request object containing the username, email, and password.
 * @returns A promise resolving to the user ID.
 * @throws Will throw an error if the API call fails.
 */
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

/**
 * Registers a new user with the provided details and password.
 *
 * @param request - The request object containing user details, vehicle list, and password.
 * @returns A promise resolving to the registration response.
 * @throws Will throw an error if the API call fails.
 */
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

/**
 * Fetches a list of usernames for inviting users to an event.
 *
 * @returns A promise resolving to the list of users.
 * @throws Will throw an error if the API call fails.
 */
export const apiGetUsernameList = async () => {
    try {
        return await api.axios.get<User[]>('/Event/GetUserToInvite');
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

/**
 * Initiates the forgot password process for a user.
 *
 * @param input - The input value (email or username) for the forgot password request.
 * @param inputType - The type of input ('email' or 'username').
 * @returns A promise resolving to the forgot password response.
 * @throws Will throw an error if the API call fails.
 */
export const apiForgotPassword = async (input: string, inputType: 'email' | 'username') => {
    try {
        return await api.axios.post('/Login/ForgotPassword', { [inputType]: input });
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

/**
 * Changes the password for a user.
 *
 * @param hash - The hashed username.
 * @param password - The new password.
 * @returns A promise resolving to the change password response.
 * @throws Will throw an error if the API call fails.
 */
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

/**
 * Fetches a random cat picture.
 *
 * @param size - The size of the cat picture (optional).
 * @returns A promise resolving to the cat picture blob.
 * @throws Will throw an error if the API call fails.
 */
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

/**
 * Fetches the rating of a user.
 *
 * @param request - The request object containing the user ID.
 * @returns A promise resolving to the user rating.
 * @throws Will throw an error if the API call fails.
 */
export const apiGetUserRating = async (request: { userId: number }) => {
    try {
        return await api.axios.get<number>('/User/GetUserRating', { params: { ...request } });
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

/**
 * Rates a user based on the provided rating details.
 *
 * @param request - The request object containing the rating details.
 * @returns A promise resolving to the rate user response.
 * @throws Will throw an error if the API call fails.
 */
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

/**
 * Deletes a user based on the provided user ID.
 *
 * @param request - The request object containing the user ID.
 * @returns A promise resolving to the delete user response.
 * @throws Will throw an error if the API call fails.
 */
export const apiDeleteUser = async (request: { userId: number }) => {
    try {
        return await api.axios.post('/User/DeleteUser', { ...request });
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};
