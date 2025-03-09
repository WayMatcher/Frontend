import axios, { AxiosInstance } from 'axios';
import { User } from '../types/user';

const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // Replace with your C# API's URL
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
export const loginUser = async (credentials: Pick<User, 'username' | 'email'> & { password: string }): Promise<{ user: User, token: string }> => {
    try {
        // const response = await api.post('/auth/login', credentials);
        // The C# server needs to answer with the needed User Data and token.
        // return response.data; // Assuming your API returns { user: User, token: string }

        // Mock response
        const mockResponse = {
            user: {
                id: 1,
                username: credentials.username || 'testuser',
                email: credentials.email || 'testuser@example.com',
                // Add other user fields as needed
            },
            token: 'mock-token-123456'
        };
        return mockResponse;
    } catch (error) {
        handleApiError(error); // You'll need an error handler
        throw error; // Ensure the function always returns or throws
    }
};

// --- Registration ---
// ! TODO - Implement the registerUser function
// * This function should send a POST request to the server to register a new user.
/* export const registerUser = async (userData: Omit<User, 'id'>): Promise<{ user: User, token: string }> => { //Exclude id, it's likely auto-generated
    try {
        // const response = await api.post('/auth/register', userData);
        // return response.data;

        // Mock response
        const mockResponse = {
            user: {
                id: 1,
                ...userData
            },
            token: 'mock-token-123456'
        };
        return mockResponse;
    } catch (error: unknown) {
        handleApiError(error);
    }
}; */

// --- Update User Data ---
export const updateUser = async (userId: number, userData: Partial<User>) => {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
};

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