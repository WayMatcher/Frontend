import { Button, ButtonGroup, Modal } from 'react-bootstrap';
import WMEvent from '@/types/objects/Event/dto';
import { useEffect, useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import User from '@/types/objects/User/dto';

const Event = ({ event }: { event: WMEvent; handleCloseModal: () => void }) => {
    return (
        <>
            <Modal.Body>
                <p>{event.description}</p>
                <p>
                    <strong>Date:</strong> {event.startTimestamp}
                </p>
                <p>
                    <strong>Start:</strong> {event.stops[0].address.street} {event.stops[0].address.city}{' '}
                    {event.stops[0].address.state} {event.stops[0].address.postal_code}
                </p>
            </Modal.Body>
        </>
    );
};

const OwnedEvent = ({ event }: { event: WMEvent; handleCloseModal: () => void }) => {
    return (
        <>
            <Modal.Body>
                <p>{event.description}</p>
                <p>
                    <strong>Date:</strong> {event.startTimestamp}
                </p>
                <p>
                    <strong>Start:</strong> {event.stops[0].address.street} {event.stops[0].address.city}{' '}
                    {event.stops[0].address.state} {event.stops[0].address.postal_code}
                </p>
            </Modal.Body>
        </>
    );
};

const EventDetails = ({ event, showModal }: { event?: WMEvent; showModal: boolean }) => {
    const [show, setShow] = useState<boolean>(showModal);
    const [isOwnedEvent, setIsOwnedEvent] = useState<boolean>(false);
    const [currentEvent, setCurrentEvent] = useState<WMEvent | undefined>();
    const authUser = useAuthUser<User>();
    const handleCloseModal = () => setShow(false);

    useEffect(() => {
        setShow(showModal);
        if (event) {
            setCurrentEvent(event);
        }
    }, [showModal, event]);

    useEffect(() => {
        if (authUser?.id !== currentEvent?.created_by) {
            setIsOwnedEvent(true);
        } else {
            setIsOwnedEvent(false);
        }
    }, [currentEvent]);

    if (currentEvent) {
        return (
            <Modal show={show} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentEvent.title}</Modal.Title>
                </Modal.Header>
                {isOwnedEvent ? (
                    <Event key={currentEvent.eventId} event={currentEvent} handleCloseModal={handleCloseModal} />
                ) : (
                    <OwnedEvent key={currentEvent.eventId} event={currentEvent} handleCloseModal={handleCloseModal} />
                )}
                <Modal.Footer>
                    <ButtonGroup>
                        {!isOwnedEvent && <Button variant='primary'>Edit</Button>}
                        <Button variant='secondary' onClick={handleCloseModal}>
                            Close
                        </Button>
                    </ButtonGroup>
                </Modal.Footer>
            </Modal>
        );
    } else {
        return null;
    }
};

export default EventDetails;
