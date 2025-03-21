import React, { createContext, useState, ReactNode } from 'react';

import Address from '@/types/objects/Address/dto';
import Vehicle from '@/types/objects/Vehicle/dto';
import { RegisterContextProps } from '@/types/contexts/contexts';
import { FormUserRegister } from '@/types/objects/User/form';

const RegisterContext: React.Context<RegisterContextProps> = createContext<RegisterContextProps>({
    registerUser: null,
    setRegisterUser: () => {},
    registerAddress: null,
    setRegisterAddress: () => {},
    registerVehicle: null,
    setRegisterVehicle: () => {},
    step: 1,
    setStep: () => {},
});

export const RegisterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [registerUser, setRegisterUser] = useState<FormUserRegister | null>(null);
    const [registerAddress, setRegisterAddress] = useState<Address | null>(null);
    const [registerVehicle, setRegisterVehicle] = useState<Vehicle | null>(null);
    const [step, setStep] = useState<number>(1);

    return (
        <RegisterContext.Provider
            value={{
                registerUser,
                setRegisterUser,
                registerAddress,
                setRegisterAddress,
                registerVehicle,
                setRegisterVehicle,
                step,
                setStep,
            }}
        >
            {children}
        </RegisterContext.Provider>
    );
};

export default RegisterContext;
