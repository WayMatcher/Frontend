import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import '@/pages/styles/EventsPage.scss';
import { useContext, useEffect, useState } from 'react';
import EventCard from '@/components/events/EventCard';
import SearchBar from '@/components/events/SearchBar';
import { getEvent, getEvents } from '@/api/endpoints/event';
import WMEvent from '@/types/objects/Event/dto';
import EventDetails from '@/components/events/EventDetails';
import ErrorModalContext from '@/contexts/ErrorModalContext';

export default function EventPage() {
    const { eventid } = useParams();

    const [events, setEvents] = useState<WMEvent[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [filteredEvents, setFilteredEvents] = useState<WMEvent[]>([]);

    const [currentEvent, setCurrentEvent] = useState<WMEvent | undefined>();

    const { showErrorModal } = useContext(ErrorModalContext);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getEvents();
                setEvents(response.data);
                setFilteredEvents(response.data);
                if (eventid) {
                    const eventIdNumber = parseInt(eventid);
                    const selected = response.data.find((event: WMEvent) => event.id === eventIdNumber);
                    if (selected) {
                        setCurrentEvent(selected);
                        setShowModal(true);
                    } else {
                        showErrorModal('Event not found!');
                    }
                }
            } catch (error: unknown) {
                if (error instanceof Error) showErrorModal(`Failed to fetch events: ${error.message}`);
                console.error(error);
            }
        };

        fetchEvents();
    });

    const handleSearch = (searchTerm: string) => {
        if (searchTerm === '') {
            setFilteredEvents(events);
        } else {
            setFilteredEvents(
                events.filter(
                    (event) =>
                        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        event.description?.toLowerCase().includes(searchTerm.toLowerCase()),
                ),
            );
        }
    };

    const openEvent = (id: number) => {
        console.log('Opening event with id: ', id);
        getEvent({ eventID: id }).then((response) => {
            console.log('Response: ', response);
            if (response.data?.id) {
                setCurrentEvent(response.data);
                setShowModal(true);
            } else {
                showErrorModal('Event not found!');
            }
        });
    };

    return (
        <>
            <Container className='EventPage'>
                <h2>Events</h2>
                <SearchBar onSearch={handleSearch} />
                <br />
                <Container className='EventGrid'>
                    {filteredEvents.map((event) => (
                        <EventCard key={event.id} event={event} openEvent={openEvent} />
                    ))}
                </Container>
                <Button variant='primary' onClick={() => navigate('/events/new')}>
                    Add new Event
                </Button>
            </Container>
            <EventDetails event={currentEvent} showModal={showModal} />
        </>
    );
}
