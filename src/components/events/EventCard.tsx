import { Button, Card } from 'react-bootstrap';
import WMEvent from '@/types/objects/Event/dto';

interface EventCardProps {
    event: WMEvent;
    openEvent: (id: number) => void;
}

export default function EventCard({ event, openEvent: openModal }: EventCardProps) {
    if (!event) return <h1>Event not found</h1>;

    return (
        <Card style={{ maxWidth: '18rem' }}>
            <Card.Img variant='top' src='holder.js/100px180' />
            <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Text>{event.description}</Card.Text>
                <Button variant='primary' onClick={() => openModal(event.eventId)}>
                    Join
                </Button>
            </Card.Body>
        </Card>
    );
}
