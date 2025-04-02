import { Col, Form, Row } from 'react-bootstrap';
import FormInput from '../FormInput';
import WMEvent from '@/types/objects/Event/dto';
import { useEffect, useState, useRef } from 'react';
import SearchBar from './SearchBar';

/**
 * Interface for the filter state used to filter events.
 */
interface FilterProps {
    onlyRepeating: boolean; // Whether to filter only repeating events
    startsBefore: string; // Filter events starting before this date
    startsAfter: string; // Filter events starting after this date
    freeSeats: number; // Maximum number of free seats
    startLocation: string; // Filter by starting location
    endLocation: string; // Filter by ending location
    quickSearch: string; // Quick search term
}

/**
 * Props for the EventFilter component.
 */
interface EventFilterProps {
    eventListState: [WMEvent[], React.Dispatch<React.SetStateAction<WMEvent[]>>]; // State for the list of events
    children: React.ReactNode; // Child components to render
}

/**
 * Component for filtering a list of events based on various criteria.
 * @param {EventFilterProps} props - Props for the EventFilter component.
 */
const EventFilter = ({ eventListState, children }: EventFilterProps) => {
    const [events, setFilteredEvents] = eventListState; // State for filtered events
    const originalEventsRef = useRef<WMEvent[]>(events); // Reference to the original list of events

    // State for the filter criteria
    const [filter, setFilter] = useState<FilterProps>({
        onlyRepeating: false,
        startsBefore: '',
        startsAfter: '',
        startLocation: '',
        endLocation: '',
        freeSeats: 0,
        quickSearch: '',
    });

    /**
     * Filters the events based on the current filter criteria.
     * @returns {WMEvent[]} The filtered list of events.
     */
    const filterEvents = () => {
        return originalEventsRef.current.filter((event) => {
            // Extract starting and ending locations from the event's stop list
            const endingLocation = event.stopList[event.stopList.length - 1];
            const startingLocation = event.stopList[0];

            // Check if the starting location matches the filter
            const startLocationMatch =
                filter.startLocation && startingLocation
                    ? event.stopList[0].address.city.toLowerCase().includes(filter.startLocation.toLowerCase())
                    : true;

            // Check if the ending location matches the filter
            const endLocationMatch =
                filter.endLocation && endingLocation
                    ? event.stopList[event.stopList.length - 1].address.city
                          .toLowerCase()
                          .includes(filter.endLocation.toLowerCase())
                    : true;

            // Check if the event starts before the specified date
            const startsBeforeMatch = filter.startsBefore
                ? new Date(event.startTimestamp) < new Date(filter.startsBefore)
                : true;

            // Check if the event starts after the specified date
            const startsAfterMatch = filter.startsAfter
                ? new Date(event.startTimestamp) > new Date(filter.startsAfter)
                : true;

            // Check if the event has free seats less than or equal to the specified number
            const freeSeatsMatch = filter.freeSeats ? event.freeSeats <= filter.freeSeats : true;

            // Check if the quick search term matches the event's route
            const quickSearchMatch =
                filter.quickSearch && startingLocation && endingLocation
                    ? `${startingLocation.address.city} - ${endingLocation.address.city}`
                          .toLowerCase()
                          .includes(filter.quickSearch.toLowerCase())
                    : true;

            // Check if the event is repeating (has a schedule ID)
            const onlyRepeatingMatch = filter.onlyRepeating ? event.scheduleId : true;

            // Return true if all filter criteria match
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

    // Effect to filter events on initial render
    useEffect(() => {
        const filteredEvents = filterEvents();
        setFilteredEvents(filteredEvents);
    }, []); // Run only once on mount

    // Effect to update the original events reference whenever the events state changes
    useEffect(() => {
        originalEventsRef.current = events;
        const filteredEvents = filterEvents();
        setFilteredEvents(filteredEvents);
    }, [events]); // Run whenever the events state changes

    // Effect to filter events whenever the filter criteria changes
    useEffect(() => {
        const filteredEvents = filterEvents();
        setFilteredEvents(filteredEvents);
    }, [filter]); // Only re-run when the filter changes

    /**
     * Resets the filter criteria to their default values and restores the original event list.
     */
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
            {/* Search bar for quick search and reset functionality */}
            <div className='SearchBarContainer bg-light p-3'>
                <SearchBar
                    onSearch={(searchTerm) => setFilter({ ...filter, quickSearch: searchTerm })}
                    onReset={resetFilter}
                />
            </div>

            <div className='d-flex flex-grow-1'>
                {/* Filter panel with various filter options */}
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
                {/* Render child components */}
                {children}
            </div>
        </>
    );
};

export default EventFilter;
