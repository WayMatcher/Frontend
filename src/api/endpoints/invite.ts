import API from '@/api/api';
const api = new API();

// Owner sends an invite to a user
export const apiSendInvite = async (request: {
    userId: number;
    eventId?: number;
    message?: string;
    isPilot: boolean;
}) => {
    try {
        if (!request.eventId) throw new Error('No event ID provided');
        return await api.axios.post('/Event/SendEventInvite', { ...request });
    } catch (error) {
        throw api.handleApiError(error);
    }
};

// User asks to join an event
export const apiRequestInvite = async (request: {
    userId: number;
    eventId?: number;
    message?: string;
    isPilot: boolean;
}) => {
    try {
        if (!request.eventId) throw new Error('No event ID provided');
        return await api.axios.post('/Event/RequestEventInvite', { ...request });
    } catch (error) {
        throw api.handleApiError(error);
    }
};
