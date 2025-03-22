import React, { createContext, useState, ReactNode } from 'react';
import { ErrorModalContextProps } from '@/types/contexts/contexts';
import ErrorModal from '@/components/ErrorModal';

const ErrorModalContext: React.Context<ErrorModalContextProps> = createContext<ErrorModalContextProps>({
    hideErrorModal: () => {},
    showErrorModal: () => {},
});

export const ErrorModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [errorModal, setErrorModal] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('Unknown Error');

    const hideErrorModal = () => {
        setErrorModal(false);
    };

    const showErrorModal = (message: string) => {
        setErrorMessage(message);
        setErrorModal(true);
    };

    return (
        <ErrorModalContext.Provider
            value={{
                hideErrorModal,
                showErrorModal,
            }}
        >
            {children}
            <ErrorModal show={errorModal} handleClose={hideErrorModal}>
                {errorMessage}
            </ErrorModal>
        </ErrorModalContext.Provider>
    );
};

export default ErrorModalContext;
