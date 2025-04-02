import React, { createContext, useState, ReactNode } from 'react';
import { ErrorModalContextProps } from '@/types/contexts/contexts';
import ErrorModal from '@/components/ErrorModal';
import { Alert } from 'react-bootstrap';

/**
 * Context to manage error modals and alert messages across the application.
 */
const ErrorModalContext: React.Context<ErrorModalContextProps> = createContext<ErrorModalContextProps>({
    hideErrorModal: () => {}, // Default implementation for hiding the error modal
    showErrorModal: () => {}, // Default implementation for showing the error modal
    showAlert: () => {}, // Default implementation for showing alert messages
});

/**
 * Provider component for ErrorModalContext.
 * Wraps children components and provides context values for managing error modals and alerts.
 *
 * @param {ReactNode} children - The child components to be wrapped by the provider.
 */
export const ErrorModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // State to manage the visibility of the error modal
    const [errorModal, setErrorModal] = useState<boolean>(false);

    // State to store the error message displayed in the modal
    const [errorMessage, setErrorMessage] = useState<string>('Unknown Error');

    // State to manage the visibility of the alert message
    const [alertMessage, setAlertMessage] = useState<boolean>(false);

    // State to store the variant (style) of the alert message
    const [alertMessageVariant, setAlertMessageVariant] = useState<string>('primary');

    // State to store the text of the alert message
    const [alertMessageText, setAlertMessageText] = useState<string>('');

    /**
     * Hides the error modal by updating the state.
     */
    const hideErrorModal = () => {
        setErrorModal(false);
    };

    /**
     * Shows the error modal with a specific message.
     *
     * @param {string} message - The error message to display in the modal.
     */
    const showErrorModal = (message: string) => {
        setErrorMessage(message);
        setErrorModal(true);
    };

    /**
     * Displays an alert message with a specific text and variant.
     *
     * @param {string} message - The text to display in the alert.
     * @param {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'} variant - The style variant of the alert.
     */
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
                hideErrorModal, // Function to hide the error modal
                showErrorModal, // Function to show the error modal
                showAlert, // Function to show alert messages
            }}
        >
            {/* Render the alert message if it is visible */}
            {alertMessage ? (
                <Alert variant={alertMessageVariant} onClose={() => setAlertMessage(false)} dismissible>
                    {alertMessageText}
                </Alert>
            ) : null}

            {/* Render the child components */}
            {children}

            {/* Render the error modal */}
            <ErrorModal show={errorModal} handleClose={hideErrorModal}>
                {errorMessage}
            </ErrorModal>
        </ErrorModalContext.Provider>
    );
};

export default ErrorModalContext;
