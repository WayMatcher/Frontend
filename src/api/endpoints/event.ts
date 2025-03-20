import API from '@/api/api';
import WMEvent from '@/types/Event/dto';
const api = new API();

export const getEvents = async (request?: { eventIDs?: number[] }) => {
    if (request) {
        try {
            const response = await api.axios.get<{
                events: WMEvent[];
            }>('/events', { params: { ...request } });
            return response.data;
        } catch (error) {
            api.handleApiError(error);
            throw error;
        }
    } else {
        try {
            const response = await api.axios.get<{
                events: WMEvent;
            }>('/events');
            return response.data;
        } catch (error) {
            api.handleApiError(error);
            throw error;
        }
    }
};

export const getEvent = async (request: { eventID: number }) => {
    try {
        const response = await api.axios.get<{
            event: WMEvent;
        }>('/event', { params: { ...request } });
        return response.data;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};
