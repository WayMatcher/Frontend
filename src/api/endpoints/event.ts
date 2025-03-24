import API from '@/api/api';
import WMEvent from '@/types/objects/Event/dto';
import Stop from '@/types/objects/Stop/dto';
import User from '@/types/objects/User/dto';
import Schedule from '@/types/objects/Schedule/dto';

const api = new API();

export const apiGetEventList = async (request: { isPilot?: boolean }) => {
    try {
        return await api.axios.get<WMEvent[]>('/Event/GetEventList', { params: { ...request } });
    } catch (error) {
        throw api.handleApiError(error);
    }
};

export const getEvent = async (request: { eventid: number }) => {
    try {
        return await api.axios.get<WMEvent>('/Event/GetEvent', { params: { ...request } });
    } catch (error) {
        throw api.handleApiError(error);
    }
};

export const createEvent = async (request: { user: User; wmevent: WMEvent; stops: Stop[]; schedule: Schedule }) => {
    try {
        return await api.axios.get<WMEvent>('/Event/CreateEvent', { params: { ...request } });
    } catch (error) {
        throw api.handleApiError(error);
    }
};
