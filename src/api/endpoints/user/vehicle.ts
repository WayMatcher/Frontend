import { RequestVehicle, ResponseVehicle } from '../../../types/apiModels/VehicleModel';
import Vehicle from '../../../types/dto/Vehicle';

import API from "../../api";
const api = new API()

export const apiGetVehicle = async (request: RequestVehicle): Promise<ResponseVehicle> => {
    try {
        const response = await api.axios.get<ResponseVehicle>('/getVehicle', { params: { ...request } });
        return response.data;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiSetVehicle = async (request: Vehicle): Promise<ResponseVehicle> => {
    try {
        const response = await api.axios.put<ResponseVehicle>('/setVehicle', request);
        return response.data;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
}