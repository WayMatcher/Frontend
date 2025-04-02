/**
 * Represents a vehicle with various attributes.
 */
export default interface Vehicle {
    /**
     * Unique identifier for the vehicle.
     * Optional.
     */
    vehicleId?: number;

    /**
     * Model name of the vehicle.
     * Optional.
     */
    model?: string;

    /**
     * Number of seats available in the vehicle.
     * Optional.
     */
    seats?: number;

    /**
     * Year the vehicle was manufactured.
     * Optional.
     */
    yearOfManufacture?: number;

    /**
     * Name of the manufacturer of the vehicle.
     * Optional.
     */
    manufacturerName?: string;

    /**
     * License plate number of the vehicle.
     * Optional.
     */
    licensePlate?: string;

    /**
     * Additional information or notes about the vehicle.
     * Optional.
     */
    additionalInfo?: string;

    /**
     * Fuel mileage of the vehicle (e.g., in miles per gallon or liters per 100 km).
     * Optional.
     */
    fuelMilage?: number;
}
