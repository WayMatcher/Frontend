import User, { UserRegister } from './dto/User';
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
    registerUser: UserRegister | null;
    setRegisterUser: (user: UserRegister | null) => void;
    registerAddress: Address | null;
    setRegisterAddress: (user: Address | null) => void;
    registerVehicle: Vehicle | null;
    setRegisterVehicle: (user: Vehicle | null) => void;
    step: number;
    setStep: (step: number) => void;
}