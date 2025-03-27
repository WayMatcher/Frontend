import Stop from '@/types/objects/Stop/dto';
import EventMember from '@/types/objects/EventMember/dto';
import Schedule from '../Schedule/dto';
import User from '../User/dto';

export default interface WMEvent {
    eventId?: number;
    eventTypeId?: number;
    description?: string;
    startTimestamp: string;
    freeSeats: number;
    stopList: Stop[];
    eventMembers: EventMember[];
    inviteList: User[];
    schedule: Schedule;
    scheduleId: number;
    owner: User;
}
