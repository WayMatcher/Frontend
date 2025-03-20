import API from '@/api/api';
const api = new API();
import Vehicle from '@/types/objects/Vehicle/dto';

export const apiGetVehicle = async (request: { vehicle?: Vehicle; userID?: number; username?: string }) => {
    try {
        const response = await api.axios.get<Vehicle>('/getVehicle', { params: { ...request } });
        return response;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiSetVehicle = async (request: { vehicle?: Vehicle; userID?: number; username?: string }) => {
    try {
        const response = await api.axios.put('/setVehicle', request);
        return response;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};
