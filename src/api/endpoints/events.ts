import API from '../api';
import { EventsResponse } from '../../types/API';

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
                {
                    id: 3,
                    title: 'Event 3',
                    start_time: '2023-10-03',
                    created_at: '2023-09-03',
                    updated_at: '2023-09-03',
                    description: 'Description 3',
                    image: 'image3.jpg',
                    status: 'status 3',
                    created_by: 3,
                    stops: [
                        {
                            id: 5,
                            stop_sequence: 1,
                            address_id: 5,
                        },
                        {
                            id: 6,
                            stop_sequence: 2,
                            address_id: 6,
                        },
                    ],
                },
                {
                    id: 4,
                    title: 'Event 4',
                    start_time: '2023-10-04',
                    created_at: '2023-09-04',
                    updated_at: '2023-09-04',
                    description: 'Description 4',
                    image: 'image4.jpg',
                    status: 'status 4',
                    created_by: 4,
                    stops: [
                        {
                            id: 7,
                            stop_sequence: 1,
                            address_id: 7,
                        },
                        {
                            id: 8,
                            stop_sequence: 2,
                            address_id: 8,
                        },
                    ],
                },
                {
                    id: 5,
                    title: 'Event 5',
                    start_time: '2023-10-05',
                    created_at: '2023-09-05',
                    updated_at: '2023-09-05',
                    description: 'Description 5',
                    image: 'image5.jpg',
                    status: 'status 5',
                    created_by: 5,
                    stops: [
                        {
                            id: 9,
                            stop_sequence: 1,
                            address_id: 9,
                        },
                        {
                            id: 10,
                            stop_sequence: 2,
                            address_id: 10,
                        },
                    ],
                },
                {
                    id: 6,
                    title: 'Event 6',
                    start_time: '2023-10-06',
                    created_at: '2023-09-06',
                    updated_at: '2023-09-06',
                    description: 'Description 6',
                    image: 'image6.jpg',
                    status: 'status 6',
                    created_by: 6,
                    stops: [
                        {
                            id: 11,
                            stop_sequence: 1,
                            address_id: 11,
                        },
                        {
                            id: 12,
                            stop_sequence: 2,
                            address_id: 12,
                        },
                    ],
                },
                {
                    id: 7,
                    title: 'Event 7',
                    start_time: '2023-10-07',
                    created_at: '2023-09-07',
                    updated_at: '2023-09-07',
                    description: 'Description 7',
                    image: 'image7.jpg',
                    status: 'status 7',
                    created_by: 7,
                    stops: [
                        {
                            id: 13,
                            stop_sequence: 1,
                            address_id: 13,
                        },
                        {
                            id: 14,
                            stop_sequence: 2,
                            address_id: 14,
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
