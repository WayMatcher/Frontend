import { Button, Card } from 'react-bootstrap';
import WMEvent from '@/types/Event/dto';
import { useContext } from 'react';
import EventContext from '@/contexts/EventContext';

interface EventCardProps {
    event: WMEvent;
    openModal: () => void;
}

export default function EventCard({ event, openModal }: EventCardProps) {
    const { setCurrentEvent } = useContext(EventContext);

    const handleOpen = () => {
        setCurrentEvent(event);
        openModal();
    };

    if (!event) {
        return <div>Event not found</div>;
    }

    return (
        <Card style={{ maxWidth: '18rem' }}>
            <Card.Img variant='top' src='holder.js/100px180' />
            <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Text>{event.description}</Card.Text>
                <Button variant='primary' onClick={handleOpen}>
                    Join
                </Button>
            </Card.Body>
        </Card>
    );
}
