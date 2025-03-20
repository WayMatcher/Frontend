import Address from '@/types/objects/Address/dto';
import WMEvent from '@/types/objects/Event/dto';

export default interface Stop {
    id?: number;
    stop_sequence: number;
    address: Address;
    event: WMEvent;
}
