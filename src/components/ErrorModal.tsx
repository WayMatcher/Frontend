import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface ErrorModalProps {
    show: boolean;
    handleClose: () => void;
    children: React.ReactNode;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ show, handleClose, children }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ErrorModal;
