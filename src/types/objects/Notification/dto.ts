/**
 * Represents a notification object.
 */
export default interface Notification {
    /**
     * Unique identifier for the notification.
     */
    notificationId: number;

    /**
     * Indicates whether the notification has been read.
     */
    read: boolean;

    /**
     * The message content of the notification.
     */
    message: string;

    /**
     * (Optional) The type of entity associated with the notification.
     * For example, this could be "post", "comment", etc.
     */
    entitytype?: string;

    /**
     * (Optional) The ID of the entity associated with the notification.
     */
    entityid?: number;

    /**
     * The ID of the user to whom the notification belongs.
     */
    userid: number;
}
