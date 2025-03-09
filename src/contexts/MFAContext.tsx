import React, { createContext, useState, ReactNode } from 'react';
import { MFAContextProps } from '../types/contexts';

const MFAContext = createContext<MFAContextProps>({
    mfaToken: false,
    setMFA: () => { },
});

export const MFAProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [mfaToken, setMFA] = useState<boolean>(false);

    return (
        <MFAContext.Provider value={{ mfaToken, setMFA }}>
            {children}
        </MFAContext.Provider>
    );
};

export default MFAContext;