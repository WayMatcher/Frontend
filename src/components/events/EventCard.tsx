import { Button, Card, ListGroup } from 'react-bootstrap';
import WMEvent from '@/types/objects/Event/dto';
import EventMemberDisplay from './EventMemberDisplay';
import EventMap from './EventMap';
import cronParser from 'cron-parser';
import { useNavigate } from 'react-router-dom';

interface EventCardProps {
    event: WMEvent;
    openEvent: (id: number) => void;
}

export default function EventCard({ event, openEvent: openModal }: EventCardProps) {
    if (!event?.stopList || event.stopList.length < 2) {
        //throw new Error('Event must have a valid stop list with at least 2 stops');
        return null;
    }
    const navigate = useNavigate();
    const prettyDate = new Date(event.startTimestamp).toLocaleDateString('de-AT');
    const prettyTime = new Date(event.startTimestamp).toLocaleTimeString('de-AT');
    const prettySchedule = (cron: string) => {
        try {
            const interval = cronParser.parse(cron, { tz: 'Europe/Vienna' });
            return `${interval.next().toDate().toLocaleString('de-AT')}`;
        } catch (err) {
            return 'Invalid schedule';
        }
    };

    return (
        <Card style={{ maxWidth: '18rem' }}>
            <EventMap width={600} height={400} stopList={event.stopList} />
            <Card.Body>
                <Card.Title>
                    {event.stopList[0].address.city} - {event.stopList[event.stopList.length - 1].address.city}
                </Card.Title>
                <Card.Text>
                    <strong>{event.description}</strong>
                </Card.Text>
            </Card.Body>
            <ListGroup>
                <ListGroup.Item>
                    <p>
                        Free Seats: <strong>{event.freeSeats}</strong>
                    </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <p>
                        Created on: <strong>{prettyDate}</strong> <strong>{prettyTime}</strong>
                    </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <p>
                        Schedule: <strong>{prettySchedule(event.schedule.cronSchedule)}</strong>
                    </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <EventMemberDisplay members={event.eventMembers} />
                </ListGroup.Item>
            </ListGroup>
            <Card.Footer>
                <Button
                    variant='primary'
                    onClick={() => {
                        if (event.eventId) {
                            openModal(event.eventId);
                            navigate('/events/' + event.eventId);
                        }
                    }}
                    disabled={event.freeSeats < 1 || event.eventId === undefined}
                >
                    Match
                </Button>
            </Card.Footer>
        </Card>
    );
}
