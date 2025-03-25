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
    additionaldescription?: string;
    license_verified?: boolean;
    profilepicture?: Blob;
    telephone?: string;
    address?: Address;
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
