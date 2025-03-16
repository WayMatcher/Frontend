
import { Modal } from 'react-bootstrap';
import WMEvent from '../../types/dto/Event';
import { EventError } from './EventError';

const EventDetails = ({ event }: {
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
                </Modal.Body>
            </>
        );
    } else {
        return <EventError />;
    }
};

export default EventDetails;
