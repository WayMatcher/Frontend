import ErrorModalContext from '@/contexts/ErrorModalContext';
import Notification from '@/types/objects/Notification/dto';
import { useContext, useState } from 'react';
import { Badge, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoadingOverlay from '../LoadingOverlay';
import { apiMarkNotificationAsRead } from '@/api/endpoints/inbox';

const InboxItem = ({
    notification: { read, message, notificationId, entityid, entitytype },
    notificationState,
}: {
    notification: Notification;
    notificationState: [Notification[], React.Dispatch<React.SetStateAction<Notification[]>>];
}) => {
    const { showErrorModal } = useContext(ErrorModalContext);

    const [loading, setLoading] = useState<boolean>(false);

    const handleClick = async () => {
        try {
            setLoading(true);

            if (read) return; // If already read, do nothing
            // Mark notification as read in the backend
            await apiMarkNotificationAsRead({ notificationId });

            // Find notification in notificationState[0] and update it to read
            notificationState[0].map((notification) => {
                if (notification.notificationId === notificationId) {
                    return { ...notification, read: true };
                }
                return notification;
            });

            setLoading(false);
        } catch (error: unknown) {
            if (error instanceof Error) {
                showErrorModal(error.message);
                throw error;
            } else {
                throw new Error('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <LoadingOverlay isLoading={loading}>
            <ListGroup onClick={handleClick} key={notificationId} className='mb-2'>
                <ListGroup.Item
                    className='d-flex justify-content-between'
                    eventKey={`notification-${notificationId}`}
                    key={`notification-${notificationId}`}
                >
                    {read ? <Badge bg={'secondary'}>Read</Badge> : <Badge bg={'primary'}>New</Badge>}
                    {message}
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
