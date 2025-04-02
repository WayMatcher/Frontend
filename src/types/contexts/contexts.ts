/**
 * Props for the Error Modal context, used to manage error modals and alerts.
 */
export interface ErrorModalContextProps {
    /** Hides the error modal. */
    hideErrorModal: () => void;
    /**
     * Displays the error modal with a specific message.
     * @param message - The error message to display.
     */
    showErrorModal: (message: string) => void;
    /**
     * Displays an alert with a specific message and variant.
     * @param message - The alert message to display.
     * @param variant - The style variant of the alert.
     */
    showAlert: (
        message: string,
        variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark',
    ) => void;
}
