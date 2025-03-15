import User from './dto/User';
import WMEvent from './dto/Event';

/**
 * Represents the structure of an API response.
 */
export default interface APIResponse {
    succeeded: boolean;
    message: string;
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
    user?: User;
}


export interface EventsResponse extends APIResponse {
    events: WMEvent[];
}