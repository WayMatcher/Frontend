import React from 'react';
import { Button, ButtonGroup, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface ErrorModalProps {
    show: boolean;
    handleClose: () => void;
    children: React.ReactNode;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ show, handleClose, children }) => {
    const navigate = useNavigate();
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
                <Modal.Footer>
                    <ButtonGroup>
                        <Button variant='primary' onClick={() => navigate(0)}>
                            Refresh
                        </Button>
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
