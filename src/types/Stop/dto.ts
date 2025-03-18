import Address from "./Address";
import WMEvent from "./Event";

export default interface Stop {
    id?: number;
    stop_sequence: number;
    address: Address;
    event: WMEvent;
}