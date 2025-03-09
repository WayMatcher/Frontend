import { User } from './user';

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface LoginResponse {
    succeeded: boolean;
    message: string;
}

export interface MFAResponse {
    succeeded: boolean;
    message: string;
    user?: User;
}
