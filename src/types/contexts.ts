import Address from './Address/dto';
import Vehicle from './Vehicle/dto';
import WMEvent from './Event/dto';
import { UserRegisterModel } from './User/dto';

export interface MFAContextProps {
    mfaToken: boolean;
    setMFA: (awaitingMFA: boolean) => void;
}

export interface RegisterContextProps {
    registerUser: UserRegisterModel | null;
    setRegisterUser: (user: UserRegisterModel | null) => void;
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
