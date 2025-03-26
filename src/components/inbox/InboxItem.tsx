import Notification from '@/types/objects/Notification/dto';
import { Accordion, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const InboxItem = ({
    notification: { read, message, notificationId, entityid, entitytype },
}: {
    notification: Notification;
}) => {
    return (
        <Accordion.Item eventKey={`notification-${notificationId}`}>
            <Accordion.Header>
                <span className={!read ? 'bi bi-dot' : undefined}></span>
                {message}
            </Accordion.Header>
            <Accordion.Body>
                {entitytype === 'event' ? (
                    <Link to={`/events/${entityid}`}>
                        <Button>Go to Event</Button>
                    </Link>
                ) : null}
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default InboxItem;
