export interface FormVehicle {
    make?: string;
    model?: string;
    year?: number;
    seats?: number;
    license_plate?: string;
    additionaldescription?: string;
}

export const initialValuesVehicle: FormVehicle = {
    make: '',
    model: '',
    year: 2025,
    seats: 4,
    license_plate: '',
    additionaldescription: '',
};
