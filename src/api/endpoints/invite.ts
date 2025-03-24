import API from '@/api/api';
const api = new API();

// Owner sends an invite to a user
export const apiSendInvite = async (request: {
    ownerUsername: string;
    username: string;
    eventId: number;
    message?: string;
}) => {
    try {
        return await api.axios.post('/Invite/SendInvite', { ...request });
    } catch (error) {
        throw api.handleApiError(error);
    }
};

// User asks to join an event
export const apiRequestInvite = async (request: { username: string; eventId: number; message?: string }) => {
    try {
        return await api.axios.post('/Invite/RequestInvite', { ...request });
    } catch (error) {
        throw api.handleApiError(error);
    }
};
