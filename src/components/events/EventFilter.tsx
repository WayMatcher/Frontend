import { Col, Form, Row } from 'react-bootstrap';
import FormInput from '../FormInput';
import WMEvent from '@/types/objects/Event/dto';
import { useEffect, useState, useRef } from 'react';
import SearchBar from './SearchBar';

interface FilterProps {
    onlyRepeating: boolean;
    startsBefore: string;
    startsAfter: string;
    freeSeats: number;
    startLocation: string;
    endLocation: string;
    quickSearch: string;
}

interface EventFilterProps {
    eventListState: [WMEvent[], React.Dispatch<React.SetStateAction<WMEvent[]>>];
    children: React.ReactNode;
}

const EventFilter = ({ eventListState, children }: EventFilterProps) => {
    const [events, setFilteredEvents] = eventListState; // Update filtered events directly
    const originalEventsRef = useRef<WMEvent[]>(events); // Store the original list of events

    const [filter, setFilter] = useState<FilterProps>({
        onlyRepeating: false,
        startsBefore: '',
        startsAfter: '',
        startLocation: '',
        endLocation: '',
        freeSeats: 0,
        quickSearch: '',
    });

    const filterEvents = () => {
        return originalEventsRef.current.filter((event) => {
            const endingLocation = event.stopList[event.stopList.length - 1];
            const startingLocation = event.stopList[0];

            const startLocationMatch =
                filter.startLocation && startingLocation
                    ? event.stopList[0].address.city.toLowerCase().includes(filter.startLocation.toLowerCase())
                    : true;
            const endLocationMatch =
                filter.endLocation && endingLocation
                    ? event.stopList[event.stopList.length - 1].address.city
                          .toLowerCase()
                          .includes(filter.endLocation.toLowerCase())
                    : true;
            const startsBeforeMatch = filter.startsBefore
                ? new Date(event.startTimestamp) < new Date(filter.startsBefore)
                : true;
            const startsAfterMatch = filter.startsAfter
                ? new Date(event.startTimestamp) > new Date(filter.startsAfter)
                : true;
            const freeSeatsMatch = filter.freeSeats ? event.freeSeats <= filter.freeSeats : true;

            const quickSearchMatch =
                filter.quickSearch && startingLocation && endingLocation
                    ? `${startingLocation.address.city} - ${endingLocation.address.city}`
                          .toLowerCase()
                          .includes(filter.quickSearch.toLowerCase())
                    : true;
            const onlyRepeatingMatch = filter.onlyRepeating ? event.scheduleId : true;
            return (
                startLocationMatch &&
                endLocationMatch &&
                startsBeforeMatch &&
                startsAfterMatch &&
                freeSeatsMatch &&
                quickSearchMatch &&
                onlyRepeatingMatch
            );
        });
    };

    useEffect(() => {
        // Filter events on initial render
        const filteredEvents = filterEvents();
        setFilteredEvents(filteredEvents);
    }, []); // Run only once on mount

    useEffect(() => {
        // Update the original events reference whenever the events state changes
        originalEventsRef.current = events;
        const filteredEvents = filterEvents();
        setFilteredEvents(filteredEvents);
    }, [events]); // Run whenever the events state changes

    useEffect(() => {
        const filteredEvents = filterEvents();
        setFilteredEvents(filteredEvents); // Update filtered events directly
    }, [filter]); // Only re-run when the filter changes

    const resetFilter = () => {
        setFilter({
            onlyRepeating: false,
            startsBefore: '',
            startsAfter: '',
            startLocation: '',
            endLocation: '',
            freeSeats: 0,
            quickSearch: '',
        });
        setFilteredEvents(originalEventsRef.current); // Reset to original events
    };

    return (
        <>
            <div className='SearchBarContainer bg-light p-3'>
                <SearchBar
                    onSearch={(searchTerm) => setFilter({ ...filter, quickSearch: searchTerm })}
                    onReset={resetFilter}
                />
            </div>
            <div className='d-flex flex-grow-1'>
                <div className='EventFilterPanel bg-light p-3' style={{ maxWidth: '250px' }}>
                    <Row>
                        <Col>
                            <Form.Check
                                type='checkbox'
                                label='Only Repeating Events'
                                checked={filter.onlyRepeating}
                                onChange={(e) => setFilter({ ...filter, onlyRepeating: e.target.checked })}
                                name='onlyRepeating'
                            />
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col>
                            <FormInput
                                type='text'
                                label='Search by starting location'
                                placeholder='Search a starting location'
                                value={filter.startLocation}
                                onChange={(e) => setFilter({ ...filter, startLocation: e.target.value })}
                                name={'startLocation'}
                            />
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Form.Group as={Col} controlId={`validationFormik-endLocation`}>
                            <Form.Label>Search by ending location</Form.Label>
                            <Form.Control
                                type='text'
                                name='endLocation'
                                value={filter.endLocation}
                                placeholder='Search an ending location'
                                onChange={(e) => setFilter({ ...filter, endLocation: e.target.value })}
                            />
                        </Form.Group>
                    </Row>
                    <hr />
                    <Row>
                        <Form.Group as={Col} controlId={`validationFormik-startsBefore`}>
                            <Form.Label>Starts before</Form.Label>
                            <Form.Control
                                type='datetime-local'
                                name='startsBefore'
                                value={filter.startsBefore}
                                onChange={(e) => setFilter({ ...filter, startsBefore: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId={`validationFormik-startsAfter`}>
                            <Form.Label>Starts after</Form.Label>
                            <Form.Control
                                type='datetime-local'
                                name='startsAfter'
                                value={filter.startsAfter}
                                onChange={(e) => setFilter({ ...filter, startsAfter: e.target.value })}
                            />
                        </Form.Group>
                    </Row>
                    <hr />
                    <Row>
                        <Form.Group as={Col} controlId={`validationFormik-startsAfter`}>
                            <Form.Label>Free Seats</Form.Label>
                            <Form.Control
                                type='number'
                                name='freeSeats'
                                value={filter.freeSeats}
                                onChange={(e) => setFilter({ ...filter, freeSeats: parseInt(e.target.value) })}
                            />
                        </Form.Group>
                    </Row>
                </div>
                {children}
            </div>
        </>
    );
};

export default EventFilter;
