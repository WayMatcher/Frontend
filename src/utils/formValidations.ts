import * as Yup from 'yup';

// --- Register Schemas --- //

/**
 * Schema for validating user registration form.
 */
export const RegisterUserSchema = Yup.object({
    email: Yup.string().email("E-Mail isn't an E-Mail").required("Please enter an E-Mail"),
    username: Yup.string().required("Please enter a Username"),
    password: Yup.string()
        .required("Please enter a Password")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/, "Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji."),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
    name: Yup.string(),
    firstName: Yup.string(),
    telephone: Yup.string(),
    additional_description: Yup.string(),
    ProfilePicture: Yup.string()
}); // User Page

/**
 * Schema for validating address registration form.
 */
export const RegisterAddressSchema = Yup.object({
    city: Yup.string().required("Please enter a City"),
    country: Yup.string().required("Please enter a Country"),
    street: Yup.string().required("Please enter a Street"),
    postal_code: Yup.string().required("Please enter a Postal Code"),
    address_line1: Yup.string(),
    address_line2: Yup.string(),
    latitude: Yup.number(),
    longitude: Yup.number(),
    region: Yup.string(),
    state: Yup.string(),
}); // Address Page

/**
 * Schema for validating vehicle registration form.
 */
export const RegisterVehicleSchema = Yup.object({
    make: Yup.string(),
    model: Yup.string(),
    year: Yup.number().min(1900).max(2025),
    seats: Yup.number(),
    license_plate: Yup.string(),
    additional_description: Yup.string(),
}); // Vehicle Page

// --- Login Schemas --- //

/**
 * Schema for validating user login form.
 */
export const LoginUserSchema = Yup.object({
    userOrEmail: Yup.string().required('Username or Email is required'),
    password: Yup.string().required('Password is required'),
}); // Login Page

/**
 * Schema for validating MFA token during login.
 */
export const LoginMFASchema = Yup.object({
    mfaToken: Yup.string().required('Please enter MFA Token').matches(/^[0-9]{4}$/, 'MFA Token must be 4 digits'),
}); // MFA Page

// --- Edit User Schemas --- //

/**
 * Schema for validating user edit form.
 * Reuses RegisterUserSchema.
 */
export const EditUserSchema = Yup.object({
    email: Yup.string().email("E-Mail isn't an E-Mail").required("Please enter an E-Mail"),
    username: Yup.string().required("Please enter a Username"),
    password: Yup.string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/, "Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji."),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
    name: Yup.string(),
    firstName: Yup.string(),
    telephone: Yup.string(),
    additional_description: Yup.string(),
    ProfilePicture: Yup.string()
}); // Edit User Page

/**
 * Schema for validating address edit form.
 * Reuses RegisterAddressSchema.
 */
export const EditAddressSchema = RegisterAddressSchema; // Edit Address Page

/**
 * Schema for validating vehicle edit form.
 * Reuses RegisterVehicleSchema.
 */
export const EditVehicleSchema = RegisterVehicleSchema; // Edit Vehicle Page

