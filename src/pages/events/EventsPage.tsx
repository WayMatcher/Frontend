import { useNavigate, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import '@/pages/_styles/EventsPage.scss';
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
    const { eventid } = useParams(); // Extract event ID from URL parameters
    const [searchParams] = useSearchParams(); // Extract search parameters from the URL
    const { filter } = Object.fromEntries(searchParams.entries()); // Get the 'filter' parameter

    const [events, setEvents] = useState<WMEvent[]>([]); // State to store all events
    const [showModal, setShowModal] = useState(false); // State to control the visibility of the event details modal
    const [filteredEvents, setFilteredEvents] = useState<WMEvent[]>([]); // State to store filtered events

    const [currentEvent, setCurrentEvent] = useState<WMEvent | undefined>(); // State to store the currently selected event

    const { showErrorModal } = useContext(ErrorModalContext); // Context to show error modals

    const [isLoading, setLoading] = useState(true); // State to track loading status

    const authUser = useAuthUser<User>(); // Hook to get the authenticated user

    const navigate = useNavigate(); // Hook to navigate programmatically

    /**
     * Fetches events based on the current filter and updates the state.
     * Handles errors and shows appropriate error messages.
     */
    const fetchEvents = async () => {
        switch (filter) {
            case 'owned':
                if (!authUser) {
                    navigate('/login'); // Redirect to login if the user is not authenticated
                    return;
                }
                try {
                    setLoading(true); // Start loading
                    const response = await apiGetEventList({ userId: authUser.userId }); // Fetch events owned by the user
                    setLoading(false); // Stop loading
                    setEvents(response.data); // Update events state
                    setFilteredEvents(response.data); // Update filtered events state
                    if (eventid) {
                        const eventIdNumber = parseInt(eventid); // Parse event ID from URL
                        const selected = response.data.find((event: WMEvent) => event.eventId === eventIdNumber); // Find the selected event
                        if (selected) {
                            setCurrentEvent(selected); // Set the current event
                            setShowModal(true); // Show the event details modal
                        } else {
                            showErrorModal('Event not found!'); // Show error if event is not found
                            setLoading(false);
                        }
                    }
                } catch (error: unknown) {
                    if (error instanceof Error) showErrorModal(`Failed to fetch events: ${error.message}`); // Show error message
                    setLoading(false);
                }
                break;
            case 'passenger':
                try {
                    setLoading(true);
                    const response = await apiGetEventList({ isPilot: false }); // Fetch events where the user is a passenger
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
                    const response = await apiGetEventList({ isPilot: true }); // Fetch events where the user is a pilot
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
                navigate('/events', { replace: true }); // Redirect to events page if no valid filter is provided
                try {
                    setLoading(true);
                    const response = await apiGetEventList({}); // Fetch all events
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

    // Fetch events whenever the search parameters change
    useEffect(() => {
        fetchEvents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    /**
     * Opens the event details modal for a specific event.
     * @param eventId - The ID of the event to open.
     */
    const openEvent = async (eventId: number) => {
        setLoading(true);
        const response = await apiGetEvent({ eventId: eventId }); // Fetch event details
        if (response.data?.eventId) {
            setCurrentEvent(response.data); // Set the current event
            setShowModal(true); // Show the event details modal
        } else {
            showErrorModal('Event not found!'); // Show error if event is not found
        }
        setLoading(false);
    };

    return (
        <>
            {/* Main container for the event page */}
            <Container fluid className='EventPageLayout d-flex flex-column'>
                <Container fluid>
                    <h2>Ways</h2>
                    {/* Event filter component */}
                    <EventFilter eventListState={[events, setFilteredEvents]}>
                        <div className='EventContent flex-grow-1 p-3'>
                            <Container className='EventGrid d-flex flex-wrap'>
                                {/* Show placeholders while loading, otherwise show event cards */}
                                {isLoading
                                    ? Array.from({ length: 8 }).map((_, index) => <EventCardPlaceholder key={index} />)
                                    : filteredEvents.map((event) => (
                                          <EventCard
                                              key={event.eventId}
                                              event={event}
                                              openEvent={() => {
                                                  if (event.eventId) openEvent(event.eventId); // Open event details
                                              }}
                                          />
                                      ))}
                            </Container>
                        </div>
                    </EventFilter>
                </Container>
            </Container>
            {/* Event details modal */}
            <EventDetails event={currentEvent} showModal={showModal} />
        </>
    );
}
