import API from '@/api/api';
import WMEvent from '@/types/objects/Event/dto';
import Stop from '@/types/objects/Stop/dto';
import User from '@/types/objects/User/dto';
const api = new API();

export const apiGetEventList = async (request: { isPilot?: boolean }) => {
    try {
        const response = await api.axios.get<WMEvent[]>('/Event/GetEventList', { params: { ...request } });
        return response;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const getEvent = async (request: { eventid: number }) => {
    try {
        const response = await api.axios.get<WMEvent>('/Event/GetEvent', { params: { ...request } });
        return response;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const createEvent = async (request: { user: User; wmevent: WMEvent; stops: Stop[]; schedule: Schedule }) => {
    try {
        const response = await api.axios.get<WMEvent>('/Event/CreateEvent', { params: { ...request } });
        return response;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};
