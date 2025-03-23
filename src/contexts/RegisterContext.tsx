import React, { createContext } from 'react';
import { RegisterContextProps } from '@/types/contexts/contexts';

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

export default RegisterContext;
