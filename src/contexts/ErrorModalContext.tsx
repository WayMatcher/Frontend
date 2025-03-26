import React, { createContext, useState, ReactNode } from 'react';
import { ErrorModalContextProps } from '@/types/contexts/contexts';
import ErrorModal from '@/components/ErrorModal';
import { Alert } from 'react-bootstrap';

const ErrorModalContext: React.Context<ErrorModalContextProps> = createContext<ErrorModalContextProps>({
    hideErrorModal: () => {},
    showErrorModal: () => {},
    showAlert: () => {},
});

export const ErrorModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [errorModal, setErrorModal] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('Unknown Error');
    const [alertMessage, setAlertMessage] = useState<boolean>(false);
    const [alertMessageVariant, setAlertMessageVariant] = useState<string>('primary');
    const [alertMessageText, setAlertMessageText] = useState<string>('');

    const hideErrorModal = () => {
        setErrorModal(false);
    };

    const showErrorModal = (message: string) => {
        setErrorMessage(message);
        setErrorModal(true);
    };

    const showAlert = (
        message: string,
        variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark',
    ) => {
        setAlertMessageText(message);
        setAlertMessageVariant(variant);
        setAlertMessage(true);
    };

    return (
        <ErrorModalContext.Provider
            value={{
                hideErrorModal,
                showErrorModal,
                showAlert,
            }}
        >
            {alertMessage ? <Alert variant={alertMessageVariant}>{alertMessageText}</Alert> : null}
            {children}
            <ErrorModal show={errorModal} handleClose={hideErrorModal}>
                {errorMessage}
            </ErrorModal>
        </ErrorModalContext.Provider>
    );
};

export default ErrorModalContext;
