import { Button, Card } from "react-bootstrap";
import WMEvent from "../../types/dto/Event";

interface EventCardProps {
    event: WMEvent;
}

export default function EventCard({ event }: EventCardProps) {

    return (
        <Card>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Text>
                    {event.description}
                </Card.Text>
                <Button variant="primary">Join</Button>
            </Card.Body>
        </Card>
    )
}