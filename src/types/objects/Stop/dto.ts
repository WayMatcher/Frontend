import Address from '@/types/objects/Address/dto';

export default interface Stop {
    stopId?: number;
    stopSequenceNumber: number;
    address: Address;
    eventId: number;
}
