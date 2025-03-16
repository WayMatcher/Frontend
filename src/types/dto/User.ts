import Address from './Address';
import Vehicle from './Vehicle';

interface BaseUser {
    username: string;
    email: string;
}

export default interface User extends BaseUser {
    id?: number;
    firstName?: string;
    name?: string;
    additional_description?: string;
    license_verified?: boolean;
    profile_picture?: string;
    telephone?: string;
    address?: Address;
    vehicle?: Vehicle;
    mfaPending?: boolean;
    jwt?: string;
}

export interface UserLogin extends BaseUser {
    password: string;
    userOrEmail: string;
}

export interface UserRegister extends User {
    password: string;
    confirmPassword: string;
}
