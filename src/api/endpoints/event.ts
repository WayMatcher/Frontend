import API from '@/api/api';
import WMEvent from '@/types/objects/Event/dto';
import Stop from '@/types/objects/Stop/dto';
import User from '@/types/objects/User/dto';
import Schedule from '@/types/objects/Schedule/dto';

const api = new API();

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

export const apiGetRoute = async (request: {
    origin: { latitude: number; longitude: number };
    destination: { latitude: number; longitude: number };
    waypoints: { latitude: number; longitude: number }[];
}) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

    if (!apiKey) {
        throw new Error('Google Maps API key is missing!');
    }

    const waypointsParam = request.waypoints.map((wp) => `${wp.latitude},${wp.longitude}`).join('|');

    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${request.origin.latitude},${request.origin.longitude}&destination=${request.destination.latitude},${request.destination.longitude}&waypoints=${waypointsParam}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch route data');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
