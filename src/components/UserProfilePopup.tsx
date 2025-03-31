import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useUserProfilePopup } from '@/contexts/UserProfilePopupContext';

const UserProfilePopup: React.FC = () => {
    const { user, show, closePopup } = useUserProfilePopup();

    if (!user) return null;

    return (
        <Modal show={show} onHide={closePopup} centered>
            <Modal.Header closeButton>
                <Modal.Title>User Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    <strong>Username:</strong> {user.username}
                </p>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                <p>
                    <strong>First Name:</strong> {user.firstname}
                </p>
                <p>
                    <strong>Last Name:</strong> {user.name}
                </p>
                <p>
                    <strong>Telephone:</strong> {user.telephone}
                </p>
                <p>
                    <strong>License Verified:</strong> {user.licenseVerified ? 'Yes' : 'No'}
                </p>
                {user.address && (
                    <p>
                        <strong>Address:</strong>{' '}
                        {`${user.address.street}, ${user.address.city}, ${user.address.postalcode}`}
                    </p>
                )}
                {user.additionalDescription && (
                    <p>
                        <strong>Description:</strong> {user.additionalDescription}
                    </p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={closePopup}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserProfilePopup;
