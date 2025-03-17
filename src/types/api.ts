import User from './dto/User';
import WMEvent from './dto/Event';
import Address from './dto/Address';
import Vehicle from './dto/Vehicle';

/**
 * Represents the structure of an API response.
 */
export default interface APIResponse {
    succeeded: boolean;
    message: string;
}

export interface LoginResponse extends APIResponse {
    user: User;
}

/**
 * Represents the response from an API that includes Multi-Factor Authentication (MFA) details.
 * Extends the APIResponse interface.
 * 
 * @interface MFAResponse
 * @extends {APIResponse}
 * 
 * @property {User} [user] - The User that is going to be logged in
 */
export interface MFAResponse extends APIResponse {
    user: User;
    jwt: string;
}


export interface UserResponse extends APIResponse {
    user: User;
}

export interface AddressResponse extends APIResponse {
    address: Address;
}

export interface VehicleResponse extends APIResponse {
    vehicle: Vehicle;
}


export interface EventsResponse extends APIResponse {
    events: WMEvent[];
}