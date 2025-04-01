import { Button, Card, Stack } from 'react-bootstrap';
import WMEvent from '@/types/objects/Event/dto';
import EventMemberDisplay from './EventMemberDisplay';
import EventMap from '../maps/MultiStopMap';
import cronParser from 'cron-parser';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import ErrorModalContext from '@/contexts/ErrorModalContext';

interface EventCardProps {
    event: WMEvent;
    openEvent: (id: number) => void;
}

export default function EventCard({ event, openEvent: openModal }: EventCardProps) {
    if (!event?.stopList || event.stopList.length < 2) {
        //throw new Error('Event must have a valid stop list with at least 2 stops');
        return null;
    }

    const { showErrorModal } = useContext(ErrorModalContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const prettySchedule = (cron: string) => {
        try {
            const interval = cronParser.parse(cron, { tz: 'Europe/Vienna' });
            return `${interval.next().toDate().toLocaleString('de-AT')}`;
        } catch (err) {
            return 'Invalid schedule';
        }
    };
    return (
        <Card
            style={{ maxWidth: '18rem' }}
            className='text-center'
            border={event.eventTypeId === 2 ? 'warning' : 'primary'}
        >
            <Card.Header className='text-muted'>
                <Stack direction='horizontal' gap={3} className='justify-content-center'>
                    {event.eventTypeId === 2 ? 'Looking for Passengers' : 'Looking for Pilot'}
                    <div className='vr' />
                    <span
                        className='bi bi-link-45deg'
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            navigator.clipboard.writeText(`${window.location.origin}/events/${event.eventId}`);
                            alert('Link copied to clipboard!');
                        }}
                    ></span>
                </Stack>
            </Card.Header>
            <EventMap width={600} height={400} stopList={event.stopList} />

            <Card.Body>
                <Card.Title>
                    {event.stopList[0].address.city} - {event.stopList[event.stopList.length - 1].address.city}
                </Card.Title>
                <Card.Text>
                    <strong>{event.description}</strong>
                    <br />
                    Starts at: <strong>{prettySchedule(event.schedule.cronSchedule)}</strong>
                    <br />
                    Created by: {event.owner.username}
                </Card.Text>
                <hr />
                <EventMemberDisplay event={event} members={event.eventMembers} freeSeats={event.freeSeats} />
            </Card.Body>
            <Card.Footer className='text-muted'>
                <Stack direction='horizontal' gap={3} className='justify-content-center'>
                    <div className='p-2'>
                        Seats remaining: <strong>{event.freeSeats}</strong>
                    </div>
                    <div className='vr' />
                    <div className='p-2'>
                        <Button
                            variant='primary'
                            onClick={() => {
                                if (event.eventId) {
                                    openModal(event.eventId);
                                    navigate('/events/' + event.eventId);
                                } else {
                                    showErrorModal('Event not found!');
                                    setLoading(false);
                                }
                            }}
                            disabled={event.freeSeats < 1 || event.eventId === undefined}
                        >
                            {loading ? 'Loading...' : 'Match'}
                        </Button>
                    </div>
                </Stack>
            </Card.Footer>
        </Card>
    );
}
