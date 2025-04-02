import React from 'react';
import { Button, ButtonGroup, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/**
 * Props for the ErrorModal component.
 */
interface ErrorModalProps {
    /** Determines whether the modal is visible. */
    show: boolean;
    /** Function to handle closing the modal. */
    handleClose: () => void;
    /** Content to be displayed inside the modal body. */
    children: React.ReactNode;
}

/**
 * ErrorModal component displays an error message in a modal dialog.
 *
 * @param {ErrorModalProps} props - The props for the ErrorModal component.
 * @returns {JSX.Element} The rendered ErrorModal component.
 */
const ErrorModal: React.FC<ErrorModalProps> = ({ show, handleClose, children }) => {
    const navigate = useNavigate(); // Hook to programmatically navigate.

    return (
        <>
            {/* Modal component from react-bootstrap */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Display the children content passed to the modal */}
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <ButtonGroup>
                        {/* Button to refresh the page */}
                        <Button variant='primary' onClick={() => navigate(0)}>
                            Refresh
                        </Button>
                        {/* Button to close the modal */}
                        <Button variant='secondary' onClick={handleClose}>
                            Close
                        </Button>
                    </ButtonGroup>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ErrorModal;
