export interface FormVehicle {
    make?: string;
    model?: string;
    year?: number;
    seats?: number;
    license_plate?: string;
    additional_description?: string;
}

export const initialValuesVehicle: FormVehicle = {
    make: '',
    model: '',
    year: 2025,
    seats: 4,
    license_plate: '',
    additional_description: '',
};
