import API from '../../utils/api';
import { RequestEvent, ResponseEvent } from '../types/Event/api';

const api = new API();

export const getEvents = async (): Promise<ResponseEvent> => {
    try {
        const response = await api.axios.get<ResponseEvent>('/events');
        return response.data;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
}
