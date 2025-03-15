import axios, { AxiosInstance } from 'axios';

export default class API {
    public readonly BASE_URL: string = import.meta.env.API_BASE_URL;
    public axios: AxiosInstance;

    constructor() {
        this.axios = this.createAxiosInstance();
        this.setupInterceptors();
    }

    private createAxiosInstance(): AxiosInstance {
        return axios.create({
            baseURL: this.BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    private setupInterceptors() {
        this.axios.interceptors.request.use(
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
    handleApiError(error: unknown) {
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
    }
}