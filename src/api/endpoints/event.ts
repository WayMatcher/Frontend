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

export const apiGetEvent = async (request: { eventId: number }) => {
    try {
        return await api.axios.get<WMEvent>('/Event/GetEvent', { params: { ...request } });
    } catch (error) {
        throw api.handleApiError(error);
    }
};

export const apiCreateEvent = async (request: {
    user: User;
    event: {
        description: string;
        freeSeats: number;
        startTimestamp: string;
        eventTypeId: number;
        stopList: Stop[];
        schedule: Schedule;
    };
}) => {
    try {
        return await api.axios.post<WMEvent>('/Event/CreateEvent', { ...request });
    } catch (error) {
        throw api.handleApiError(error);
    }
};

export const apiUpdateEvent = async (request: { eventId: number; event: WMEvent }) => {
    try {
        return await api.axios.post<WMEvent>('/Event/UpdateEvent', { ...request });
    } catch (error) {
        throw api.handleApiError(error);
    }
};

export const apiDeleteEvent = async (request: { eventId: number }) => {
    try {
        return await api.axios.post('/Event/DeleteEvent', request.eventId);
    } catch (error) {
        throw api.handleApiError(error);
    }
};
