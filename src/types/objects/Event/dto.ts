import Stop from '@/types/objects/Stop/dto';
import EventMember from '@/types/objects/EventMember/dto';
import Schedule from '../Schedule/dto';
import User from '../User/dto';

/**
 * Represents an event in the system.
 */
export default interface WMEvent {
    /**
     * Unique identifier for the event.
     * Optional because it may not be set for new events.
     */
    eventId?: number;

    /**
     * Identifier for the type of event.
     */
    eventTypeId?: number;

    /**
     * Description of the event.
     */
    description?: string;

    /**
     * Start timestamp of the event in ISO 8601 format.
     */
    startTimestamp: string;

    /**
     * Number of free seats available for the event.
     */
    freeSeats: number;

    /**
     * List of stops associated with the event.
     */
    stopList: Stop[];

    /**
     * List of members participating in the event.
     */
    eventMembers: EventMember[];

    /**
     * List of users invited to the event.
     */
    inviteList: User[];

    /**
     * Schedule associated with the event.
     */
    schedule: Schedule;

    /**
     * Identifier for the schedule associated with the event.
     */
    scheduleId: number;

    /**
     * The owner of the event.
     */
    owner: User;
}
