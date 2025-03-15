import API from './api';
import { EventsResponse } from '../types/API';

const api = new API();

export const getEvents = async (): Promise<EventsResponse> => {
    try {
        //const response = await api.post('/getEvents', {});

        // Mock response data
        const mockResponse: EventsResponse = {
            succeeded: true,
            message: 'Success',
            events: [
                {
                    id: 1,
                    title: 'Event 1',
                    start_time: '2023-10-01',
                    created_at: '2023-09-01',
                    updated_at: '2023-09-01',
                    description: 'Description 1',
                    image: 'image1.jpg',
                    status: 'status 1',
                    created_by: 1,
                    stops: [
                        {
                            id: 1,
                            stop_sequence: 1,
                            address_id: 1,
                        },
                        {
                            id: 2,
                            stop_sequence: 2,
                            address_id: 2,
                        },
                    ],
                },
                {
                    id: 2,
                    title: 'Event 2',
                    start_time: '2023-10-02',
                    created_at: '2023-09-02',
                    updated_at: '2023-09-02',
                    description: 'Description 2',
                    image: 'image2.jpg',
                    status: 'status 2',
                    created_by: 2,
                    stops: [
                        {
                            id: 3,
                            stop_sequence: 1,
                            address_id: 3,
                        },
                        {
                            id: 4,
                            stop_sequence: 2,
                            address_id: 4,
                        },
                    ],
                },
            ],
        };

        return mockResponse;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
}
