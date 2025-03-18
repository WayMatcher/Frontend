import { AxiosResponse } from "axios";
import Vehicle from "../dto/Vehicle";

/**
 * Represents a request for a vehicle.
 *
 * @interface RequestVehicle
 * @property {Vehicle} [vehicle] - The vehicle object associated with the request (optional).
 * @property {number} [id] - The unique identifier for the request (optional).
 */
export interface RequestVehicle {
    vehicle?: Vehicle;
    id?: number;
}

/**
 * Represents the response object for a vehicle API call.
 * 
 * This type is a wrapper around the `AxiosResponse` type, specifically
 * for responses that return a `Vehicle` object.
 * 
 * @typedef {AxiosResponse<Vehicle>} ResponseVehicle
 */
export type ResponseVehicle = AxiosResponse<Vehicle>;