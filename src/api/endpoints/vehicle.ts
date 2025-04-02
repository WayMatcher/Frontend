import API from '@/api/api';
const api = new API();
import Vehicle from '@/types/objects/Vehicle/dto';

/**
 * Fetches the list of vehicles associated with a user.
 *
 * @param request - The request object containing optional userId or username.
 * @returns A promise resolving to the list of vehicles.
 * @throws Will throw an error if the API call fails.
 */
export const apiGetVehicleList = async (request: { userId?: number; username?: string }) => {
    try {
        const response = await api.axios.get<Vehicle[]>('/User/GetVehicleList', { params: { ...request } });
        return response;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

/**
 * Updates the vehicle list for a user.
 *
 * @param request - The request object containing the vehicle list to be updated.
 * @returns A promise resolving to the API response.
 * @throws Will throw an error if the API call fails.
 */
export const apiSetVehicleList = async (request: { vehicleList?: Vehicle[] }) => {
    try {
        const response = await api.axios.put('/Vehicle/SetVehicle', request);
        return response;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};
