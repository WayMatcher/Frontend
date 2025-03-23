import API from '@/api/api';
import Notification from '@/types/objects/Notification/dto';
const api = new API();

export const apiGetInbox = async (request: { userID?: number; username?: string; email?: string }) => {
    try {
        const response = await api.axios.get<Notification[]>('/User/GetNotifications', { params: { ...request } });
        return response;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};
