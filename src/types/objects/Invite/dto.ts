import User from '../User/dto';

/**
 * Data Transfer Object (DTO) for invites.
 */
export interface Invite {
    /**
     * The unique identifier for the invite.
     */
    inviteId: number;

    /**
     * The confirmation status identifier for the invite.
     */
    statusId?: number;

    /**
     * Indicates whether the invite is a request.
     */
    isRequest: boolean;

    /**
     * The role of the user in the event.
     */
    eventRole: number;

    /**
     * The unique identifier for the event associated with the invite.
     */
    eventId?: number;

    /**
     * The user associated with the invite.
     */
    user?: User;

    /**
     * The message associated with the invite.
     */
    message?: string;
}
