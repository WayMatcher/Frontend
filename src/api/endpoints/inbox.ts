import API from '@/api/api';
import Notification from '@/types/objects/Notification/dto';
const api = new API();

export const apiGetInbox = async (request: { userId?: number; username?: string; email?: string }) => {
    try {
        const response = await api.axios.get<Notification[]>('/User/GetNotification', { params: { ...request } });
        return response;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};

export const apiMarkNotificationAsRead = async (request: { notificationId: number }) => {
    try {
        const response = await api.axios.post('/User/ReadNotification', request.notificationId);
        return response;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
};
