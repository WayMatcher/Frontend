import React, { createContext, useState, ReactNode } from 'react';
import { RegisterContextProps } from '../types/Contexts';

import User from '../types/dto/User';
import Address from '../types/dto/Address';
import Vehicle from '../types/dto/Vehicle';


const RegisterContext: React.Context<RegisterContextProps> = createContext<RegisterContextProps>({
    user: {
        registerUser: null,
        setRegisterUser: () => { },
    },
    address: {
        registerAddress: null,
        setRegisterAddress: () => { },
    },
    vehicle: {
        registerVehicle: null,
        setRegisterVehicle: () => { },
    }
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [registerUser, setRegisterUser] = useState<User | null>(null);
    const [registerAddress, setRegisterAddress] = useState<Address | null>(null);
    const [registerVehicle, setRegisterVehicle] = useState<Vehicle | null>(null);

    return (
        <RegisterContext.Provider value={
            {
                user: { registerUser, setRegisterUser },
                address: { registerAddress, setRegisterAddress },
                vehicle: { registerVehicle, setRegisterVehicle },
            }} >
            {children}
        </RegisterContext.Provider >
    );
};

export default RegisterContext;