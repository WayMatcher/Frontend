import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useUserProfilePopup } from '@/contexts/UserProfilePopupContext';

/**
 * UserProfilePopup Component
 * Displays a modal popup with user profile information.
 *
 * @returns {React.FC} The UserProfilePopup component.
 */
const UserProfilePopup: React.FC = () => {
    // Destructure user data, modal visibility, and close function from context
    const { user, show, closePopup } = useUserProfilePopup();

    // If no user data is available, do not render the component
    if (!user) return null;

    return (
        <Modal show={show} onHide={closePopup} centered>
            {/* Modal header with close button */}
            <Modal.Header closeButton>
                <Modal.Title>User Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Display user details */}
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
                {/* Conditionally render address if available */}
                {user.address && (
                    <p>
                        <strong>Address:</strong>{' '}
                        {`${user.address.street}, ${user.address.city}, ${user.address.postalcode}`}
                    </p>
                )}
                {/* Conditionally render additional description if available */}
                {user.additionalDescription && (
                    <p>
                        <strong>Description:</strong> {user.additionalDescription}
                    </p>
                )}
            </Modal.Body>
            <Modal.Footer>
                {/* Close button for the modal */}
                <Button variant='secondary' onClick={closePopup}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserProfilePopup;
