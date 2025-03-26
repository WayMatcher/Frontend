import Address from '@/types/objects/Address/dto';
import Vehicle from '@/types/objects/Vehicle/dto';
import WMEvent from '@/types/objects/Event/dto';
import { FormUserRegister } from '@/types/objects/User/form';

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
    showAlert: (
        message: string,
        variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark',
    ) => void;
}
