import axios, { AxiosInstance } from 'axios';
import bcrypt from 'bcryptjs';

import { LoginCredentials, LoginResponse, MFAResponse } from '../types/api';
import { User } from '../types/user';

// * How the authentication flow works:
// 1. User enters username and password in frontend
// 2. Frontend sends username and password to the backend
// 3. Backend checks if the username and password are correct
// 4. If correct, the backend sends a MFA Token to the users email
// 5. User enters the MFA Token in the frontend
// 6. Frontend sends the MFA Token to the backend
// 7. Backend checks if the MFA Token is correct
// 8. If correct, the backend sends a JWT to the frontend
// 9. Frontend stores the JWT in the local storage


const api: AxiosInstance = axios.create({
    baseURL: 'https://waymatcher.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem('user');
        const token = user ? JSON.parse(user).token : "";
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



/**
 * Authenticates a user with the provided credentials.
 *
 * @param credentials - The login credentials containing either a username or email and a password.
 * @returns A promise that resolves to a `LoginResponse` object containing authentication details.
 * @throws Will throw an error if the authentication request fails.
 */
export const authUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
        const response = await api.post('/auth/login', { user: credentials.user, password: bcrypt.hashSync(credentials.password, 10) });

        return response.data as LoginResponse;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

/**
 * Authenticates a user using multi-factor authentication (MFA).
 *
 * @param user - The user object containing user details.
 * @param mfaToken - The MFA token provided by the user.
 * @returns A promise that resolves to an MFAResponse object.
 * @throws Will throw an error if the API request fails.
 */
export const mfaAuthUser = async (user: User, mfaToken: string): Promise<MFAResponse> => {
    try {
        const response = await api.post('/auth/mfa', { user: user, mfaToken: bcrypt.hash(mfaToken, 10) });
        return response.data as MFAResponse;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
}

/**
 * Handles errors from API requests, specifically those made using Axios.
 * Differentiates between various types of errors (e.g., network issues, server responses, request setup errors)
 * and logs appropriate messages to the console. Throws an error with a relevant message based on the type of error.
 *
 * @param error - The error object to handle. Can be an Axios error or a generic error.
 *
 * @throws {Error} Throws an error with a specific message based on the type of error encountered.
 */
const handleApiError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors (e.g., network issues, timeouts)
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("API Error:", error.response.status, error.response.data);

            // Example: Check for specific status codes and handle them
            if (error.response.status === 401) {
                // Unauthorized - Redirect to login or show an error message
                console.warn("Unauthorized: Please log in again.");
                // You might want to clear the user context here: setUser(null);
            } else if (error.response.status === 400) {
                console.warn("Bad Request: Check your data");
            } else if (error.response.status === 404) {
                // Not Found - Handle appropriately (e.g., display a 404 message)
                console.warn("Resource not found.");
            } else {
                // Other server errors (5xx)
                console.error("Server Error:", error.response.status, error.response.data);
            }
            throw new Error(error.response.data.message || "An error occurred with your request");

        } else if (error.request) {
            // The request was made but no response was received
            console.error("Network Error: No response received.", error.request);
            throw new Error("Network Error: Could not connect to the server.");
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Request Setup Error:", error.message);
            throw new Error("An unexpected error occurred. Please try again later.");
        }
    } else {
        // Handle non-Axios errors (e.g., errors in your code)
        console.error("Generic Error:", error);
        throw new Error("An unexpected error occurred. Please try again later.");
    }
};