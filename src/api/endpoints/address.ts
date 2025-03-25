import axios, { AxiosResponse } from 'axios';
import API from '@/api/api';
const api = new API();

import Address, {
    GetHereAddressRequest,
    HereApiError,
    HereApiErrorResponse,
    HereApiResponse,
} from '@/types/objects/Address/dto';

export const apiGetAddress = async (request: {
    userID?: number;
    username?: string;
    email?: string;
    address?: Address;
}) => {
    try {
        const response = await api.axios.get<Address>('/User/GetAddress', { params: { ...request } });
        return response;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiSetAddress = async (request: { address: Address; userId: number }) => {
    try {
        const response = await api.axios.put<AxiosResponse>('/setAddress', request);
        return response;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

/**
 * Fetches address suggestions from the HERE Geocoding and Search API.
 * @param request - The request object containing the search query ('q').
 * @returns A promise that resolves to the AxiosResponse containing the HereApiResponse.
 * @throws {HereApiError} If the HERE API returns an error.
 * @throws {Error} If there's a network error or a missing API key.
 */
export const getHEREAddress = async (request: GetHereAddressRequest): Promise<AxiosResponse<HereApiResponse>> => {
    try {
        if (!import.meta.env.VITE_HERE_API_KEY) {
            throw new Error('HERE API key is missing!');
        }

        const url = 'https://geocode.search.hereapi.com/v1/geocode';
        const params = {
            ...request,
            apiKey: import.meta.env.VITE_HERE_API_KEY,
        };

        return await axios.get<HereApiResponse>(url, { params });
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const errorData: HereApiErrorResponse = error.response.data;
            throw new HereApiError(errorData);
        } else if (error instanceof Error) {
            // Something else happened while setting up or processing the request
            throw new Error(`Error fetching HERE address: ${error.message}`);
        } else {
            throw new Error(`An unexpected error occurred`);
        }
    }
};
