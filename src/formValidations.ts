import * as Yup from 'yup';

// Register Schemas
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
export const RegisterAddressSchema = Yup.object({
    city: Yup.string().required("Please enter a City"),
    country: Yup.string().required("Please enter a Country"),
    street: Yup.string().required("Please enter a Street"),
    postalCode: Yup.string().required("Please enter a Postal Code"),
    address_line1: Yup.string(),
    address_line2: Yup.string(),
    latitude: Yup.number(),
    longitude: Yup.number(),
    region: Yup.string(),
    state: Yup.string(),
    status: Yup.string(),
}); // Address Page
export const RegisterVehicleSchema = Yup.object(); // Vehicle Page

// Login Schemas
export const LoginUserSchema = Yup.object(); // Login Page
export const LoginMFASchema = Yup.object(); // MFA Page

// Edit User Schemas
export const EditUserSchema = Yup.object(); // User Page
export const EditAddressSchema = Yup.object(); // Address Page
export const EditVehicleSchema = Yup.object(); // Vehicle Page