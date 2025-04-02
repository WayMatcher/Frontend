import axios, { AxiosInstance } from 'axios';

/**
 * API class for handling HTTP requests and managing API errors.
 */
export default class API {
    /**
     * The base URL for the API.
     */
    public readonly BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

    /**
     * Axios instance for making HTTP requests.
     */
    public axios: AxiosInstance;

    constructor() {
        this.axios = this.createAxiosInstance();
    }

    /**
     * Creates a new Axios instance with default configuration.
     *
     * @returns A configured Axios instance.
     */
    private createAxiosInstance(): AxiosInstance {
        return axios.create({
            baseURL: this.BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
    }

    /**
     * Handles errors from API requests, differentiating between various types of errors.
     *
     * @param error - The error object to handle.
     * @returns The error object after handling.
     * @throws Will throw an error with a specific message based on the type of error encountered.
     */
    handleApiError(error: unknown): unknown {
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors (e.g., network issues, timeouts)
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('API Error:', error.response.status, error.response.data);

                // Example: Check for specific status codes and handle them
                if (error.response.status === 401) {
                    // Unauthorized - Redirect to login or show an error message
                    console.warn('Unauthorized: Please log in again.');
                } else if (error.response.status === 400) {
                    console.warn('Bad Request: Check your data');
                } else if (error.response.status === 404) {
                    // Not Found - Handle appropriately (e.g., display a 404 message)
                    console.warn('Resource not found.');
                } else {
                    // Other server errors (5xx)
                    console.error('Server Error:', error.response.status, error.response.data);
                }
                return error;
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Network Error: No response received.', error.request);
                return error;
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Request Setup Error:', error.message);
                return error;
            }
        } else {
            // Handle non-Axios errors (e.g., errors in your code)
            console.error('Generic Error:', error);
            return error;
        }
    }
}
