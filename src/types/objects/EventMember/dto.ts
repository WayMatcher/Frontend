import User from '../User/dto';

/**
 * Represents a member of an event.
 */
export default interface EventMember {
    /**
     * Unique identifier for the event member.
     */
    memberId: number;

    /**
     * Role of the member in the event, represented as a numeric code.
     * For example, 1 might represent 'Organizer', 2 might represent 'Participant', etc.
     */
    eventRole: number;

    /**
     * The user associated with this event member.
     */
    user: User;

    /**
     * Unique identifier for the event this member is associated with.
     */
    eventId: number;

    /**
     * Status of the member in the event, represented as a numeric code.
     * For example, 1 might represent 'Active', 2 might represent 'Inactive', etc.
     */
    statusId: number;
}
