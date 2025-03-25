export default interface Address {
    id?: number;
    city: string;
    postal_code: string;
    street: string;
    country: string;
    region?: string;
    state?: string;
    longitude: number;
    latitude: number;
    address_line1?: string;
    address_line2?: string;
    status?: string;
}

/**
 * Represents the overall response from the HERE Geocoding and Search API.
 */
export interface HereApiResponse {
    items: HereApiItem[];
}

/**
 * Represents a single result item from the HERE Geocoding and Search API.
 */
export interface HereApiItem {
    title: string; // Complete postal address string (for addresses)
    id: string; // Unique identifier for the result (can be used with /lookup)
    resultType: HereApiResultType; // Type of result (e.g., 'houseNumber', 'street')
    houseNumberType?: HereApiHouseNumberType; // Type of address data (PA, interpolated) - Only for address results
    address: HereApiAddress;
    position: HereApiCoordinate;
    access: HereApiCoordinate[]; // Access points (e.g., entrances)
    mapView: HereApiMapView;
    scoring: HereApiScoring;
}

/**
 *  Defines the possible result types returned by the HERE API.
 */
type HereApiResultType =
    | 'houseNumber'
    | 'place'
    | 'locality'
    | 'street'
    | 'administrativeArea'
    | 'addressBlock'
    | 'intersection'
    | 'postalCodePoint';

/**
 * Defines the possible house number types (only for address results).
 */
type HereApiHouseNumberType = 'PA' | 'interpolated';

/**
 * Represents the detailed address information of a result.
 */
interface HereApiAddress {
    label: string;
    countryCode: string;
    countryName: string;
    stateCode?: string; // Optional, as some countries may not have state codes.
    state?: string; // Optional, as some countries may not have states.
    county?: string; // Optional
    city?: string; // Optional, as some results (like countries) may not have a city.
    district?: string; // Optional
    street?: string; // Optional
    postalCode?: string; // Optional
    houseNumber?: string; // Optional
}

/**
 * Represents a geographical coordinate (latitude and longitude).
 */
interface HereApiCoordinate {
    lat: number;
    lng: number;
}

/**
 * Represents the bounding box of a location optimized for display.
 */
interface HereApiMapView {
    west: number;
    south: number;
    east: number;
    north: number;
}

/**
 * Represents scoring information, indicating how well a result matches the query.
 */
interface HereApiScoring {
    queryScore: number;
    fieldScore: HereApiFieldScore;
}

/**
 *  Represents the field-level scoring details.
 */
interface HereApiFieldScore {
    country?: number; // Optional
    city?: number; // Optional
    streets?: number[]; // Optional
    houseNumber?: number; // Optional
    postalCode?: number; // Optional
}

/**
 * Represents an error response from the HERE API.
 */
export interface HereApiErrorResponse {
    title: string;
    status: number;
    code: string;
    cause: string;
    action: string;
    correlationId: string;
    details?: HereApiErrorDetail[]; //details is OPTIONAL in Here API
}

/**
 * Represents a detail within a HERE API error response.
 */
interface HereApiErrorDetail {
    code: string;
    message: string;
}
/**
 * Request parameters for the getHEREAddress function.
 */
export interface GetHereAddressRequest {
    q: string; // The search query string
    // You can add other optional parameters here, like 'at', 'limit', etc.
    // based on the HERE API documentation.  Example:
    at?: string;
    limit?: number;
    lang?: string;
}
/**
 * Custom error class for HERE API errors.  Extends the built-in Error class.
 */
export class HereApiError extends Error {
    status: number;
    code: string;
    cause: string;
    action: string;
    correlationId: string;
    details?: HereApiErrorDetail[];

    constructor(errorResponse: HereApiErrorResponse) {
        super(errorResponse.title); // Set the error message
        this.name = 'HereApiError'; // Set a custom error name
        this.status = errorResponse.status;
        this.code = errorResponse.code;
        this.cause = errorResponse.cause;
        this.action = errorResponse.action;
        this.correlationId = errorResponse.correlationId;
        this.details = errorResponse.details;

        // This is important to maintain the correct stack trace in modern JavaScript engines
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HereApiError);
        }
    }
}
