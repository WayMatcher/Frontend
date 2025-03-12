import { User } from './user';

export interface LoginCredentials {
    user: User;
    password: string;
}

export interface LoginResponse {
    succeeded: boolean;
    message: string;
    jwt?: string;
}

export interface MFAResponse {
    succeeded: boolean;
    message: string;
    user?: User;
}
