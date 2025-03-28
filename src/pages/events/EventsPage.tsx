import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import '@/pages/styles/EventsPage.scss';
import { useContext, useEffect, useState } from 'react';
import EventCard from '@/components/events/EventCard';
import SearchBar from '@/components/events/SearchBar';
import { apiGetEventList, apiGetEvent } from '@/api/endpoints/event';
import WMEvent from '@/types/objects/Event/dto';
import EventDetails from '@/components/events/EventDetails';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import LoadingOverlay from '@/components/LoadingOverlay';

export default function EventPage() {
    const { eventid } = useParams();

    const [events, setEvents] = useState<WMEvent[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [filteredEvents, setFilteredEvents] = useState<WMEvent[]>([]);

    const isAuthenticated = useIsAuthenticated();

    const [currentEvent, setCurrentEvent] = useState<WMEvent | undefined>();
    const [searchTerm, setSearchTerm] = useState<string>('');

    const { showErrorModal } = useContext(ErrorModalContext);

    const [isLoading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await apiGetEventList({});
                setLoading(false);
                setEvents(response.data);
                setFilteredEvents(response.data);
                if (eventid) {
                    const eventIdNumber = parseInt(eventid);
                    const selected = response.data.find((event: WMEvent) => event.eventId === eventIdNumber);
                    if (selected) {
                        setCurrentEvent(selected);
                        setShowModal(true);
                    } else {
                        showErrorModal('Event not found!');
                        setLoading(false);
                    }
                }
            } catch (error: unknown) {
                if (error instanceof Error) showErrorModal(`Failed to fetch events: ${error.message}`);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredEvents(events);
        } else {
            setFilteredEvents(
                events.filter(
                    (event) =>
                        `${event.stopList[0].address.city} - ${event.stopList[event.stopList.length - 1].address.city}`
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                        event.description?.toLowerCase().includes(searchTerm.toLowerCase()),
                ),
            );
        }
    }, [searchTerm]);

    const openEvent = async (eventId: number) => {
        console.log('Opening event with id: ', eventId);
        setLoading(true);
        const response = await apiGetEvent({ eventId: eventId });
        if (response.data?.eventId) {
            setCurrentEvent(response.data);
            setShowModal(true);
        } else {
            showErrorModal('Event not found!');
        }
        setLoading(false);
    };

    return (
        <>
            <LoadingOverlay isLoading={isLoading} className='EventPage'>
                <h2>Ways</h2>
                <SearchBar onSearch={(searchTerm) => setSearchTerm(searchTerm)} />
                <br />
                <Container className='EventGrid'>
                    {filteredEvents.map((event) => (
                        <EventCard
                            key={event.eventId}
                            event={event}
                            openEvent={() => {
                                if (event.eventId) openEvent(event.eventId);
                                console.log(event);
                            }}
                        />
                    ))}
                </Container>
                {isAuthenticated && (
                    <Container>
                        <br />
                        <Button variant='success' className='add-button' onClick={() => navigate('/events/new')}>
                            <span className='bi bi-plus-lg'></span>
                        </Button>
                    </Container>
                )}
            </LoadingOverlay>
            <EventDetails event={currentEvent} showModal={showModal} />
        </>
    );
}
