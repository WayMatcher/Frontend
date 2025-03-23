export default interface Notification {
    notificationID: number;
    read: boolean;
    message: string;
    entitytype?: string;
    entityid?: number;
    userid: number;
}
