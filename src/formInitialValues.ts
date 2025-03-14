import Address from "./types/dto/Address"
import MFAToken from "./types/dto/MFAToken"
import Vehicle from "./types/dto/Vehicle"
import { UserLogin, UserRegister } from "./types/dto/User"

/**
 * Initial values for user registration form.
 */
export const RegisterUserInitialValues: UserRegister = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    firstName: '',
    additional_description: '',
    profile_picture: '',
    license_verified: false,
}

/**
 * Initial values for vehicle registration form.
 */
export const RegisterVehicleInitialValues: Vehicle = {
    make: '',
    model: '',
    year: 2025,
    seats: 4,
    license_plate: '',
    additional_description: ''
}

/**
 * Initial values for address registration form.
 */
export const RegisterAddressInitialValues: Address = {
    street: '',
    city: '',
    state: '',
    postal_code: '',
    country: ""
}

/**
 * Initial values for user login form.
 */
export const LoginUserInitialValues: UserLogin = {
    username: '',
    email: '',
    userOrEmail: '',
    password: '',
};

/**
 * Initial values for MFA token form.
 */
export const LoginMFAInitialValues: MFAToken = { mfaToken: '' };