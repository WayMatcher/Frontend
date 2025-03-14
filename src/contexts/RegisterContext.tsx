import React, { createContext, useState, ReactNode } from 'react';
import { RegisterContextProps } from '../types/Contexts';

import User from '../types/dto/User';
import Address from '../types/dto/Address';
import Vehicle from '../types/dto/Vehicle';


const RegisterContext: React.Context<RegisterContextProps> = createContext<RegisterContextProps>({
    registerUser: null,
    setRegisterUser: () => { },
    registerAddress: null,
    setRegisterAddress: () => { },
    registerVehicle: null,
    setRegisterVehicle: () => { },

});

export const RegisterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [registerUser, setRegisterUser] = useState<User | null>(null);
    const [registerAddress, setRegisterAddress] = useState<Address | null>(null);
    const [registerVehicle, setRegisterVehicle] = useState<Vehicle | null>(null);

    return (
        <RegisterContext.Provider value={
            { registerUser, setRegisterUser, registerAddress, setRegisterAddress, registerVehicle, setRegisterVehicle }
        } >
            {children}
        </RegisterContext.Provider >
    );
};

export default RegisterContext;