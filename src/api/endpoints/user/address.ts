import { RequestAddress, ResponseAddress } from "../../../types/apiModels/AddressModel";

import API from "../../api";
const api = new API();

export const apiGetAddress = async (request: RequestAddress): Promise<ResponseAddress> => {
    try {
        const response = await api.axios.get<ResponseAddress>('/getAddress', { params: { request } });
        return response.data;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiSetAddress = async (request: RequestAddress): Promise<ResponseAddress> => {
    try {
        const response = await api.axios.put<ResponseAddress>('/setAddress', request);
        return response.data;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
}