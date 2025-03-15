import { useParams } from 'react-router-dom';
import { Button, ButtonGroup, Col, Container, Modal, Row } from 'react-bootstrap';
import '../styles/EventsPage.scss';
import { useEffect, useState } from 'react';
import EventCard from '../components/events/EventCard';
import SearchBar from '../components/events/SearchBar';
import { getEvents } from '../api/events';
import WMEvent from '../types/dto/Event';
import EventDetails from './event/EventDetails';

export default function EventPage() {
    const { eventid } = useParams();

    const [events, setEvents] = useState<WMEvent[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<WMEvent | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getEvents();
                setEvents(response.events);
                if (eventid) {
                    const eventIdNumber = parseInt(eventid);
                    const selected = response.events.find(event => event.id === eventIdNumber);
                    if (selected) {
                        setSelectedEvent(selected);
                        setShowModal(true);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchEvents();
    }, [eventid]);

    const handleShowModal = (event: WMEvent) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedEvent(null);
        setShowModal(false);
    };

    return (
        <Container className="EventPage">
            <h2>Events</h2>
            <SearchBar />
            <br />
            <Container>
                <Row>
                    {events.map((event, index) => (
                        <Col key={index}>
                            <EventCard event={event} />
                            {events.map(event => (
                                <div key={event.id}>
                                    <h3>{event.title}</h3>
                                    <Button onClick={() => handleShowModal(event)}>View Details</Button>
                                </div>
                            ))}
                            <Modal show={showModal} onHide={handleCloseModal}>
                                <EventDetails event={selectedEvent} />
                                <Modal.Footer>
                                    <ButtonGroup>
                                        <Button variant="primary">Edit</Button>
                                        <Button variant="secondary" onClick={handleCloseModal}>
                                            Close
                                        </Button>
                                    </ButtonGroup>
                                </Modal.Footer>
                            </Modal>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>
    );
}