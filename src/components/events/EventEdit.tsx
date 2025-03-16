import { Modal, Button } from 'react-bootstrap';
import WMEvent from '../../types/dto/Event';
import { EventError } from './EventError';

const EventEdit = ({ event }: {
    event: WMEvent | null;
}) => {
    if (event) {
        return (
            <>
                <Modal.Header closeButton>
                    <Modal.Title>{event.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{event.description}</p>
                    <p><strong>Date:</strong> {event.start_time}</p>
                    <p><strong>Start:</strong> {event.stops[0].id}</p>
                    <Button variant="primary">Edit</Button>
                </Modal.Body>
            </>
        );
    } else {
        return <EventError />;
    }
};

export default EventEdit;
