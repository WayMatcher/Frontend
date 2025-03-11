import axios, { AxiosInstance } from 'axios';
import bcrypt from 'bcryptjs';

import { LoginCredentials, LoginResponse, MFAResponse } from '../types/api';

// * How the authentication flow works:
// 1. User enters username and password in frontend
// 2. Frontend sends credentials to backend (eg. /api/login)
// 3. Backend checks user credentials
// 4. If credentials are correct, backend sends user a MFA token
// 5. User enters MFA token in frontend
// 6. Frontend sends MFA token to backend
// 7. Backend validates MFA token
// 8. If MFA token is valid, backend sends JWT to frontend
// 9. Frontend stores JWT in local storage
// 10. Frontend sends JWT with every request to backend


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



// --- Authentication ---
export const loginUser = async (credentials: LoginCredentials) => {
    try {
        // Sends the credentials, hashed via bcrypt to the backend
        const response = await api.post('/auth/login', {
            username: credentials.username,
            password: await bcrypt.hash(credentials.password, 10)
        });

        return response.data as LoginResponse; // Assuming the API returns { user: User }
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};


export const mfaAuthUser = async (mfaToken: string) => {
    try {
        const response = await api.post('/auth/mfa', { mfaToken });
        return response.data as MFAResponse; // Assuming your API returns { user: User, JWT: string }
    } catch (error) {
        handleApiError(error);
        throw error;
    }
}

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