import * as Yup from 'yup';

// --- Register Schemas --- //

/**
 * Schema for validating vehicle registration form.
 * Ensures required fields like manufacturerName, model, year, and seats are provided.
 */
export const RegisterVehicleSchema = Yup.object({
    manufacturerName: Yup.string().required('Please enter the manufacturer name'), // Manufacturer name is mandatory
    model: Yup.string().required('Please enter the model name'), // Model name is mandatory
    year: Yup.number().min(1900).max(2125), // Year must be between 1900 and 2125
    seats: Yup.number().min(2).required('Please enter the number of seats'), // Minimum 2 seats required
    license_plate: Yup.string(), // Optional license plate
    additionaldescription: Yup.string(), // Optional additional description
}); // Vehicle Page

// --- Login Schemas --- //

/**
 * Schema for validating user login form.
 * Ensures required fields like userOrEmail and password are provided.
 */
export const LoginUserSchema = Yup.object({
    userOrEmail: Yup.string().required('Username or Email is required'), // Username or email is mandatory
    password: Yup.string().required('Password is required'), // Password is mandatory
}); // Login Page
