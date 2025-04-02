import API from '@/api/api';
import { Invite } from '@/types/objects/Invite/dto';
const api = new API();

/**
 * Sends an event invite to a user.
 *
 * @param request - The request object containing user ID, event ID, message, and pilot status.
 * @returns A promise resolving to the API response.
 * @throws Will throw an error if the API call fails.
 */
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

/**
 * Requests to join an event.
 *
 * @param request - The request object containing user ID, event ID, message, and pilot status.
 * @returns A promise resolving to the API response.
 * @throws Will throw an error if the API call fails.
 */
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

/**
 * Accepts an event invite.
 *
 * @param request - The request object containing user ID, event ID, and event role.
 * @returns A promise resolving to the API response.
 * @throws Will throw an error if the API call fails.
 */
export const apiAcceptInvite = async (request: { userId: number; eventId: number; eventRole: number }) => {
    try {
        return await api.axios.post('/Event/AddEventMember', { ...request });
    } catch (error) {
        throw api.handleApiError(error);
    }
};

/**
 * Accepts a request to join an event.
 *
 * @param request - The request object containing user ID, event ID, and event role.
 * @returns A promise resolving to the API response.
 * @throws Will throw an error if the API call fails.
 */
export const apiAcceptRequest = async (request: { userId: number; eventId: number; eventRole: number }) => {
    try {
        return await api.axios.post('/Event/AddEventMember', { ...request });
    } catch (error) {
        throw api.handleApiError(error);
    }
};

/**
 * Retrieves the list of invites for an event.
 *
 * @param request - The request object containing the event ID.
 * @returns A promise resolving to the list of invites.
 * @throws Will throw an error if the API call fails.
 */
export const apiGetInviteList = async (request: { eventId: number }) => {
    try {
        return await api.axios.post<Invite[]>('/Event/GetEventInvites', { ...request });
    } catch (error) {
        throw api.handleApiError(error);
    }
};
