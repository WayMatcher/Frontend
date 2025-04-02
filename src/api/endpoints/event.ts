import API from '@/api/api';
import WMEvent from '@/types/objects/Event/dto';
import Stop from '@/types/objects/Stop/dto';
import User from '@/types/objects/User/dto';
import Schedule from '@/types/objects/Schedule/dto';

const api = new API();

/**
 * Fetches a list of events based on the provided request parameters.
 *
 * @param request - The request object containing optional user ID or pilot status.
 * @returns A promise resolving to the list of events.
 * @throws Will throw an error if the API call fails.
 */
export const apiGetEventList = async (request: { isPilot?: boolean; userId?: number }) => {
    if (request.userId) {
        try {
            return await api.axios.get<WMEvent[]>('/Event/GetUserEventList', { params: { userId: request.userId } });
        } catch (error) {
            throw api.handleApiError(error);
        }
    } else {
        try {
            return await api.axios.get<WMEvent[]>('/Event/GetEventList', { params: { isPilot: request.isPilot } });
        } catch (error) {
            throw api.handleApiError(error);
        }
    }
};

/**
 * Fetches details of a specific event.
 *
 * @param request - The request object containing the event ID.
 * @returns A promise resolving to the event details.
 * @throws Will throw an error if the API call fails.
 */
export const apiGetEvent = async (request: { eventId: number }) => {
    try {
        return await api.axios.get<WMEvent>('/Event/GetEvent', { params: { ...request } });
    } catch (error) {
        throw api.handleApiError(error);
    }
};

/**
 * Creates a new event.
 *
 * @param request - The request object containing user and event details.
 * @returns A promise resolving to the created event.
 * @throws Will throw an error if the API call fails.
 */
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

/**
 * Updates an existing event.
 *
 * @param request - The request object containing user and event details.
 * @returns A promise resolving to the updated event.
 * @throws Will throw an error if the API call fails.
 */
export const apiUpdateEvent = async (request: {
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
        return await api.axios.post<WMEvent>('/Event/UpdateEvent', { ...request });
    } catch (error) {
        throw api.handleApiError(error);
    }
};

/**
 * Deletes an event.
 *
 * @param request - The request object containing the event ID.
 * @returns A promise resolving to the deletion result.
 * @throws Will throw an error if the API call fails.
 */
export const apiDeleteEvent = async (request: { eventId: number }) => {
    try {
        return await api.axios.post('/Event/DeleteEvent', request.eventId);
    } catch (error) {
        throw api.handleApiError(error);
    }
};
