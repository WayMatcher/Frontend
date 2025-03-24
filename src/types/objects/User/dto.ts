import Address from '@/types/objects/Address/dto';
import Vehicle from '@/types/objects/Vehicle/dto';

interface BaseUser {
    username: string;
    email: string;
}

export default interface User extends BaseUser {
    userId?: number;
    firstName?: string;
    name?: string;
    additional_description?: string;
    license_verified?: boolean;
    profile_picture?: string;
    telephone?: string;
    address?: Address;
    vehicle?: Vehicle;
    jwt?: string;
}

export interface UserLoginModel extends BaseUser {
    password: string;
    userOrEmail?: string;
}

export interface UserRegisterModel extends User {
    password: string;
    password_confirm: string;
}

export interface MFAToken {
    user: User;
    jwt: string;
}
