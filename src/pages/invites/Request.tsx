import { apiGetEvent } from '@/api/endpoints/event';
import { apiAcceptRequest } from '@/api/endpoints/invite';
import LoadingOverlay from '@/components/LoadingOverlay';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import WMEvent from '@/types/objects/Event/dto';
import { useContext, useEffect, useState } from 'react';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import cronParser from 'cron-parser';

/**
 * Component for handling and displaying an invite request.
 * Fetches event details and allows the user to accept the invite.
 */
const RequestInvite = () => {
    // Check if the user is authenticated. If not, display a login prompt.
    if (!useIsAuthenticated())
        return (
            <Container className='mt-5'>
                <h1>Not logged in!</h1>
                <Link to='/login'>
                    <Button>Log in</Button>
                </Link>
            </Container>
        );

    const [loading, setLoading] = useState<boolean>(false); // State to manage loading overlay
    const { showErrorModal } = useContext(ErrorModalContext); // Context for displaying error modals
    const [currentEvent, setCurrentEvent] = useState<WMEvent | undefined>(); // State to store event details

    const [searchParams] = useSearchParams();
    const userId = searchParams.get('userId'); // Extract userId from URL parameters
    const eventId = searchParams.get('eventId'); // Extract eventId from URL parameters
    const eventRole = searchParams.get('eventRole'); // Extract eventRole from URL parameters

    // Validate URL parameters and show an error if any are missing or invalid
    if (!userId || !eventId || !eventRole) {
        showErrorModal('Missing parameters in URL');
        throw new Error('Missing parameters in URL');
    }
    if (parseInt(eventId) <= 0) throw new Error('Invalid eventId');
    if (parseInt(userId) <= 0) throw new Error('Invalid userId');
    if (parseInt(eventRole) <= 0) throw new Error('Invalid eventRole');

    useEffect(() => {
        /**
         * Fetches event details from the API and updates the state.
         */
        const fetchEventDetails = async () => {
            try {
                setLoading(true); // Show loading overlay
                const response = await apiGetEvent({ eventId: parseInt(eventId) });
                setCurrentEvent(response.data); // Update event details in state
            } catch (error) {
                // Show error modal if the API call fails
                showErrorModal('An error occurred: ' + (error as Error).message);
            } finally {
                setLoading(false); // Hide loading overlay
            }
        };
        fetchEventDetails();
    }, []); // Empty dependency array ensures this runs only once on component mount

    /**
     * Handles the acceptance of the invite request.
     * Sends the acceptance request to the API.
     */
    const onAccept = async () => {
        try {
            if (!userId || !eventId || !eventRole) {
                console.error('Missing parameters in URL');
                return;
            }

            setLoading(true); // Show loading overlay

            await apiAcceptRequest({
                userId: parseInt(userId),
                eventId: parseInt(eventId),
                eventRole: parseInt(eventRole),
            });
        } catch (error: unknown) {
            // Show error modal if the API call fails
            showErrorModal('An error occurred: ' + (error as Error).message);
        } finally {
            setLoading(false); // Hide loading overlay
        }
    };

    return (
        <LoadingOverlay isLoading={loading}>
            <Card>
                <Card.Header>
                    <Card.Title>Accept Request</Card.Title>
                </Card.Header>
                <Card.Body>
                    {/* Display event details */}
                    <p>Event Description: {currentEvent?.description}</p>
                    <p>Event Start: {currentEvent?.startTimestamp}</p>
                    <p>Event Type: {currentEvent?.eventTypeId}</p>
                    <p>Event Free Seats: {currentEvent?.freeSeats}</p>
                    <p>Event Stop List:</p>
                    <ul>
                        {currentEvent?.stopList.map((stop) => (
                            <li key={stop.stopId}>
                                {stop.address.city}, {stop.address.street}, {stop.address.postalcode}
                            </li>
                        ))}
                    </ul>
                    <p>Next Start:</p>
                    <ul>
                        {currentEvent &&
                            cronParser
                                .parse(currentEvent?.schedule.cronSchedule, { tz: 'Europe/Vienna' })
                                .next()
                                .toDate()
                                .toLocaleString('de-AT')}
                    </ul>
                </Card.Body>
                <Card.Footer>
                    {/* Display event members */}
                    <p>Event Members:</p>
                    <ul>
                        {currentEvent?.eventMembers.map((member) => (
                            <li key={member.user.userId}>
                                {member.user.username} - {member.eventRole}
                            </li>
                        ))}
                    </ul>
                    {/* Button to accept the invite */}
                    <Button onClick={onAccept} disabled={!userId || !eventId || !eventRole}>
                        Accept Request
                    </Button>
                </Card.Footer>
            </Card>
        </LoadingOverlay>
    );
};

export default RequestInvite;
