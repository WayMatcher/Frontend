import { User } from './user';

export interface UserContextProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

export interface MFAContextProps {
    mfaToken: boolean;
    setMFA: (awaitingMFA: boolean) => void;
}