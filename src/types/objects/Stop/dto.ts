import Address from '@/types/objects/Address/dto';

/**
 * Represents a stop in a sequence of events or locations.
 */
export default interface Stop {
    /**
     * Unique identifier for the stop.
     * Optional because it may not be assigned initially.
     */
    stopId?: number;

    /**
     * The sequence number of the stop in the route or event.
     * This is required to maintain the order of stops.
     */
    stopSequenceNumber: number;

    /**
     * The address associated with the stop.
     * This is a required field and provides location details.
     */
    address: Address;

    /**
     * Identifier for the event associated with the stop.
     * Optional because a stop may not always be tied to an event.
     */
    eventId?: number;
}
