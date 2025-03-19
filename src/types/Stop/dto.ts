import Address from '@/types/Address/dto';
import WMEvent from '@/types/Event/dto';

export default interface Stop {
    id?: number;
    stop_sequence: number;
    address: Address;
    event: WMEvent;
}
