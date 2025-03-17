import { UserRegister } from './dto/User';
import Address from './dto/Address';
import Vehicle from './dto/Vehicle';
import WMEvent from './dto/Event';

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

export interface EventContextProps {
    currentEvent: WMEvent | null;
    setCurrentEvent: (currentEvent: WMEvent | null) => void;
}