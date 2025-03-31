import Address from '@/types/objects/Address/dto';

interface BaseUser {
    username: string;
    email: string;
}

export default interface User extends BaseUser {
    userId?: number;
    firstname?: string;
    name?: string;
    additionalDescription?: string;
    licenseVerified?: boolean;
    profilePicture?: Blob;
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
