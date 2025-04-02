import ErrorModalContext from '@/contexts/ErrorModalContext';
import Notification from '@/types/objects/Notification/dto';
import { useContext, useState } from 'react';
import { Badge, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoadingOverlay from '../LoadingOverlay';
import { apiMarkNotificationAsRead } from '@/api/endpoints/inbox';

/**
 * Component representing a single notification item in the inbox.
 * @param {Object} props - Component props.
 * @param {Notification} props.notification - The notification object containing details like read status, message, etc.
 * @param {[Notification[], React.Dispatch<React.SetStateAction<Notification[]>>]} props.notificationState - State containing the list of notifications and its updater function.
 * @returns {JSX.Element} The rendered InboxItem component.
 */
const InboxItem = ({
    notification: { read, message, notificationId, entityid, entitytype },
    notificationState,
}: {
    notification: Notification;
    notificationState: [Notification[], React.Dispatch<React.SetStateAction<Notification[]>>];
}) => {
    const { showErrorModal } = useContext(ErrorModalContext); // Context to show error modals.

    const [loading, setLoading] = useState<boolean>(false); // State to manage loading overlay.

    /**
     * Handles the click event for marking a notification as read.
     * If the notification is already read, it does nothing.
     * Updates the backend and the local state to reflect the read status.
     */
    const handleClick = async () => {
        try {
            setLoading(true); // Show loading overlay.

            if (read) return; // If already read, do nothing.

            // Mark notification as read in the backend.
            await apiMarkNotificationAsRead({ notificationId });

            // Update the notification's read status in the local state.
            notificationState[0].map((notification) => {
                if (notification.notificationId === notificationId) {
                    return { ...notification, read: true }; // Mark as read.
                }
                return notification; // Return unchanged notification.
            });

            setLoading(false); // Hide loading overlay.
        } catch (error: unknown) {
            // Handle errors and show error modal if applicable.
            if (error instanceof Error) {
                showErrorModal(error.message);
                throw error;
            } else {
                throw new Error('An unknown error occurred');
            }
        } finally {
            setLoading(false); // Ensure loading overlay is hidden.
        }
    };

    return (
        <LoadingOverlay isLoading={loading}>
            {/* ListGroup represents the notification item */}
            <ListGroup onClick={handleClick} key={notificationId} className='mb-2'>
                <ListGroup.Item
                    className='d-flex justify-content-between'
                    eventKey={`notification-${notificationId}`}
                    key={`notification-${notificationId}`}
                >
                    {/* Badge indicates whether the notification is read or new */}
                    {read ? <Badge bg={'secondary'}>Read</Badge> : <Badge bg={'primary'}>New</Badge>}
                    {message}
                    {/* If the notification is related to an event, show a button to navigate to the event */}
                    {entitytype === 'event' ? (
                        <Link to={`/events/${entityid}`}>
                            <Button>Go to Event</Button>
                        </Link>
                    ) : null}
                </ListGroup.Item>
            </ListGroup>
        </LoadingOverlay>
    );
};

export default InboxItem;
