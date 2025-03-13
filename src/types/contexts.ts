import User from './dto/User';
import Address from './dto/Address';
import Vehicle from './dto/Vehicle';

export interface UserContextProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

export interface MFAContextProps {
    mfaToken: boolean;
    setMFA: (awaitingMFA: boolean) => void;
}

export interface RegisterContextProps {
    user: {
        registerUser: User | null;
        setRegisterUser: (user: User | null) => void;
    };
    address: {
        registerAddress: Address | null;
        setRegisterAddress: (user: Address | null) => void;
    };
    vehicle: {
        registerVehicle: Vehicle | null;
        setRegisterVehicle: (user: Vehicle | null) => void;
    };
}