import { AxiosResponse } from 'axios';
import API from '@/api/api';
const api = new API();

import Address from '@/types/objects/Address/dto';

export const apiGetAddress = async (request: {
    userID?: number;
    username?: string;
    email?: string;
    address?: Address;
}) => {
    try {
        const response = await api.axios.get<Address>('/getAddress', { params: { request } });
        return response;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiSetAddress = async (request: { address: Address; userID: number }) => {
    try {
        const response = await api.axios.put<AxiosResponse>('/setAddress', request);
        return response;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};
