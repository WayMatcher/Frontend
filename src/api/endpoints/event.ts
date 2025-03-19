import API from '@/api/api';
import WMEvent from '@/types/Event/dto';
const api = new API();

interface ResponseEvent {
    events: WMEvent;
}

interface ResponseEvents {
    events: WMEvent[];
}

interface RequestEvent {
    eventID?: number;
}

interface RequestEvents {
    eventIDs?: number[];
}

export const getEvents = async (request?: RequestEvents): Promise<ResponseEvents> => {
    if (request) {
        try {
            const response = await api.axios.get<ResponseEvents>('/events', { params: { ...request } });
            return response.data;
        } catch (error) {
            api.handleApiError(error);
            throw error;
        }
    } else {
        try {
            const response = await api.axios.get<ResponseEvents>('/events');
            return response.data;
        } catch (error) {
            api.handleApiError(error);
            throw error;
        }
    }
};

export const getEvent = async (request: RequestEvent): Promise<ResponseEvent> => {
    try {
        const response = await api.axios.get<ResponseEvent>('/events', { params: { ...request } });
        return response.data;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};
