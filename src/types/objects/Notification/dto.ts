export default interface Notification {
    notificationId: number;
    read: boolean;
    message: string;
    entitytype?: string;
    entityid?: number;
    userid: number;
}
