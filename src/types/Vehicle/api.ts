import { AxiosResponse } from "axios";
import API from '../../utils/api';
const api = new API()
import Vehicle from "./dto";

/**
 * Represents a request for a vehicle.
 *
 * @interface RequestVehicle
 * @property {Vehicle} [vehicle] - The vehicle object associated with the request (optional).
 * @property {number} [id] - The unique identifier for the request (optional).
 */
export interface RequestVehicle {
    vehicle?: Vehicle;
    userID?: number;
    username?: string;
}

/**
 * Represents the response object for a vehicle API call.
 * 
 * This type is a wrapper around the `AxiosResponse` type, specifically
 * for responses that return a `Vehicle` object.
 * 
 * @typedef {AxiosResponse<Vehicle>} ResponseVehicle
 */
export type ResponseVehicle = AxiosResponse<Vehicle>;


export const apiGetVehicle = async (request: RequestVehicle): Promise<ResponseVehicle> => {
    try {
        const response = await api.axios.get<ResponseVehicle>('/getVehicle', { params: { ...request } });
        return response.data;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiSetVehicle = async (request: RequestVehicle): Promise<ResponseVehicle> => {
    try {
        const response = await api.axios.put<ResponseVehicle>('/setVehicle', request);
        return response.data;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
}