import { AxiosResponse } from 'axios';
import API from '@/api/api';
const api = new API();

import Address from '@/types/Address/dto';

/**
 * Represents a request address model.
 * This interface is used to define the structure of an address-related request.
 *
 * @property {string} [username] - The username associated with the request (optional).
 * @property {string} [email] - The email address associated with the request (optional).
 * @property {Address} [address] - The address details associated with the request (optional).
 */
export interface RequestAddress {
    userID?: number;
    username?: string;
    email?: string;
    address?: Address;
}

/**
 * Represents the response object for an API call that returns an `Address`.
 * This type is based on the `AxiosResponse` generic type, where the response
 * data is expected to be of type `Address`.
 */
export type ResponseAddress = AxiosResponse<Address>;

export const apiGetAddress = async (request: RequestAddress): Promise<ResponseAddress> => {
    try {
        const response = await api.axios.get<ResponseAddress>('/getAddress', { params: { request } });
        return response.data;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiSetAddress = async (request: RequestAddress): Promise<AxiosResponse> => {
    try {
        const response = await api.axios.put<AxiosResponse>('/setAddress', request);
        return response;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};
