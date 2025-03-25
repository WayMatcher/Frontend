import Stop from '@/types/objects/Stop/dto';
import EventMember from '@/types/objects/EventMember/dto';

export default interface WMEvent {
    eventId?: number;
    eventTypeId?: number;
    created_by?: number;
    title?: string;
    description?: string;
    startTimestamp: string;
    image?: string;
    freeSeats: number;
    stopList: Stop[];
    eventMembers: EventMember[];
}
