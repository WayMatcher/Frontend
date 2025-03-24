import User from '../User/dto';

export default interface EventMember {
    memberId: number;
    eventRole: number;
    user: User;
    eventId: number;
    statusId: number;
}
