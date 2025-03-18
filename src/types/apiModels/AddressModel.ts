import { AxiosResponse } from "axios";
import Address from "../dto/Address";

/**
 * Represents a request address model.
 * This interface is used to define the structure of an address-related request.
 *
 * @property {string} [username] - The username associated with the request (optional).
 * @property {string} [email] - The email address associated with the request (optional).
 * @property {Address} [address] - The address details associated with the request (optional).
 */
export interface RequestAddress {
    username?: string;
    email?: string;
    address?: Address;
}

/**
 * Represents the response object for an API call that returns an `Address`.
 * This type is based on the `AxiosResponse` generic type, where the response
 * data is expected to be of type `Address`.
 */
export type ResponseAddress = AxiosResponse<Address>;


