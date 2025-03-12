import User from './dto/User';

export interface UserContextProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

export interface MFAContextProps {
    mfaToken: boolean;
    setMFA: (awaitingMFA: boolean) => void;
}