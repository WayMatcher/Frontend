import { useParams } from 'react-router-dom';
import { Button, ButtonGroup, Container, Modal } from 'react-bootstrap';
import '../styles/EventsPage.scss';
import { useContext, useEffect, useState } from 'react';
import EventCard from '../components/events/EventCard';
import SearchBar from '../components/events/SearchBar';
import { getEvents } from '../types/Event/api';
import WMEvent from '../types/Event/dto';
import EventDetails from '../components/events/EventDetails';
import EventContext from '../types/contexts/EventContext';

export default function EventPage() {
    const { eventid } = useParams();

    const { currentEvent, setCurrentEvent } = useContext(EventContext);

    const [events, setEvents] = useState<WMEvent[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [filteredEvents, setFilteredEvents] = useState<WMEvent[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getEvents();
                setEvents(response.events);
                setFilteredEvents(response.events);
                if (eventid) {
                    const eventIdNumber = parseInt(eventid);
                    const selected = response.events.find((event: WMEvent) => event.id === eventIdNumber);
                    if (selected) {
                        setCurrentEvent(selected);
                        setShowModal(true);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchEvents();
    });

    const handleSearch = (searchTerm: string) => {
        if (searchTerm === "") {
            setFilteredEvents(events);
        } else {
            setFilteredEvents(events.filter(event =>
                (event.title.toLowerCase().includes(searchTerm.toLowerCase()) || event.description?.toLowerCase().includes(searchTerm.toLowerCase()))
            ));
        }
    };

    const handleShowModal = () => {
        setCurrentEvent(currentEvent);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setCurrentEvent(null);
        setShowModal(false);
    };

    return (
        <>
            <Container className="EventPage">
                <h2>Events</h2>
                <SearchBar onSearch={handleSearch} />
                <br />
                <Container className="EventGrid">
                    {filteredEvents.map(event => (
                        <EventCard key={event.id} event={event} openModal={handleShowModal} />
                    ))}
                </Container>
            </Container>
            <Modal show={showModal} onHide={handleCloseModal}>
                <EventDetails event={currentEvent} />
                <Modal.Footer>
                    <ButtonGroup>
                        <Button variant="primary">Edit</Button>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </ButtonGroup>
                </Modal.Footer>
            </Modal>
        </>
    );
}