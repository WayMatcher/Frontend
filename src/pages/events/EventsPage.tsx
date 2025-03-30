import { useNavigate, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import '@/pages/styles/EventsPage.scss';
import { useContext, useEffect, useState } from 'react';
import EventCard from '@/components/events/EventCard';
import { apiGetEventList, apiGetEvent } from '@/api/endpoints/event';
import WMEvent from '@/types/objects/Event/dto';
import EventDetails from '@/components/events/EventDetails';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import EventFilter from '@/components/events/EventFilter';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import User from '@/types/objects/User/dto';
import { useSearchParams } from 'react-router-dom';
import EventCardPlaceholder from '@/components/events/EventCardPlaceholder';

export default function EventPage() {
    const { eventid } = useParams();
    const [searchParams] = useSearchParams();
    const { filter } = Object.fromEntries(searchParams.entries());

    const [events, setEvents] = useState<WMEvent[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [filteredEvents, setFilteredEvents] = useState<WMEvent[]>([]);

    const [currentEvent, setCurrentEvent] = useState<WMEvent | undefined>();

    const { showErrorModal } = useContext(ErrorModalContext);

    const [isLoading, setLoading] = useState(true);

    const authUser = useAuthUser<User>();

    const navigate = useNavigate();

    const fetchEvents = async () => {
        switch (filter) {
            case 'owned':
                if (!authUser) {
                    navigate('/login');
                    return;
                }
                try {
                    setLoading(true);
                    const response = await apiGetEventList({ userId: authUser.userId });
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
                break;
            case 'passenger':
                try {
                    setLoading(true);
                    const response = await apiGetEventList({ isPilot: false });
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
                break;
            case 'pilot':
                try {
                    setLoading(true);
                    const response = await apiGetEventList({ isPilot: true });
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
                break;
            default:
                navigate('/events', { replace: true });
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
                break;
        }
    };

    useEffect(() => {
        fetchEvents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    const openEvent = async (eventId: number) => {
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
            <Container fluid className='EventPageLayout d-flex flex-column'>
                <Container fluid>
                    <h2>Ways</h2>
                    <EventFilter eventListState={[events, setFilteredEvents]}>
                        <div className='EventContent flex-grow-1 p-3'>
                            <Container className='EventGrid d-flex flex-wrap'>
                                {isLoading
                                    ? Array.from({ length: 6 }).map((_, index) => <EventCardPlaceholder key={index} />)
                                    : filteredEvents.map((event) => (
                                          <EventCard
                                              key={event.eventId}
                                              event={event}
                                              openEvent={() => {
                                                  if (event.eventId) openEvent(event.eventId);
                                              }}
                                          />
                                      ))}
                            </Container>
                        </div>
                    </EventFilter>
                </Container>
            </Container>
            <EventDetails event={currentEvent} showModal={showModal} />
        </>
    );
}
