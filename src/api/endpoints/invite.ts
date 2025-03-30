import API from '@/api/api';
import { Invite } from '@/types/objects/Invite/dto';
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

export const apiAcceptInvite = async (request: { userId: number; eventId: number; eventRole: number }) => {
    try {
        return await api.axios.post('/Event/AddEventMember', { ...request });
    } catch (error) {
        throw api.handleApiError(error);
    }
};

export const apiAcceptRequest = async (request: { userId: number; eventId: number; eventRole: number }) => {
    try {
        return await api.axios.post('/Event/AddEventMember', { ...request });
    } catch (error) {
        throw api.handleApiError(error);
    }
};

export const apiGetInviteList = async (request: { eventId: number }) => {
    try {
        return await api.axios.post<Invite[]>('/Event/GetEventInvites', { ...request });
    } catch (error) {
        throw api.handleApiError(error);
    }
};
