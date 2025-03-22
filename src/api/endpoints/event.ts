import WMEvent from '@/types/objects/Event/dto';
import User from '@/types/objects/User/dto';

const fakeWMEvents: WMEvent[] = [
    {
        id: 1,
        created_by: 101,
        title: 'Sample Event 1',
        description: 'This is a sample event description.',
        start_time: '2023-10-01T10:00:00Z',
        stops: [],
        image: 'https://example.com/image1.jpg',
        status: 'active',
        created_at: '2023-09-01T10:00:00Z',
        updated_at: '2023-09-15T10:00:00Z',
    },
    {
        id: 2,
        created_by: 4,
        title: 'Sample Event 2',
        description: 'Another sample event description.',
        start_time: '2023-10-05T14:00:00Z',
        stops: [],
        image: 'https://example.com/image2.jpg',
        status: 'inactive',
        created_at: '2023-09-05T14:00:00Z',
        updated_at: '2023-09-20T14:00:00Z',
    },
];

export const getEvents = async (request?: { eventIDs?: number[] }) => {
    if (request?.eventIDs) {
        return {
            data: fakeWMEvents.filter((event) => request.eventIDs?.includes(event.id)),
        };
    } else {
        return { data: fakeWMEvents };
    }
};

export const getEvent = async (request: { eventID: number }) => {
    const event = { data: fakeWMEvents.find((event) => event.id === request.eventID) };
    if (!event) {
        throw new Error('Event not found');
    }
    return event;
};

export const createEvent = async (request: { title: string; description: string; start_time: string }, user: User) => {
    if (user.id) {
        const newEvent = {
            id: fakeWMEvents.length + 1,
            created_by: user.id,
            title: request.title,
            description: request.description,
            start_time: request.start_time,
            stops: [],
            image: 'https://example.com/image3.jpg',
            status: 'active',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };
        fakeWMEvents.push(newEvent);
        return { data: newEvent };
    } else {
        throw new Error('User not found');
    }
};
