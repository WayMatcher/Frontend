import API from '@/api/api';
const api = new API();
import Vehicle from '@/types/objects/Vehicle/dto';

export const apiGetVehicleList = async (request: { vehicle?: Vehicle; userID?: number; username?: string }) => {
    try {
        const response = await api.axios.get<Vehicle[]>('/User/GetVehicleList', { params: { ...request } });
        return response;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiSetVehicle = async (request: { vehicle?: Vehicle }) => {
    try {
        const response = await api.axios.put('/Vehicle/SetVehicle', request);
        return response;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};
