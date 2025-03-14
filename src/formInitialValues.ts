import Address from "./types/dto/Address"
import { UserRegister } from "./types/dto/User"
import Vehicle from "./types/dto/Vehicle"

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

export const RegisterVehicleInitialValues: Vehicle = {
    make: '',
    model: '',
    year: 2025,
    seats: 4,
    license_plate: ''
}

export const RegisterAddressInitialValues: Address = {
    street: '',
    city: '',
    state: '',
    postal_code: '',
    country: ""
}