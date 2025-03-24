import { Button, Card, ListGroup } from 'react-bootstrap';
import WMEvent from '@/types/objects/Event/dto';
import EventMemberDisplay from './EventMemberDisplay';
import EventMap from './EventMap';

interface EventCardProps {
    event: WMEvent;
    openEvent: (id: number) => void;
}

export default function EventCard({ event, openEvent: openModal }: EventCardProps) {
    if (!event?.stopList || event.stopList.length < 2) {
        //throw new Error('Event must have a valid stop list with at least 2 stops');
        return null;
    }

    const prettyDate = new Date(event.startTimestamp).toLocaleDateString('de-AT');
    const prettyTime = new Date(event.startTimestamp).toLocaleTimeString('de-AT');

    return (
        <Card style={{ maxWidth: '18rem' }}>
            <EventMap width={600} height={400} stopList={event.stopList} />
            <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Text>
                    <strong>{event.description}</strong>
                </Card.Text>
                <ListGroup>
                    <ListGroup.Item>
                        <p>
                            Free Seats: <strong>{event.freeSeats}</strong>
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <p>
                            Starts on: <strong>{prettyDate}</strong> <strong>{prettyTime}</strong>
                        </p>
                    </ListGroup.Item>
                </ListGroup>
                <br />
                <EventMemberDisplay members={event.eventMembers} />
                <br />
                <Card.Footer>
                    <Button variant='primary' onClick={() => openModal(event.eventId)}>
                        Join
                    </Button>
                </Card.Footer>
            </Card.Body>
        </Card>
    );
}
