import Address from '@/types/objects/Address/dto';
import Vehicle from '@/types/objects/Vehicle/dto';
import WMEvent from '@/types/objects/Event/dto';
import { FormUserRegister } from '../objects/User/form';

export interface MFAContextProps {
    mfaToken: boolean;
    setMFA: (awaitingMFA: boolean) => void;
}

export interface RegisterContextProps {
    registerUser: FormUserRegister | null;
    setRegisterUser: (user: FormUserRegister | null) => void;
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
export interface ErrorModalContextProps {
    hideErrorModal: () => void;
    showErrorModal: (message: string) => void;
}
